import React, { FC, useState } from 'react';
import styles from './index.module.scss';

export const InstallationBlock: FC = () => {
	const [manager, setManager] = useState('yarn');

	return (
		<div className={styles.root}>
			<div className={styles.buttons}>
				<button className={styles.button} onClick={() => setManager('yarn')}>
					yarn
				</button>
				/
				<button className={styles.button} onClick={() => setManager('npm')}>
					npm
				</button>
			</div>
			<div className={styles.text}>
				<span className={styles.prefix}>$</span>
				{manager === 'yarn' ? 'yarn add react-indiana-drag-scroll@next' : 'npm install -S react-indiana-drag-scroll@next'}
			</div>
		</div>
	);
};
