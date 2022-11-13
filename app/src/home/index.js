import React from 'react';

import ForwardButton from '../components/ForwardButton';

const Home = ({ parameters, setParameters }) => {

  React.useEffect(() => {
    setParameters({ ...parameters, household: { numberOfPeople: 2 }});
  }, []);

  return (
    <>
      <h1>Home</h1>
      <ForwardButton nextUrl="/household" />
    </>
  );
};

export default Home;
