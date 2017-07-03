import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'

import styles from './main.scss'

// @pureRender
export default class Tabs extends PureComponent {
  render() {
    const { lists } = this.props
    return (
      <div className={styles.tabs}>
        <ul>
          {
            lists.map((ele, index) => {
              return (
                <li key={index}>
                  <Icon text={ele.text} img={ele.img} url={ele.url} color={ele.color} />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

Tabs.propTypes = {
  lists: PropTypes.array // 文本
}

Tabs.defaultProps = {
  lists: []
}