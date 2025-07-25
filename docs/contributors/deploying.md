---
title: Deploying Releases/Snapshots
---

This document describes how to deploy releases and snapshots specifically for Apache Ratis. For general information about Publishing Maven Artifacts at Apache, see [http://www.apache.org/dev/publishing-maven-artifacts.html](http://www.apache.org/dev/publishing-maven-artifacts.html)

## Prerequisite

It requires *committer access* in order to deploy releases and snapshots.

## Environment Setup

To publish, use the following `settings.xml` file (placed in `~/.m2/settings.xml`):

```xml
<settings>
  <servers>
    <server>
      <id>apache.releases.https</id>
      <username>your-apache-username</username>
      <password>{your-encrypted-password}</password>
    </server>
    <server>
      <id>apache.snapshots.https</id>
      <username>your-apache-username</username>
      <password>{your-encrypted-password}</password>
    </server>
  </servers>
</settings>
```

To use encrypted password, see [http://maven.apache.org/guides/mini/guide-encryption.html](http://maven.apache.org/guides/mini/guide-encryption.html)
For OpenPGP setup, see [http://www.apache.org/dev/openpgp.html](http://www.apache.org/dev/openpgp.html)

## How to Deploy

We use Apache Maven Deploy Plugin to deploy artifacts.

```bash
mvn deploy
# or
mvn -s /my/path/settings.xml deploy
```

We also use release profile for building the release.

```bash
mvn install -Prelease -Papache-release
```

### Steps for Deploying a Snapshot

1.  **Test the artifacts locally.**
    1.  Clean, shade and compile everything.
    2.  Run all tests.

2.  **Set snapshot version locally.**
    1.  Get the last commit id:
        ```bash
git log --abbrev-commit --abbrev=7 --pretty=oneline | head -1
        ```
    2.  Set the versions of local artifacts:
        ```bash
mvn versions:set -DnewVersion=--SNAPSHOT
        ```

3.  If everything works fine, run the following command to publish artifacts to Apache repository:
    ```bash
mvn deploy -DskipTests -DskipShade
    ```

4.  Verify the snapshot artifacts published in [https://repository.apache.org/content/groups/snapshots/org/apache/ratis/](https://repository.apache.org/content/groups/snapshots/org/apache/ratis/)

Finally, you may delete the `pom.xml.versionsBackup` files by:

```bash
find . -name pom.xml.versionsBackup | xargs rm
```