//  eslint-disable-next-line
import React, { FC, ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserIcon from '../user-icon/user-icon.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  fontFamily,
  fontSize,
  gray1,
  gray2,
  gray5,
} from '../../styles/base.styles';

const Header: FC = () => {
  const history = useHistory();
  const location = useLocation();

  //  Get query string and store it in state
  const searchParam = new URLSearchParams(location.search);
  const criteria = searchParam.get('criteria') || '';

  const [search, setSearch] = useState(criteria);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setSearch(() => val);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search?criteria=${search}`);
  };

  return (
    <header
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid ${gray5};
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
      `}
    >
      <Link
        to="/"
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${gray1}
          text-decoration: none;
        `}
      >
        Q and A
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleChange}
          css={css`
            box-sizing: border-box;
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 8px 10px;
            border: 1px solid ${gray5};
            border-radius: 3px;
            color: ${gray2};
            background-color: white;
            width: 200px;
            height: 30px;
            :focus {
              outline-color: ${gray5};
            }
          `}
        />
      </form>
      <Link
        to="/signin"
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          padding: 5px 10px;
          background-color: transparent;
          color: ${gray2};
          text-decoration: none;
          cursor: pointer;
          span {
            margin-left: 10px;
          }
          :focus {
            outline-color: ${gray5};
          }
        `}
      >
        <span>
          <UserIcon />
          Sign In
        </span>
      </Link>
    </header>
  );
};

export default Header;
