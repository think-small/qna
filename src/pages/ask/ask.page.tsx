import React, { FC } from 'react';
import Layout from '../page-layout/page-layout.page';
import Form, {
  required,
  minLength,
  Values,
} from '../../components/form/form.component';
import { postQuestion } from '../../data/data';
import Field from '../../components/form/form-field/form-field.component';

const AskPage: FC = () => {
  const handleSubmit = async (values: Values) => {
    const question = await postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    return { success: question ? true : false };
  };

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
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submited"
      >
        <Field name="title" label="Title" type="Text" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Layout>
  );
};

export default AskPage;
