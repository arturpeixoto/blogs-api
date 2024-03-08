# Projeto de Desenvolvimento de API para Blog - Documentação

## Descrição do Projeto

Este projeto visa criar uma API e um banco de dados para a produção de conteúdo em um blog. A aplicação será desenvolvida em Node.js, utilizando o pacote Sequelize para realizar operações CRUD (Create, Read, Update e Delete) de posts.

### Funcionalidades Principais

- Desenvolvimento de endpoints conectados ao banco de dados, seguindo os princípios do REST para uma arquitetura robusta e escalável.
- Implementação de CRUD de posts, com a necessidade de autenticação de usuário para realizar postagens, garantindo segurança e controle de acesso.
- Estabelecimento de relações entre usuários e posts, permitindo que cada post seja atribuído a um autor específico.
- Utilização de categorias para classificar os posts, com a configuração de relações entre posts e categorias, além de categorias e posts, para uma organização eficiente do conteúdo do blog.

## Guia de Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto em sua máquina local:

    1. Faça um git clone ou fork este repositório.
    2. Navegue até o diretório do projeto: `cd nome-do-projeto`.
    3. Instale as dependencias com npm install
    4. Na raiz do projeto, execute o comando: docker-compose up -d --build.
    5. Acesse `http://localhost:3000/` pelo seu navegador.
    6. Acesse com login e senha que estão no banco de dados e são gerados pelo seeder.
