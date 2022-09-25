import React, { FC } from 'react';
import styles from './index.module.scss';

export const ScrollContent: FC = () => {
	const values = Array(32)
		.fill(0)
		.map((_, index) => index);
	return (
		<div className={styles.root}>
			{values.map((value) => (
				<div key={value} className={styles.element}>
					{value + 1}
				</div>
			))}
		</div>
	);
};
