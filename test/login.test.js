const request = require('supertest');
const { expect } = require('chai');

describe('Login', () => {
  describe('POST /login', () => {
    it('Deve retornar 200 com o token em string quando usar credenciais válidas',
      async () => {
        const response = await request('http://localhost:3000')
          .post('/login')
          .set('Content-Type', 'application/json')
          .send({
            username: 'julio.lima',
            senha: '123456'
          })

        expect(response.status).to.equal(200);
        expect(response.body.token).to.be.a('string');
      });
  });

  describe('POST /login', () => {
    it('Deve retornar 400 com mensagem de erro quando não enviar as credenciais',
      async () => {
        const response = await request('http://localhost:3000')
          .post('/login')
          .set('Content-Type', 'application/json')
          .send({ username: '', senha: '' })


        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Usuário e senha são obrigatórios.');
      });
  });

});