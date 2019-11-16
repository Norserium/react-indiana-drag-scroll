import React, { Component } from 'react'
import bem from 'easy-bem'

const hieroglyph = bem('hieroglyph')

export default class Hieroglyph extends Component {
  constructor(props) {
    super(props)
    this.state = {hidden: Math.random() > 0.8}
  }
  toggleVisibility = () => {
    this.setState({hidden: !this.state.hidden})
  }
  render () {
    const {hidden} = this.state
    const {src} = this.props
    return (
      <img draggable='false' alt='' src={src} className={hieroglyph({hidden})} onDragStart={e => e.preventDefault()} onClick={this.toggleVisibility} />
    )
  }
}
