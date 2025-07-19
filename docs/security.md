---
title: Security
---

# Security

Raft is a consensus algorithm designed for fault tolerance. A basic assumption of Raft is that - the servers can trust each other. In contrast, Raft is not designed to solve the Byzantine Generals Problem, which assumes that some of the servers may be malicious. Apache Ratis is a Raft library which supports a pluggable transport. Applications using Ratis usually run a transport over a network. In such case, the applications must either provide secure communications between the servers or provide a safe network environment such as running the servers in a private network. Applications must not accept requests from any untrusted servers. Below are the TLS Configuration Parameters. Applications may use them to build `RaftServer`/`RaftClient` objects for establishing secure connections.

| **Property** | **Description** |
|:----------------------------------------|:----------------------------------|
| `raft.grpc.tls.conf` | gRPC default TLS conf |
| `raft.grpc.server.tls.conf` | gRPC server TLS conf |
| `raft.grpc.client.tls.conf` | gRPC client TLS conf |
| `raft.grpc.admin.tls.conf` | gRPC admin TLS conf |
| `raft.netty.dataStream.server.tls.conf` | Netty data stream server TLS conf |
| `raft.netty.dataStream.client.tls.conf` | Netty data stream client TLS conf |
