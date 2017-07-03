import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './main.scss'

export default class Switch extends PureComponent {
  handleChangeValue = () => {
    const { disable, onChange, value } = this.props
    !disable && onChange(!value)
  }

  render() {
    const { value, onChange } = this.props
    return (
      <div className={styles.kfcSwitch} style={{ background: value ? '' : '#aaa' }} onClick={this.handleChangeValue}>
        <p className={`${styles.status} ${value ? styles.open : ''}` }></p>
      </div>
    )
  }
}

Switch.propTypes = {
  value: PropTypes.bool, // 是否开启
  onChange: PropTypes.func, // 点击时的回调
  disable: PropTypes.bool
}

Switch.defaultProps = {
  value: false,
  onChange: () => {},
  disable: false
}