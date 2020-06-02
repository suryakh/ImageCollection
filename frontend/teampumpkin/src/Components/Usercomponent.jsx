import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getImagesData } from '../Redux/Actions'
import Imagecomponent from './Imagecomponent'

export class Usercomponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            count: "5",
            data: {},
            imageCategory: ""
        }
    }
    // For popup Model
    popUpData(data) {
        let temp = data
        this.setState({
            data: temp,
            show: true,
        })
    }

    // For closing popup Model
    hideIt = () => {
        this.setState({
            show: false
        })
    }
    handleChange = (e) => {
        this.setState({
            imageCategory: e.target.value
        })
    }
    componentDidMount() {
        let offset = 0
        this.props.getImagesData(this.state.count, offset, this.state.imageCategory || "All", this.props.userStatus.token)
    }
    // pagination 

    setData = (ele) => {
        let offset = (ele - 1) * this.state.count
        this.props.getImagesData(this.state.count, offset || 0, this.state.imageCategory || "All", this.props.userStatus.token)
    }


    render() {
        return (
            <>
                <div className="container">
                    <div className="text-center">
                        <select className="btn btn-primary" name="imageCategory" value={this.state.imageCategory} onChange={this.handleChange} onClick={() => this.setData()}>
                            <option value="All">select category</option>
                            <option value="Technology">Technology</option>
                            <option value="Nature">Nature</option>
                            <option value="Flowers">Flowers</option>
                            <option value="Birds">Birds</option>
                            <option value="Animals">Animals</option>
                            <option value="Quotes">Quotes</option>
                        </select>
                    </div>
                    <div className="row m-4" style={{height:"700px"}}>
                        {this.props.data.requestStatus && this.props.data.userData.map((ele) => <div key={ele.id} className="col-3"><div className="m-1 border shadow p-3"><div><img style={{ height: "200px" }} onClick={() => this.popUpData(ele)} className="img-fluid" src={`http://localhost:5000/static/${ele.imagepath}`} /></div>

                            <div><b>ImageName: </b>{ele.imagename}</div>
                            <div><b>Contributor: </b>{ele.username}</div>
                            <div><b>No.of Downloads: </b>{ele.downloads}</div>
                        </div></div>)}
                    </div>
                    <Imagecomponent show={this.state.show} data={this.state.data} hide={this.hideIt} />
                </div>
                <div className="text-center">
                    {this.props.data.requestStatus && this.props.data.imgBtnList.map((ele) => <button key={ele} className="btn btn-primary m-2" onClick={() => this.setData(ele)}>{ele}</button>)}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    userStatus: state.userReducers,
    data: state.dataReducers
})

const mapDispatchToProps = dispatch => {
    return {
        getImagesData: (count, offset, category, token) => dispatch(getImagesData(count, offset, category, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Usercomponent)
