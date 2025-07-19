---
title: Read-After-Write Consistency Support
---

# Read-After-Write Consistency Support

This feature ensures that a read operation by a client reflects the latest successful write by the *same* client, even if that write has not yet been fully committed across the entire Raft group. This provides a stronger consistency guarantee for individual client sessions.

## Interface Methods

To utilize read-after-write consistency, the following methods are available in the client APIs:

### Asynchronous API (`org.apache.ratis.client.api.AsyncApi`)

```java
CompletableFuture sendReadAfterWrite(Message message);
```

Sends the given readonly message asynchronously to the Raft service. The result will be read-after-write consistent, i.e., reflecting the latest successful write by the same client.

### Blocking API (`org.apache.ratis.client.api.BlockingApi`)

```java
RaftClientReply sendReadAfterWrite(Message message) throws IOException;
```

Sends the given readonly message to the Raft service. The result will be read-after-write consistent, i.e., reflecting the latest successful write by the same client.

## Configuration

To configure the read-after-write consistency feature, the following property can be set in `RaftServerConfigKeys`:

### `RaftServerConfigKeys.ReadAfterWriteConsistent`

| Property | Description | Type | Default |
|---|---|---|---|
| `raft.server.read.read-after-write-consistent.write-index-cache.expiry-time` | Expiration time for the server's memorized last written index of a specific client. Must be larger than `Read.TIMEOUT_DEFAULT`. | `TimeDuration` | `60s` |

**Methods to set/get this property:**

```java
static TimeDuration writeIndexCacheExpiryTime(RaftProperties properties);
static void setWriteIndexCacheExpiryTime(RaftProperties properties, TimeDuration expiryTime);
```

## References

*   [RATIS-1882](https://issues.apache.org/jira/browse/RATIS-1882)
