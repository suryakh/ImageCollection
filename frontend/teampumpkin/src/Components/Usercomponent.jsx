import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from '../Redux/Actions'
import {Link} from 'react-router-dom'
import Imagecomponent  from './Imagecomponent'

export class Usercomponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show:false,
            imagename:"",
            contributer:"",
            imagepath:"",
            imagedownloads:"",
            data:{}
        }
    }
    getdata(data){
        let temp = data
        this.setState({
            data:temp,
            show:true
        })
    }
    hideIt=()=>{
        this.setState({
            show:false
        })
    }
    componentDidMount() {
        this.props.getData(this.props.userStatus.token)
    }
    render() {
        console.log(this.state.data,this.state.show)
        return (
            <>
                <div className="row">
                    {this.props.data.requestStatus && this.props.data.userData.map((ele) => <div className="col-4"><div><img onClick={()=>this.getdata(ele)} className="img-fluid" src={`http://localhost:5000/static/${ele.imagepath}`} /></div>

                        <div>{ele.imagename}</div>
                        <div>{ele.username}</div>
                        <div>{ele.downloads}</div>
                    </div>)}
                </div>
                        <Imagecomponent show={this.state.show} data={this.state.data} hide={this.hideIt} />
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
        getData: (token) => dispatch(getData(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Usercomponent)
