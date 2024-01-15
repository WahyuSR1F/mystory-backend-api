const express = require('express');
const router = express.Router();
const { home, getAllStory, searchStory, filterStories, addStory, addCapter, editStory, editCapter, deleteStory, deleteCapter, listCapter, detailStory, detailCapter } = require('./heandler')


router.get('/', home)
router.get('/list', getAllStory)
router.get('/list/capter', listCapter)
router.get('/list/search', searchStory)
router.get('/list/filter', filterStories)
router.get('/detail/story', detailStory)
router.get('/detail/capter', detailCapter)
router.post('/create', addStory)
router.post('/create/chapter', addCapter)
router.put('/update', editStory)
router.put('/update/chapter', editCapter)
router.delete('/delete', deleteStory)
router.delete('/delete/story', deleteCapter)

module.exports = router;