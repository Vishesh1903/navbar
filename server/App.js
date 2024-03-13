const fastify = require('fastify');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = fastify();


mongoose.connect('mongodb://localhost:27017/upsurge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.register(routes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
