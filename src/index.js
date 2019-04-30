import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import bem from 'easy-bem'

import './style.css'

const cn = bem('indiana-scroll-container')

export default class ScrollContainer extends Component {
  static propTypes = {
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    hideScrollbars: PropTypes.bool,
    activationDistance: PropTypes.number,
    excludedTagList: PropTypes.array,
    children: PropTypes.node,
    onStartScroll: PropTypes.func,
    onScroll: PropTypes.func,
    onEndScroll: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    hideScrollbars: true,
    activationDistance: 10,
    excludedTagList: [],
    vertical: true,
    horizontal: true,
    style: {}
  }

  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('touchmove', this.onTouchMove)
    window.addEventListener('touchend', this.onTouchEnd)
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
  }

  getElement() {
    return this.container.current
  }

  onTouchStart = (e) => {
    const touch = e.touches[0]
    this.pressed = true
    this.clientX = touch.clientX
    this.clientY = touch.clientY
    this.updateExcludedTagStatus()

    e.stopPropagation()
  }

  onTouchEnd = (e) => {
    this.processEnd()
  };

  onTouchMove = (e) => {
    if (this.pressed) {
      const touch = e.touches[0]
      if (touch) {
        this.processMove(touch.clientX, touch.clientY)
        if (e.preventDefault) {
          e.preventDefault()
        }
      }
    }
  }

  onMouseDown = (e) => {
    this.pressed = true
    this.clientX = e.clientX
    this.clientY = e.clientY
    this.updateExcludedTagStatus()

    e.stopPropagation()
  };

  onMouseMove = (e) => {
    if (this.pressed) {
      this.processMove(e.clientX, e.clientY, e)
      if (e.preventDefault) {
        e.preventDefault()
      }
    }
  }

  onMouseUp = (e) => {
    if (e.preventDefault) {
      e.preventDefault()
    }
    e.stopPropagation()

    this.processEnd()
  };

  processMove(newClientX, newClientY) {
    const {
      horizontal, vertical, activationDistance, onScroll, onStartScroll
    } = this.props

    if (this.preventExcludedMove) { return }

    const container = this.container.current

    if (!this.dragging && this.pressed) {
      if ((horizontal && Math.abs(newClientX - this.clientX) > activationDistance) || (vertical && Math.abs(newClientY - this.clientY) > activationDistance)) {
        this.clientX = newClientX
        this.clientY = newClientY
        this.dragging = true
        document.body.classList.add('indiana-dragging')
        if (onStartScroll) {
          onStartScroll()
        }
        this.forceUpdate()
      }
    }
    if (this.dragging) {
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

  processEnd() {
    const { onEndScroll } = this.props

    const container = this.container.current

    this.pressed = false
    this.dragging = false
    this.preventExcludedMove = false

    document.body.classList.remove('indiana-dragging')

    if (onEndScroll) {
      onEndScroll(container.scrollLeft, container.scrollTop, container.scrollWidth, container.scrollHeight)
    }

    this.forceUpdate()
  }

  updateExcludedTagStatus() {
    const { excludedTagList } = this.props

    if (e.target.tagName) {
      // prevent dragging if it started with clicking/touching excluded tag
      if (excludedTagList.includes(e.target.tagName.toLowerCase())) {
        this.preventExcludedMove = true;
      }
    }
  }

  render() {
    const {
      children, className, style, hideScrollbars
    } = this.props

    return (
      <div
        className={classnames(className, cn({ dragging: this.dragging }))}
        style={{ ...style, overflow: hideScrollbars ? 'hidden' : 'auto' }}
        ref={this.container}
        onTouchStart={this.onTouchStart}
        onMouseDown={this.onMouseDown}
      >
        {children}
      </div>
    )
  }
}
