import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src="img/logo.svg" alt="Apache Ratis Logo" />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Getting started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <div className="container margin-bottom--xl">
          <Heading as="h2" className="text--center">What is Apache Ratis™?</Heading>
          <p className="text--center">
            Apache Ratis is a highly customizable Java implementation of the Raft consensus protocol.
          </p>
          <p className="text--center">
            Raft is an easily understandable consensus algorithm designed to manage replicated state across a distributed system.
          </p>
          <p className="text--center">
            Apache Ratis can be seamlessly integrated into any Java application requiring state replication across multiple instances.
          </p>
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
