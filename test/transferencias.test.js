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
        bodyTransferencias.valor = 9.99;
        const resposta = await request(process.env.BASE_URL)
          .post('/transferencias')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .send(bodyTransferencias);
        expect(resposta.status).to.equal(422);
      });
  });

  describe('GET /transferencias/{id}', () => {
    it('Deve retornar sucesso com 200 e dados iguais ao registro de transferência contido no banco de dados quando o id for válido',
      async () => {
        const resposta = await request(process.env.BASE_URL)
          .get('/transferencias/11')
          .set('Authorization', 'Bearer ' + token)

        const bodyEsperado = {
          id: 11,
          conta_origem_id: 1,
          conta_destino_id: 2,
          valor: '10.01',
          data_hora: '2026-03-30T20:47:39.000Z',
          autenticada: 0
        }

        expect(resposta.status).to.equal(200);
        expect(resposta.body).to.deep.equal(bodyEsperado);

      });
  });

  describe('GET /transferencias', () => {
    it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros',
      async () => {
        const resposta = await request(process.env.BASE_URL)
          .get('/transferencias?page=1&limit=10')
          .set('Authorization', 'Bearer ' + token)


        expect(resposta.status).to.equal(200);
        expect(resposta.body.limit).to.equal(10);
        expect(resposta.body.transferencias.length).to.equal(10);

      });

  });

});