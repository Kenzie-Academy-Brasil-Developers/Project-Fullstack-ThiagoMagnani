## Objetivo do sistema:
O sistema foi desenvolvido para suportar múltiplos usuários com vários contatos, mantendo a praticidade. O site possui uma estrutura organizada para evitar confusões e garantir a clareza das informações de forma dinâmica.

### Tela principal
- Funcionalidades de criação, edição e exclusão de contatos.
- Layout de fácil leitura e navegação.
- Responsividade garantida para diferentes tamanhos de tela.
- Estrutura dinâmica que se ajusta conforme a quantidade e tamanho dos contatos.

## Instalação

```bash
$ npm i
```

## Execução

```bash
$ npm run dev
```

### Importante:

Certifique-se de iniciar tanto o banco de dados quanto o front-end simultaneamente, pois ambos estão interligados. Siga as etapas abaixo para garantir que o sistema funcione corretamente:

1. **Inicie o Banco de Dados:**
    - Navegue até o diretório do projeto back-end.
    - Faça as instalações iniciais.
    - Execute os comandos de migração do Prisma, se necessário.
    - Execute `npm run start:dev` para iniciar o servidor back-end.

2. **Inicie o Front-End:**
    - Navegue até o diretório do projeto front-end.
    - Faça as instalações iniciais.
    - Execute `npm run dev` para iniciar o servidor front-end.

Ao iniciar ambos os serviços, o sistema estará pronto para uso e todas as funcionalidades estarão disponíveis.

## Back-End / Banco de Dados

## Funcionalidades Principais:
- Criação de usuários, login e manipulação de informações.
- Gerenciamento de contatos, incluindo busca por ID e cliente.
- Geração de PDFs organizados, com páginas separadas para cada cliente.
    - Caso o número de contatos exceda o limite da página, uma nova página é criada automaticamente com o nome do cliente responsável pelos contatos, evitando cortes de informações.

## Formatação no PDF:
- Emails e telefones dos contatos são representados como arrays para suportar múltiplos itens.
- O número de telefone é automaticamente formatado com DDD no formato padrão.

## Rotas:
- Todas as rotas marcadas com (*) requerem autenticação com token atravez da rota de login.

### Clientes:
- Post `/users`: Criação de usuários.
- Login `/login`: Login de usuários.
- *Get `/users`: Listagem de usuários.
- *Get `/users/:id`: Detalhes de um usuário.
- *Patch `/users/:id`: Atualização de informações de um usuário.
- *Delete `/users/:id`: Exclusão de um usuário.

### Contatos:
- *Post `/contact`: Criação de um contato.
- *Get `/contact`: Listagem de contatos.
- *Get `/contact/:contact_id`: Detalhes de um contato por ID.
- *Get `/contact/:clientId`: Listagem de contatos de um cliente.
- *Patch `/contact/:contact_id`: Atualização de informações de um contato.
- *Delete `/contact/:contact_id`: Exclusão de um contato.

### Criação de PDF:
- *Get `/contact/generate-pdf/user`: Geração de PDF contendo informações de usuários e contatos.

## Instalação

```bash
$ npm i
$ npm i @prisma/client
$ npm i prisma -D
$ npx prisma generate
$ npm i bcryptjs
$ npm i @types/bcryptjs -D
$ npm i class-validator class-transformer
$ npm i pdfkit
$ npm i @nestjs/passport passport @nestjs/jwt passport-jwt dotenv
```

## Migração

```bash
$ npx prisma migrate dev
```

## Execução

```bash
# desenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev

# modo de produção
$ npm run start:prod
```

## Testes

```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de teste
$ npm run test:cov
```

> Essas instruções fornecem uma visão completa de como instalar, configurar e executar o front-end e o back-end do seu projeto. Certifique-se de seguir todos os passos para garantir o funcionamento adequado do sistema.
