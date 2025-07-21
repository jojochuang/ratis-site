---
title: Log Appender
---

# Log Appender

In Ratis, the `LogAppenderDefault` is the default implementation of the `LogAppender` interface, which is a core component running on the Raft leader. Its primary responsibility is to ensure that all followers in the Raft group have an up-to-date copy of the leader's log. It achieves this through a continuous process of sending `AppendEntries` RPCs and, when necessary, installing snapshots.

## Key Responsibilities and Mechanisms

### 1. Log Replication (AppendEntries RPCs)

*   The `LogAppenderDefault` continuously sends `AppendEntries` RPCs to its assigned follower. These RPCs contain new log entries that the leader has committed.
*   It manages the `nextIndex` for each follower, which is the index of the next log entry the leader expects to send to that follower.
*   It handles the responses from followers, updating their `matchIndex` (the highest log entry known to be replicated on the follower) and `nextIndex` accordingly.
*   It implements retry logic for `AppendEntries` RPCs in case of network issues or follower unresponsiveness.

### 2. Snapshot Installation

*   If a follower is significantly behind the leader (i.e., its `nextIndex` is less than the leader's `logStartIndex`), the `LogAppenderDefault` will initiate an `InstallSnapshot` RPC.
*   This mechanism allows the follower to quickly catch up by receiving a complete snapshot of the leader's state machine, rather than replaying a very long sequence of log entries.
*   It handles the various responses from the follower during snapshot installation, such as `SUCCESS`, `NOT_LEADER`, `SNAPSHOT_UNAVAILABLE`, etc.

### 3. Heartbeats

*   Even when there are no new log entries to append, the `LogAppenderDefault` sends periodic heartbeats (empty `AppendEntries` RPCs) to followers.
*   Heartbeats serve two main purposes:
    *   To maintain leadership: They prevent followers from timing out and initiating new elections.
    *   To update commit index: They allow the leader to inform followers of its latest commit index, even if no new entries have been appended.

### 4. Error Handling

*   The `LogAppenderDefault` includes mechanisms to handle various errors, such as network exceptions, inconsistencies in log states between leader and follower, and cases where the leader discovers it is no longer the leader.
*   It can adjust the `nextIndex` for a follower if an inconsistency is detected, allowing the follower to re-synchronize its log with the leader.

In essence, `LogAppenderDefault` is the workhorse that keeps the Ratis cluster's state consistent across all its members, ensuring high availability and data integrity.
