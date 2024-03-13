const LearningPath = require('../models/LearningPath');

async function learningPathRoutes(fastify, options) {
  fastify.get('/learning-paths', async (request, reply) => {
    try {
      const learningPaths = await LearningPath.find();
      return learningPaths;
    } catch (error) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });

  fastify.get('/learning-paths/search', async (request, reply) => {
    const { name } = request.query;
    try {
      const learningPaths = await LearningPath.find({ name: { $regex: name, $options: 'i' } });
      return learningPaths;
    } catch (error) {
      reply.code(500);
      return { error: 'Internal Server Error' };
    }
  });
}

module.exports = learningPathRoutes;
