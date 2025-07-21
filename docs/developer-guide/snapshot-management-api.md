---
title: Snapshot Management API
---

# Snapshot Management API Developer Guide

The `SnapshotManagementApi` provides a simple way to manually trigger the creation of snapshots on a Ratis server. This can be useful for administrative tasks, such as backing up the state machine or preparing for a cluster upgrade.

## Getting the `SnapshotManagementApi`

To get an instance of the `SnapshotManagementApi`, you need to have a `RaftClient`.

```java
import org.apache.ratis.client.RaftClient;
import org.apache.ratis.client.api.SnapshotManagementApi;

// ...

RaftClient client = ...; // Your RaftClient instance

SnapshotManagementApi snapshotManager = client.getSnapshotManagementApi();
```

## Creating a Snapshot

The `SnapshotManagementApi` has a single `create` method with a few overloads. The core functionality is to trigger the creation of a snapshot on the server.

### Basic Snapshot Creation

To trigger a snapshot with the server's default settings, you can use the `create(long timeoutMs)` method.

```java
import org.apache.ratis.protocol.RaftClientReply;

// ...

try {
    RaftClientReply reply = snapshotManager.create(3000); // 3-second timeout
    if (reply.isSuccess()) {
        System.out.println("Successfully created snapshot with index: " + reply.getLogIndex());
    }
} catch (IOException e) {
    // Handle exception
}
```

### Forcing a Snapshot

If you need to force the creation of a snapshot, you can use the `create(boolean force, long timeoutMs)` method. Setting `force` to `true` will cause a snapshot to be created even if the number of new log entries is small.

```java
try {
    RaftClientReply reply = snapshotManager.create(true, 3000); // Force snapshot creation
    if (reply.isSuccess()) {
        System.out.println("Successfully created snapshot with index: " + reply.getLogIndex());
    }
} catch (IOException e) {
    // Handle exception
}
```

### Controlling the Snapshot Creation Gap

For more fine-grained control, you can use the `create(long creationGap, long timeoutMs)` method. The `creationGap` parameter specifies the minimum number of new log entries that must exist since the last snapshot for a new snapshot to be created. This can be useful for preventing excessive snapshotting.

```java
try {
    // Only create a snapshot if there are at least 1000 new log entries
    RaftClientReply reply = snapshotManager.create(1000, 3000);
    if (reply.isSuccess()) {
        System.out.println("Successfully created snapshot with index: " + reply.getLogIndex());
    }
} catch (IOException e) {
    // Handle exception
}
```
