const Category = require('../models/Category');
const LearningPath = require('../models/LearningPath');
const Course = require('../models/Course');
const Masterclass = require('../models/Masterclass');

const getCategoriesByName = async (request, reply) => {
    try {
        const { name } = request.params;

        const regexPattern = new RegExp(name, 'i');

        const categories = await Category.find({ names: regexPattern })
            .populate('learningPaths courses masterclasses');

        const mergedCategories = mergeCategories(categories);

        reply.send(mergedCategories);
    } catch (error) {
        reply.status(500).send(error);
    }
}

const mergeCategories = (categories) => {
    const mergedCategory = {
        names: [],
        learningPaths: [],
        courses: [],
        masterclasses: []
    };

    categories.forEach(category => {
        // Merging different items
        mergedCategory.names.push(...category.names);
        mergedCategory.learningPaths.push(...category.learningPaths);
        mergedCategory.courses.push(...category.courses);
        mergedCategory.masterclasses.push(...category.masterclasses);
    });

    // Removing duplicates
    mergedCategory.names = [...new Set(mergedCategory.names)];
    mergedCategory.learningPaths = removeDuplicates(mergedCategory.learningPaths);
    mergedCategory.courses = removeDuplicates(mergedCategory.courses);
    mergedCategory.masterclasses = removeDuplicates(mergedCategory.masterclasses);

    return mergedCategory;
}

const removeDuplicates = (array) => {
    return array.filter((obj, index, self) =>
        index === self.findIndex((t) => (
            t._id === obj._id
        ))
    );
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
            learningPaths: learningPaths.map(path => path._id),
            courses: courses.map(course => course._id),
            masterclasses: masterclasses.map(masterclass => masterclass._id)
        });

        reply.code(201).send(category);
    } catch (error) {
        reply.status(500).send(error);
    }
}

module.exports = (fastify, opts, done) => {
    fastify.get('/categories/:name', getCategoriesByName);
    fastify.post('/categories', createCategory);
    done();
};