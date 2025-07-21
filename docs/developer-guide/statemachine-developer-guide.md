---
title: Advanced StateMachine APIs
---

# Advanced StateMachine APIs: A Developer Guide

This guide explores the advanced, optional APIs of the `StateMachine` interface. Implementing these APIs gives you fine-grained control over data handling, event notifications, and multi-raft management. For a guide to the essential, core methods, see the "StateMachine Core API" guide.

## DataApi: For High-Performance Data Handling

Implement the `DataApi` interface when you need to manage state machine data directly, outside of the Raft log. This is essential for performance-critical applications that require zero-copy data streaming.

### Example: A File Store StateMachine

Let's imagine a state machine that stores large files. Instead of writing the entire file content to the Raft log, we can use the `DataApi` to stream the file directly to a separate storage location.

```java
public class FileStoreStateMachine extends BaseStateMachine implements StateMachine.DataApi {

    private final File storageDir = new File("/path/to/your/storage");

    @Override
    public CompletableFuture<DataStream> stream(RaftClientRequest request) {
        // The request message contains the file name
        String fileName = request.getMessage().getContent().toStringUtf8();
        File file = new File(storageDir, fileName);

        try {
            // Create a DataChannel to write the file to
            final FileChannel channel = new FileOutputStream(file).getChannel();
            final DataStream stream = () -> channel;
            return CompletableFuture.completedFuture(stream);
        } catch (IOException e) {
            return CompletableFuture.failedFuture(e);
        }
    }

    @Override
    public CompletableFuture<?> link(DataStream stream, LogEntryProto entry) {
        // The stream is now complete. We can close the channel.
        try {
            stream.getDataChannel().close();
        } catch (IOException e) {
            return CompletableFuture.failedFuture(e);
        }
        return CompletableFuture.completedFuture(null);
    }
}
```

## EventApi: Reacting to Cluster Events

Implement `EventApi` to receive notifications about general lifecycle events within the Raft group.

### Example: Logging Leader Changes

```java
public class MyStateMachine extends BaseStateMachine implements StateMachine.EventApi {

    @Override
    public void notifyLeaderChanged(RaftGroupMemberId groupMemberId, RaftPeerId newLeaderId) {
        System.out.println("Leader changed for group " + groupMemberId + ". New leader is " + newLeaderId);
    }
}
```

## LeaderEventApi: Leader-Specific Logic

Implement `LeaderEventApi` to execute logic that should only run when the server is the leader.

### Example: Monitoring Slow Followers

```java
public class MyStateMachine extends BaseStateMachine implements StateMachine.LeaderEventApi {

    @Override
    public void notifyFollowerSlowness(RoleInfoProto leaderInfo, RaftPeer slowFollower) {
        System.err.println("Warning: Follower " + slowFollower.getId() + " is slow!");
    }
}
```

## FollowerEventApi: Follower-Specific Logic

Implement `FollowerEventApi` for follower-only event handling.

### Example: Handling Leader Timeouts

```java
public class MyStateMachine extends BaseStateMachine implements StateMachine.FollowerEventApi {

    @Override
    public void notifyExtendedNoLeader(RoleInfoProto roleInfoProto) {
        System.err.println("Warning: No leader elected for an extended period of time.");
        // You could trigger an alert here
    }
}
```

## Registry: Supporting Multiple Raft Groups

If you need to run multiple, independent Raft groups (and thus multiple state machines) within a single server process, you can implement the `StateMachine.Registry` interface.

### Example: A Multi-Tenant StateMachine

```java
public class MultiTenantStateMachineRegistry implements StateMachine.Registry {

    private final Map<RaftGroupId, StateMachine> stateMachines = new ConcurrentHashMap<>();

    @Override
    public StateMachine apply(RaftGroupId groupId) {
        return stateMachines.computeIfAbsent(groupId, id -> {
            // Create a new state machine for the given group
            // You might have different state machine implementations for different groups
            return new KeyValueStateMachine();
        });
    }
}
```