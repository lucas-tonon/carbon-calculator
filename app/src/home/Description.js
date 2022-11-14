import React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const EPACalculatorLink = () =>
  <Link
    href='https://www3.epa.gov/carbon-footprint-calculator/'
    target='_blank'
    rel='noopener'
  >
    EPA's Carbon Footprint Calculator
  </Link>

const EPAEmissionFactorsLink = () =>
  <Link
    href='https://www.epa.gov/sites/default/files/2021-04/documents/emission-factors_apr2021.pdf'
    target='_blank'
    rel='noopener'
  >
    EPA Emission Factors
  </Link>

const Description = () =>
  <Box mx={2}>
    <Typography>
      Many things we do on a daily basis generate emissions that can contribute to the greenhouse effect.
      Given our current emergency regarding the climate crisis it may be interesting to do an estimate of how much carbon we emit in our
      lives, which could help us reduce our current carbon emissions and help the environment.
    </Typography>

    <Typography mt={4}>
      This calculator was based on <EPACalculatorLink />,
      however, being a simple side-project the current calculator does not have many of the features included in the reference example.
    </Typography>
    <Typography>
      Here we focused on generating an estimate of the total emissions of a given user by their input regarding Electricity, Heating, and Transportation.
    </Typography>

    <Typography mt={4}>
      The values used by the application were taken from the document <EPAEmissionFactorsLink />. I tried making this calculator as easy to improve as possible, by
      making all parts modularized and having options regarding the Emission Factors.
    </Typography>
  </Box>


export default Description;
