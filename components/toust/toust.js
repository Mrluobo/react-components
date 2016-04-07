/**
 * @file
 * Created by wangzhicheng on 16/3/22.
 */
import React, {Component} from 'react';
import style from './toust.css';

class Toust extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'hello',
            show: true
        }
    }

    hidetoust (){
        this.props.hidetoust();
    }

    render() {
        if (this.props.show) {
            return (
                <div className={style.container}>
                    <div className={style.toust}>
                        <div className={style.content}>{this.props.content}</div>
                        <div className={style.btn} onClick={this.hidetoust.bind(this)}>确定</div>
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }
}

export default Toust