const Instructor = require('../models/Instructor');

async function instructorRoutes(fastify, options) {
  fastify.get('/instructors', async (request, reply) => {
    try {
      const instructors = await Instructor.find();
      return instructors;
    } catch (error) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });

  fastify.get('/instructors/search', async (request, reply) => {
    const { name } = request.query;
    try {
      const instructors = await Instructor.find({ name: { $regex: name, $options: 'i' } });
      return instructors;
    } catch (error) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });
}

module.exports = instructorRoutes;
