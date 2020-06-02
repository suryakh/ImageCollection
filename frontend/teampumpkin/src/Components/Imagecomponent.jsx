import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import { downloadImage } from '../Redux/Actions'
import { Link } from 'react-router-dom'

export class Imagecomponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    download() {

        this.props.downloadImage(this.props.data.id, this.props.userStatus.token)
        window.open(`http://localhost:5000/static/${this.props.data.imagepath}`, "Download")
    }
    render() {
        console.log(this.props.data)
        return (
            <>
                {this.props.show && <div className="model"> <div className="col-12"><div><img className="img-fluid" style={{ height: "400px" }} src={`http://localhost:5000/static/${this.props.data.imagepath}`} /></div>

                    <div>{this.props.data.imagename}</div>
                    <div>{this.props.data.username}</div>
                    {/* <div>{this.props.data.downloads}</div> */}
                </div>
                    <button onClick={this.props.hide}>Close</button>
                    <button onClick={() => this.download()}>Download</button>
                </div>}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    userStatus: state.userReducers
})

const mapDispatchToProps = dispatch => {
    return {
        downloadImage: (id, token) => dispatch(downloadImage(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Imagecomponent)
