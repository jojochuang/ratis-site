---
title: Unordered Async Read Support
---

# Unordered Async Read Support

This feature addresses the limitation in Ratis where asynchronous read calls were strictly ordered. Previously, if a long-running asynchronous read (like a "watch a key" request) was initiated, subsequent asynchronous calls from the same client would be blocked until the watch request completed. This new feature introduces support for unordered asynchronous reads, allowing other asynchronous operations to proceed without waiting for a pending read.

## Motivation

In an asynchronous, event-driven server like Ratis, a "watch a key" mechanism can be implemented where the `StateMachine` does not complete a read future until a specific condition is met. However, if all asynchronous reads are ordered, such a watch request would block all subsequent asynchronous calls from the same client. While a workaround involves creating a new client for each such request, supporting unordered asynchronous reads directly provides a more elegant and efficient solution.

## API Methods

To utilize unordered asynchronous reads, the following method is available in the client APIs:

### Asynchronous API (`org.apache.ratis.client.api.AsyncApi`)

```java
CompletableFuture sendReadOnlyUnordered(Message message);
```

Sends the given readonly message asynchronously to the Raft service without enforcing order with other asynchronous calls from the same client. This is particularly useful for long-running read operations like watch requests.

## Configuration

There are no specific new configurations introduced solely for enabling unordered asynchronous reads. The feature leverages existing asynchronous mechanisms within Ratis. The primary change is the introduction of the `sendReadOnlyUnordered` method in the `AsyncApi`.

## References

*   [RATIS-1714](https://issues.apache.org/jira/browse/RATIS-1714)
*   Pull Request: [https://github.com/apache/ratis/pull/755](https://github.com/apache/ratis/pull/755)