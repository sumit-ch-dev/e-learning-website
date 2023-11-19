const sendResponse = require('../utils/common');
const HTTP_STATUS = require("../constants/statusCodes");
const Category = require('../models/categoryModel');

// Controller to create a new category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        // console.log(name)

        if (!name) {
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Name is required")
        }

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Category with this name already exists")
        }

        const newCategory = await Category.create({ name });

        // res.status(201).json(newCategory);
        return sendResponse(res, HTTP_STATUS.CREATED, "New Category Created", newCategory)
    } catch (error) {
        console.error(error);
        // res.status(500).json({ error: 'Internal Server Error' });
        return sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error")
    }
};


const getCategories = async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { createCategory, getCategories };
