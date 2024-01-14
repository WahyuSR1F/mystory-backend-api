const express = require('express');
const router = express.Router();
const { home, getAllStory, searchStory, filterStories } = require('./heandler')

router.get('/', home)
router.get('/list', getAllStory)
router.get('/list/search', searchStory)
router.get('/list/filter', filterStories)

module.exports = router;