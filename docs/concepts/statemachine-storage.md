---
title: StateMachine Storage
---

# StateMachine Storage

The `StateMachineStorage` interface defines how a Ratis state machine interacts with its persistent storage for snapshots. While the Raft log ensures the durability of operations, snapshots provide a compact representation of the state machine's state at a given point in time, enabling efficient recovery and log compaction.

## Key Responsibilities of `StateMachineStorage`

*   **Initialization (`init`):** Initializes the storage with the `RaftStorage` object, which provides the base directory for the state machine's data.
*   **Snapshot Management:**
    *   `getLatestSnapshot()`: Returns information about the most recent durable snapshot.
    *   `cleanupOldSnapshots()`: Cleans up old snapshots based on a retention policy.
*   **Formatting (`format`):** Formats the state machine's storage.
*   **Directory Management (Optional):**
    *   `getSnapshotDir()`: Returns the directory where snapshots are stored.
    *   `getTmpDir()`: Returns a temporary directory for in-progress snapshot operations.

## SimpleStateMachineStorage: The Default Implementation

`SimpleStateMachineStorage` is the only built-in implementation of `StateMachineStorage` in Ratis. It provides a straightforward way to manage snapshots by storing each snapshot as a single file within the state machine's dedicated storage directory.

### Key Characteristics of `SimpleStateMachineStorage`:

*   **Single-File Snapshots:** Each snapshot is stored as a single file named `snapshot.term_index`, where `term` and `index` correspond to the last log entry included in the snapshot.
*   **MD5 Checksums:** It supports MD5 checksums for snapshot files to ensure data integrity.
*   **Snapshot Discovery:** It can discover the latest snapshot by scanning the storage directory and parsing the filenames.
*   **Cleanup:** It implements the `cleanupOldSnapshots` method to remove older snapshots based on a configurable retention policy.

### When to Use `SimpleStateMachineStorage`:

`SimpleStateMachineStorage` is suitable for most common use cases where the state machine's snapshot can be represented as a single, self-contained file. It's simple to use and provides the necessary durability guarantees.

### When to Implement Your Own `StateMachineStorage`:

You might consider implementing your own `StateMachineStorage` if:

*   **Complex Snapshot Layout:** Your state machine's snapshot consists of multiple files or a complex directory structure that cannot be easily managed as a single file.
*   **External Storage:** You want to store snapshots in an external storage system (e.g., cloud storage, distributed file system) rather than the local disk.
*   **Custom Snapshotting Logic:** You have specific requirements for snapshot creation, management, or recovery that are not met by `SimpleStateMachineStorage`.
