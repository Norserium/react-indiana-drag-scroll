import React, { CSSProperties, ElementType, forwardRef, MutableRefObject, ReactNode, Ref } from 'react';
import { DefaultScrollOptions, ScrollContainerCustomizedProps, ScrollContainerDefaultProps } from '../types';
import { useScrollContainer } from '../hooks/useScrollContainer';
import { cn, mergeRefs } from '../utils';

interface BasicProps<Component = ElementType> {
	hideScrollbars?: boolean;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	ref?: ReactNode;
	component?: Component;
}

type CustomizedProps<Component = ElementType, Options = DefaultScrollOptions> = BasicProps<Component> &
	ScrollContainerCustomizedProps<Options>;

type DefaultProps<Component = ElementType> = BasicProps & ScrollContainerDefaultProps;

const Body = <Component extends ElementType, Options = DefaultScrollOptions>(
	props: CustomizedProps<Component, Options> | DefaultProps<Component>,
	ref: Ref<ElementType>,
) => {
	const { children, className, component, hideScrollbars = true, ...options } = props;

	const Component = (component || 'div') as ElementType;

	const scrollContainer = useScrollContainer({
		mouseScroll: true,
		...options,
	});

	return (
		<Component
			className={cn([
				className,
				'indiana-scroll-container',
				hideScrollbars && 'indiana-scroll-container--hide-scrollbars',
			])}
			ref={mergeRefs([ref, scrollContainer.ref])}
		>
			{children}
		</Component>
	);
};

export const ScrollContainer = forwardRef(Body) as <
	Options = DefaultScrollOptions,
	Component extends ElementType = 'div',
	Reference = HTMLDivElement
>(
	props: CustomizedProps<Component, Options> | (DefaultProps<Component> & { ref?: MutableRefObject<Reference> }),
) => ReturnType<typeof Body>;
