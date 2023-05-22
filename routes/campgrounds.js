const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const ExpressError = require('../utils/ExpressError');
const { campgroundSchemas } = require('../schemas');
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware');
const passport = require('passport');
const campgrounds = require('../controllers/campgrounds');


router.get('/', catchAsync(campgrounds.index));

router.post('/', isLoggedIn, catchAsync(campgrounds.createCampgrounds))

router.get('/new', isLoggedIn, catchAsync(campgrounds.renderNewForm))

router.get('/:id', catchAsync(campgrounds.showCampgrounds))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, catchAsync(campgrounds.updateCampground))

router.delete('/:id', isLoggedIn, catchAsync(campgrounds.deleteCampground))

module.exports = router;
