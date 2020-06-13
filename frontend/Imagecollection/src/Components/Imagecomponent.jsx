import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import { downloadImage } from '../Redux/Actions'

export class Imagecomponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    download() {

        this.props.downloadImage(this.props.data.id, this.props.userStatus.token)
        this.props.hide()
        window.open(`https://imagecollections.herokuapp.com/static/${this.props.data.imagepath}`, "Download")
    }
    render() {
        console.log(this.props.data)
        return (
            <>
                {this.props.show && <div className="model"> <div className="col-12"><div><img className="img-fluid" style={{ height: "400px" }} src={`https://imagecollections.herokuapp.com/static/${this.props.data.imagepath}`} /></div>

                    <div><b>ImageName</b>{this.props.data.imagename}</div>
                    <div><b>Contributor</b>{this.props.data.username}</div>
                    <div><b>No.of Downloads</b>{this.props.data.downloads}</div>
                </div>
                    <div className="text-center">
                        <button className="btn btn-danger mr-2" onClick={this.props.hide}>Close</button>
                        <button className="btn btn-success" onClick={() => this.download()}>Download</button>
                    </div>
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
