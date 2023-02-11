import React, { useCallback, useEffect, useState, useRef } from 'react';

import Header from '../../common/Header/Header.js';
import Footer from '../../common/Footer/Footer.js';

import LiveSummary from './LiveSummary';
import TwitchChat from './TwitchChat';
import VideoContentPlayer from '../../common/Components/VideoContentPlayer/VideoContentPlayer.jsx';

import * as func from '../../common/funtions';

import styles from './Live.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function addClassLive() {
  if (document.querySelector('.App')) {
    document.querySelector('.App').classList.add('live');
  } else {
    setTimeout(addClassLive, 100);
  }
}

export default function Live ({location, history}) {

  const [opened, setOpened] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // 브라우저 제목 설정
  useEffect(() => {
    func.setBrowserTitle('생방송');
    addClassLive();

    return () => {
      document.querySelector('.App')?.classList.remove('live');
    }
  }, []);

  const refPlayerWrapper = useRef(null);

  useEffect(() => {
    if (!expanded) {
      refPlayerWrapper.current && refPlayerWrapper.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [expanded]);
  

  const onPlayerOptionChangedHandler = useCallback(({theaterMode, hovering}) => {
    console.log(hovering, opened)
    if (hovering !== undefined && hovering !== opened) {
      setOpened(hovering);
    }
    if (theaterMode !== undefined && theaterMode !== expanded) {
      setExpanded(theaterMode);
    }
  }, [opened, expanded]);

  const channelId = 'woowakgood'; // process.env.REACT_APP_TWITCH_CHANNEL_NAME

  return (<>
    {!expanded &&
      <Header />
    }
    <div className={cx('Live', {expanded: expanded})}>
      <div className={cx('playerWrapper', {opened: opened, expanded: expanded})} ref={refPlayerWrapper}>
        <VideoContentPlayer key="wakplayer" mediaType="twitchLive" mediaId={channelId} onPlayerOptionChanged={onPlayerOptionChangedHandler} /> 
        <LiveSummary channelId={channelId} expanded={expanded} onChangeOverlayState={onPlayerOptionChangedHandler} />
        <BroadcasterPanel />
        <Footer />
      </div>
      <TwitchChat location={location} history={history} />
    </div>
  </>);
}

/**
 * 후원 배너 등 각종 패널들
 */
function BroadcasterPanel() {
  
  return (
    <div className="BroadcasterPanel">
      <div className="panelContainer">
        <a href="https://toon.at/donate/637445810791017450" target="_blank"><img src="https://everywak.kr/live/images/panel-donate2.png" alt="투네이션" /></a>
        <a href="https://cafe.naver.com/steamindiegame" target="_blank"><img src="https://everywak.kr/live/images/panel-wakki.png" alt="우왁끼" /></a>
      </div>
      <p className="footerTxt">
        에브리왁굳 우왁굳 생방송 페이지는 YouTube 및 Twitch의 서드파티 사이트로 YouTube 및 Twitch에서 운영하는 사이트가 아닙니다.<br/>
        'YouTube' 및 '유튜브'는 YouTube, LLC의 등록상표이며 'Twitch' 및 '트위치'는 Twitch Interactive, Inc.의 등록상표입니다.<br/>
        &nbsp;<br/>
        에브리왁굳 © 2020-2023. <a href="https://github.com/wei756" className="copyrighter_site_footer">Wei756</a>. All rights reserved.
      </p>
    </div>
  );
}