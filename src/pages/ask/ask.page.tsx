import React, { FC, useEffect } from 'react';
import Layout from '../page-layout/page-layout.page';
import Form, {
  required,
  minLength,
  Values,
  ISubmitResult,
} from '../../components/form/form.component';
import {
  postQuestion,
  IPostAnswerData,
  IPostQuestionData,
} from '../../data/data';
import Field from '../../components/form/form-field/form-field.component';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  clearPostedActionCreator,
  postQuestionActionCreator,
} from '../../store/actions/creators.actions';
import { IAppState } from '../../store/store';
import { IQuestionData } from '../../data/question-data.interface';

interface IProps {
  postQuestion: (question: IPostQuestionData) => Promise<void>;
  postedQuestionResult?: IQuestionData;
  clearPostedQuestion: () => void;
}

const AskPage: FC<IProps> = ({
  postQuestion,
  postedQuestionResult,
  clearPostedQuestion,
}) => {
  useEffect(() => {
    return function cleanUp() {
      clearPostedQuestion();
    };
  }, [clearPostedQuestion]);

  const handleSubmit = (values: Values) => {
    postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
  };

  let submitResult: ISubmitResult | undefined;
  if (postedQuestionResult)
    submitResult = { success: postedQuestionResult !== undefined };

  return (
    <Layout title="Ask a Question">
      <Form
        submitCaption="Submit Your Question"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, args: 10 }],
          content: [
            { validator: required },
            { validator: minLength, args: 50 },
          ],
        }}
        onSubmit={handleSubmit}
        submitResult={submitResult}
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submited"
      >
        <Field name="title" label="Title" type="Text" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Layout>
  );
};

const mapStateToProps = (store: IAppState) => ({
  postedQuestionResult: store.questions.postedResult,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  postQuestion: (question: IPostQuestionData) =>
    dispatch(postQuestionActionCreator(question)),
  clearPostedQuestion: () => dispatch(clearPostedActionCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AskPage);
