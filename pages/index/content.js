/**
 * @file
 * Created by wangzhicheng on 16/3/15.
 */
import React, {Component} from 'react'

import Toust from '../../components/toust/toust'
class Greeter extends Component {
    constructor(props){
        super(props)
        this.state = {
            toustshow:true
        }
    }
    hidetoust(){
        this.setState({
            toustshow:false
        })
    }
    showtoust(){
        this.setState({
            toustshow:true
        })
    }
    render() {
        return (
            <div>
                <Toust hidetoust={this.hidetoust.bind(this)} show={this.state.toustshow} content="hello world" />
                <button onClick={this.showtoust.bind(this)}>show</button>
            </div>
        );
    }
}

export default Greeter
