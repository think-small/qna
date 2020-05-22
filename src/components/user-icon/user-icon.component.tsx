// eslint-disable-next-line
import React from 'react';
import UserSvg from '../../assets/zondicons/user.svg';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const UserIcon = () => {
  return (
    <img
      src={UserSvg}
      alt="User"
      width="12px"
      css={css`
        width: 12px;
        opacity: 0.6;
        padding-right: 5px;
      `}
    />
  );
};

export default UserIcon;
