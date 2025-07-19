---
title: Ratis-shell CLI
---

# Ratis-shell

Ratis-shell is the command line interface of Ratis.

> **Note**:
> Ratis-shell is currently only **experimental**.
> The compatibility story is not considered for the time being.

## Availability

| Version | Available in src tarball? | Available in bin tarball? |
| :------: | :-----------------------: | :-----------------------: |
| < 2.3.0 | No | No |
| 2.3.0 | Yes | No |
| > 2.3.0 | Yes | Yes |

## Setting up the ratis-shell

### Setting up from a source tarball

Download the Ratis source tarball from [https://ratis.apache.org/downloads.html](https://ratis.apache.org/downloads.html) . Note that ratis-shell is available starting from version 2.3.0. Extract the source tarball to a destination directory `` and then build the ratis-shell tarball.

```bash
$ tar -C <dest-dir> -zxvf apache-ratis-<version>-src.tar.gz
$ cd <dest-dir>/apache-ratis-<version>-src
$ mvn -DskipTests -Prelease -Papache-release clean package assembly:single
```

Extract the ratis-shell tarball.

```bash
$ mkdir <dest-dir>/ratis-shell
$ tar -C <dest-dir>/ratis-shell -xzf ratis-assembly/target/apache-ratis-<version>-shell.tar.gz --strip-component 1
```

### Setting up from a binary tarball

Download the Ratis bin tarball from [https://ratis.apache.org/downloads.html](https://ratis.apache.org/downloads.html) . Note that the bin tarball of Ratis version 2.3.0 or earlier does not contain ratis-shell. The bin tarball of later versions will contain ratis-shell. Extract the bin tarball to a destination directory ``

```bash
$ tar -C <dest-dir> -zxvf apache-ratis-<version>-bin.tar.gz apache-ratis-<version>/ratis-shell
$ cd <dest-dir>
$ mv apache-ratis-<version>/ratis-shell .
$ rmdir apache-ratis-<version>/
```

Export the `RATIS_SHELL_HOME` environment variable and add the bin directory to the `$PATH`.

```bash
$ export RATIS_SHELL_HOME=<dest-dir>/ratis-shell
$ export PATH=${RATIS_SHELL_HOME}/bin:$PATH
```

The following command can be invoked in order to get the basic usage:

```shell
$ ratis sh
Usage: ratis sh [generic options] [election [transfer] [stepDown] [pause] [resume]] [group [info] [list]] [peer [add] [remove] [setPriority]] [snapshot [create]] [local [raftMetaConf]]
```

## generic options

The `generic options` supports the following content: `-D*`, `-X*`, `-agentlib*`, `-javaagent*` The `-D*` can pass values for a given ratis property to ratis-shell client RaftProperties.

```shell
$ ratis sh -D ...
```

## election

The `election` command manages leader election. It has the following subcommands: `transfer`, `stepDown`, `pause`, `resume`

### election transfer

Transfer a group leader to the specified server.

```shell
$ ratis sh election transfer -peers <PEER_ID:PEER_ADDRESS,...> -address <PEER_ADDRESS> [-groupid <GROUP_ID>]
```

### election stepDown

Make a group leader of the given group step down its leadership.

```shell
$ ratis sh election stepDown -peers <PEER_ID:PEER_ADDRESS,...> [-groupid <GROUP_ID>]
```

### election pause

Pause leader election at the specified server. Then, the specified server would not start a leader election.

```shell
$ ratis sh election pause -peers <PEER_ID:PEER_ADDRESS,...> -address <PEER_ADDRESS> [-groupid <GROUP_ID>]
```

### election resume

Resume leader election at the specified server.

```shell
$ ratis sh election resume -peers <PEER_ID:PEER_ADDRESS,...> -address <PEER_ADDRESS> [-groupid <GROUP_ID>]
```

## group

The `group` command manages ratis groups. It has the following subcommands: `info`, `list`

### group info

Display the information of a specific raft group.

```shell
$ ratis sh group info -peers <PEER_ID:PEER_ADDRESS,...> [-groupid <GROUP_ID>]
```

### group list

Display the group information of a specific raft server

```shell
$ ratis sh group list -peers <PEER_ID:PEER_ADDRESS,...> [-groupid <GROUP_ID>] <[-serverAddress <SERVER_ADDRESS>]|[-peerId <PEER_ID>]>
```

## peer

The `peer` command manages ratis cluster peers. It has the following subcommands: `add`, `remove`, `setPriority`

### peer add

Add peers to a ratis group.

```shell
$ ratis sh peer add -peers <PEER_ID:PEER_ADDRESS,...> [-groupid <GROUP_ID>] -address <PEER_ADDRESS>
```

### peer remove

Remove peers to from a ratis group.

```shell
$ ratis sh peer remove -peers <PEER_ID:PEER_ADDRESS,...> [-groupid <GROUP_ID>] -address <PEER_ADDRESS>
```

### peer setPriority

Set priority to ratis peers. The priority of ratis peer can affect the leader election, the server with the highest priority will eventually become the leader of the cluster.

```shell
$ ratis sh peer setPriority -peers <PEER_ID:PEER_ADDRESS,...> [-groupid <GROUP_ID>] -addressPriority <PEER_ID:PRIORITY,...>
```

## snapshot

The `snapshot` command manages ratis snapshot. It has the following subcommands: `create`

### snapshot create

Trigger the specified server take snapshot.

```shell
$ ratis sh snapshot create -peers <PEER_ID:PEER_ADDRESS,...> -peerId <PEER_ID> [-groupid <GROUP_ID>]
```

## local

The `local` command is used to process local operation, which no need to connect to ratis server. It has the following subcommands: `raftMetaConf`

### local raftMetaConf

Generate a new raft-meta.conf file based on original raft-meta.conf and new peers, which is used to move a raft node to a new node.

```shell
$ ratis sh local raftMetaConf -peers <[P0_ID|]P0_HOST:P0_PORT,[P1_ID|]P1_HOST:P1_PORT,[P2_ID|]P2_HOST:P2_PORT> -path <PATH>
```
