import React, { FC } from 'react';
import { useScrollContainer } from 'react-indiana-drag-scroll';
import SimpleBar from 'simplebar-react';
import { ScrollContent } from '../ScrollContent';
import { ExampleWrapper } from '../ExampleWrapper';
import styles from './index.module.scss';

export const DeepRefExample: FC = () => {
	const { ref } = useScrollContainer();

	return (
		<ExampleWrapper>
			<SimpleBar
				className={styles.container}
				scrollableNodeProps={{
					ref,
				}}
			>
				<ScrollContent />
			</SimpleBar>
		</ExampleWrapper>
	);
};
