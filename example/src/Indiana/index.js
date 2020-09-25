import React, { Component } from 'react'
import bem from 'easy-bem'
import ScrollContainer from 'react-indiana-drag-scroll'
import Hieroglyph from './Hieroglyph'
import './style.css'

const cn = bem('centered-block')

const hieroglyphs = [
  require('./images/Hieroglyphs/1.svg'),
  require('./images/Hieroglyphs/2.svg'),
  require('./images/Hieroglyphs/3.svg'),
  require('./images/Hieroglyphs/4.svg'),
  require('./images/Hieroglyphs/5.svg'),
  require('./images/Hieroglyphs/6.svg'),
  require('./images/Hieroglyphs/7.svg'),
  require('./images/Hieroglyphs/8.svg'),
  require('./images/Hieroglyphs/9.svg'),
  require('./images/Hieroglyphs/10.svg'),
  require('./images/Hieroglyphs/11.svg'),
  require('./images/Hieroglyphs/12.svg'),
  require('./images/Hieroglyphs/13.svg'),
  require('./images/Hieroglyphs/14.svg')
]

export default class Indiana extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hiddenHieroglyphs: [],
      dragging: false
    }
    this.onStartScroll = this.onStartScroll.bind(this)
    this.onEndScroll = this.onEndScroll.bind(this)
  }
  onStartScroll(...args) {
    console.log('onStartScroll', args)
    this.setState({dragging: true})
  }
  onEndScroll(...args) {
    console.log('onEndScroll', args)
    this.setState({dragging: false})
  }
  render () {
    return (
      <div>
        <div className={cn()}>
          <div className={cn('container', {dragging: this.state.dragging})}>
            <ScrollContainer className='scroll-container'
              onStartScroll={this.onStartScroll}
              onScroll={(...args) => { console.log('onScroll', args) }}
              onClick={(...args) => { console.log('onClick', args) }}
              onEndScroll={this.onEndScroll}
            >
              <div className='hieroglyphs'>
                {hieroglyphs.map((src, index) => <Hieroglyph key={index} src={src} />)}
              </div>
            </ScrollContainer>
          </div>
          <img alt='Indiana Jones' className={cn('man')} src={require('./images/Man.svg')} />
        </div>
      </div>
    )
  }
}
