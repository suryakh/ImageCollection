import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getContrubutorData } from '../Redux/Actions'

export class Contributordata extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: "5",
        }
    }
    componentDidMount() {
        let count = this.state.count
        let offset = 0
        this.props.getContrubutorData(count, offset, this.props.userStatus.token)
    }
    // pagination

    setData = (ele) => {
        let offset = (ele - 1) * this.state.count
        this.props.getContrubutorData(this.state.count, offset, this.props.userStatus.token)
    }
    render() {
        return (
            <>
                <div style={{ height: "300px" }} className="border">
                    <table className="table text-center ">
                        <thead className="thead-dark">
                            <tr>
                                <th>Image Name</th>
                                <th>Category</th>
                                <th>Number of Downloads</th>
                            </tr>

                        </thead>
                        <tbody>
                            {this.props.data.requestStatus && this.props.data.contributorData.map((ele => <tr key={ele.id}><td>{ele.imagename}</td><td>{ele.imagecategory}</td><td>{ele.downloads}</td></tr>))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center">
                    {this.props.data.requestStatus && this.props.data.btnList.map((ele) => <button key={ele} className="btn btn-primary m-2" onClick={() => this.setData(ele)}>{ele}</button>)}
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
        getContrubutorData: (count, offset, token) => dispatch(getContrubutorData(count, offset, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Contributordata)
