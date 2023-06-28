const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts

//GET all thoughts
router.route('/').get(getThoughts);

//POST create new thought
router.route('/').post(createThought);

// /api/thoughts/:thoughtId

//GET single thought
router.route('/:thoughtId').get(getSingleThought);

//PUT update single thought - update provided in req.body
router.route('/:thoughtId').put(updateThought);

//DELETE thought
router.route('/:thoughtId').delete(deleteThought);

// /api/thoughts/:thoughtId/reactions

//POST a new reaction - reaction provided in req.body
router.route('/:thoughtId/reactions').post(addReaction);

//DELETE reaction
router.route('/:thoughtId/reactions').delete(deleteReaction);

module.exports = router;