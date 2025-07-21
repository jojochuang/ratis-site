---
title: Observability
---

# Observability in Ratis

Ratis provides a comprehensive metrics system to monitor the health and performance of your cluster. This tutorial explains how to expose and consume these metrics.

## Core Concepts

Ratis uses a pluggable metrics system with the following key components:

*   **`ratis-metrics-api`**: Defines the core metrics APIs.
*   **`ratis-metrics-default`**: The default implementation, which uses the Dropwizard Metrics library.
*   **`MetricRegistries`**: The main entry point for creating and accessing metric registries.
*   **`RatisMetricRegistry`**:  Where metrics are registered and stored.

## Exposing Metrics

By default, Ratis exposes metrics via JMX (Java Management Extensions) without requiring any additional configuration. This is because the `ratis-metrics-default` module is included as a dependency in `ratis-server`, which automatically enables JMX reporting.

### 1. JMX (Java Management Extensions)

You can use any JMX client, such as JConsole or VisualVM, to connect to your Ratis server and view the available metrics. This is the recommended way to monitor a Ratis cluster in a production environment.

### 2. Console Reporting

For quick debugging and monitoring, Ratis can be configured to periodically print metrics to the console.

To enable console reporting for JVM metrics, you can add the following code to your application's startup sequence:

```java
import org.apache.ratis.metrics.impl.JvmMetrics;
import org.apache.ratis.util.TimeDuration;
import java.util.concurrent.TimeUnit;

// ...

// Initialize JVM metrics and report to the console every 10 seconds
JvmMetrics.initJvmMetrics(TimeDuration.valueOf(10, TimeUnit.SECONDS));
```

This will print a summary of JVM-related metrics to the console at the specified interval.

## Available Metrics

Ratis exposes a wide range of metrics, including:

*   **Server Metrics**:  Metrics related to the Raft server, such as the number of pending requests, commit index, and more.
*   **Client Metrics**: Metrics related to the Raft client, such as request latency and retry counts.
*   **Log Metrics**: Metrics related to the Raft log, such as the number of log entries and the size of the log.
*   **Leader Election Metrics**: Metrics related to the leader election process.
*   **gRPC and Netty Metrics**: Metrics specific to the RPC and data stream layers.

You can explore the full list of available metrics by connecting to your Ratis server with a JMX client.
