import React from 'react';

import BackButton from '../components/BackButton';
import ForwardButton from '../components/ForwardButton';

const HouseholdForm = ({ parameters, setParameters }) => {
  return (
    <>
      <h1>Household</h1>
      <BackButton />
      <ForwardButton nextUrl="/transportation" />
    </>
  );
};

export default HouseholdForm;
