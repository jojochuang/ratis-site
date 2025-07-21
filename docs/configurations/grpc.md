---
title: gRPC Configurations
---

# Ratis gRPC Configurations

## Admin

| **Property** | `raft.grpc.admin.host` |
|:--- |:--- |
| **Description** | The host name of the admin server. |
| **Type** | String |
| **Default** | `null` |

| **Property** | `raft.grpc.admin.port` |
|:--- |:--- |
| **Description** | The port number of the admin server. |
| **Type** | int |
| **Default** | `-1` |

| **Property** | `raft.grpc.admin.tls.conf` |
|:--- |:--- |
| **Description** | The TLS configuration for the admin server. |
| **Type** | GrpcTlsConfig |
| **Default** | `null` |

## Client

| **Property** | `raft.grpc.client.host` |
|:--- |:--- |
| **Description** | The host name of the client. |
| **Type** | String |
| **Default** | `null` |

| **Property** | `raft.grpc.client.port` |
|:--- |:--- |
| **Description** | The port number of the client. |
| **Type** | int |
| **Default** | `-1` |

| **Property** | `raft.grpc.client.tls.conf` |
|:--- |:--- |
| **Description** | The TLS configuration for the client. |
| **Type** | GrpcTlsConfig |
| **Default** | `null` |

## Server

| **Property** | `raft.grpc.server.host` |
|:--- |:--- |
| **Description** | The host name of the server. |
| **Type** | String |
| **Default** | `null` |

| **Property** | `raft.grpc.server.port` |
|:--- |:--- |
| **Description** | The port number of the server. |
| **Type** | int |
| **Default** | `0` |

| **Property** | `raft.grpc.server.async.request.thread.pool.cached` |
|:--- |:--- |
| **Description** | Whether to use a cached thread pool for async requests. |
| **Type** | boolean |
| **Default** | `true` |

| **Property** | `raft.grpc.server.async.request.thread.pool.size` |
|:--- |:--- |
| **Description** | The size of the thread pool for async requests. |
| **Type** | int |
| **Default** | `32` |

| **Property** | `raft.grpc.server.leader.outstanding.appends.max` |
|:--- |:--- |
| **Description** | The maximum number of outstanding appends for the leader. |
| **Type** | int |
| **Default** | `8` |

| **Property** | `raft.grpc.server.install_snapshot.request.element-limit` |
|:--- |:--- |
| **Description** | The element limit for install snapshot requests. |
| **Type** | int |
| **Default** | `8` |

| **Property** | `raft.grpc.server.install_snapshot.request.timeout` |
|:--- |:--- |
| **Description** | The timeout for install snapshot requests. |
| **Type** | TimeDuration |
| **Default** | `3s` |

| **Property** | `raft.grpc.server.heartbeat.channel` |
|:--- |:--- |
| **Description** | Whether to use a separate channel for heartbeats. |
| **Type** | boolean |
| **Default** | `true` |

| **Property** | `raft.grpc.server.log-message.batch.duration` |
|:--- |:--- |
| **Description** | The duration for batching log messages. |
| **Type** | TimeDuration |
| **Default** | `5s` |

| **Property** | `raft.grpc.server.services.customizer` |
|:--- |:--- |
| **Description** | The customizer for gRPC services. |
| **Type** | GrpcServices.Customizer |
| **Default** | `null` |

| **Property** | `raft.grpc.server.tls.conf` |
|:--- |:--- |
| **Description** | The TLS configuration for the server. |
| **Type** | GrpcTlsConfig |
| **Default** | `null` |

## General

| **Property** | `raft.grpc.message.size.max` |
|:--- |:--- |
| **Description** | The maximum message size. |
| **Type** | SizeInBytes |
| **Default** | `64MB` |

| **Property** | `raft.grpc.flow.control.window` |
|:--- |:--- |
| **Description** | The flow control window size. |
| **Type** | SizeInBytes |
| **Default** | `1MB` |
