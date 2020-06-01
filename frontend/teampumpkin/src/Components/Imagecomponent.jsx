import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css'
import FileSaver from 'file-saver'

export class Imagecomponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    download() {
        FileSaver.saveAs(`{http://localhost:5000/static/${this.props.data.imagepath}`,"image.png")
      }
    render() {
        console.log(this.props.data)
        return (
            <>
                {this.props.show &&<div className="model"> <div className="col-4"><div><img className="img-fluid" src={`http://localhost:5000/static/${this.props.data.imagepath}`} /></div>

                    <div>{this.props.data.imagename}</div>
                    <div>{this.props.data.username}</div>
                    <div>{this.props.data.downloads}</div>
                </div>
                <button onClick={this.props.hide}>Close</button>
                <button onClick={()=>this.download()}>Download</button>
            </div>}
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Imagecomponent)
