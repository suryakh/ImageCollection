import React, { Component } from 'react'
import { connect } from 'react-redux'
import {uploadData} from '../Redux/Actions'

export class ContributorComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            imageName:"",
            imageCategory:"",
            uploadStatus:false
        }
    }
    fileLoad = (e) => {
        this.setState({
            image: e.target.files[0],
            uploadStatus: true
        })
    }
    handleChange= (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    fileUpload = () => {
            let formdata = new FormData()
            formdata.append("image", this.state.image)
            formdata.append("imageName",this.state.imageName)
            formdata.append("imageCategory",this.state.imageCategory)
            this.props.uploadData(formdata, this.props.userStatus.token)
            this.setState({
                uploadStatus: false
            })
    }
    render() {
        return (
            <>
                <div className="row">
                            <div className="col-4">
                                show details
                    </div>
                            <div className="col-8">
                            <div className="input-group">
                                <div>
                                    <input name="imageName" type="text" value={this.state.imageName} onChange={this.handleChange}/>
                                </div>
                            <div className="custom-file">
                                <input type="file" class="custom-file-input" id="file" onChange={this.fileLoad} />
                                <label className="custom-file-label">Choose file</label>
                            </div>
                        <div className="m-4">
                            {this.state.uploadStatus && <h4>Selected file name : {this.state.image.name}</h4>}
                        </div>
                        <div>
                            <select name="imageCategory" value={this.state.imageCategory} onChange={this.handleChange}>
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
                            <div className="input-group-append">
                                <button className="btn btn-outline-success" type="button" onClick={() => this.fileUpload()} >Upload</button>
                            </div>
                </div>
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
