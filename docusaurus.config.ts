import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Apache Ratis',
  tagline: 'Open source Java implementation for Raft consensus protocol',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ratis.apache.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ratis-site/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'apache', // Usually your GitHub org/user name.
  projectName: 'ratis', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/apache/ratis-site/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/apache/ratis-site/edit/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Apache Ratis',
      logo: {
        alt: 'Apache Ratis Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/downloads', label: 'Downloads', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/community', label: 'Community', position: 'left'},
        {to: '/resources', label: 'Resources', position: 'left'},
        {
          href: 'https://www.apache.org/',
          label: 'Apache Software Foundation',
          position: 'right',
        },
        {
          href: 'https://github.com/apache/ratis',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/apache-ratis',
            },
            {
              label: 'Mailing Lists',
              href: 'https://ratis.apache.org/mailing-lists.html',
            },
            {
              label: 'Slack',
              href: 'https://the-asf.slack.com/archives/C01U6RE02R2',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/apache/ratis',
            },
          ],
        },
        {
          title: 'ASF',
          items: [
            {
              label: 'License',
              href: 'https://www.apache.org/licenses/',
            },
            {
              label: 'Sponsorship',
              href: 'https://www.apache.org/foundation/sponsorship.html',
            },
            {
              label: 'Thanks',
              href: 'https://www.apache.org/foundation/thanks.html',
            },
            {
              label: 'Security',
              href: 'https://www.apache.org/security/',
            },
            {
              label: 'Privacy',
              href: 'https://privacy.apache.org/policies/privacy-policy-public.html',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Apache Software Foundation. Licensed under the Apache License, Version 2.0.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
