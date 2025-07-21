---
title: Support Priority in Leader Election
---

# Support Priority in Leader Election

Ratis supports assigning priorities to Raft peers, influencing the leader election process to favor higher-priority servers. This mechanism allows administrators to guide the cluster towards a preferred leader, which can be beneficial for performance, resource utilization, or operational reasons (e.g., preferring a server in a specific rack or with more powerful hardware).

## How Priority Affects Leader Election

When a server becomes a candidate and initiates a leader election, the priority assigned to each peer plays a crucial role:

1.  **Priority Assignment:** Each `RaftPeer` can be assigned an integer priority. This is typically done during the cluster configuration or dynamically using the Ratis CLI.

    *   **Configuration:** You can set the priority when building `RaftPeer` objects:

        ```java
        import org.apache.ratis.protocol.RaftPeer;

        RaftPeer peerWithPriority = RaftPeer.newBuilder()
            .setId("peer1")
            .setAddress("localhost:5000")
            .setPriority(100) // Set a higher priority
            .build();
        ```

    *   **Ratis CLI:** Use the `ratis-cli peer setPriority` command to dynamically adjust peer priorities:

        ```bash
        $ ratis-cli sh peer setPriority -peers <PEER_ID:PEER_ADDRESS,...> -addressPriority <PEER_HOST:PEER_PORT|PRIORITY,...>
        # Example: Set priority 100 for peer at localhost:5000
        $ ratis-cli sh peer setPriority -peers peer1:localhost:5000,peer2:localhost:5001 -addressPriority localhost:5000|100
        ```

2.  **Higher Priority Veto Power:** If a candidate (say, Peer A) requests a vote from another peer (Peer B) that has a *higher priority* than Peer A, and Peer B *rejects* Peer A's vote, then Peer A will immediately step down and abort its election attempt. This mechanism ensures that a lower-priority candidate does not win an election if a more suitable, higher-priority candidate is available and active.

3.  **Requirement for Higher Priority Acceptance:** For a candidate to successfully win an election, it must not only secure a majority of votes from the voting members but also ensure that all higher-priority peers have either voted for it or have not rejected its vote. If there are higher-priority peers that have not yet responded, the candidate will wait for their responses (up to the election timeout). This ensures that the cluster converges on the highest-priority available leader.

## Benefits

*   **Preferred Leader Selection:** Allows you to designate specific servers as preferred leaders, which can be beneficial for performance optimization (e.g., choosing a server with better hardware or network connectivity).
*   **Operational Control:** Provides a mechanism to influence leadership during maintenance or recovery scenarios.
*   **Predictable Behavior:** Helps in making the leader election process more predictable in heterogeneous environments.

## References

*   [RATIS-967: SUPPORT PRIORITY IN LEADER ELECTION](https://issues.apache.org/jira/browse/RATIS-967)
*   [RATIS-1247: SUPPORT ROLLING UPGRADE AND ROLLBACK](https://issues.apache.org/jira/browse/RATIS-1247) (This Jira introduced the priority concept as part of leadership transfer).