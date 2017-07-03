import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import styles from './main.scss'

export default class Confirm extends PureComponent {
  render() {
    const { text, onConfirm, onCancel, visible } = this.props
    return visible ? (
      <div className={styles.confirm}>
        <div className={styles.panel}>
          <p className={styles.text}>{text}</p>
          <div className={styles.buttonList}>
            <Button text="确认" onClick={onConfirm}/>
            <p className={styles.line} ></p>
            <Button text="取消" onClick={onCancel} />
          </div>
        </div>
      </div>
    ) : null
  }
}

Confirm.propTypes = {
  text: PropTypes.string, // 文本
  onConfirm: PropTypes.func, // 确定事件
  onCancel: PropTypes.func, // 取消事件
  visible: PropTypes.bool
}

Confirm.defaultProps = {
  text: '确定删除吗？',
  onConfirm: () => {},
  onCancel: () => {},
  visible: false
}