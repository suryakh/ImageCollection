import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Logout extends Component {
    render() {
        return (
            <div>
                Logout
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
