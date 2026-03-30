const request = require('supertest');
const { expect } = require('chai');
const { obterToken } = require('../helpers/autenticacao.js');
const postTransferencias = require('../fixtures/postTransferencias.json');
require('dotenv').config();


describe('Transferencias', () => {
  let token

  beforeEach(async () => {
    token = await obterToken('julio.lima', '123456')
  })

  describe('POST /transferencias', () => {

    it('Deve retornar sucesso com 201 quando o valor da transferência for acima de R$ 10,00',
      async () => {
        const bodyTransferencias = { ...postTransferencias }

        const resposta = await request(process.env.BASE_URL)
          .post('/transferencias')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .send(bodyTransferencias);
        expect(resposta.status).to.equal(201);
      });
  });

  describe('POST /transferencias', () => {
    it('Deve retornar falha com 422 quando o valor da transferência for abaixo de R$ 10,00',
      async () => {
        const bodyTransferencias = { ...postTransferencias }
        bodyTransferencias.valor = 9.99
        const resposta = await request(process.env.BASE_URL)
          .post('/transferencias')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .send(bodyTransferencias);
        expect(resposta.status).to.equal(422);
      });
  });

});