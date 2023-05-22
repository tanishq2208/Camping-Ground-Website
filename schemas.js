const BaseJoi = require('joi');
const review = require('./models/review');
const sanitizeHtml = require('sanitize-html');

// this method defined using sanitizeHtml provided below, adds extension of method escapeHTML() to joi.
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

const campgroundSchemas = Joi.object({
    campground : Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required,
        image: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML()
    }).required()
})

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    })
})

module.exports = {campgroundSchemas, reviewSchema};

// The file contains joi code to validate the data ad it not the schema definition.
