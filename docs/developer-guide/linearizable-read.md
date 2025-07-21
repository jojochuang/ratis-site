---
title: Linearizable Read from Followers
---

# Linearizable Read from Followers Developer Guide

Ratis supports linearizable reads, which allows clients to read the most up-to-date committed data from any server in the cluster, including followers. This can significantly improve read throughput and reduce the load on the leader.

## Enabling Linearizable Reads

To enable linearizable reads, you must set the `raft.server.read.option` property to `LINEARIZABLE` in your `RaftProperties` when creating the `RaftServer`.

```java
import org.apache.ratis.server.RaftServerConfigKeys;
import org.apache.ratis.conf.RaftProperties;

// Create a RaftProperties object
RaftProperties properties = new RaftProperties();

// Enable linearizable reads
RaftServerConfigKeys.Read.setOption(properties, RaftServerConfigKeys.Read.Option.LINEARIZABLE);

// Build your RaftServer with the updated properties
RaftServer server = RaftServer.newBuilder()
    // ... other builder configurations
    .setProperties(properties)
    .build();
```

## Sending Read Requests

Once linearizable reads are enabled on the server, you can send read requests from the client using the standard `sendReadOnly` method. Ratis will automatically route the request to an appropriate server (leader or follower) to ensure linearizable consistency.

### Asynchronous Read

```java
import org.apache.ratis.client.api.AsyncApi;
import org.apache.ratis.protocol.Message;
import org.apache.ratis.protocol.RaftClientReply;

import java.util.concurrent.CompletableFuture;

// ...

AsyncApi asyncApi = client.async();
CompletableFuture<RaftClientReply> replyFuture = asyncApi.sendReadOnly(Message.valueOf("your-read-only-message"));
```

### Blocking Read

```java
import org.apache.ratis.client.api.BlockingApi;
import org.apache.ratis.protocol.Message;
import org.apache.ratis.protocol.RaftClientReply;

import java.io.IOException;

// ...

BlockingApi blockingApi = client.io();
try {
    RaftClientReply reply = blockingApi.sendReadOnly(Message.valueOf("your-read-only-message"));
    // process reply
} catch (IOException e) {
    // handle exception
}
```

## Non-Linearizable Reads

Even with linearizable reads enabled, you can still opt for a non-linearizable read if you do not require the strongest consistency guarantee. This can be useful for latency-sensitive applications where a slightly stale read is acceptable.

To perform a non-linearizable read, use the `sendReadOnlyNonLinearizable` method.

### Asynchronous Non-Linearizable Read

```java
CompletableFuture<RaftClientReply> replyFuture = asyncApi.sendReadOnlyNonLinearizable(Message.valueOf("your-read-only-message"));
```

### Blocking Non-Linearizable Read

```java
try {
    RaftClientReply reply = blockingApi.sendReadOnlyNonLinearizable(Message.valueOf("your-read-only-message"));
    // process reply
} catch (IOException e) {
    // handle exception
}
```
