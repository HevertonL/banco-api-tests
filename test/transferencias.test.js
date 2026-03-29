const request = require('supertest');
const { expect } = require('chai');
const { obterToken } = require('../helpers/autenticacao.js');
require('dotenv').config();


describe('Transferencias', () => {
  describe('POST /transferencias', () => {
    it('Deve retornar sucesso com 201 quando o valor da transferência for acima de R$ 10,00',
      async () => {
        const token = await obterToken('julio.lima', '123456')

        const resposta = await request(process.env.BASE_URL)
          .post('/transferencias')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .send({
            contaOrigem: 1,
            contaDestino: 2,
            valor: 10.01,
          });
        expect(resposta.status).to.equal(201);
      });
  });

  describe('POST /login', () => {
    it('Deve retornar falha com 422 quando o valor da transferência for abaixo de R$ 10,00',
      async () => {
        const token = await obterToken('julio.lima', '123456')

        const resposta = await request(process.env.BASE_URL)
          .post('/transferencias')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .send({
            contaOrigem: 1,
            contaDestino: 2,
            valor: 9.99,
          });
        expect(resposta.status).to.equal(422);
      });
  });

});