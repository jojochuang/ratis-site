---
title: Non-Voting Members (Listeners)
---

# Support Non-voting Member/Learner in Ratis

## Why are learners useful?

The learner is useful to maintain high availability when new servers join a Raft ring (details at thesis 4.2.1). For Apache Ozone SCM HA effort, we have also discussed the possibility to utilize learners as a tool to replace SCM nodes online.

etcd also has an [article](https://etcd.io/docs/v3.5/learning/design-learner/) to explain why learners are useful.

## Goals

Support Learners in Ratis, which can be promoted as a normal follower (thus becoming a voting member). Note that the scope of the Learner in this document is larger than a Listener, because a Learner can replicate state from the Leader, and a Learner can be promoted to a normal Follower.

## When can a Learner be added into a Raft Ring?

*   When a Raft Ring starts, the initial RaftGroup could include learners.
*   When a Raft Ring is running, learners can join the ring (this requires extending the Admin API).

## Leader Election

In the RaftConfiguration, there will be two sets of peers: one for normal peers which can vote, and the other for learners which cannot vote. So, during leader election, candidates only request votes from normal peers, thus learners will not be counted as part of the majority (because learners won’t receive RequestVote).

Learners still receive AppendEntries so they can update themselves to the newest leader.

## When working like a Listener (not promoted as a normal follower)

A Learner should only accept AppendEntries and InstallSnapshot. A Learner should reject other requests (e.g., write requests) with a `LearningOnlyException`. Note that a Learner is not supposed to join the DataStream chain either.

**Open question:** Can the learner serve read requests?
My current thought is no, unless there is a specific use case.

## Promote as a normal follower

We can extend the Admin API to allow promoting a learner to a follower. What this operation really does is transition the role of the learner to “FOLLOWER”, which will trigger the `FollowerState` daemon to start heartbeating with the leader.

## References

*   [RATIS-1298](https://issues.apache.org/jira/browse/RATIS-1298)
