import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './main.scss'

// @pureRender
class About extends Component {
  render() {
    return (
      <div className={styles.test}>
        My name is <Link to={{pathname: '/modify'}}>{this.props.student.name}</Link>,I'm a web developer, I like js!
        <p><Link to={{pathname: '/perf'}}>perf</Link></p>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(About)