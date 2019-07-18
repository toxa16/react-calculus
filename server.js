const { Server } = require('http');
const express = require('express');

const app = express();
app.use(express.static('./dist'));

const server = new Server(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('react-calculus server listening on port ' +
    server.address().port + '...');
});
