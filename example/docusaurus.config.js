// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'React Indiana Drag Scroll',
	tagline: 'Scroll by mouse',
	url: 'https://norserium.github.io/react-indiana-drag-scroll/',
	baseUrl: '/react-indiana-drag-scroll/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.png',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'Norserium', // Usually your GitHub org/user name.
	projectName: 'react-indiana-drag-scroll', // Usually your repo name.

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: 'https://github.com/Norserium/react-indiana-drag-scroll/tree/next/src/example/',
				},
				theme: {
					customCss: [
						require.resolve('./node_modules/react-indiana-drag-scroll/dist/style.css'),
						require.resolve('./node_modules/simplebar/dist/simplebar.min.css'),
						require.resolve('./src/css/custom.css'),
					],
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			announcementBar: {
				id: 'support_us',
				content:
					'This documentation describes the alpha version <b>3.x.x</b>. The stable version didn\'t have the documentation and its API is described in <a href="https://github.com/Norserium/react-indiana-drag-scroll">README.md</a>',
				backgroundColor: '#fafbfc',
				textColor: '#091E42',
				isCloseable: true,
			},
			navbar: {
				logo: {
					alt: 'Logo',
					src: 'img/logo-old.svg',
				},
				items: [
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Docs',
					},
					{
						href: 'https://github.com/Norserium/react-indiana-drag-scroll',
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
								label: 'Intro',
								to: '/docs/intro',
							},
							{
								label: 'Recipes',
								to: '/docs/recipes',
							},
							{
								label: 'API',
								to: '/docs/api/scroll-container',
							},
						],
					},
					{
						title: 'More',
						items: [
							{
								label: 'GitHub',
								href: 'https://github.com/Norserium/react-indiana-drag-scroll',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Norserium.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
			colorMode: {
				defaultMode: 'light',
				disableSwitch: true,
				respectPrefersColorScheme: false,
			},
		}),
	plugins: ['docusaurus-plugin-sass'],
};

module.exports = config;
