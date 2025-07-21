---
title: Group Management
---

# Group Management Developer Guide

The `GroupManagementApi` provides a powerful interface for dynamically managing Raft groups on a Ratis server. This guide explains how to use this API to add, remove, and inspect Raft groups.

## Getting the `GroupManagementApi`

To get an instance of the `GroupManagementApi`, you need to have a `RaftClient` and the `RaftPeerId` of the server you want to manage.

```java
import org.apache.ratis.client.RaftClient;
import org.apache.ratis.client.api.GroupManagementApi;
import org.apache.ratis.protocol.RaftPeerId;

// ...

RaftClient client = ...; // Your RaftClient instance
RaftPeerId serverId = ...; // The ID of the server to manage

GroupManagementApi groupManager = client.getGroupManagementApi(serverId);
```

## Adding a New Group

You can add a new Raft group to a server using the `add` method. This is useful for dynamically creating new replication groups without restarting the server.

```java
import org.apache.ratis.protocol.RaftGroup;
import org.apache.ratis.protocol.RaftGroupId;
import org.apache.ratis.protocol.RaftPeer;

// ...

RaftGroupId groupId = RaftGroupId.randomId();
RaftPeer[] peers = ...; // Define the peers in the new group
RaftGroup newGroup = RaftGroup.valueOf(groupId, peers);

try {
    RaftClientReply reply = groupManager.add(newGroup);
    if (reply.isSuccess()) {
        System.out.println("Successfully added new group: " + groupId);
    }
} catch (IOException e) {
    // Handle exception
}
```

By default, the `add` method will format the storage for the new group. You can prevent this by passing `false` as the second argument.

## Removing a Group

To remove a group, you can use the `remove` method. You can also control whether the group's data directory is deleted or renamed.

```java
import org.apache.ratis.protocol.RaftGroupId;

// ...

RaftGroupId groupIdToRemove = ...; // The ID of the group to remove

try {
    RaftClientReply reply = groupManager.remove(groupIdToRemove, true, false); // Delete the directory
    if (reply.isSuccess()) {
        System.out.println("Successfully removed group: " + groupIdToRemove);
    }
} catch (IOException e) {
    // Handle exception
}
```

## Listing and Inspecting Groups

The `GroupManagementApi` also provides methods for listing all groups on a server and getting detailed information about a specific group.

### Listing Groups

```java
import org.apache.ratis.protocol.GroupListReply;

// ...

try {
    GroupListReply reply = groupManager.list();
    if (reply.isSuccess()) {
        System.out.println("Groups on server: " + reply.getGroupIds());
    }
} catch (IOException e) {
    // Handle exception
}
```

### Getting Group Info

```java
import org.apache.ratis.protocol.GroupInfoReply;
import org.apache.ratis.protocol.RaftGroupId;

// ...

RaftGroupId groupIdToInspect = ...; // The ID of the group to inspect

try {
    GroupInfoReply reply = groupManager.info(groupIdToInspect);
    if (reply.isSuccess()) {
        System.out.println("Group info: " + reply.getGroup());
        System.out.println("Role: " + reply.getRole());
        System.out.println("Is leader: " + reply.isLeader());
    }
} catch (IOException e) {
    // Handle exception
}
```
