---
title: Listeners (Non-Voting Members)
---

# Listeners (Non-Voting Members) Developer Guide

> **Terminology Note:** In Ratis, the term **listener** is used to describe what is more broadly known as a **learner** in the Raft protocol literature. Their functionality and purpose are identical.

In Ratis, a non-voting member is referred to as a **listener**. Listeners receive all the committed log entries from the leader, but they do not participate in the leader election process or the log commitment process. This makes them useful for tasks such as:

*   **Read-only replicas:** Listeners can serve stale reads without impacting the write performance of the cluster.
*   **Data replication to remote sites:** You can use listeners to replicate data to a remote data center for disaster recovery purposes without affecting the latency of the main cluster.
*   **Analytics and reporting:** Listeners can be used to run analytics queries on the replicated data without putting any load on the voting members.

## Adding a Listener

You can add a listener to a Raft group by using the `setConfiguration` method in the `AdminApi`. This method takes two lists of peers: one for the regular voting members and one for the listeners.

Here is an example of how to add a listener to a Raft group:

```java
import org.apache.ratis.client.api.AdminApi;
import org.apache.ratis.protocol.RaftClientReply;
import org.apache.ratis.protocol.RaftPeer;

import java.io.IOException;
import java.util.List;

// ...

AdminApi adminApi = client.admin();

// Get the current list of voting members
List<RaftPeer> votingPeers = ...;

// Create a new peer to be the listener
RaftPeer listenerPeer = RaftPeer.newBuilder()
    .setId("listener-1")
    .setAddress("localhost:9876")
    .build();

// Create a new list of listeners
List<RaftPeer> listeners = List.of(listenerPeer);

try {
    RaftClientReply reply = adminApi.setConfiguration(votingPeers, listeners);
    if (reply.isSuccess()) {
        System.out.println("Successfully added listener to the cluster.");
    } else {
        System.err.println("Failed to add listener: " + reply.getException());
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

## Identifying Listeners

You can identify a listener by checking its `startupRole`. The `RaftPeer` class has a `getStartupRole()` method that returns a `RaftPeerRole` enum. You can use this to check if a peer is a `LISTENER`.

```java
import org.apache.ratis.protocol.RaftPeer;
import org.apache.ratis.protocol.RaftPeerRole;

// ...

if (peer.getStartupRole() == RaftPeerRole.LISTENER) {
    System.out.println(peer.getId() + " is a listener.");
}
```

## Behavior of Listeners

*   **No Voting Power:** Listeners do not participate in leader elections and do not have a vote.
*   **Log Replication:** They receive all committed log entries from the leader, just like followers.
*   **No Commitment:** They do not contribute to the commitment of log entries. The leader only needs a majority of voting members to commit an entry.
*   **Dynamic Configuration:** Listeners can be promoted to followers (and vice-versa) by using the `setConfiguration` API to move them between the `serversInNewConf` and `listenersInNewConf` lists.
