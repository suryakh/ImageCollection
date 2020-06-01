import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Nomodule extends Component {
    render() {
        return (
            <div>
                404 ERROR PAGE NOT FOUND
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Nomodule)