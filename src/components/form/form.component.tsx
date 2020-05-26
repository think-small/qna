import React, { FC, useState, createContext, FormEvent } from 'react';
import { PrimaryButton } from '../primary-button/primary-button.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray5, gray6 } from '../../styles/base.styles';

export interface Values {
  [key: string]: any;
}

export interface IErrors {
  [key: string]: string[];
}

export interface ITouched {
  [key: string]: boolean;
}

interface IFormContextProps {
  values: Values;
  setValue?: (fieldName: string, value: any) => void;
  errors: IErrors;
  validate?: (fieldName: string) => void;
  touched: ITouched;
  setTouched?: (fieldName: string) => void;
}

export const FormContext = createContext<IFormContextProps>({
  values: {},
  errors: {},
  touched: {},
});

type Validator = (value: any, args?: any) => string;

export const required: Validator = (value: any): string =>
  !value ? 'This must be populated' : '';
export const minLength: Validator = (value: any, length: number): string =>
  value && value.length < length
    ? `This must be at least ${length} characters`
    : '';

interface IValidation {
  validator: Validator;
  args?: any;
}

interface IValidationProp {
  [key: string]: IValidation | IValidation[];
}

export interface ISubmitResult {
  success: boolean;
  errors?: IErrors;
}

interface IProps {
  submitCaption?: string;
  validationRules?: IValidationProp;
  onSubmit: (values: Values) => Promise<ISubmitResult>;
  successMessage?: string;
  failureMessage?: string;
}

export const Form: FC<IProps> = ({
  submitCaption,
  validationRules,
  onSubmit,
  successMessage = 'Successful Submission',
  failureMessage = 'Submission failed',
  children,
}) => {
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<IErrors>({});
  const [touched, setTouched] = useState<ITouched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validate = (fieldName: string): string[] => {
    if (!validationRules) return [];
    if (!validationRules[fieldName]) return [];

    //  Ensure validation rules are in an array
    const rules = Array.isArray(validationRules[fieldName])
      ? (validationRules[fieldName] as IValidation[])
      : ([validationRules[fieldName]] as IValidation[]);

    const fieldErrors: string[] = [];
    rules.forEach((rule) => {
      const error = rule.validator(values[fieldName], rule.args);
      if (error) fieldErrors.push(error);
    });
    const newErrors = { ...errors, [fieldName]: fieldErrors };
    setErrors(() => newErrors);
    return fieldErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      //  Set state to indicate submission is in progress
      setSubmitting(true);
      setSubmitError(false);
      //  Call the consumer submit function
      const result = await onSubmit(values);
      //  Set any errors in state
      setErrors(result.errors || {});
      setSubmitError(!result.success);
      //  Set state to indicate submission has finished
      setSubmitting(false);
      setSubmitted(true);
    } else {
      setSubmitted(true);
      setSubmitError(true);
    }
  };

  const validateForm = () => {
    const newErrors: IErrors = {};
    let haveError: boolean = false;
    if (validationRules) {
      Object.keys(validationRules).forEach((fieldName) => {
        newErrors[fieldName] = validate(fieldName);
        if (newErrors[fieldName].length > 0) {
          haveError = true;
        }
      });
    }
    setErrors(newErrors);
    return !haveError;
  };

  return (
    <FormContext.Provider
      value={{
        values,
        setValue: (fieldName: string, value: any) => {
          setValues({ ...values, [fieldName]: value });
        },
        errors,
        validate,
        touched,
        setTouched: (fieldName: string) => {
          setTouched(() => {
            return { ...touched, [fieldName]: true };
          });
        },
      }}
    >
      <form noValidate={true} onSubmit={handleSubmit}>
        <fieldset
          disabled={submitting || (submitted && !submitError)}
          css={css`
            margin: 10px auto 0 auto;
            padding: 30px;
            width: 350px;
            background-color: ${gray6};
            border-radius: 4px;
            border: 1px solid ${gray5};
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
          `}
        >
          {children}
          <div
            css={css`
              margin: 30px 0px 0px 0px;
              padding: 20px 0px 0px 0px;
              border-top: 1px solid ${gray5};
            `}
          >
            <PrimaryButton type="submit">{submitCaption}</PrimaryButton>
          </div>
          {submitted && submitError && (
            <p
              css={css`
                color: red;
              `}
            >
              {failureMessage}
            </p>
          )}
          {submitted && !submitError && (
            <p
              css={css`
                color: green;
              `}
            >
              {successMessage}
            </p>
          )}
        </fieldset>
      </form>
    </FormContext.Provider>
  );
};

export default Form;
