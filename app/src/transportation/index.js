import React from 'react';

import BackButton from '../components/BackButton';
import ForwardButton from '../components/ForwardButton';

const TransportationForm = ({ parameters, setParameters }) => {
  return (
    <>
      <h1>Transportation</h1>
      <BackButton />
      <ForwardButton nextUrl="/report" />
    </>
  );
};

export default TransportationForm;
