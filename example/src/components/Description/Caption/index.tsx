import React, { FC, PropsWithChildren } from 'react';
import styles from './index.module.scss';

export const Caption: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.root}>
			<h2 className={styles.text}> {children} </h2>
		</div>
	);
};
