import React, { FC } from 'react';
import styles from './index.module.scss';
import { InstallationBlock } from './InstallationBlock';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import { Caption } from '@site/src/components/Description/Caption';

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

const hookExample = `
import { useScrollContainer } from 'react-indiana-drag-scroll';

export const Example = () => {
    const scrollContainer = useScrollContainer(options);
    return (
      <div ref={scrollContainer.ref}>
        {/* scrollable content */}
      </div>
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

				<Caption>Drag Scroll Hook</Caption>
				<div className={styles.caption}>
					<p>
						Also, you can use the hook{' '}
						<Link to={'/docs/api/use-scroll-container/'}>useScrollContainer</Link> to make an arbitrary
						element draggable by a mouse.
					</p>
				</div>
				<CodeBlock className={'language-tsx'}>{hookExample}</CodeBlock>

				<div className={styles.caption}>
					<p>
						But you should notice that you need to hide the scrollbars and set the overflow value by
						yourself in this case.
					</p>
				</div>

				<Caption>Philosophy</Caption>

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
