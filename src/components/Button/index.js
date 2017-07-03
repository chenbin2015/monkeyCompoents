import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './main.scss'

export default class Button extends PureComponent {
  render() {
    const { text, style, onClick, type } = this.props
    const buttonStyle = type == 'default' ? styles.defaultButton : styles.primaryButton
    return (
      <button className={`${styles.button} ${buttonStyle} ${style}`} onClick={onClick}>{text}</button>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string, // 文本
  style: PropTypes.string, // 自定义样式
  onClick: PropTypes.func, // 点击事件
  type: PropTypes.string // 类型，只有两种，default and primary
}

Button.defaultProps = {
  text: '确定',
  style: '',
  onClick: () => {},
  type: 'default'
}