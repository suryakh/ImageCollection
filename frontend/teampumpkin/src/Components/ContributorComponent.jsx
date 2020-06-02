import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadData } from '../Redux/Actions'
import Contrubtordata from './Contributordata'
import { Redirect } from 'react-router-dom'

export class ContributorComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            imageName: "",
            imageCategory: "",
            uploadStatus: false,
            showDetails: false
        }
    }

    fileLoad = (e) => {
        this.setState({
            image: e.target.files[0],
            uploadStatus: true
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Display contributor details

    showdetails = () => {
        this.setState({
            showDetails: !this.state.showDetails
        })
    }

    fileUpload = () => {
        let formdata = new FormData()
        formdata.append("image", this.state.image)
        formdata.append("imageName", this.state.imageName)
        formdata.append("imageCategory", this.state.imageCategory)
        this.props.uploadData(formdata, this.props.userStatus.token)
        this.setState({
            uploadStatus: false
        })
    }
    render() {
        return (
            <>
                <div className="row m-5">
                    <div className="col-3 text-center border">
                        <div className="mt-5">
                            <button className="btn btn-success" onClick={this.showdetails}>showDetails</button>
                        </div>
                    </div>
                    {!this.state.showDetails && <div className="col-8 border">
                        <div className="input-group col-4 m-3 border p-4">
                            <div className="col-12 mt-3 border">
                                <label>Enter Image Name</label>
                                <input className="col-12" placeholder="enter Imagename" name="imageName" type="text" value={this.state.imageName} onChange={this.handleChange} />
                            </div>
                            <div className="col-12 mt-3">
                                <input type="file" className="btn btn-warning" id="file" onChange={this.fileLoad} />
                            </div>
                            <div className="m-3 col-12">
                                <div>
                                    <label>Select Image Category</label>
                                </div>
                                <div>
                                    <select className="col-12 btn btn-primary" name="imageCategory" value={this.state.imageCategory} onChange={this.handleChange}>
                                        <option></option>
                                        <option value="Technology">Technology</option>
                                        <option value="Nature">Nature</option>
                                        <option value="Flowers">Flowers</option>
                                        <option value="Birds">Birds</option>
                                        <option value="Animals">Animals</option>
                                        <option value="Quotes">Quotes</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-group-append m-3 col-12 text-center">
                                <button className="btn btn-outline-success m-2" type="button" onClick={() => this.fileUpload()} >Upload</button>
                            </div>
                        </div>
                    </div>}
                    {this.state.showDetails && <div className="container">
                        <Contrubtordata />
                    </div>}
                </div>

            </>
        )

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

export default connect(mapStateToProps, mapDispatchToProps)(ContributorComponent)
