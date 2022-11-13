const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');

const { GRID_OPTIONS } = require('../formulas/electricity/constants');

chai.should();
chai.use(chaiHttp);

describe('Electricity APIs', () => {

  describe('/api/v1/electricity/options', () => {
    it('should return all valid grid options', (done) => {
      chai.request(server)
          .get('/api/v1/electricity/options')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.be.eql(GRID_OPTIONS);
            done();
          });
    });
  });

  describe('/api/v1/electricity/calculate', () => {
    it('should return 422 and have 2 errors if we have missing grid', (done) => {
      chai.request(server)
          .get('/api/v1/electricity/calculate?consumption=10')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(2);
            done();
          });
    });

    it('should return 422 and have 2 errors if we have missing consumption', (done) => {
      chai.request(server)
          .get('/api/v1/electricity/calculate?grid=CAMX')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(2);
            done();
          });
    });

    it('should return 422 and have 1 error if we have invalid consumption', (done) => {
      chai.request(server)
          .get('/api/v1/electricity/calculate?consumption=-100&grid=CAMX')
          .end((err, res) => {
              if (err) throw err;

              res.should.have.status(422);
              res.body.should.be.a('object');
              res.body.should.have.property('errors').that.is.a('array');
              res.body.errors.should.have.lengthOf(1);
            done();
          });
    });

    it('should return 422 and have 1 error if we have invalid grid', (done) => {
      chai.request(server)
          .get('/api/v1/electricity/calculate?consumption=100&grid=INVALID_OPTION')
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
          .get('/api/v1/electricity/calculate?consumption=100&grid=CAMX')
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
