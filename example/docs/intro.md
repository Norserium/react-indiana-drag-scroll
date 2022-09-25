---
sidebar_position: 1
---

# Intro

## Installation

To use this library you should install it with `npm` or `yarn`

```shell
npm install -S react-indiana-drag-scroll@next
```

```shell
yarn add react-indiana-drag-scroll@next
```

Then import the `ScrollContainer` component and the styles somewhere:

```ts
import { ScrollContainer } from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css';
```

```tsx
export const Example = () => {
    return (
      <ScrollContainer>
        {/* scrollable content */}
      </ScrollContainer>
    )
};
```

## Philosophy

The browsers don't provide the possibility to scroll a container by mouse drag.
However, this interaction pattern becomes pretty common.

This library implements the missing feature, but the following points must be taken into account:
1. This library tries to implement the scroll by mouse drag in a manner
how it could be implemented in browsers. It tries to stay similar to native scroll methods as mush as it possible.
2. There is no any particular standard how the mouse drag scroll should be implemented, therefore
this library attempts to draft the optimal behavior with providing wide customize options alongside.
3. This library doesn't customize other scroll methods and doesn't provide any additional features. The only exception is the providing of the methods
`onScroll`, `onStartScroll`, `onEndScroll` due to historical reasons.
4. It's unknown how to implement the mouse drag scroll with the smooth support of scroll snap feature.
Therefore, if you need the similar behavior prefer the [carousel / slider](https://github.com/brillout/awesome-react-components#carousel) libraries. The implementing of the custom
scroll snapping will contradict the first point.
