import React from 'react';
import PageLayout from './common/PageLayout';
import UpdateSection from '../components/make-section/UpdateSection';

const getDocumentInfo = (pathname) => {
  const result = pathname.match(/\/updatedocs\/(?<generation>\d+)_(?<boostcampId>.+)_(?<name>.+)/);
  return result.groups;
};

const UpdatePage = ({ history, location }) => {
  const result = getDocumentInfo(location.pathname);
  return (
    <PageLayout>
      <UpdateSection history={history} name={result.name} generation={result.generation} boostcampId={result.boostcampId} />
    </PageLayout>
  );
};

export default UpdatePage;