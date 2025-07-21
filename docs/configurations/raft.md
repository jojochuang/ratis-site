---
title: Raft Configurations
---

# Ratis Raft Configurations

## RPC

| **Property** | `raft.rpc.type` |
|:--- |:--- |
| **Description** | The RPC type to use. |
| **Type** | RpcType |
| **Default** | `GRPC` |

## DataStream

| **Property** | `raft.datastream.type` |
|:--- |:--- |
| **Description** | The data stream type to use. |
| **Type** | SupportedDataStreamType |
| **Default** | `DISABLED` |

| **Property** | `raft.datastream.skip.send-forward` |
|:--- |:--- |
| **Description** | Whether to skip sending forward data stream requests. |
| **Type** | boolean |
| **Default** | `false` |
