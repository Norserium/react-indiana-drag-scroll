import { MutableRefObject, LegacyRef, RefCallback } from 'react';
import { LoopedFunction } from './types';

export function splitScroll(
	currentScroll: number,
	currentOverflow: number,
	change: number,
	left: number,
	right: number,
) {
	const usedOverflow =
		change > 0 ? Math.max(0, Math.min(change, -currentOverflow)) : Math.min(0, Math.max(change, -currentOverflow));
	const usedScroll =
		Math.min(Math.max(currentScroll + change - usedOverflow, left), right) -
		Math.min(Math.max(currentScroll, left), right);
	return [usedScroll, change - usedScroll];
}

export function rubberBandEffect(containerSize: number, overflow: number, overflowChange: number) {
	if (
		(Math.abs(overflow) === 0 && Math.abs(overflowChange) > 0) ||
		Math.sign(overflow) === Math.sign(overflowChange)
	) {
		return (
			0.3 *
			containerSize *
			Math.sign(overflowChange) *
			Math.log10(1.0 + (0.5 * Math.abs(overflowChange)) / containerSize)
		);
	} else {
		return overflowChange;
	}
}

export function loop<T extends any[]>(body: (diff: number, complete?: () => void) => void): LoopedFunction {
	let canceled = false;
	let frame: number;

	const methods = {
		run: (callback?: () => void) => {
			canceled = false;
			let last = performance.now();

			const completeCallback = () => {
				methods.cancel();
				callback?.();
			};

			const frameCallback = (now: number) => {
				if (!canceled) {
					body(now - last, completeCallback);
					last = now;
					frame = window.requestAnimationFrame((now) => frameCallback(now));
				}
			};

			frame = window.requestAnimationFrame((now) => frameCallback(now));
		},
		cancel: () => {
			canceled = true;
			window.cancelAnimationFrame(frame);
		},
	};

	return methods;
}

export function isScrollableHorizontally(element: HTMLElement | null) {
	return !!element && element.scrollWidth > element.clientWidth;
}

export function isScrollableVertically(element: HTMLElement | null) {
	return !!element && element.scrollHeight > element.clientHeight;
}

export function isDraggable(target: HTMLElement | null, reference: HTMLElement | null, ignoreElements?: string) {
	if (ignoreElements && target && reference) {
		const closest = target.closest(ignoreElements);
		return closest === null || closest.contains(reference);
	} else {
		return Boolean(target && reference);
	}
}

export const isObject = <T extends object, U>(term: T | U): term is NonNullable<T> => {
	return term !== null && typeof term === 'object';
};

export function get<T = undefined>(obj: any, key: string, fallback: T) {
	if (isObject(obj)) {
		return obj[key];
	} else {
		return fallback;
	}
}

export function isFunction<T extends () => void, U>(value: T | U): value is T {
	return typeof value === 'function';
}

export function debounce<Arguments extends any[]>(
	callback: (...args: Arguments) => void,
	delay?: number | (() => number),
) {
	let timestamp: number;
	let timeout: ReturnType<typeof setTimeout>;

	const later = (...args: Arguments) => {
		const last = Date.now() - timestamp;
		const delayValue = isFunction(delay) ? delay() : delay || 0;

		if (last < delayValue && last >= 0) {
			timeout = setTimeout(() => later(...args), delayValue - last);
		} else {
			callback(...args);
		}
	};

	const result = (...args: Arguments) => {
		timestamp = Date.now();
		timeout = setTimeout(() => later(...args), isFunction(delay) ? delay() : delay || 0);
	};

	result.clear = () => {
		clearTimeout(timeout);
	};

	return result;
}

export function mergeRefs<T = any>(refs: (MutableRefObject<T> | LegacyRef<T> | RefCallback<T>)[]): RefCallback<T> {
	return (value) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref != null) {
				(ref as MutableRefObject<T | null>).current = value;
			}
		});
	};
}

export function cn(classNames: unknown[]) {
	return classNames.filter((el) => el).join(' ');
}
