import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../Redux/Actions'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () => {
        let temp = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(temp)
        this.props.loginUser(temp)
    }
    render() {
        if (!this.props.userStatus.loginStatus) {
            return (
                <div className="container d-flex justify-content-center">
                    <div className="col-lg-6 col-xl-6 col-sm-12 col-md-12 shadow" style={{ height: "350px", marginTop: "20%" }}>
                        <div className="row p-5 formdiv" >
                            <div className="col-12">
                                <label>Username</label>
                            </div>
                            <div className="col-12">
                                <input className="col-12 form-control" name="username" placeholder="Enter username" value={this.state.username} type="text" onChange={this.handleChange} />
                            </div>
                            <div className="col-12">
                                <label>Password</label>
                            </div>
                            <div className="col-12">
                                <input className="col-12 form-control" type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <div className="col-12 m-2"><p>If you don't have account <Link to="/signup">Signup here</Link></p></div>
                            <div className="col-12 mt-2 text-center">
                                <button className="btn btn-primary" onClick={this.handleClick}>Login</button>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <Redirect to="/" />
            )
        }
    }
}

const mapStateToProps = (state) => ({
    userStatus: state.userReducers
})
const mapDispatchToProps = dispatch => {
    return {
        loginUser: (a) => dispatch(loginUser(a))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
