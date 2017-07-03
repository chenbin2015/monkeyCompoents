import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import styles from './main.scss'

// @pureRender
export default class Icon extends PureComponent {
  render() {
    const { img, text, url, color } = this.props
    return (
      <Link to={url} className={styles.icon}>
        <img src={img} />
        <p style={{color: color}}>{text}</p>
      </Link>
    )
  }
}

Icon.propTypes = {
  img: PropTypes.string, // 文本
  text: PropTypes.string,
  url: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]),
  color: PropTypes.string
}

Icon.defaultProps = {
  img: '',
  text: '',
  url: '',
  color: '#333'
}