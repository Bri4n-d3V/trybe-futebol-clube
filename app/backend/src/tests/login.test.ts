import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import usersModel from '../database/models/users';
import * as mock from './mocks.test'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test User Model', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(usersModel, "findOne")
      .resolves(mock.loginFindOne as any);
  });

  after(()=>{
    (usersModel.findOne as sinon.SinonStub).restore();
  })

  it('tests the method POST "create login"', async () => {
    chaiHttpResponse = await chai

    .request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.deep.equals(mock.loginCreated);
  });

  it('tests the method GET "validate login"', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('Authorization', mock.loginCreated.token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('string');
    expect(chaiHttpResponse.body).to.be.deep.equals("admin");
  });
});
