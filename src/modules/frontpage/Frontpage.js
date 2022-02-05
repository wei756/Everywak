import React, { Component } from 'react';

import FrontPanel from './FrontPanel';
import Bestwakki from '../bestwakki/Bestwakki.js';
import Live from '../live/Live.js';
import Apps from '../apps/Apps.js';
import Etcs from '../apps/Etcs.js';
import { Link } from 'react-router-dom';

import styles from './Frontpage.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

class Frontpage extends Component {

  render() {
    
    return (
      <div className="Frontpage">
        <FrontPanelList />
      </div>
    );
  }
}

class FrontPanelList extends Component {
  static defaultProps = {
    data: [
      {
        id: 'front_live',
        title: "우왁굳 생방송",
        moreable: true,
        link: "/live",
        component: <Live front={true} />
      },
      {
        id: 'front_bestwakki',
        title: "왁물원 인기글",
        moreable: true,
        link: "/bestwakki",
        component: <Bestwakki front={true} />
      },
      {
        id: 'front_apps',
        title: "여러가지가 있읍니다",
        moreable: false,
        component: <Apps front={true} />
      },
      {
        id: 'front_etcs',
        title: "딱히.. 팬치쿤이 봐줬으면 하는 건 아니고.... ",
        moreable: false,
        component: <Etcs front={true} />
      },
    ]
  }

  render() {
    const { data } = this.props;
    const list = data.map(
      data => <FrontPanel key={data.id} data={data} />
    );

    return (
      <ul className="FrontPanelList">
        {list}
      </ul>
    );
  }
}

export default Frontpage;