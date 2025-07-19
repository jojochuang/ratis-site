---
title: Linearizable Read from Followers
---

# Linearizable Read from Followers

The Raft algorithm allows read-only requests to bypass the Raft log while still maintaining linearizability. This can significantly benefit the read throughput of the entire system. This document outlines the concept of ReadIndex and its implementation in Apache Ratis.

## Raft ReadIndex Algorithm

As described in Raft paper section 6.4, the ReadIndex algorithm ensures linearizable reads:

1.  The Leader must at least mark an entry from its current term as committed.
2.  The Leader saves its current commit index as the `readIndex`.
3.  The Leader issues a new round of heartbeats to all followers and waits for their acknowledgments.
4.  The Leader waits for its state machine to advance at least as far as the `readIndex`.
5.  The Leader issues the query against its state machine and replies to the client.

## Ratis Implementation Design

Apache Ratis implements the leader ReadIndex method, similar to Sofa-Jraft, as a basis for future follower ReadIndex support. The key aspects of the Ratis design include:

*   **Client Request Type:** A new `ClientRequestType`, `ReadIndex`, is introduced.
*   **Leader Handling:** The `RaftServerImpl#submitClientRequestAsync()` method includes a new branch to handle `ReadIndex` requests.
*   **Heartbeat Validation:** For each `readIndex` request, a new round of heartbeats is sent. If the heartbeat check passes (i.e., a majority of followers acknowledge), the request is added to a pending queue.
*   **State Machine Advancement:** The pending `readIndex` requests are checked and removed in `ApplyLog()` once the state machine's applied index has advanced sufficiently.

## API Methods

To utilize linearizable reads, the following methods are available in the client APIs:

### Asynchronous API (`org.apache.ratis.client.api.AsyncApi`)

```java
CompletableFuture sendReadOnly(Message message);
```

Sends the given readonly message asynchronously to the Raft service. When `raft.server.read.option` is set to `LINEARIZABLE`, this method performs a linearizable read.

### Blocking API (`org.apache.ratis.client.api.BlockingApi`)

```java
RaftClientReply sendReadOnly(Message message) throws IOException;
```

Sends the given readonly message to the Raft service. When `raft.server.read.option` is set to `LINEARIZABLE`, this method performs a linearizable read.

## Configuration

To enable linearizable reads, the following properties can be configured in `RaftServerConfigKeys`:

| Property | Description | Type | Default |
|---|---|---|---|
| `raft.server.read.option` | Option for processing read-only requests. | `Read.Option` enum (`DEFAULT`, `LINEARIZABLE`) | `Read.Option.DEFAULT` |
| `raft.server.read.timeout` | Request timeout for linearizable read-only requests. | `TimeDuration` | `10s` |

When `raft.server.read.option` is set to `LINEARIZABLE`, the `sendReadOnly` methods in the client APIs will perform linearizable reads using the ReadIndex mechanism.

## References

*   [RATIS-1557](https://issues.apache.org/jira/browse/RATIS-1557)
*   Pull Request: [https://github.com/apache/ratis/pull/700](https://github.com/apache/ratis/pull/700)