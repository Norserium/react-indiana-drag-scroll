import React, { FC } from 'react';
import styles from './index.module.scss';
import { InstallationBlock } from './InstallationBlock';
import CodeBlock from '@theme/CodeBlock';

const example = `
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'

export const Example = () => {
    return (
      <ScrollContainer>
        {/* scrollable content */}
      </ScrollContainer>
    )
};
`;

export const Description: FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<h1 className={styles.title}> Welcome to the journey!</h1>
				<div className={styles.caption}>
					<p>
						This library provides the component with the missing possibility to scroll it by a mouse. It's
						easy as cake.
					</p>
				</div>
				<div>
					<InstallationBlock />
				</div>
				<CodeBlock className={'language-tsx'}>{example}</CodeBlock>
				<div className={styles.caption}>
					<p>
						This library is intended to be a just the way to give the possibility to scroll a container by a
						mouse. It doesn't customize the scroll by touch, scrollbars, etc and leaves them native.
					</p>
				</div>
			</div>
		</div>
	);
};
