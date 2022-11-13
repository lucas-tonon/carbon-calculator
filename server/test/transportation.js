const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');

const { MOBILE_COMBUSTION_OPTIONS } = require('../formulas/transportation/constants');

chai.should();
chai.use(chaiHttp);

describe('Transportation APIs', () => {

  describe('/api/v1/transportation/options', () => {
    it('should return all valid transportation fuel options', (done) => {
      chai.request(server)
          .get('/api/v1/transportation/options')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.be.eql(MOBILE_COMBUSTION_OPTIONS);
            done();
          });
    });
  });

  describe('/api/v1/transportation/calculate', () => {
    it('should return 422 and have 2 errors if we have missing miles', (done) => {
      chai.request(server)
          .get('/api/v1/transportation/calculate?gasMileage=10&vehicleYear=2000&combustion=ETHANOL')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(2);
            done();
          });
    });

    it('should return 422 and have 1 error if we have invalid miles', (done) => {
      chai.request(server)
          .get('/api/v1/transportation/calculate?miles=-100&gasMileage=10&vehicleYear=2000&combustion=ETHANOL')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(1);
            done();
          });
    });

    it('should return 422 and have 2 errors if we have missing mileage', (done) => {
      chai.request(server)
          .get('/api/v1/transportation/calculate?miles=100&vehicleYear=2000&combustion=ETHANOL')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(2);
            done();
          });
    });

    it('should return 422 and have 1 errors if we have invalid mileage', (done) => {
      chai.request(server)
          .get('/api/v1/transportation/calculate?miles=100&gasMileage=-10&vehicleYear=2000&combustion=ETHANOL')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(1);
            done();
          });
    });

    it('should return 422 and have 2 errors if we have missing vehicle year', (done) => {
      chai.request(server)
          .get('/api/v1/transportation/calculate?miles=100&gasMileage=10&combustion=ETHANOL')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(2);
            done();
          });
    });

    it('should return 422 and have 1 errors if we have invalid vehicle year', (done) => {
      chai.request(server)
          .get('/api/v1/transportation/calculate?miles=100&gasMileage=10&vehicleYear=3000&combustion=ETHANOL')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(1);
            done();
          });
    });

    it('should return 422 and have 2 errors if we have missing combustion', (done) => {
      chai.request(server)
          .get('/api/v1/transportation/calculate?miles=100&gasMileage=10&vehicleYear=2000')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(2);
            done();
          });
    });

    it('should return 422 and have 1 errors if we have invalid combustion', (done) => {
      chai.request(server)
          .get('/api/v1/transportation/calculate?miles=100&gasMileage=10&vehicleYear=2000&combustion=INVALID_FUEL')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(1);
            done();
          });
    });

    it('should return 200 and a totalEmission parameter if everything is ok', (done) => {
      chai.request(server)
          .get('/api/v1/transportation/calculate?miles=100&gasMileage=10&vehicleYear=2000&combustion=ETHANOL')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('totalEmissions');
            done();
          });
    });
  });

});
