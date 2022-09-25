import { DefaultScrollOptions, BasicScrollOptions, LoopedFunction, Scroll } from '../types';
import { RefObject } from 'react';
import { AbstractArtificialScroll } from './AbstractArtificialScroll';
import {
	debounce,
	isScrollableHorizontally,
	isScrollableVertically,
	loop,
	rubberBandEffect,
	splitScroll,
} from '../utils';

interface DirectionSpeed {
	local: number;
	global: number;
	overflow: number;
}

interface PartitionedScroll {
	left: DirectionSpeed;
	top: DirectionSpeed;
}

interface OverflowState {
	left: number;
	top: number;
	prevent: boolean;
}

interface OriginalStyles {
	transform: string[];
	transition: string[];
	pointerEvents: string[];
}

interface Inertia {
	left: number;
	top: number;
}

type ScrollMode = 'local' | 'global' | null;

export class DefaultArtificialScroll implements AbstractArtificialScroll {
	reference: RefObject<HTMLElement | null>;
	options: RefObject<DefaultScrollOptions & BasicScrollOptions>;
	overflow: OverflowState;
	originalStyles: OriginalStyles;
	inertiaSpeed: Inertia;
	mode: ScrollMode;
	active: boolean;
	loopedInertia: LoopedFunction;
	debouncedClearStyles: () => void;

	constructor(
		reference: RefObject<HTMLElement | null>,
		options: RefObject<DefaultScrollOptions & BasicScrollOptions>,
	) {
		this.reference = reference;
		this.options = options;
		this.originalStyles = {
			transform: [],
			transition: [],
			pointerEvents: [],
		};
		this.overflow = {
			left: 0,
			top: 0,
			prevent: false,
		};
		this.inertiaSpeed = {
			left: 0,
			top: 0,
		};
		this.mode = null;
		this.active = false;
		this.loopedInertia = loop(this.inertia);
		this.debouncedClearStyles = debounce(this.clearStyles, 300);
	}

	public getOptions() {
		return {
			inertia: true,
			rubberBand: true,
			...this.options.current,
		};
	}

	public start(scroll: Scroll) {
		if (this.active) {
			this.cancel();
		}

		this.mode = this.getScrollMode(scroll);

		if (this.reference.current) {
			(this.reference.current.childNodes as NodeListOf<HTMLElement>).forEach((child) => {
				child.addEventListener('click', this.preventEvent);

				// Remember original styles
				const { transform, transition, pointerEvents } = window.getComputedStyle(child);
				this.originalStyles.transition.push(transition);
				this.originalStyles.transform.push(transform);
				this.originalStyles.pointerEvents.push(pointerEvents);

				// Clear pointer events
				child.style.pointerEvents = 'none';
			});
		}

		this.active = true;
	}
	public scroll(scroll: Scroll) {
		this.applyScroll(this.calculateScroll(scroll));
	}

	public end(scroll?: Scroll, callback?: () => void) {
		const { inertia } = this.getOptions();

		const finish = () => {
			this.cancel();
			callback?.();
		};
		this.inertiaSpeed.left = scroll ? scroll.left : 0;
		this.inertiaSpeed.top = scroll ? scroll.top : 0;
		if (inertia) {
			this.loopedInertia.run(finish);
		} else {
			finish();
		}
	}

	public cancel() {
		this.reference.current?.childNodes.forEach((child) => {
			child.removeEventListener('click', this.preventEvent);
		});
		this.resetOverflow();
		this.loopedInertia.cancel();
		this.mode = null;
		this.active = false;
	}

	protected getScrollMode = (scroll?: Scroll) => {
		const { overscroll } = this.getOptions();

		if (overscroll && this.reference.current && scroll) {
			const {
				scrollLeft,
				scrollTop,
				clientHeight,
				clientWidth,
				scrollHeight,
				scrollWidth,
			} = this.reference.current;

			if (
				(scroll.left < 0 && scrollLeft > 0) ||
				(scroll.left > 0 && scrollLeft < scrollWidth - clientWidth) ||
				(scroll.top < 0 && scrollTop > 0) ||
				(scroll.top > 0 && scrollTop < scrollHeight - clientHeight)
			) {
				return 'local';
			} else {
				return 'global';
			}
		} else {
			return 'local';
		}
	};

	protected resetOverflow() {
		const transitions = this.overflow.left || this.overflow.top;

		if (transitions) {
			this.overflow.prevent = true;
			(this.reference.current?.childNodes as NodeListOf<HTMLElement>).forEach((node) => {
				node.style.transform = `translate3d(0px, 0px, 0px)`;
				node.style.transition = `300ms`;
			});
		}

		if (transitions) {
			this.debouncedClearStyles();
		} else {
			this.clearStyles();
		}
	}

	protected preventEvent(e: Event) {
		e.preventDefault();
		e.stopImmediatePropagation();
	}

	protected applyScroll({ left, top }: PartitionedScroll) {
		if (left.global || top.global) {
			window.scrollTo({
				left: window.scrollX + left.global,
				top: window.scrollY + top.global,
				behavior: 'auto',
			});
		}

		if (this.reference.current) {
			this.reference.current.scrollLeft += left.local;
			this.reference.current.scrollTop += top.local;
			if (!this.overflow.prevent && (left.overflow || top.overflow)) {
				this.overflow.left += left.overflow;
				this.overflow.top += top.overflow;
				(this.reference.current.childNodes as NodeListOf<HTMLElement>).forEach((node) => {
					node.style.transform = `translate3d(${-this.overflow.left}px, ${-this.overflow.top}px, 0px)`;
					node.style.transition = `0ms`;
				});
			}
		}
	}

	protected clearStyles = () => {
		if (this.reference.current) {
			(this.reference.current.childNodes as NodeListOf<HTMLElement>).forEach((node, index) => {
				node.style.transition = this.originalStyles.transition[index];
				node.style.transform = this.originalStyles.transform[index];
				node.style.pointerEvents = this.originalStyles.pointerEvents[index];
			});
		}
		this.overflow.left = 0;
		this.overflow.top = 0;
		this.overflow.prevent = false;
	};

	protected inertia = (diff: number, complete?: () => void) => {
		const decay = 0.95;
		const scroll = this.calculateScroll({
			left: this.inertiaSpeed.left * diff,
			top: this.inertiaSpeed.top * diff,
		});

		this.inertiaSpeed.left = ((scroll.left.local + scroll.left.overflow) / diff) * decay;
		this.inertiaSpeed.top = ((scroll.top.local + scroll.top.overflow) / diff) * decay;

		this.applyScroll(scroll);

		if (Math.abs(this.inertiaSpeed.left) < 0.05 && Math.abs(this.inertiaSpeed.top) < 0.05) {
			complete?.();
		}
	};

	protected calculateScroll(scroll: Scroll): PartitionedScroll {
		const { rubberBand } = this.getOptions();

		const left = {
			local: 0,
			global: 0,
			overflow: 0,
		};

		const top = {
			local: 0,
			global: 0,
			overflow: 0,
		};

		if (this.mode === 'global') {
			left.global = scroll.left;
			top.global = scroll.top;
		} else {
			if (this.reference.current) {
				const {
					scrollLeft,
					scrollTop,
					scrollWidth,
					clientWidth,
					scrollHeight,
					clientHeight,
				} = this.reference.current;

				if (isScrollableHorizontally(this.reference.current)) {
					const [nativeScroll, overScroll] = splitScroll(
						scrollLeft,
						this.overflow.left,
						scroll.left,
						0,
						scrollWidth - clientWidth,
					);
					left.local = nativeScroll;
					if (rubberBand) {
						left.overflow = rubberBandEffect(clientWidth, this.overflow.left, overScroll);
					}
				}

				if (isScrollableVertically(this.reference.current)) {
					const [nativeScroll, overScroll] = splitScroll(
						scrollTop,
						this.overflow.top,
						scroll.top,
						0,
						scrollHeight - clientHeight,
					);
					top.local = nativeScroll;
					if (rubberBand) {
						top.overflow = rubberBandEffect(clientWidth, this.overflow.top, overScroll);
					}
				}
			}
		}
		return { left, top };
	}
}

export function defaultMouseScrollImplementation(
	reference: RefObject<HTMLElement | null>,
	options: RefObject<DefaultScrollOptions & BasicScrollOptions>,
) {
	return new DefaultArtificialScroll(reference, options);
}
