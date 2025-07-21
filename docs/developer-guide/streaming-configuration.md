---
title: Streaming Configuration
---

# Ratis Streaming Configuration

This tutorial explains how to configure the Ratis streaming feature.

## Enabling DataStream

The first step is to enable the DataStream feature by setting the `raft.datastream.type` property. The supported values are `NETTY` and `DISABLED`.

```java
import org.apache.ratis.RaftConfigKeys;
import org.apache.ratis.datastream.SupportedDataStreamType;
import org.apache.ratis.conf.RaftProperties;

RaftProperties properties = new RaftProperties();
RaftConfigKeys.DataStream.setType(properties, SupportedDataStreamType.NETTY);
```

## Server-Side Configuration

On the server side, you need to configure the DataStream port and thread pool sizes.

### Port

The `raft.netty.dataStream.port` property specifies the port that the DataStream server will listen on.

```java
import org.apache.ratis.netty.NettyConfigKeys;

NettyConfigKeys.DataStream.setPort(properties, 5000); // Set your desired port
```

### Thread Pool

The `raft.server.data-stream.async.request.thread.pool.size` and `raft.server.data-stream.async.write.thread.pool.size` properties control the size of the thread pools used for handling async requests and writes.

```java
import org.apache.ratis.server.RaftServerConfigKeys;

RaftServerConfigKeys.DataStream.setAsyncRequestThreadPoolSize(properties, 32);
RaftServerConfigKeys.DataStream.setAsyncWriteThreadPoolSize(properties, 16);
```

## Client-Side Configuration

On the client side, you need to configure the DataStream server address and other parameters.

### Primary DataStream Server

You need to specify the primary DataStream server when building the `RaftClient`.

```java
import org.apache.ratis.client.RaftClient;
import org.apache.ratis.protocol.RaftPeer;

RaftClient client = RaftClient.newBuilder()
    .setPrimaryDataStreamServer(primaryDataStreamServer)
    // ... other builder methods
    .build();
```

### Request Timeout

The `raft.client.data-stream.request.timeout` property sets the timeout for DataStream requests.

```java
import org.apache.ratis.client.RaftClientConfigKeys;
import org.apache.ratis.util.TimeDuration;

RaftClientConfigKeys.DataStream.setRequestTimeout(properties, TimeDuration.valueOf(10, "s"));
```

### Flush and Outstanding Requests

The `raft.client.data-stream.flush.request.count.min`, `raft.client.data-stream.flush.request.bytes.min`, and `raft.client.data-stream.outstanding-requests.max` properties control the flushing behavior and the maximum number of outstanding requests.

```java
import org.apache.ratis.client.RaftClientConfigKeys;
import org.apache.ratis.util.SizeInBytes;

RaftClientConfigKeys.DataStream.setFlushRequestCountMin(properties, 10);
RaftClientConfigKeys.DataStream.setFlushRequestBytesMin(properties, SizeInBytes.valueOf("1MB"));
RaftClientConfigKeys.DataStream.setOutstandingRequestsMax(properties, 100);
```

## TLS/SSL

For secure communication, you can configure TLS for the DataStream server and client using the `raft.netty.dataStream.server.tls.conf` and `raft.netty.dataStream.client.tls.conf` properties.
