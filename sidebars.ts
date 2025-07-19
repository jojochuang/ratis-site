import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'overview',
    'about',
    'getting-started-detailed',
    {
      type: 'category',
      label: 'Concepts',
      items: ['concepts', 'snapshot', 'membership-change'],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'cli',
        'features/read-after-write',
        'features/leader-lease',
        'features/listeners',
        'features/unordered-async-read',
        'features/linearizable-read',
        'features/rolling-upgrade-rollback',
        'features/ratis-streaming',
        'features/leader-election-priority',
        'features/pre-vote',
      ],
    },
    'security',
    {
      type: 'category',
      label: 'References',
      items: ['configurations', 'metrics'],
    },
    {
      type: 'category',
      label: 'Contributors',
      items: ['contributors/building', 'contributors/deploying'],
    },
  ],
};

export default sidebars;