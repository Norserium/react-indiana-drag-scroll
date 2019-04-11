import React, { Component } from 'react'
import bem from 'easy-bem'
import ScrollContainer from 'react-indiana-drag-scroll'

import Hieroglyph from './Hieroglyph'

const centeredBlock = bem('centered-block')

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

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {hiddenHieroglyphs: []}
  }
  render () {
    return (
      <div>
        <div className={centeredBlock()}>
          <div className={centeredBlock('container')}>
            <ScrollContainer className='scroll-container'>
              <div className='hieroglyphs'>
                {hieroglyphs.map((src, index) => <Hieroglyph key={index} src={src} />)}
              </div>
            </ScrollContainer>
          </div>
          <img className={centeredBlock('man')} src={require('./images/Man.svg')} />
        </div>
      </div>
    )
  }
}
