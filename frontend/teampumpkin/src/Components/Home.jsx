import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.userStatus.loginStatus) {
            if (this.props.userStatus.userType == "contribute") {
                return (
                    <>
                        <div className="row">
                            <div className="col-4">
                                show details
                    </div>
                            <div className="col-8">
                                form
                </div>
                        </div>
                    </>
                )
            }
            else {
                return (
                    <>
                        <div>
                            user
                </div>
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

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
