import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './main.scss'

export default class Select extends PureComponent {
  handleOptionChange = (e) => {
    const { onChange, options } = this.props
    onChange(options[e.target.selectedIndex])
  }

  render() {
    const { value, options, placeholder, customClass, onChange } = this.props
    const option = options.filter(item => item.value === value.value)[0] || {}
    return (
      <div className={styles.kfcSelect}>
        <p className={`${customClass}  ${styles.defaultClass} ${styles.value}`} >{option.label || placeholder}</p>
        <select onChange={ this.handleOptionChange } value={value}>
          {
            options.map((ele, index) => {
              return (
                <option key={index} value={ele.value}>{ele.label}</option>
              )
            })
          }
        </select>
      </div>
    ) 
  }
}

Select.propTypes = {
  onChange: PropTypes.func, // 选项改变时回调
  placeholder: PropTypes.string,
  value: PropTypes.object,
  customClass: PropTypes.string
}

Select.defaultProps = {
  value: {},
  options: [],
  onChange: () => {},
  placeholder: '请选择',
  customClass: ''
}