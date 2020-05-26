import React, { FC, useContext, ChangeEvent } from 'react';
import { FormContext } from '../form.component';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  fontFamily,
  fontSize,
  gray5,
  gray2,
  gray6,
} from '../../../styles/base.styles';

interface IProps {
  name: string;
  label?: string;
  type?: 'Text' | 'TextArea' | 'Password';
}

const baseCss = css`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  margin-bottom: 5px;
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 100%;
  :focus {
    outline-color: ${gray5};
  }
  :disabled {
    background-color: ${gray6};
  }
`;
const Field: FC<IProps> = ({ name, label, type }) => {
  const { setValue, touched, validate, setTouched } = useContext(FormContext);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (setValue) {
      setValue(name, e.currentTarget.value);
    }
    if (touched[name] && validate) {
      validate(name);
    }
  };

  const handleBlur = () => {
    if (setTouched) setTouched(name);
    if (validate) validate(name);
  };

  return (
    <FormContext.Consumer>
      {({ values, errors }) => {
        return (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              margin-bottom: 15px;
            `}
          >
            {label && (
              <label
                htmlFor={name}
                css={css`
                  font-weight: bold;
                `}
              >
                {label}
              </label>
            )}
            {(type === 'Text' || type === 'Password') && (
              <input
                type={type.toLowerCase()}
                id={name}
                css={baseCss}
                value={!values[name] ? '' : values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}
            {type === 'TextArea' && (
              <textarea
                id={name}
                css={css`
                  ${baseCss};
                  height: 100px;
                `}
                value={!values[name] ? '' : values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}
            {errors[name] &&
              errors[name].length > 0 &&
              errors[name].map((error) => (
                <div
                  key={error}
                  css={css`
                    font-size: 12px;
                    color: red;
                  `}
                >
                  {error}
                </div>
              ))}
          </div>
        );
      }}
    </FormContext.Consumer>
  );
};

export default Field;
