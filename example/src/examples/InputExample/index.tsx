import React, { FC } from 'react';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import { ExampleWrapper } from '../ExampleWrapper';
import styles from './index.module.scss';

export const InputExample: FC = () => {
	const range = Array(32).fill(0);
	return (
		<ExampleWrapper>
			<ScrollContainer
				className={styles.container}
				mouseScroll={{
					ignoreElements: 'input',
				}}
			>
				{range.map((_, index) => (
					<div key={index} className={styles.wrapper}>
						<input className={styles.input} />
					</div>
				))}
			</ScrollContainer>
		</ExampleWrapper>
	);
};
