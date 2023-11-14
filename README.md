# Projeto de Desenvolvimento de API para Blog - Documentação

## Descrição do Projeto

Neste projeto, desenvolvi uma API e um banco de dados para a produção de conteúdo em um blog. A aplicação será construída em Node.js, utilizando o pacote Sequelize para implementar operações CRUD de posts.

### Funcionalidades Principais

- Desenvolvimento de endpoints conectados ao banco de dados seguindo os princípios do REST.
- Implementação de CRUD de posts, considerando a necessidade de usuário e login para realizar postagens.
- Estabelecimento da relação entre usuário e post.
- Utilização de categorias para classificar os posts, trabalhando nas relações de posts para categorias e de categorias para posts.

## Guia de Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto em sua máquina local:

    1. Faça um git clone ou fork este repositório.
    2. Navegue até o diretório do projeto: `cd nome-do-projeto`.
    3. Instale as dependencias com npm install
    4. Na raiz do projeto, execute o comando: docker-compose up -d --build.
    5. Acesse `http://localhost:3000/` pelo seu navegador.
    6. Acesse com login e senha que estão no banco de dados e são gerados pelo seeder.
