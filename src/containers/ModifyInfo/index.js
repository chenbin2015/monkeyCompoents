import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as studentActions from '../../actions/student'
class ModifyInfo extends Component {
 
 	state = {
 		name :''
 	}

	handleChangeName = () => {
		const { setName } = this.props.studentActions
		setName(this.state.name)
	}
	handleNameChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}
  render() {

    return (
      <div >
      	<input value = {this.state.name} onInput = { this.handleNameChange } />
        <button onClick={ this.handleChangeName}>修改姓名</button>
      </div>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  studentActions: bindActionCreators(studentActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModifyInfo)
