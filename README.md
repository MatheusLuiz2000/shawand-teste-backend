
# Bibliotecas

|                |                              |
|----------------|------------------------------|
| Estrutural     | MVC, REST, Express, sucrase  |
| Banco de dados | Sequeliz ou Knex               |
| Segurança      | Passport, JWT, Hash Interna    |
| Auxiliares     | Consign, Yup, Eslint,  Prettier, Typescript |
| TDD (testes)   | Jest, Super Teste             |

---
### Bibliotecas Usadas
- Estrutural
    - **REST** - Representational State Transfer, e tem como objetivo primário a definição de características fundamentais para a construção de aplicações Web seguindo boas práticas.
    - **Express** - Representational State Transfer, e tem como objetivo primário a definição de características fundamentais para a construção de aplicações Web seguindo boas práticas.
---

### Estrutura de Arquivos

A estrutura de arquivos está da seguinte maneira:

```bash
service-pattern
├── src/
│   ├── server.js
│   ├── routes.js
│   ├── app/
│   │   └── controllers/
│   │   └── models/
│   │   └── squemas/
│   │   └── helpers/
│   │   └── docs/
│   │   └── validators/
│   ├── config/
│   │   └── database.js
│   │   └── middlewares.js
│   │   └── passsport.js
│   ├── database/
│   │   └── index.js
│   │   └── migrations/
│   │   └── seeds/
│   ├── services/
│   │   └── log.js
│   ├── lib/
├── __tests__
├── apidocs/
├── .env
├── .editorconfig
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── .sequelizerc
├── apidoc.json
├── package.json
└── README.md
```

---

### Descrição

Nesta seção haverão instruções caso você queira editar o template, explicando para que os diretórios são utilizados e também os arquivos de configuração.

- **src** - Diretório contendo todos os arquivos da aplicação, é criado um diretório `src` para que o código da aplicação possa ser isolado em um diretório e facilmente portado para outros projetos, se necessário;
  - **server.js** - Arquivo com a configuraçāo das rotas do sistema;
  - **routes.js** - Arquivo com a configuraçāo das rotas do sistema;

  - **app** - Diretório para guardar os arquivos;
    - **controllers** - O responsável por receber todas as requisições do usuário;
    - **models** - Ele é responsável pela leitura e escrita de dados, e também de suas validações.;
    - **squemas** - Cada esquema é mapeado para uma coleção do MongoDB e define a forma dos documentos nessa coleção;
    - **helpers** - Os auxiliares são apenas pequenas funções que ajudam a evitar códigos repetitivos e a produzir resultados padrão;

  - **config** - Diretório para guardar os arquivos de configuração da aplicação, por exemplo, a configuração do banco de dados e configuração de inicialização das rotas;
    - **database.js** - Arquivo com a configuraçāo do banco de dados;
    - **middlewares.js** - Arquivo com a configuraçāo dos middlewares globais da aplicação;
    - **passsport.js** - Arquivo com a configuraçāo de autenticaçāo da aplicação;

  - **services** - Diretório para guardar os arquivos para comunicaçāo com outras apis;
    - **log.js** - Arquivo com a comunicaçāo/configuraçāo do serviço de log;

  - **lib** - Bibliotecas contêm classes, podem incluir arquivos diferentes;

- **\_\_tests\_\_** - Pasta onde fica os teste automaticos da aplicaçāo via jest;
- **docs** - Pasta pode fica os arquivos da documentaçāo;

- **.env** - O armazenamento da configuração no ambiente separado do código.
- **.editorconfig** - O armazenamento da configuração do editor de código.
- **.eslintrc.js** - Permite especificar as opções de padrão do código JavaScript.
- **.gitignore** - Arquivo especifica arquivos não rastreados intencionalmente que o Git deve ignorar.
- **.prettierrc** - Configuração do padrāo de código automático.
- **.sequelizerc** - Configuração do Sequilize.
- **apidoc.json** - Configuração do Apidoc.

- **package.json** - Diferente dos projetos comuns, esse arquivo tem as configurações necessárias para a publicação do Template no NPM ou YARN.

---