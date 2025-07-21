---
title: No-Leader Mode
---

# No-Leader Mode Developer Guide

Ratis supports a "no-leader mode" (also known as "safe mode") where the cluster can operate temporarily without a leader. In this mode, all servers remain in the follower state. This is useful for planned maintenance, as it allows you to perform rolling restarts or other administrative tasks without triggering leader elections and potentially causing downtime.

## Entering No-Leader Mode

To enter no-leader mode, you must pause leader elections on all servers in the cluster. This can be done using the `ratis-cli`.

### 1. Gracefully Step Down the Leader (Optional)

Before pausing elections, it is recommended to gracefully step down the current leader. This will ensure a smooth transition and prevent any in-flight requests from being lost.

```bash
$ ratis-cli election stepDown -peers <PEER0_HOST:PEER0_PORT,PEER1_HOST:PEER1_PORT,...>
```

### 2. Pause Leader Elections

Once the leader has stepped down, you can pause leader elections on each server in the cluster.

```bash
$ ratis-cli election pause -peers <PEER0_HOST:PEER0_PORT,...> -address <PEER_HOST:PEER_PORT>
```

You must run this command for each server in the cluster, specifying the address of the server to pause.

## Exiting No-Leader Mode

To exit no-leader mode, you must resume leader elections on all servers in the cluster.

```bash
$ ratis-cli election resume -peers <PEER0_HOST:PEER0_PORT,...> -address <PEER_HOST:PEER_PORT>
```

As with pausing, you must run this command for each server in the cluster. Once elections are resumed, the servers will elect a new leader and the cluster will resume normal operation.

## Programmatic API

In addition to the `ratis-cli`, you can also use the `LeaderElectionManagementApi` to programmatically pause and resume leader elections.

```java
import org.apache.ratis.client.RaftClient;
import org.apache.ratis.client.api.LeaderElectionManagementApi;
import org.apache.ratis.protocol.RaftPeerId;

// ...

RaftClient client = ...; // Your RaftClient instance
RaftPeerId serverId = ...; // The ID of the server to manage

LeaderElectionManagementApi electionManager = client.getLeaderElectionManagementApi(serverId);

// Pause leader elections
electionManager.pause();

// Resume leader elections
electionManager.resume();
```
