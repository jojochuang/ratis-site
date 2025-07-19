---
title: Leader Lease
---

# Leader Lease

## Objective

To introduce the Leader Lease Read feature into Ratis to enhance read capabilities and address existing limitations.

## Current Implementation Limitations

1.  **Leader Bypass Read:** Offers improved latency and throughput but is constrained to the leader and may produce inconsistent results.
2.  **Server Linearizable Read (ReadIndex):** Allows clients to read from any server, ensuring linearizability but suffers from suboptimal latency (20-30% throughput drop compared to bypass read).

## Reasons for Proposed Feature (Leader Lease Read)

*   Validated by other communities (e.g., Sofa-Jraft), resulting in a 15% improvement in throughput performance.
*   Addresses the demand for low-latency read capabilities from downstream dependents like IoTDB for time-series queries.

## Configuration

To enable and configure Leader Lease, the following properties can be set in `RaftServerConfigKeys`:

| Property | Description | Type | Default |
|---|---|---|---|
| `raft.server.read.leader.lease.enabled` | Whether to enable lease in linearizable read-only requests. | `boolean` | `false` |
| `raft.server.read.leader.lease.timeout.ratio` | Maximum timeout ratio of leader lease. | `double` (ranging from 0.0 to 1.0) | `0.9` |

## Related Issues and References

*   Previous community discussions: [RATIS-1864](https://issues.apache.org/jira/browse/RATIS-1864), [RATIS-1273](https://issues.apache.org/jira/browse/RATIS-1273) and [https://github.com/apache/ratis/pull/383](https://github.com/apache/ratis/pull/383)
*   Quantitative results: [https://www.sofastack.tech/en/projects/sofa-jraft/jraft-user-guide/](https://www.sofastack.tech/en/projects/sofa-jraft/jraft-user-guide/) (Section 5. Linearizable read)
