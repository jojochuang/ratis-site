---
title: StateMachine Core API by Example
---

# StateMachine Core API: A Developer Guide

This guide provides a practical, example-driven walkthrough of the core `StateMachine` API. We will build a simple, in-memory key-value store to demonstrate how to implement the essential lifecycle and transaction methods.

## The Key-Value Store Example

Our state machine will support two basic operations:
*   `put(key, value)`: A write operation to store a key-value pair.
*   `get(key)`: A read-only operation to retrieve a value.

We'll use a simple `ConcurrentHashMap` to store the data in memory.

```java
import org.apache.ratis.statemachine.impl.BaseStateMachine;
import java.util.concurrent.ConcurrentHashMap;

public class KeyValueStateMachine extends BaseStateMachine {
    private final ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();
    // ... method implementations below
}
```

## 1. Handling Transactions (`applyTransaction`)

The `applyTransaction` method is the heart of your state machine. It's where you apply committed log entries to update your state. The logic must be deterministic.

For our key-value store, we'll parse the incoming `Message`, check if it's a `put` operation, and update our map.

```java
@Override
public CompletableFuture<Message> applyTransaction(TransactionContext trx) {
    final LogEntryProto entry = trx.getLogEntry();
    final String logData = entry.getStateMachineLogEntry().getLogData().toStringUtf8();

    // Parse the command, e.g., "put:key1:value1"
    final String[] parts = logData.split(":");
    String result = "SUCCESS";

    if (parts.length >= 3 && "put".equalsIgnoreCase(parts[0])) {
        map.put(parts[1], parts[2]);
    } else {
        result = "INVALID_COMMAND";
    }

    // Return a success message to the client
    return CompletableFuture.completedFuture(Message.valueOf(result));
}
```

## 2. Handling Queries (`query`)

The `query` method handles read-only requests. It must not change the state machine's state.

Here, we'll implement the `get` operation to retrieve a value from our map.

```java
@Override
public CompletableFuture<Message> query(Message request) {
    final String command = request.getContent().toStringUtf8();
    // Parse the command, e.g., "get:key1"
    final String[] parts = command.split(":");

    String result = "NOT_FOUND";
    if (parts.length >= 2 && "get".equalsIgnoreCase(parts[0])) {
        result = map.getOrDefault(parts[1], "NOT_FOUND");
    }

    return CompletableFuture.completedFuture(Message.valueOf(result));
}
```

## 3. Creating Snapshots (`takeSnapshot`)

To prevent the Raft log from growing infinitely, you must implement snapshotting. `takeSnapshot` is called by Ratis to save the current state to a file.

This example serializes the in-memory map to a file within the storage directory provided by Ratis.

```java
@Override
public long takeSnapshot() throws IOException {
    // Get the snapshot directory from the RaftStorage
    final File snapshotDir = getStateMachineStorage().getSnapshotDir();
    final long lastAppliedIndex = getLastAppliedTermIndex().getIndex();
    final File snapshotFile = new File(snapshotDir, "snapshot-" + lastAppliedIndex);

    // Serialize the map to the snapshot file
    try (ObjectOutputStream out = new ObjectOutputStream(
        new BufferedOutputStream(new FileOutputStream(snapshotFile)))) {
        out.writeObject(map);
    }

    // Return the index of the last log entry included in the snapshot
    return lastAppliedIndex;
}
```

## 4. Loading from Snapshots (`initialize` and `reinitialize`)

When a server starts or restarts, it needs to load its state from the most recent snapshot.

### `getLatestSnapshot()`

First, Ratis needs to know where the latest snapshot is. You must implement this method to return information about your most recent snapshot.

```java
@Override
public SnapshotInfo getLatestSnapshot() {
    // Find the latest snapshot file in the snapshot directory
    // This is a simplified example; a real implementation would need to parse filenames
    // to find the one with the highest index.
    return findLatestSnapshotInfo(); // Assumes implementation of this helper method
}
```

### `initialize()`

This method is called on startup. Your implementation should load the state from the snapshot file identified by `getLatestSnapshot()`.

```java
@Override
public void initialize(RaftServer server, RaftGroupId groupId, RaftStorage storage) throws IOException {
    super.initialize(server, groupId, storage);
    final SnapshotInfo latest = getLatestSnapshot();
    if (latest != null) {
        loadSnapshot(latest.getFiles().get(0).getPath().toFile());
    }
}

// Helper method to load the map from a file
private void loadSnapshot(File snapshotFile) throws IOException {
    try (ObjectInputStream in = new ObjectInputStream(
        new BufferedInputStream(new FileInputStream(snapshotFile)))) {
        map.clear();
        map.putAll((ConcurrentHashMap<String, String>) in.readObject());
    } catch (ClassNotFoundException e) {
        throw new IOException("Failed to deserialize snapshot", e);
    }
}
```

`reinitialize()` is called after a snapshot has been installed from a leader. For many simple state machines, its implementation can be the same as `initialize()`.

This guide covers the fundamental methods for creating a functional `StateMachine`. For more advanced features, see the "StateMachine Developer Guide".