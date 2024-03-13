const Category = require('../models/Category');

async function categoryRoutes(fastify, options) {
  fastify.get('/categories', async (request, reply) => {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });

  fastify.get('/categories/search', async (request, reply) => {
    const { name } = request.query;
    try {
      const categories = await Category.find({ name: { $regex: name, $options: 'i' } });
      return categories;
    } catch (error) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });
}

module.exports = categoryRoutes;
