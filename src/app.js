const express = require('express');
const { usersRoute, loginRoute, categoriesRoute, blogPostsRoute } = require('./routes');

// ..

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/user', usersRoute);
app.use('/login', loginRoute);
app.use('/categories', categoriesRoute);
app.use('/post', blogPostsRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
