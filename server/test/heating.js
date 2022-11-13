const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');

const { HEATING_OPTIONS } = require('../formulas/heating/constants');

chai.should();
chai.use(chaiHttp);

describe('Heating APIs', () => {

  describe('/api/v1/heating/options', () => {
    it('should return all valid heating fuel options', (done) => {
      chai.request(server)
          .get('/api/v1/heating/options')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.be.eql(HEATING_OPTIONS);
            done();
          });
    });
  });

  describe('/api/v1/heating/calculate', () => {
    it('should return 422 and have 2 errors if we have missing gallons', (done) => {
      chai.request(server)
          .get('/api/v1/heating/calculate?type=PROPANE')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(2);
            done();
          });
    });

    it('should return 422 and have 2 errors if we have missing type', (done) => {
      chai.request(server)
          .get('/api/v1/heating/calculate?gallons=10')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(2);
            done();
          });
    });

    it('should return 422 and have 1 error if we have invalid gallons', (done) => {
      chai.request(server)
          .get('/api/v1/heating/calculate?gallons=-1000&type=PROPANE')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(1);
            done();
          });
    });

    it('should return 422 and have 1 error if we have invalid type', (done) => {
      chai.request(server)
          .get('/api/v1/heating/calculate?gallons=10&type=INVALID_TYPE')
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
          .get('/api/v1/heating/calculate?gallons=100&type=PROPANE')
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
