import React, { CSSProperties, ElementType, forwardRef, HTMLAttributes, MutableRefObject, ReactNode, Ref } from 'react';
import { DefaultScrollOptions, ScrollContainerCustomizedProps, ScrollContainerDefaultProps } from '../types';
import { useScrollContainer } from '../hooks/useScrollContainer';
import { cn, mergeRefs } from '../utils';

interface BasicProps {
	hideScrollbars?: boolean;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	ref?: ReactNode;
	component?: ElementType;
}

type CustomizedProps<Options = DefaultScrollOptions> = BasicProps & ScrollContainerCustomizedProps<Options>;

type DefaultProps = BasicProps & ScrollContainerDefaultProps;

const Body = <Options extends object = DefaultScrollOptions>(
	props: CustomizedProps<Options> | DefaultProps,
	ref: Ref<ElementType>,
) => {
	const {
		children,
		className,
		component,
		hideScrollbars = true,
		mouseScroll = true,
		mouseScrollImplementation,
		...additionalProps
	} = { mouseScrollImplementation: undefined, ...props };

	const Component = component || 'div';

	const scrollContainer = useScrollContainer({
		mouseScroll,
		mouseScrollImplementation,
	});

	return (
		<Component
			className={cn([
				className,
				'indiana-scroll-container',
				hideScrollbars && 'indiana-scroll-container--hide-scrollbars',
			])}
			ref={mergeRefs([ref, scrollContainer.ref])}
			{...additionalProps}
		>
			{children}
		</Component>
	);
};

export const ScrollContainer = forwardRef(Body) as <Options = DefaultScrollOptions, Element = HTMLDivElement>(
	props: (CustomizedProps<Options> | DefaultProps) & {
		ref?: MutableRefObject<Element>;
	} & HTMLAttributes<Element>,
) => ReturnType<typeof Body>;
