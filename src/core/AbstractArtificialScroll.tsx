import { Scroll } from '../types';

export interface AbstractArtificialScroll {
	start(speed: Scroll): void;
	scroll(speed: Scroll): void;
	end(speed: Scroll, callback: () => void): void;
	cancel(): void;
	active: boolean;
}
