import React, { PureComponent } from 'react';
import DatePicker from '../../common/Components/DatePicker';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import MediaQuery  from 'react-responsive';
import styles from './DateRange.scss';

import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class DateRange extends PureComponent {
  static defaultProps = {
    name: '',
    min: 0,
    max: 0,
    start: -1,
    end: -1,
    onChange: val => {},
  };
  state = {
    opened: false,
    start: -1,
    end: -1,
  }

  genDatetime (time) {
    const date = new Date(time);
    return `${date.getFullYear()}. ${(date.getMonth() + 1)}. ${date.getDate()}.`;
  }
  genDatetimeInput (time) {
    const date = new Date(time);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  }

  open = () => {
    this.setState({
      opened: true,
    })
  }
  close = () => {
    this.setState({
      opened: false,
    })
  }
  toggle = () => {
    this.setState({
      opened: !this.state.opened,
    })
  }

  componentDidMount () {
    const { min, max, start, end } = this.props;
    this.setState({
      start: (start !== -1 ? start : min),
      end: (end !== -1 ? end : max),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.start !== this.props.start ||
      prevProps.end !== this.props.end) {
      this.setState({
        start: this.props.start,
        end: this.props.end,
      });
    }
  }

  onChange = e => {
    this.setState(e);
    this.props.onChange(e);
  }

  onChangeStart = e => {
    this.setState({
      start: new Date(e.target.value).getTime(),
    })
  }
  onChangeEnd = e => {
    this.setState({
      end: new Date(e.target.value).getTime(),
    })
  }

  render() {
    const { name, min, max } = this.props;
    const { start, end } = this.state;
    const { opened } = this.state;
    const tablet_s_width = 960;

    return (
      <div className="DateRange">
        <MediaQuery minWidth={tablet_s_width}>
        <div className={cx('dateBtn', {opened: opened})} onClick={e => this.toggle()}>
          <div className="dateWrapper">
            {`${this.genDatetime(start !== -1 ? start : min)} - ${this.genDatetime(end !== -1 ? end : max)}`}
          </div>
          <DateRangeRoundedIcon fontSize="small" />
        </div>
        <div className="closeArea" onClick={e => this.close()}></div>
        <div className="dateList">
          <DatePicker name={name} min={min} max={max} start={start} end={end} onChange={e => this.onChange(e)} opened={opened} />
        </div>
        </MediaQuery>
        <MediaQuery maxWidth={tablet_s_width - 1}>
        <div className="dateBtn">
          <input type="date" name={name + "-start"} id={name + "-start"} value={this.genDatetimeInput(start)} onChange={this.onChangeStart} />
        </div>
        <span className="dateDivide">-</span>
        <div className="dateBtn">
          <input type="date" name={name + "-end"} id={name + "-end"} value={this.genDatetimeInput(end + 24*60*60 - 1)} onChange={this.onChangeEnd} />
        </div>
        </MediaQuery>
      </div>
    );
  }
}

export default DateRange;