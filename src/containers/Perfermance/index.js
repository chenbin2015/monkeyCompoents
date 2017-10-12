import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Test from '../../components/Test'
import styles from './main.scss'
// @pureRender
class Perfermance extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
	  	selectedIndex: -1
	  }
	}
  shouldComponentUpdate(nextProps,nextState){
  	return !Number.isNaN(nextState.selectedIndex)
  }
  handleInput = (e) => {
  	this.setState({
  		selectedIndex: parseInt(e.target.value)
  	})
  }

  renderList() {
  	var lists=[]
  	for(let i = 0; i <1000; i++){
  		lists.push(<Test selectedIndex={this.state.selectedIndex} index={i} key={i} text={i} render={this.state.selectedIndex == i} />)
  	}
  	return lists
  }

  render() {
  	const { colors, texts } = this.state
    return (
      <div>
      	<input type="number" onInput={this.handleInput} />
      	<div className={styles.list}>
      		{ this.renderList() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(Perfermance)