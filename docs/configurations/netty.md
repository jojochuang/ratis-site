---
title: Netty Configurations
---

# Ratis Netty Configurations

## Server

| **Property** | `raft.netty.server.host` |
|:--- |:--- |
| **Description** | The host name of the server. |
| **Type** | String |
| **Default** | `null` |

| **Property** | `raft.netty.server.port` |
|:--- |:--- |
| **Description** | The port number of the server. |
| **Type** | int |
| **Default** | `0` |

| **Property** | `raft.netty.server.use-epoll` |
|:--- |:--- |
| **Description** | Whether to use epoll for the server. |
| **Type** | boolean |
| **Default** | `true` |

## Client

| **Property** | `raft.netty.client.use-epoll` |
|:--- |:--- |
| **Description** | Whether to use epoll for the client. |
| **Type** | boolean |
| **Default** | `true` |

## DataStream

### Server

| **Property** | `raft.netty.dataStream.server.host` |
|:--- |:--- |
| **Description** | The host name of the data stream server. |
| **Type** | String |
| **Default** | `null` |

| **Property** | `raft.netty.dataStream.server.port` |
|:--- |:--- |
| **Description** | The port number of the data stream server. |
| **Type** | int |
| **Default** | `0` |

| **Property** | `raft.netty.dataStream.server.use-epoll` |
|:--- |:--- |
| **Description** | Whether to use epoll for the data stream server. |
| **Type** | boolean |
| **Default** | `true` |

| **Property** | `raft.netty.dataStream.server.tls.conf` |
|:--- |:--- |
| **Description** | The TLS configuration for the data stream server. |
| **Type** | TlsConf |
| **Default** | `null` |

| **Property** | `raft.netty.dataStream.server.boss-group.size` |
|:--- |:--- |
| **Description** | The size of the boss group for the data stream server. |
| **Type** | int |
| **Default** | `0` |

| **Property** | `raft.netty.dataStream.server.worker-group.size` |
|:--- |:--- |
| **Description** | The size of the worker group for the data stream server. |
| **Type** | int |
| **Default** | `0` |

| **Property** | `raft.netty.dataStream.server.channel.inactive.grace-period` |
|:--- |:--- |
| **Description** | The grace period for inactive channels on the data stream server. |
| **Type** | TimeDuration |
| **Default** | `10m` |

### Client

| **Property** | `raft.netty.dataStream.client.host` |
|:--- |:--- |
| **Description** | The host name of the data stream client. |
| **Type** | String |
| **Default** | `null` |

| **Property** | `raft.netty.dataStream.client.port` |
|:--- |:--- |
| **Description** | The port number of the data stream client. |
| **Type** | int |
| **Default** | `0` |

| **Property** | `raft.netty.dataStream.client.use-epoll` |
|:--- |:--- |
| **Description** | Whether to use epoll for the data stream client. |
| **Type** | boolean |
| **Default** | `true` |

| **Property** | `raft.netty.dataStream.client.tls.conf` |
|:--- |:--- |
| **Description** | The TLS configuration for the data stream client. |
| **Type** | TlsConf |
| **Default** | `null` |

| **Property** | `raft.netty.dataStream.client.worker-group.size` |
|:--- |:--- |
| **Description** | The size of the worker group for the data stream client. |
| **Type** | int |
| **Default** | `max(1, NettyRuntime.availableProcessors() * 2)` |

| **Property** | `raft.netty.dataStream.client.worker-group.share` |
|:--- |:--- |
| **Description** | Whether to share the worker group for the data stream client. |
| **Type** | boolean |
| **Default** | `true` |

| **Property** | `raft.netty.dataStream.client.reply.queue.grace-period` |
|:--- |:--- |
| **Description** | The grace period for the reply queue on the data stream client. |
| **Type** | TimeDuration |
| **Default** | `1s` |
