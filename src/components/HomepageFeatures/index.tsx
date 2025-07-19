import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Pluggable Transport',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Ratis provides a pluggable transport layer. By default gRPC, Netty+Protobuf and Apache Hadoop RPC based transports are provided.
      </>
    ),
  },
  {
    title: 'Pluggable State Machine',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Ratis supports a log and state machine. State machine typically contains the data that you want to make highly available. Ratis makes it easy to use your own state machine.
      </>
    ),
  },
  {
    title: 'Pluggable Raft Log',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        RAFT log is also pluggable, users can provide their own log implementation. The default implementation stores log in local files.
      </>
    ),
  },
  {
    title: 'Pluggable Metrics',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Ratis provides a pluggable observation layer. By default (ratis-metrics-default), it uses the shaded Dropwizard 4 provided by ratis-thirdparty. Another implementation can be found in ratis-metrics-dropwizard3. Users can provide their own metrics implementations.
      </>
    ),
  },
  {
    title: 'Log Service',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Ratis provides a log service recipe provides StateMachines to implement a distributed log service with a focused client API. For more information, please read the LogService documentation.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
