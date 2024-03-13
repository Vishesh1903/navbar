const MasterClass = require('../models/MasterClass');

async function masterClassRoutes(fastify, options) {
  fastify.get('/masterclasses', async (request, reply) => {
    try {
      const masterClasses = await MasterClass.find();
      return masterClasses;
    } catch (error) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });

  fastify.get('/masterclasses/search', async (request, reply) => {
    const { name } = request.query;
    try {
      const masterClasses = await MasterClass.find({ name: { $regex: name, $options: 'i' } });
      return masterClasses;
    } catch (error) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });
}

module.exports = masterClassRoutes;
