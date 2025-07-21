---
title: Security Developer Guide
---

# Ratis Security Developer Guide

This guide provides a comprehensive overview of the security features in Ratis and how to configure them. By default, Ratis does not provide a secure environment. It is up to the application to either run Ratis in a trusted, private network or to enable the security features described below.

## TLS/SSL Encryption

Ratis uses TLS/SSL to secure communication between servers and between clients and servers. You can configure TLS for both the gRPC and Netty data stream transports.

### Core Concepts

*   **`TlsConf`**: The base class for all TLS configuration in Ratis. It can be configured with `KeyManager` and `TrustManager` objects, or with file-based certificates and private keys.
*   **`GrpcTlsConfig`**: A subclass of `TlsConf` that provides a more convenient way to configure TLS for the gRPC transport.

### Configuring TLS for gRPC

To enable TLS for the gRPC transport, you need to create a `GrpcTlsConfig` object and set it on a `Parameters` object. This `Parameters` object is then used to build your `RaftServer` and `RaftClient`.

#### 1. Creating a `GrpcTlsConfig`

You can create a `GrpcTlsConfig` in two ways:

**a) From File Paths:**

This is the recommended approach for production environments.

```java
import org.apache.ratis.grpc.GrpcTlsConfig;
import java.io.File;

// ...

File privateKeyFile = new File("/path/to/your/private.key");
File certChainFile = new File("/path/to/your/certificate.crt");
File trustStoreFile = new File("/path/to/your/truststore.crt");
boolean mutualTlsEnabled = true;

GrpcTlsConfig tlsConfig = new GrpcTlsConfig(
    privateKeyFile, certChainFile, trustStoreFile, mutualTlsEnabled);
```

**b) From In-Memory Objects:**

This approach is useful for testing or when you have the certificates and keys available in memory.

```java
import org.apache.ratis.grpc.GrpcTlsConfig;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;
import java.util.List;

// ...

PrivateKey privateKey = ...; // Your private key
X509Certificate certChain = ...; // Your certificate chain
List<X509Certificate> trustStore = ...; // Your trust store
boolean mutualTlsEnabled = true;

GrpcTlsConfig tlsConfig = new GrpcTlsConfig(
    privateKey, certChain, trustStore, mutualTlsEnabled);
```

#### 2. Setting the `GrpcTlsConfig`

Once you have a `GrpcTlsConfig` object, you need to set it on a `Parameters` object. You can then use this `Parameters` object to build your `RaftServer` and `RaftClient`.

```java
import org.apache.ratis.conf.Parameters;
import org.apache.ratis.grpc.GrpcConfigKeys;
import org.apache.ratis.server.RaftServer;

// ...

Parameters parameters = new Parameters();
GrpcConfigKeys.Server.setTlsConf(parameters, tlsConfig);

RaftServer server = RaftServer.newBuilder()
    // ... other builder configurations
    .setParameters(parameters)
    .build();
```

### Configuring TLS for the Netty DataStream

Configuring TLS for the Netty data stream is very similar to configuring it for gRPC. You create a `TlsConf` object and set it on the `Parameters` object.

```java
import org.apache.ratis.conf.Parameters;
import org.apache.ratis.netty.NettyConfigKeys;
import org.apache.ratis.security.TlsConf;

// ...

Parameters parameters = new Parameters();
TlsConf tlsConfig = ...; // Create your TlsConf object

NettyConfigKeys.DataStream.Server.setTlsConf(parameters, tlsConfig);
```

### Mutual TLS (mTLS)

Mutual TLS (mTLS) provides two-way authentication, ensuring that both the client and server are who they say they are. To enable mTLS in Ratis, you must provide a trust store that contains the certificates of the trusted clients and servers.

When creating your `GrpcTlsConfig` or `TlsConf`, you can enable mTLS by setting the `mutualTls` parameter to `true` in the constructor. When mTLS is enabled, the server will authenticate the client, and the client will authenticate the server.

Here is an example of how to enable mTLS:

```java
// When creating a GrpcTlsConfig from file paths
GrpcTlsConfig tlsConfig = new GrpcTlsConfig(
    privateKeyFile, certChainFile, trustStoreFile, true); // mTLS enabled

// When creating a GrpcTlsConfig from in-memory objects
GrpcTlsConfig tlsConfig = new GrpcTlsConfig(
    privateKey, certChain, trustStore, true); // mTLS enabled
```

## Configuration Properties

Here is a comprehensive list of all security-related configuration properties in Ratis:

| **Property** | **Description** |
|:----------------------------------------|:----------------------------------|
| `raft.grpc.tls.conf` | The default TLS configuration for the gRPC transport. This can be overridden by the more specific properties below. |
| `raft.grpc.server.tls.conf` | The TLS configuration for the gRPC server. |
| `raft.grpc.client.tls.conf` | The TLS configuration for the gRPC client. |
| `raft.grpc.admin.tls.conf` | The TLS configuration for the gRPC admin API. |
| `raft.netty.dataStream.server.tls.conf` | The TLS configuration for the Netty data stream server. |
| `raft.netty.dataStream.client.tls.conf` | The TLS configuration for the Netty data stream client. |

These properties all accept a `TlsConf` or `GrpcTlsConfig` object. You can set them on a `Parameters` object, which is then used to build your `RaftServer` or `RaftClient`.

## Pluggable Security Architecture

Ratis has a pluggable architecture for security, which allows you to integrate with different security systems. The `Security` class is the main entry point for this. You can provide your own implementation of the `Security` class to customize the security of your Ratis cluster.