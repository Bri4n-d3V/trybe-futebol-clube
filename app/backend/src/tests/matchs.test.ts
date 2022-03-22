import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchsModel from '../database/models/matchs';
import * as mock from './mocks.test'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Matchs Model', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(matchsModel, "findAll")
      .resolves(mock.matchsFindAll as any);

    sinon
      .stub(matchsModel, "findByPk")
      .resolves(mock.matchsFindByPK as any);
  });

  after(()=>{
    (matchsModel.findAll as sinon.SinonStub).restore();
    (matchsModel.findByPk as sinon.SinonStub).restore();
  })

  it('tests the method GET all matchs', async () => {
    chaiHttpResponse = await chai

    .request(app)
    .get('/matchs')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.be.deep.equals(mock.matchsResult);
  });

  it('tests the method POST save match', async () => {
    chaiHttpResponse = await chai

    .request(app)
    .post('/matchs')
    .set('Authorization', mock.loginCreated.token)
    .send(mock.matchsSaveBody)

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('homeTeam').to.be.deep.equals(mock.matchsSave.homeTeam);
    expect(chaiHttpResponse.body).to.have.property('homeTeamGoals').to.be.deep.equals(mock.matchsSave.homeTeamGoals);
    expect(chaiHttpResponse.body).to.have.property('awayTeam').to.be.deep.equals(mock.matchsSave.awayTeam);
    expect(chaiHttpResponse.body).to.have.property('awayTeamGoals').to.be.deep.equals(mock.matchsSave.awayTeamGoals);
    expect(chaiHttpResponse.body).to.have.property('inProgress').to.be.deep.equals(mock.matchsSave.inProgress);
  });

  it('tests the method PATCH save finished match by id', async () => {
    chaiHttpResponse = await chai

    .request(app)
    .patch('/matchs/:id/finish')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.deep.equals(mock.matchSaveFinishedById);
  });

  // rever este teste... não está correto
  it('tests the method PATCH att match by id', async () => {
    chaiHttpResponse = await chai

    .request(app)
    .patch('/matchs/:id')
    .send(mock.matchAttByIdBody)
    // console.log('AAAAAAAAAAAAAA', chaiHttpResponse.body);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.deep.equals(mock.matchAttById);
  });
});
