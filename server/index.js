const fastify = require('fastify')({ logger: true });
const connectToDB = require('./db');
const categoriesRoutes = require('./routes/categories');
const fastifyCors = require('@fastify/cors');

connectToDB();

fastify.register(fastifyCors, {
  origin: '*',
});

fastify.register(categoriesRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log('Server started on port 5000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
