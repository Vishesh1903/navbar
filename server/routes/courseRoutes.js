const Course = require('../models/Course');

async function courseRoutes(fastify, options) {
  fastify.get('/courses', async (request, reply) => {
    try {
      const courses = await Course.find();
      return courses;
    } catch (error) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });

  fastify.get('/courses/search', async (request, reply) => {
    const { name } = request.query;
    try {
      const courses = await Course.find({ name: { $regex: name, $options: 'i' } });
      return courses;
    } catch (error) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });
}

module.exports = courseRoutes;
