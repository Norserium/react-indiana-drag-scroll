import React, { FC, useState } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import { MainExample } from './Main';
import { SecondaryExample } from './Secondary';
import { Background } from './Background';

export const Examples: FC = (props) => {
	const examples = [
		{
			node: <MainExample />,
			title: 'Horizontal Scroll',
		},
		{
			node: <SecondaryExample />,
			title: 'Horizontal / Vertical Scroll',
		},
	];

	const [page, setPage] = useState(0);

	return (
		<div className={styles.root}>
			<Background className={styles.background} />
			<div className={styles.content}>
				<div className={styles.exampleWrapper}>{examples[page].node}</div>
				<div className={styles.pages}>
					{examples.map((el, index) => (
						<span
							key={index}
							title={el.title}
							className={cn(styles.page, index === page && styles.pageActive)}
							onClick={() => setPage(index)}
						>
							{index + 1}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
