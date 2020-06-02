import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from '../Redux/Actions'
import { Link } from 'react-router-dom'
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
    getdata(data) {
        let temp = data
        this.setState({
            data: temp,
            show: true,
        })
    }
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
        this.props.getData(this.state.count, offset, this.state.imageCategory || "All", this.props.userStatus.token)
    }
    setData = (ele) => {
        let offset = (ele - 1) * this.state.count
        this.props.getData(this.state.count, offset || 0, this.state.imageCategory || "All", this.props.userStatus.token)
    }


    render() {
        console.log(this.props.data)
        return (
            <>
                <div className="container">
                    <select name="imageCategory" value={this.state.imageCategory} onChange={this.handleChange} onClick={() => this.setData()}>
                        <option></option>
                        <option value="Technology">Technology</option>
                        <option value="Nature">Nature</option>
                        <option value="Flowers">Flowers</option>
                        <option value="Birds">Birds</option>
                        <option value="Animals">Animals</option>
                        <option value="Quotes">Quotes</option>
                    </select>
                    <div className="row m-4">
                        {this.props.data.requestStatus && this.props.data.userData.map((ele) => <div className="col-3"><div className="m-1 border shadow p-3"><div><img style={{ height: "200px" }} onClick={() => this.getdata(ele)} className="img-fluid" src={`http://localhost:5000/static/${ele.imagepath}`} /></div>

                            <div>{ele.imagename}</div>
                            <div>{ele.username}</div>
                            <div>{ele.downloads}</div>
                        </div></div>)}
                    </div>
                    <Imagecomponent show={this.state.show} data={this.state.data} hide={this.hideIt} />
                </div>
                <div className="text-center">
                    {this.props.data.requestStatus && this.props.data.imgBtnList.map((ele) => <button className="btn btn-primary" onClick={() => this.setData(ele)}>{ele}</button>)}
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
        getData: (count, offset, category, token) => dispatch(getData(count, offset, category, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Usercomponent)
