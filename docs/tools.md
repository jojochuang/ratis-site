---
title: Ratis Tools
---

# Ratis Tools

The `ratis-tools` module contains a collection of command-line tools for working with Ratis.

## Log Dump Tool

The `DefaultLogDump` tool provides a simple way to dump the contents of a Ratis log segment file. This can be useful for debugging and understanding the sequence of operations in your Ratis cluster.

### Usage

To use the log dump tool, you need to provide the path to the log segment file as a command-line argument:

```bash
java -cp <classpath> org.apache.ratis.tools.DefaultLogDump <path-to-log-segment-file>
```

The tool will then print the contents of the log segment file to the console, including the log entry index, term, and the state machine log entry.

## Log Parsing Tool

The `ParseRatisLog` tool provides a more advanced way to parse and analyze Ratis log segment files. It allows you to customize the output format and filter the log entries based on your needs.

### Usage

The `ParseRatisLog` tool can be used programmatically by creating an instance of the `ParseRatisLog.Builder` class. The builder allows you to specify the log segment file, the maximum operation size, and a custom function for converting state machine log entries to strings.

Here is an example of how to use the `ParseRatisLog` tool:

```java
import org.apache.ratis.tools.ParseRatisLog;
import java.io.File;

// ...

File logFile = new File("/path/to/your/log/segment/file");
ParseRatisLog.Builder builder = new ParseRatisLog.Builder();
ParseRatisLog parser = builder.setSegmentFile(logFile).build();
parser.dumpSegmentFile();
```

This will dump the contents of the specified log segment file to the console, providing a detailed breakdown of the log entries.
