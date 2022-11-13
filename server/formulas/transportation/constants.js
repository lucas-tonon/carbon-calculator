const MOBILE_COMBUSTION_OPTIONS = {
  'Biodiesel': 'BIODIESEL',
  'Ethanol': 'ETHANOL',
  'Motor Gasoline': 'MOTOR_GASOLINE',
}

const MOBILE_COMBUSTION_EMISSIONS_PER_GALLON = {
  'BIODIESEL': 9.45,
  'ETHANOL': 5.75,
  'MOTOR_GASOLINE': 8.78,
};

const VEHICLE_YEAR_OPTIONS = {
  'Before 1973': 1972,
  '1973': 1973,
  '1974': 1974,
  '1975': 1975,
  '1976': 1976,
  '1977': 1977,
  '1978': 1978,
  '1979': 1979,
  '1980': 1980,
  '1981': 1981,
  '1982': 1982,
  '1983': 1983,
  '1984': 1984,
  '1985': 1985,
  '1986': 1986,
  '1987': 1987,
  '1988': 1988,
  '1989': 1989,
  '1990': 1990,
  '1991': 1991,
  '1992': 1992,
  '1993': 1993,
  '1994': 1994,
  '1995': 1995,
  '1996': 1996,
  '1997': 1997,
  '1998': 1998,
  '1999': 1999,
  '2000': 2000,
  '2001': 2001,
  '2002': 2002,
  '2003': 2003,
  '2004': 2004,
  '2005': 2005,
  '2006': 2006,
  '2007': 2007,
  '2008': 2008,
  '2009': 2009,
  '2010': 2010,
  '2011': 2011,
  '2012': 2012,
  '2013': 2013,
  '2014': 2014,
  '2015': 2015,
  '2016': 2016,
  '2017': 2017,
  '2018': 2018,
  'After 2018': 2019,
}

const PASSENGER_CAR_CH4_FACTOR_PER_MILE_BY_YEAR = {
  '1973': 0.1696,
  '1974': 0.1696,
  '1975': 0.1423,
  '1976': 0.1406,
  '1977': 0.1406,
  '1978': 0.1389,
  '1979': 0.1389,
  '1980': 0.1326,
  '1981': 0.0802,
  '1982': 0.0795,
  '1983': 0.0782,
  '1984': 0.0704,
  '1985': 0.0704,
  '1986': 0.0704,
  '1987': 0.0704,
  '1988': 0.0704,
  '1989': 0.0704,
  '1990': 0.0704,
  '1991': 0.0704,
  '1992': 0.0704,
  '1993': 0.0704,
  '1994': 0.0617,
  '1995': 0.0531,
  '1996': 0.0434,
  '1997': 0.0337,
  '1998': 0.0240,
  '1999': 0.0215,
  '2000': 0.0175,
  '2001': 0.0105,
  '2002': 0.0102,
  '2003': 0.0095,
  '2004': 0.0078,
  '2005': 0.0075,
  '2006': 0.0076,
  '2007': 0.0072,
  '2008': 0.0072,
  '2009': 0.0071,
  '2010': 0.0071,
  '2011': 0.0071,
  '2012': 0.0071,
  '2013': 0.0071,
  '2014': 0.0071,
  '2015': 0.0068,
  '2016': 0.0065,
  '2017': 0.0054,
  '2018': 0.0052,
};

const PASSENGER_CAR_N2O_FACTOR_PER_MILE_BY_YEAR = {
  '1973': 0.0197,
  '1974': 0.0197,
  '1975': 0.0443,
  '1976': 0.0458,
  '1977': 0.0458,
  '1978': 0.0473,
  '1979': 0.0473,
  '1980': 0.0499,
  '1981': 0.0626,
  '1982': 0.0627,
  '1983': 0.0630,
  '1984': 0.0647,
  '1985': 0.0647,
  '1986': 0.0647,
  '1987': 0.0647,
  '1988': 0.0647,
  '1989': 0.0647,
  '1990': 0.0647,
  '1991': 0.0647,
  '1992': 0.0647,
  '1993': 0.0647,
  '1994': 0.0603,
  '1995': 0.0560,
  '1996': 0.0503,
  '1997': 0.0446,
  '1998': 0.0389,
  '1999': 0.0355,
  '2000': 0.0304,
  '2001': 0.0212,
  '2002': 0.0207,
  '2003': 0.0181,
  '2004': 0.0085,
  '2005': 0.0067,
  '2006': 0.0075,
  '2007': 0.0052,
  '2008': 0.0049,
  '2009': 0.0046,
  '2010': 0.0046,
  '2011': 0.0046,
  '2012': 0.0046,
  '2013': 0.0046,
  '2014': 0.0046,
  '2015': 0.0042,
  '2016': 0.0038,
  '2017': 0.0018,
  '2018': 0.0016,
};


module.exports = {
  MOBILE_COMBUSTION_OPTIONS,
  VEHICLE_YEAR_OPTIONS,
  MOBILE_COMBUSTION_EMISSIONS_PER_GALLON,
  PASSENGER_CAR_CH4_FACTOR_PER_MILE_BY_YEAR,
  PASSENGER_CAR_N2O_FACTOR_PER_MILE_BY_YEAR,
};
