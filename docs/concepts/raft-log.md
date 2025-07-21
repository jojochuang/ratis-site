---
title: Raft Log
---

# The Raft Log

The Raft Log is the central data structure in Ratis that ensures consistency and fault tolerance. It is an append-only log of operations that are applied to the state machine. The log is replicated across all the servers in a Raft group, and an entry is only considered "committed" when it has been successfully replicated to a majority of the servers.

## Raft Log Implementations

Ratis provides two primary implementations of the `RaftLog` interface:

### 1. `MemoryRaftLog`

*   **Description:** This is a simple, in-memory implementation of the Raft Log. It stores all log entries in a list in the Java heap.
*   **Use Case:** The `MemoryRaftLog` is primarily used for testing and is **not recommended for production use**. Since it does not persist data to disk, all log entries will be lost if the server restarts.
*   **Performance:** It is extremely fast due to its in-memory nature, but it does not provide any durability guarantees.

### 2. `SegmentedRaftLog`

*   **Description:** This is the production-ready, disk-based implementation of the Raft Log. It stores log entries in a series of segmented files on disk. Each segment has a configurable maximum size, and when a segment is full, a new one is created.
*   **Use Case:** The `SegmentedRaftLog` is the default and recommended implementation for production environments. It provides the durability and fault tolerance guarantees that are expected from a Raft-based system.
*   **Performance:** While not as fast as the `MemoryRaftLog`, the `SegmentedRaftLog` is highly optimized for performance. It uses a combination of in-memory caching and efficient disk I/O to provide a good balance between performance and durability.

## Key Concepts

*   **Log Index:** Each entry in the Raft Log is assigned a unique, monotonically increasing log index.
*   **Term:** A term is a logical clock in Raft that is used to detect stale leaders. Each term has a single leader, and the term number increases whenever a new leader is elected.
*   **Commit Index:** The commit index is the highest log index that is known to be replicated on a majority of the servers. Log entries up to the commit index are considered "committed" and can be safely applied to the state machine.
*   **Snapshotting:** To prevent the Raft Log from growing indefinitely, Ratis uses snapshotting. A snapshot is a point-in-time copy of the state machine's state. Once a snapshot is taken, all the log entries up to that point can be safely discarded.
