/**
 * @file
 * Created by wangzhicheng on 16/3/24.
 */
import React, {Component} from 'react';
import style from './datePicker.css';


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


class DatePicker extends Component {
    constructor(props) {
        super(props);

        let date = new Date();
        date.setDate(1);

        this.state = {
            datePickerShow: true,
            dates: [],
            days: ['日', '一', '二', '三', '四', '五', '六'],
            currentDate: date,
            str: '',
            currentYear: date.getFullYear(),
            currentMonth: date.getMonth(),
            //currentDay: date.getDate()
        }
        //这里需要异步执行,不然会报下面的错
        //Can only update a mounted or mounting component.
        // This usually means you called setState() on an unmounted component.
        // This is a no-op. Please check the code for the DatePicker component.
        setTimeout(this.renderDate.bind(this), 0);
        // this.renderDate();
    }

    renderDate() {
        let date = new Date();
        date.setDate(1);
        this.state.currentYear = this.state.currentDate.getFullYear();
        this.state.currentMonth = this.state.currentDate.getMonth() + 1;
        date.setMonth(this.state.currentMonth - 1);
        date.setFullYear(this.state.currentYear);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        let dateLength = date.getDate();
        date.setDate(1);
        let dateBegin = date.getDay();
        date.setDate(0);
        let arr = Array.from({length: dateLength}, (v, i)=> {
            return {
                value: i + 1,
                disabled: false
            }
        });
        let lastMonthDateLength = date.getDate();
        for (let i = 0; i < dateBegin; i++) {
            arr.unshift({
                value: lastMonthDateLength - i,
                disabled: true
            });
        }
        let left = 7 - arr.length % 7;
        if (left < 7) {
            let i = 1;
            while (i <= left) {
                // arr.push(i);
                arr.push({
                    value: i,
                    disabled: true
                })
                i++;
            }
        }
        this.setState(
            {
                dates: arr
            }
        );
    }

    yearBack() {
        console.log(1)
        let date = this.state.currentDate;
        let currentYear = date.getFullYear();
        date.setYear(currentYear - 1);
        this.state.currentDate = date;
        this.renderDate();
    }

    monthBack() {
        let date = this.state.currentDate;
        let currentMonth = date.getMonth();
        date.setMonth(currentMonth - 1);
        this.state.currentDate = date;
        this.renderDate();
    }

    yearForward() {
        let date = this.state.currentDate;
        let currentYear = date.getFullYear();
        date.setYear(currentYear + 1);
        this.state.currentDate = date;
        this.renderDate();
    }

    monthForward() {
        let date = this.state.currentDate;
        let currentMonth = date.getMonth();
        date.setMonth(currentMonth + 1);
        this.state.currentDate = date;
        this.renderDate();
    }

    returnValue(key) {
        if (!key.disabled) {
            let date = new Date();
            date.setDate(key.value);
            date.setMonth(this.state.currentDate.getMonth());
            date.setFullYear(this.state.currentDate.getFullYear());
            this.setState({
                str: date.Format('yyyy-M-d')
            })
        }
    }

    gotoMonth(year, month) {

    }

    showDatePicker() {
        this.setState({
            datePickerShow: true
        })
    }

    render() {
        let days = this.state.days.map(function (v, i) {
            return (<td key={v}>{v}</td>);
        })
        let dates = [];
        let j = -1;
        let self = this;
        this.state.dates.map((v, i)=> {
            if (!dates[j] || dates[j].length >= 7) {
                j++;
                dates[j] = [];
            }

            dates[j].push(<td
                key={v.value}
                className={v.disabled?style.disabled:''}
                onClick={()=>{this.returnValue(v)}}
            >{v.value}</td>);
        });
        return (
            <div>
                <div><input type="text" value={this.state.str} onClick={this.showDatePicker.bind(this)} disabled/></div>

                {(()=> {
                    if (this.state.datePickerShow) {
                        return (
                            <div className={style.container}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td onClick={this.yearBack.bind(this)}>{'\<\<'}</td>
                                        <td onClick={this.monthBack.bind(this)}>{'\<'}</td>
                                        <td>{this.state.currentYear}年</td>
                                        <td></td>
                                        <td>{this.state.currentMonth}月</td>
                                        <td onClick={this.monthForward.bind(this)}>{'\>'}</td>
                                        <td onClick={this.yearForward.bind(this)}>{'\>\>'}</td>
                                    </tr>
                                    <tr>
                                        {days}
                                    </tr>
                                    {dates.map(function (v, i) {
                                        return (<tr key={i}>{v}</tr>)
                                    })}
                                    </tbody>
                                </table>
                            </div>)

                    }
                })()}


            </div>

        )
    }
}


export default DatePicker;