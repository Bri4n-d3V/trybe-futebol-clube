import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import clubsModel from '../database/models/clubs';
import * as mock from './mocks.test'
import * as homeLeaderboardSchema from '../schemas/homeLeaderboardSchema';
import * as awayLeaderboardSchema from '../schemas/awayLeaderboardSchema';
import * as allLeaderboardSchema from '../schemas/allLeaderboardSchema';


import { Response } from 'superagent';
import { doesNotMatch } from 'assert';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test querys leaderboard', async () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(homeLeaderboardSchema, "clubMatchs")
      .resolves(mock.homeLeaderboardFindAll as any);

      sinon
      .stub(awayLeaderboardSchema, "clubMatchs")
      .resolves(mock.awayLeaderboardFindAll as any);

      sinon
      .stub(allLeaderboardSchema, "concateMatchs")
      .resolves(mock.allLeaderboardConcat as any);
  });

  after(()=>{
    (homeLeaderboardSchema.clubMatchs as sinon.SinonStub).restore();
    (awayLeaderboardSchema.clubMatchs as sinon.SinonStub).restore();
    (allLeaderboardSchema.concateMatchs as sinon.SinonStub).restore();
  });

  it('tests the method GET away leaderboard', async () => {
    chaiHttpResponse = await chai

    .request(app)
    .get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.be.deep.equals(mock.awayLeaderboard)
  });

  it('tests the method GET all leaderboard', async () => {
    chaiHttpResponse = await chai

    .request(app)
    .get('/leaderboard')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.be.deep.equals(mock.allLeaderboard)
  });
});
