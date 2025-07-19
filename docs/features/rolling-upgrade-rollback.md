---
title: Rolling Upgrade and Rollback
---

# Rolling Upgrade and Rollback

Apache Ratis, as a Java library implementing the Raft consensus protocol, provides the foundational elements for building distributed systems that support rolling upgrades and rollbacks. While Ratis itself doesn't dictate a specific upgrade procedure, its core principles of replicated logs and strong consistency enable applications built on it to achieve these operational capabilities.

## Rolling Upgrade

A rolling upgrade allows a distributed system to be updated to a new version without downtime. This is achieved by upgrading nodes one by one, ensuring that a quorum of nodes running the older version remains available to serve requests while the upgrade progresses. Once a node is upgraded, it rejoins the cluster, and the process continues for the next node.

Key aspects that enable rolling upgrades in systems using Apache Ratis include:

*   **Raft Consensus:** The Raft protocol, implemented by Ratis, ensures that all nodes in a replicated group agree on the state of the system. During a rolling upgrade, as individual nodes are updated and restarted, the remaining nodes maintain the consensus, and the upgraded node can seamlessly rejoin the group and catch up on the latest state.
*   **High Availability:** Ratis-based systems are designed for high availability. If a node is temporarily unavailable during an upgrade, the cluster can continue to operate as long as a majority of nodes are still active and can form a quorum.
*   **Backward Compatibility:** For a successful rolling upgrade, the new version of the software must be backward compatible with the older version. This allows nodes running different versions to coexist and communicate effectively during the transition period.
*   **Client Retries and Fixed Ports:** Applications like Apache Celeborn, which use Ratis, implement mechanisms such as fixed fetch ports and client-side retries. This ensures that clients can tolerate temporary unavailability of individual nodes during an upgrade and successfully reconnect to available or newly upgraded nodes.

## Rollback

Rollback is the process of reverting a system to a previous stable state, typically in response to issues encountered during or after an upgrade. The ability to roll back is crucial for mitigating risks associated with software deployments.

In the context of Apache Ratis and systems built upon it:

*   **State Management:** Ratis manages a replicated log, which can be thought of as a sequence of operations that define the system's state. In principle, a rollback would involve reverting this log to a previous point in time, effectively undoing changes.
*   **Checkpoints and Snapshots:** Distributed systems often use checkpoints or snapshots of their state. These can serve as recovery points for a rollback. If an upgrade fails, the system can be reverted to a known good snapshot.
*   **Defined Rollback Procedures:** Projects like Uber's Hadoop NameNode containerization, which leverages Apache Ratis, emphasize having a clear checklist and criteria for deciding when to roll back. This ensures that if an upgrade encounters problems, there's a predefined process to revert to the previous stable version without compromising availability.
*   **Caller Responsibility:** In some implementations, like in Apache IoTDB's consensus layer built on Ratis, it's the caller's responsibility to handle retries or rollbacks, indicating that the application layer needs to manage the higher-level logic for these operations.

In essence, Apache Ratis provides the robust consensus mechanism that underpins the ability of distributed systems to perform rolling upgrades and effective rollbacks, ensuring data consistency and system availability throughout the lifecycle of software deployments.