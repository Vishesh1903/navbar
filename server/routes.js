const instructorRoutes = require('./routes/instructorRoutes');
const categoryRoutes = require('./routes/categoryRoutes.js/index.js');
const learningPathRoutes = require('./routes/learningPathRoutes.js/index.js');
const courseRoutes = require('./routes/courseRoutes.js');
const masterClassRoutes = require('./routes/masterClassRoutes.js/index.js');

async function routes(fastify) {
  fastify.register(instructorRoutes);
  fastify.register(categoryRoutes);
  fastify.register(learningPathRoutes);
  fastify.register(courseRoutes);
  fastify.register(masterClassRoutes);
}

module.exports = routes;
