---
title: Client Configurations
---

# Ratis Client Configurations

Client configurations are located at `RaftClientConfigKeys`.

### RPC

- Configurations related to Client RPC timeout.

| **Property** | `raft.client.rpc.request.timeout` |
|:----------------|:------------------------------------------|
| **Description** | client side timeout for sending a request |
| **Type** | TimeDuration |
| **Default** | 3s |

| **Property** | `raft.client.rpc.watch.request.timeout` |
|:----------------|:------------------------------------------------|
| **Description** | client side timeout for sending a watch request |
| **Type** | TimeDuration |
| **Default** | 10s |

### Async

- Configurations related to async requests.

| **Property** | `raft.client.async.outstanding-requests.max` |
|:----------------|:---------------------------------------------|
| **Description** | maximum number of outstanding async requests |
| **Type** | int |
| **Default** | 100 |

### DataStream

- Configurations related to DataStream Api.

| **Property** | `raft.client.data-stream.outstanding-requests.max` |
|:----------------|:---------------------------------------------------|
| **Description** | maximum number of outstanding data stream requests |
| **Type** | int |
| **Default** | 100 |

| **Property** | `raft.client.data-stream.flush.request.count.min` |
|:----------------|:-----------------------------------------------------------------|
| **Description** | minimum number of requests before data stream flush would happen |
| **Type** | int |
| **Default** | 0 |

| **Property** | `raft.client.data-stream.flush.request.bytes.min` |
|:----------------|:--------------------------------------------------------------|
| **Description** | minimum number of bytes before data stream flush would happen |
| **Type** | SizeInBytes |
| **Default** | 1MB |

| **Property** | `raft.client.data-stream.request.timeout` |
|:----------------|:------------------------------------------|
| **Description** | timeout for data stream request |
| **Type** | TimeDuration |
| **Default** | 10s |

### MessageStream

- Configurations related to MessageStream Api.

| **Property** | `raft.client.message-stream.submessage-size` |
|:----------------|:---------------------------------------------|
| **Description** | maximum size of a sub message |
| **Type** | SizeInBytes |
| **Default** | 1MB |
