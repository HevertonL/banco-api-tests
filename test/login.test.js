const request = require('supertest');
const { expect } = require('chai');
const postLogin = require('../fixtures/postLogin.json');
require('dotenv').config();

describe('Login', () => {
  describe('POST /login', () => {
    it('Deve retornar 200 com o token em string quando usar credenciais válidas',
      async () => {
        const bodyLogin = { ...postLogin }
        const response = await request(process.env.BASE_URL)
          .post('/login')
          .set('Content-Type', 'application/json')
          .send(bodyLogin)
        expect(response.status).to.equal(200);
        expect(response.body.token).to.be.a('string');
      });
  });

  describe('POST /login', () => {
    it('Deve retornar 400 com mensagem de erro quando não enviar as credenciais',
      async () => {
        const response = await request(process.env.BASE_URL)
          .post('/login')
          .set('Content-Type', 'application/json')
          .send({ username: '', senha: '' })


        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Usuário e senha são obrigatórios.');
      });
  });

});