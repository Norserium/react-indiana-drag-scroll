import { Component, CSSProperties, ReactNode } from "react";

export interface IScrollContainerProps {
  vertical?: boolean;
  horizontal?: boolean;
  hideScrollbars?: boolean;
  activationDistance?: number;
  children?: ReactNode;
  onStartScroll?: (
    scrollLeft: number,
    scrollTop: number,
    scrollWidth: number,
    scrollHeight: number
  ) => void;
  onScroll?: (
    scrollLeft: number,
    scrollTop: number,
    scrollWidth: number,
    scrollHeight: number
  ) => void;
  onEndScroll?: (
    scrollLeft: number,
    scrollTop: number,
    scrollWidth: number,
    scrollHeight: number
  ) => void;
  className?: string;
  style?: CSSProperties;
  ignoreElements?: string;
  nativeMobileScroll?: boolean;
  ref?: ReactNode;
  ignoreMouseButtons?: Array<number>;
}

export default class ScrollContainer extends Component<IScrollContainerProps> {
  getElement: () => HTMLElement;
}
