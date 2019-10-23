import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import debounce from 'debounce'
import bem from 'easy-bem'

import './style.css'

const cn = bem('indiana-scroll-container')

const SCROLL_END_DEBOUNCE = 300

export default class ScrollContainer extends Component {
  static propTypes = {
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    hideScrollbars: PropTypes.bool,
    activationDistance: PropTypes.number,
    children: PropTypes.node,
    onStartScroll: PropTypes.func,
    onScroll: PropTypes.func,
    onEndScroll: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    ignoreElements: PropTypes.string,
    nativeMobileScroll: PropTypes.bool,
  }

  static defaultProps = {
    nativeMobileScroll: true,
    hideScrollbars: true,
    activationDistance: 10,
    vertical: true,
    horizontal: true,
    style: {}
  }

  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.onEndScroll = debounce(this.onEndScroll, SCROLL_END_DEBOUNCE)

    this.scrolling = false
    this.started = false
    this.pressed = false
  }

  componentDidMount() {
    const {nativeMobileScroll} = this.props
    const container = this.container.current

    window.addEventListener('mouseup', this.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('touchmove', this.onTouchMove, {passive: false})
    window.addEventListener('touchend', this.onTouchEnd)

    // due to https://github.com/facebook/react/issues/9809#issuecomment-414072263
    container.addEventListener('touchstart', this.onTouchStart, {passive: false})
    container.addEventListener('mousedown', this.onMouseDown, {passive: false})

    if (nativeMobileScroll) {
      // We should check if it's the mobile device after page was loaded
      // to prevent breaking SSR
      this.isMobile = this.isMobileDevice()

      // If it's the mobile device, we should rerender to change styles
      if (this.isMobile) {
        this.forceUpdate()
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
  }

  isMobileDevice() {
    return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
  }

  isDraggable(target) {
    const ignoreElements = this.props.ignoreElements
    if (ignoreElements) {
      const closest = target.closest(ignoreElements)
      return closest === null || closest.contains(this.getElement())
    } else {
      return true
    }
  }

  getElement() {
    return this.container.current
  }

  onScroll = (e) => {
    if (!this.isMobile && !this.started && !this.scrolling) {
      this.processStart(e, false)
    }
    this.scrolling = true
    this.processScroll(e)
    this.onEndScroll()
  }

  // Simulate 'onEndScroll' event
  onEndScroll = () => {
    this.scrolling = false
    if (!this.pressed && this.started) {
      this.processEnd()
    }
  }

  onTouchStart = (e) => {
    const {nativeMobileScroll} = this.props

    if (this.isDraggable(e.target)) {
      if (nativeMobileScroll && this.scrolling) {
        this.pressed = true
      } else {
        const touch = e.touches[0]
        this.processClick(e, touch.clientX, touch.clientY)
        if (!nativeMobileScroll) {
          e.stopPropagation()
        }
      }
    }
  }

  onTouchEnd = (e) => {
    const {nativeMobileScroll} = this.props
    if (this.pressed) {
      if (this.started && !(this.scrolling && nativeMobileScroll)) {
        this.processEnd()
      } else {
        this.pressed = false
        this.forceUpdate()
      }
    }
  };

  onTouchMove = (e) => {
    const {nativeMobileScroll} = this.props
    if (!nativeMobileScroll && this.pressed) {
      const touch = e.touches[0]
      if (touch) {
        this.processMove(e, touch.clientX, touch.clientY)
      }
      e.preventDefault()
      e.stopPropagation()
    }
  }

  onMouseDown = (e) => {
    if (this.isDraggable(e.target)) {
      this.processClick(e, e.clientX, e.clientY)
      e.preventDefault()
      e.stopPropagation()
    }
  };

  onMouseMove = (e) => {
    if (this.pressed) {
      this.processMove(e, e.clientX, e.clientY)
      e.preventDefault()
    }
  }

  onMouseUp = (e) => {
    if (this.pressed) {
      if (this.started) {
        this.processEnd()
      } else {
        this.pressed = false
        this.forceUpdate()
      }
      e.preventDefault()
      e.stopPropagation()
    }
  };

  processClick(e, clientX, clientY) {
    const {nativeMobileScroll} = this.props
    if (nativeMobileScroll && e.type === 'touchstart') {
      const container = this.container.current
      this.scrollLeft = container.scrollLeft
      this.scrollTop = container.scrollTop
    } else {
      this.clientX = clientX
      this.clientY = clientY
    }
    this.pressed = true
  }

  processStart(e, changeCursor=true) {
    const { onStartScroll } = this.props
    const container = this.container.current

    // Add the class to display a cursor
    if (changeCursor) {
      document.body.classList.add('indiana-dragging')
    }

    this.started = true
    if (onStartScroll) {
      onStartScroll(container.scrollLeft, container.scrollTop, container.scrollWidth, container.scrollHeight)
    }
    this.forceUpdate()
  }

  processScroll(e) {
    const {activationDistance, onScroll} = this.props
    const container = this.container.current
    if (this.pressed && !this.started) {
      if ((Math.abs(container.scrollLeft - this.scrollLeft) > activationDistance) || (Math.abs(container.scrollTop - this.scrollTop) > activationDistance)) {
        this.processStart()
      }
    }
    if (this.started) {
      if (onScroll) {
        onScroll(container.scrollLeft, container.scrollTop, container.scrollWidth, container.scrollHeight)
      }
    }
  }

  processMove(e, newClientX, newClientY) {
    const {
      horizontal, vertical, activationDistance, onScroll
    } = this.props
    const container = this.container.current

    if (!this.started) {
      if ((horizontal && Math.abs(newClientX - this.clientX) > activationDistance) || (vertical && Math.abs(newClientY - this.clientY) > activationDistance)) {
        this.clientX = newClientX
        this.clientY = newClientY
        this.processStart()
      }
    }
    if (this.started) {
      if (horizontal) {
        container.scrollLeft -= newClientX - this.clientX
      }
      if (vertical) {
        container.scrollTop -= newClientY - this.clientY
      }
      if (onScroll) {
        onScroll(container.scrollLeft, container.scrollTop, container.scrollWidth, container.scrollHeight)
      }
      this.clientX = newClientX
      this.clientY = newClientY
    }
  }

  processEnd(e) {
    const { onEndScroll } = this.props
    const container = this.container.current

    this.pressed = false
    this.started = false
    this.scrolling = false

    if (onEndScroll) {
      onEndScroll(container.scrollLeft, container.scrollTop, container.scrollWidth, container.scrollHeight)
    }
    document.body.classList.remove('indiana-dragging')
    this.forceUpdate()
  }

  render() {
    const {
      children, className, style, hideScrollbars
    } = this.props

    return (
      <div
        className={classnames(className, cn({
          'dragging': this.pressed,
          'hide-scrollbars': hideScrollbars,
          'native-scroll': this.isMobile
        }))}
        style={style}
        ref={this.container}
        onScroll={this.onScroll}
      >
        {children}
      </div>
    )
  }
}
