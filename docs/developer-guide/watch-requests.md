---
title: Watch Requests
---

# Watch Requests Developer Guide

The `AsyncApi.watch()` method is a powerful feature for clients that need to wait for a specific log index to be replicated to a certain level. This is particularly useful in scenarios where a client has submitted a write request and wants to be notified when that write has been safely replicated to a quorum of servers. Instead of polling, the client can use `watch()` to receive a future that will be completed when the desired replication level is reached.

## The `watch()` Method

```java
CompletableFuture<RaftClientReply> watch(long index, ReplicationLevel replication);
```

*   **`index`**: The log index to be watched.
*   **`replication`**: The replication level required (e.g., `MAJORITY`, `ALL`).
*   **Returns**: A `CompletableFuture<RaftClientReply>`. When this future completes successfully, the `RaftClientReply` will contain the log index that satisfied the watch request. This returned index will be greater than or equal to the index that was requested to be watched.

## How to Use `watch()`

Here is an example of how to use the `watch()` method:

```java
import org.apache.ratis.client.api.AsyncApi;
import org.apache.ratis.protocol.Message;
import org.apache.ratis.protocol.RaftClientReply;
import org.apache.ratis.proto.RaftProtos.ReplicationLevel;

import java.util.concurrent.CompletableFuture;

// ...

AsyncApi asyncApi = client.async();

// 1. Send a write request
CompletableFuture<RaftClientReply> writeFuture = asyncApi.send(Message.valueOf("my-data"));

// 2. Get the log index from the reply
writeFuture.thenCompose(reply -> {
    if (reply.isSuccess()) {
        long logIndex = reply.getLogIndex();
        System.out.println("Write request submitted with log index: " + logIndex);

        // 3. Watch the log index for majority replication
        return asyncApi.watch(logIndex, ReplicationLevel.MAJORITY);
    } else {
        // Handle write failure
        return CompletableFuture.failedFuture(reply.getException());
    }
}).thenAccept(watchReply -> {
    if (watchReply.isSuccess()) {
        System.out.println("Log index " + watchReply.getLogIndex() + " has been replicated to a majority.");
    } else {
        // Handle watch failure
        System.err.println("Failed to watch log index: " + watchReply.getException());
    }
});
```
