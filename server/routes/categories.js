const Category = require("../models/Category");
const LearningPath = require("../models/LearningPath");
const Course = require("../models/Course");
const Masterclass = require("../models/Masterclass");

const mergeCategories = (categories) => {
  const mergedCategory = {
    names: [],
    learningPaths: [],
    courses: [],
    masterclasses: [],
  };

  categories.forEach((category) => {
    mergedCategory.names.push(...category.names);
    mergedCategory.learningPaths.push(...category.learningPaths);
    mergedCategory.courses.push(...category.courses);
    mergedCategory.masterclasses.push(...category.masterclasses);
  });

  mergedCategory.names = [...new Set(mergedCategory.names)];
  mergedCategory.learningPaths = removeDuplicates(mergedCategory.learningPaths);
  mergedCategory.courses = removeDuplicates(mergedCategory.courses);
  mergedCategory.masterclasses = removeDuplicates(mergedCategory.masterclasses);

  return mergedCategory;
};

const removeDuplicates = (array) => {
  return array.filter(
    (obj, index, self) => index === self.findIndex((t) => t._id === obj._id)
  );
};

const getCategoriesByName = async (request, reply) => {
    try {
        const { name } = request.query;

        const regexPattern = new RegExp(name, 'i');

        const categoriesWithName = await Category.find({ names: regexPattern }).populate('learningPaths courses masterclasses');

        if (categoriesWithName.length > 0) {
            const mergedCategoryWithName = mergeCategories(categoriesWithName);
            reply.send(mergedCategoryWithName);
            return;
        }

        const categoriesWithoutName = await Category.find({
            $or: [
                { description: regexPattern },
                { learningPaths: { $in: await LearningPath.find({ $or: [{ title: regexPattern }, { description: regexPattern }] }).distinct('_id') } },
                { courses: { $in: await Course.find({ $or: [{ title: regexPattern }, { description: regexPattern }] }).distinct('_id') } },
                { masterclasses: { $in: await Masterclass.find({ $or: [{ title: regexPattern }, { description: regexPattern }] }).distinct('_id') } }
            ]
        }).populate('learningPaths courses masterclasses');

        if (categoriesWithoutName.length === 0) {
            reply.send([]);
            return;
        }

        
        const uniqueCategories = [];
        const uniqueCategoryTitles = new Set();

        for (const category of categoriesWithoutName) {
            if (!uniqueCategoryTitles.has(category.title)) {
                uniqueCategories.push(category);
                uniqueCategoryTitles.add(category.title);
            }
        }

        const highlightedCategories = uniqueCategories.map(category => {
            const highlightedCategory = { ...category.toObject() };

            highlightedCategory.names = [];

            highlightedCategory.description = regexPattern.test(category.description) ? category.description : '';
            highlightedCategory.learningPaths = category.learningPaths.filter(learningPath => regexPattern.test(learningPath.title) || regexPattern.test(learningPath.description));
            highlightedCategory.courses = category.courses.filter(course => regexPattern.test(course.title) || regexPattern.test(course.description));
            highlightedCategory.masterclasses = category.masterclasses.filter(masterclass => regexPattern.test(masterclass.title) || regexPattern.test(masterclass.description));

            return highlightedCategory;
        });

        const mergedCategory = mergeCategories([...categoriesWithName, ...highlightedCategories]);

        reply.send(mergedCategory);
    } catch (error) {
        reply.status(500).send(error);
    }
}
const createCategory = async (request, reply) => {
  try {
    const categoryData = request.body;

    const learningPaths = await LearningPath.create(categoryData.learningPaths);
    const courses = await Course.create(categoryData.courses);
    const masterclasses = await Masterclass.create(categoryData.masterclasses);

    const category = await Category.create({
      names: categoryData.names,
      description: categoryData.description,
      learningPaths: learningPaths.map((path) => path._id),
      courses: courses.map((course) => course._id),
      masterclasses: masterclasses.map((masterclass) => masterclass._id),
    });

    reply.code(201).send(category);
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = (fastify, opts, done) => {
  fastify.get("/categories", getCategoriesByName);
  fastify.post("/categories", createCategory);
  done();
};
