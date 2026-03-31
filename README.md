# banco-api-tests

## Objetivo
Suite de testes automatizados para a API do projeto "banco-api". O objetivo é validar endpoints de autenticação (login) e transferências, garantindo respostas e comportamentos esperados (códigos HTTP, formato de resposta, regras de negócio como limite mínimo de transferência, paginação, etc.).

## Stack utilizada
- Node.js (CommonJS)
- Mocha (runner)
- Chai (assertions)
- SuperTest (requisições HTTP aos endpoints)
- Mochawesome (relatórios HTML)
- dotenv (carregar variáveis de ambiente)

> As dependências exatas estão em `package.json` (devDependencies: mocha, chai, supertest, mochawesome; dependencies: dotenv).

## Estrutura do projeto
```
banco-api-tests/
  .env                   # (não cometido) arquivo de variáveis de ambiente
  fixtures/
    postLogin.json
    postTransferencias.json
  helpers/
    autenticacao.js      # helper para obter token via /login
  mochawesome-report/    # saída/relatórios gerados pelo mochawesome
    mochawesome.html
    mochawesome.json
    assets/              # css/js para o relatório
  test/
    login.test.js
    transferencias.test.js
  package.json
```

Arquivos principais:
- `test/*.test.js` — suítes de teste (Mocha).
- `fixtures/*.json` — cargas de exemplo (payloads) usadas nos testes.
- `helpers/autenticacao.js` — utilitário que realiza login (POST /login) usando `process.env.BASE_URL`.
- `mochawesome-report/` — pasta de relatório gerada pelo reporter (já contém um relatório de exemplo no repositório).

## Formato do arquivo `.env`
Os testes usam apenas a variável `BASE_URL` (carregada via `dotenv`). Crie um arquivo `.env` na raiz do projeto `banco-api-tests` com o seguinte conteúdo:

```
# URL base da API que os testes irão executar as requisições
BASE_URL=http://localhost:3000
```

Observações:
- Ajuste a URL (host/porta) para apontar para sua instância da `banco-api` (por exemplo quando estiver rodando localmente ou em um container).

## Comandos úteis
Abra um terminal (bash) e navegue até a pasta `banco-api-tests`.

Instalar dependências:
```bash
cd "d:/Mentoria 2.0/projetos-praticos/banco/banco-api-tests"
npm install
```

Executar a suíte de testes (usa Mocha com o reporter Mochawesome):
```bash
npm test
```

Após a execução, o relatório HTML padrão do Mochawesome será gerado (ou atualizado) em:
```
mochawesome-report/mochawesome.html
```
Abra esse arquivo no navegador para visualizar o relatório.

Exemplo rápido para abrir no Windows (bash):
```bash
# Abre o relatório com o explorador padrão do Windows
explorer.exe "mochawesome-report/mochawesome.html"
```

## Variáveis/credenciais de teste
- Nos testes de exemplo, o helper `obterToken` é chamado com as credenciais `('julio.lima', '123456')` (veja `test/transferencias.test.js`). Essas contas podem ser fixtures da API de teste — ajuste conforme sua base de dados ou ambiente de teste.

## Onde olhar nos testes
- `test/login.test.js` — valida login válido e cenários de falha (código 400 e mensagem de erro).
- `test/transferencias.test.js` — cobre criação de transferência (sucesso e falha por valor), obtenção por id e paginação.

## Links úteis (documentação das dependências)
- Node.js: https://nodejs.org/
- npm: https://docs.npmjs.com/
- Mocha: https://mochajs.org/
- Chai: https://www.chaijs.com/
- SuperTest: https://github.com/visionmedia/supertest
- Mochawesome: https://github.com/adamgruber/mochawesome
- dotenv: https://github.com/motdotla/dotenv

## Notas finais
- Este README está pensado para o repositório `banco-api-tests` (apenas a suíte de testes). Para rodar os testes com sucesso, a API alvo (`banco-api`) deve estar disponível em `BASE_URL`.
- Se desejar, posso: 
  - adicionar um script `npm run report:open` para abrir automaticamente o relatório;
  - incluir exemplos de `.env.example` e adicioná-lo ao repositório;
  - adaptar os testes para suportar múltiplos ambientes (ex.: CI).

---
Gerado automaticamente para o projeto de testes `banco-api-tests`. Ajuste credenciais e `BASE_URL` conforme seu ambiente de execução.
