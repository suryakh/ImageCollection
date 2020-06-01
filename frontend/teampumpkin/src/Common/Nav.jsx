import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../Redux/Actions'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export class Nav extends Component {
    handleClick = () => {
        this.props.logout()
    }
    render() {
        console.log(this.props.userStatus.user)
        return (
            <div className="navdiv">
                <nav className="navbar navbar-expand-lg navbar-light bg-warning p-4">
                    <div className="col-5"><h4>Image Collection</h4></div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <div className="offset-6">
                            <ul className="navbar-nav mt-2 mt-lg-0 float-right">
                                <li className="nav-item">
                                    <div className="col-3 "> <Link to='/'><button className="btn btn-light">Home</button></Link></div>
                                </li>
                                <li className="nav-item">
                                    {!this.props.userStatus.loginStatus && <div className="col-3"> <Link to='/login'><button className="btn btn-light">Login</button></Link></div>}
                                </li>
                                <li className="nav-item">
                                    <div className="col-3"><Link to='/Signup'><button className="btn btn-light">Signup</button></Link></div>
                                </li>
                                <li className="nav-item col-3">
                                    {this.props.userStatus.loginStatus && <div className='row'><button className="btn btn-light "><FontAwesomeIcon icon={faUser} />{this.props.userStatus.user}</button></div>}
                                </li>
                                <li className="nav-item">
                                    {this.props.userStatus.loginStatus && <div className="col-3"><button className="btn btn-light" onClick={() => this.handleClick()}>Logout</button></div>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userStatus: state.userReducers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
