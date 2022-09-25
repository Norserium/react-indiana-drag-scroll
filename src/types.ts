import { RefObject } from 'react';
import { AbstractArtificialScroll } from './core/AbstractArtificialScroll';

export enum MouseButton {
	Left = 1,
	Middle = 4,
	Right = 2,
}

export interface BasicScrollOptions {
	buttons?: (number | MouseButton)[];
	activationDistance?: number;
	ignoreElements?: string;
}

export interface DefaultScrollOptions {
	inertia?: boolean;
	rubberBand?: boolean;
	overscroll?: boolean;
}

export interface Scroll {
	left: number;
	top: number;
}

export interface LoopedFunction {
	run(callback?: () => void): void;
	cancel(): void;
}

interface BasicProps {
	onScroll?: () => void;
	onStartScroll?: () => void;
	onEndScroll?: () => void;
}

export interface ScrollContainerCustomizedProps<Options = DefaultScrollOptions> extends BasicProps {
	mouseScroll?: boolean | (Options & BasicScrollOptions);
	mouseScrollImplementation: (
		reference: RefObject<HTMLElement | null>,
		options: RefObject<Options>,
	) => AbstractArtificialScroll;
}

export interface ScrollContainerDefaultProps extends BasicProps {
	mouseScroll?: boolean | (DefaultScrollOptions & BasicScrollOptions);
}
