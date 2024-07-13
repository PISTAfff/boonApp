const app = require('./server.js');
const port = process.env.PORT || 3000;

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server running on port http//LocalHost:${port}`);
  });
};

startServer();
