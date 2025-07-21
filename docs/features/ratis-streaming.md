---
title: Ratis Streaming
---

# Ratis Streaming

For information on how to configure Ratis Streaming, please see the [Streaming Configuration](../developer-guide/streaming-configuration.md) tutorial.

Ratis Streaming is a feature designed to optimize the handling of client requests in a Raft cluster, addressing limitations of the traditional star topology where all client requests are sent directly to the Leader.

## Problem Statement

The traditional Raft approach, where clients send requests to the Leader and the Leader then forwards them as `appendEntries` to all followers in a star topology, has several drawbacks:

1.  **Increased Leader Memory Cache:** The Leader requires significant memory to cache outstanding client requests and log entries/data for each follower. Retrying mechanisms can exacerbate this by caching the same data multiple times.
2.  **Performance Bottlenecks:** Concurrent requests can be slowed down if a client's data is written to a slower disk, impacting other clients even if they are writing to faster disks.
3.  **Suboptimal Streaming Performance:** The traditional method is not ideal for streaming data, as it requires waiting for incoming streams to close before processing, unlike true streaming where data can be immediately forwarded.
4.  **Inefficient Network Traffic for Leader:**
    *   The Leader directly receives all requests from all clients, leading to a high number of connections to manage.
    *   The Leader uses twice or more network bandwidth compared to followers for `appendEntries`.
5.  **Suboptimal Network Topology Utilization:**
    *   Clients near a follower but far from the Leader still have to send requests to the Leader, which then sends `appendEntries` back to the near follower.
    *   Inefficiencies arise when the Leader resides in a different rack than co-located followers.

## Proposed Solution: Ratis Streaming

Ratis Streaming aims to overcome these limitations by introducing pipelines (or spanning trees) instead of a star topology for broadcasting client requests. In this model, all machines (Leader and followers) can directly receive requests from clients and then stream these requests to other machines using a pipeline.

For example, if the Leader and Follower 1 are in the same rack, and Follower 2 is in a different rack:

```
*   **Case 1 (Traditional):** Client -> Leader -> Follower 1 ---------------> Follower 2
*   **Case 2 (Streaming):** Leader <- Follower 1 <--------------- Follower 2 <- Client
*   **Case 3 (Streaming with Pipeline):** Client -> Follower 1 -> Leader ---------------> Follower 2
```

When the Leader receives a forwarded request, it processes it as usual. When a follower receives a request, it sends an acknowledgment to the Leader, and the Leader replies with the log index.

## Implementation Plan

The implementation of Ratis Streaming is divided into two main steps:

### Step 1: Streaming (without Topology Change)

This step focuses on the core streaming implementation while maintaining the Ratis star topology and without considering network awareness. It addresses problems related to Leader memory cache, concurrent request ordering, and basic streaming performance.

*   **Plan 1: Stream to the Leader, then immediately stream to followers without creating Ratis transactions.**
    *   Clients stream requests to the Leader.
    *   The Leader immediately streams the data to all followers in parallel.
    *   A Ratis transaction is created only after the client closes the stream.
    *   **Packet Acknowledgements:** The Leader acknowledges each packet back to the client only after receiving acknowledgments from all followers. This throttles traffic based on the slowest follower.
    *   **Multiple Clients:** Multiple clients can stream in parallel without interfering with each other until a transaction is created.

*   **Plan 1.1: Stream to a primary node, then immediately stream to remaining nodes.**
    *   Clients can stream to any node (Primary node), not just the Leader.
    *   The Primary node immediately streams client data to all other nodes.
    *   The Leader (which may or may not be the Primary node) creates a transaction upon receiving all stream data.
    *   Clients can continue streaming to the Primary node even during leader re-election. If the Primary node fails, the client can failover to any other node with unacknowledged data.

### Step 2: Pipeline (Topology Change)

This step focuses on replacing the star topology with pipelines to improve network efficiency, especially in multi-rack environments. The goal is to eliminate redundant cross-rack traffic by chaining nodes in a pipeline.

## Transport Mechanism

Netty is chosen for the initial Streaming implementation due to its superior performance (approximately 5x better than gRPC with Protobuf or Flatbuffers) as it supports zero buffer copying.

## References

*   [Streaming Configuration](../developer-guide/streaming-configuration.md)
*   [RATIS-979](https://issues.apache.org/jira/browse/RATIS-979)
