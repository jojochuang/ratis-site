---
sidebar_position: 1
title: Overview
---

Ratis is a [Raft](https://raft.github.io/) protocol library in Java. It’s not a standalone server application like Zookeeper or Consul.

## EXAMPLES

To demonstrate how to use Ratis from the code, Please look at the following examples.

*   [**Arithmetic example**](https://github.com/apache/ratis/tree/master/ratis-examples/src/main/java/org/apache/ratis/examples/arithmetic): This is a simple distributed calculator that replicates the values defined and allows user to perform arithmetic operations on these replicated values.
*   [**FileStore example**](https://github.com/apache/ratis/tree/master/ratis-examples/src/main/java/org/apache/ratis/examples/filestore): This is an example of using Ratis for reading and writing files.

The source code of the examples could be found in the [`ratis-examples`](https://github.com/apache/ratis/tree/master/ratis-examples) sub-project.

## MAVEN USAGE

To use in our project you can access the latest binaries from [maven central](https://search.maven.org/search?q=g:org.apache.ratis):

```xml
<dependency>
   <artifactId>ratis-server</artifactId>
   <groupId>org.apache.ratis</groupId>
</dependency>
```

You also need to include one of the transports:

```xml
<dependency>
   <artifactId>ratis-grpc</artifactId>
   <groupId>org.apache.ratis</groupId>
</dependency>
```

```xml
 <dependency>
   <artifactId>ratis-netty</artifactId>
   <groupId>org.apache.ratis</groupId>
</dependency>
```

