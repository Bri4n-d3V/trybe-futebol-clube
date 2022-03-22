import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import clubModel from '../database/models/clubs';
import * as mock from './mocks.test'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Club Model', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(clubModel, "findAll")
      .resolves(mock.clubFindAll as clubModel[]);

      sinon
      .stub(clubModel, "findByPk")
      .resolves(mock.clubFindAll[0] as clubModel);
  });

  after(()=>{
    (clubModel.findAll as sinon.SinonStub).restore();
  })

  it('tests the query "get all clubs"', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.deep.equals(mock.clubFindAll);
  });

  it('tests the query "get club by id"', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('clubName');
    expect(chaiHttpResponse.body).to.be.deep.equals(mock.clubFindAll[0]);
  });
});
