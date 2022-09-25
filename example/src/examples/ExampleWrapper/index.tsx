import React, { FC, PropsWithChildren } from 'react';
import styles from './index.module.scss';

export const ExampleWrapper: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.root}>{children}</div>;
};
