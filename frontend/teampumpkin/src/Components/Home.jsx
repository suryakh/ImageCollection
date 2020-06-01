import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {uploadData} from '../Redux/Actions'
import ContributorComponent from './ContributorComponent'
import Usercomponent from './Usercomponent'

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            imageName:"",
            imageCategory:"",
            uploadStatus:false
        }
    }
    render() {
        if (this.props.userStatus.loginStatus) {
            if (this.props.userStatus.userType == "contribute") {
                return (
                    <>
                    <ContributorComponent />
                    </>
                )
            }
            else {
                return (
                    <>
                    <Usercomponent />
                    </>
                )
            }
        }
        else {
            return (
                <Redirect to="/login" />
            )
        }
    }
}

const mapStateToProps = (state) => ({
    userStatus: state.userReducers
})

const mapDispatchToProps = dispatch => {
    return {
        uploadData: (data, token) => dispatch(uploadData(data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
