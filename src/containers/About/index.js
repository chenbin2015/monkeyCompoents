import React, { Component } from 'react'
import styles from './main.scss'

// @pureRender
export default class About extends Component {
  render() {
    return (
      <div className={styles.test}>
        My name is ben chen,I'm a web developer, I like js!
      </div>
    )
  }
}