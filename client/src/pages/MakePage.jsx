import React from 'react';
import PageLayout from './common/PageLayout';
import MakeSection from '../components/make-section/MakeSection';
import { useValidate } from '../utils/login';

const MakePage = ({ history }) => {
  useValidate(true);
  return (
    <PageLayout>
      <MakeSection history={history} />
    </PageLayout>
  );
};

export default MakePage;
