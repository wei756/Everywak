import React from 'react';
import { Link } from 'react-router-dom';

import CircleImg from '../../common/Components/CircleImg';

import styles from './IsedolMemberItem.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

/**
 * 이세돌 멤버 프로필 아이콘
 * 
 * @param {*} props 
 */
function IsedolMemberItem({ name, profileImg, social }) {

  return (
    <li className={cx('IsedolMemberItem')}>
      <div className="profileCircle">
        <CircleImg src={profileImg} alt={`${name} 프로필 이미지`} />
      </div>
      <ul className="social">
        <IsedolMemberSocialItem type='twitch' socialId={social.twitch} />
        <IsedolMemberSocialItem type='youtube' socialId={social.youtube} />
        <IsedolMemberSocialItem type='instagram' socialId={social.instagram} />
      </ul>
    </li>
  );
  
}
IsedolMemberItem.defaultProps = {
  name: '멤버이름',
  profileImg: '',
  social: {
    twitch: '',
    youtube: '',
    instagram: '',
  },
};

/**
 * 프로필 아이콘 밑에 붙는 유튜브/트위치/인스타 링크 버튼
 * 
 * @param {Object} props 
 */
function IsedolMemberSocialItem({ type, socialId }) {

  const socialType = {
    twitch: {
      bg: '/images/twitch_logo.svg',
      url: 'https://twitch.tv/{id}',
    },
    youtube: {
      bg: '/images/youtube_logo.png',
      url: 'https://www.youtube.com/channel/{id}',
    },
    instagram: {
      bg: '/images/instagram_logo.png',
      url: 'https://www.instagram.com/{id}',
    },
  }

  const { url, bg } = socialType[type];
  const href = url.replace('{id}', socialId);

  const className = {
    twitch: type == 'twitch',
    youtube: type == 'youtube',
    instagram: type == 'instagram',
  };
  
  return (
    <li className={cx('IsedolMemberSocialItem', className)}>
      <a href={href} className="link">
        <CircleImg 
          src={bg} 
          alt={`${type} logo`} 
          objectFit="contain" 
          padding="8px" />
      </a>
    </li>
  );
}
  
export default IsedolMemberItem;