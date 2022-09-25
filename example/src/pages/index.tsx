import React from 'react';
import Layout from '@theme/Layout';
import { Examples } from '@site/src/components/Examples';
import { Description } from '@site/src/components/Description';

export default function Home(): JSX.Element {
	return (
		<Layout
			title={`Main Page | React Indiana Drag Scroller`}
			description="Description will go into a meta tag in <head />"
		>
			<main>
				<Examples />
				<Description />
			</main>
		</Layout>
	);
}
