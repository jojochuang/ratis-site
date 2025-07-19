---
title: Pre-vote
---

# Pre-vote

## Purpose

The Pre-vote mechanism in Apache Ratis addresses the issue of unnecessary leader step-downs that can occur when a follower temporarily loses network connectivity and then recovers. Without Pre-vote, such a follower might initiate a new leader election upon recovery, even if a stable leader already exists, leading to disruptions in the cluster.

## Mechanism

The proposed solution involves a two-phase election process:

1.  **Pre-vote Request:** When a follower (e.g., `s3`) believes it needs to request a vote, it first sends a pre-vote request to other servers.
2.  **Pre-vote Response:** When the current leader (e.g., `s1`) and other followers (e.g., `s2`) receive the pre-vote request, they check their `electionTimeout` to determine if a leader election should be triggered.
3.  **Preventing Unnecessary Elections:** If `s1` and `s2` determine that a new leader election is not necessary (e.g., they are still receiving heartbeats from the current leader), they will refuse the pre-vote request. In this scenario, `s3` remains a follower, preventing an unnecessary election and maintaining cluster stability.

## Configuration

To enable or disable the Pre-vote feature, the following property can be set in `RaftServerConfigKeys`:

| Property | Description | Type | Default |
|---|---|---|---|
| `raft.server.leaderelection.pre-vote` | Enable or disable the pre-vote mechanism. | `boolean` | `true` |

**Methods to set/get this property:**

```java
static boolean preVote(RaftProperties properties);
static void setPreVote(RaftProperties properties, boolean preVote);
```

## References

*   [RATIS-993](https://issues.apache.org/jira/browse/RATIS-993)
*   Pull Request: [https://github.com/apache/ratis/pull/402](https://github.com/apache/ratis/pull/402)