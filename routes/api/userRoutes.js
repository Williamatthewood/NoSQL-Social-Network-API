const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,

} = require('../../controllers/userController');

// /api/users

//GET all users
router.route('/').get(getUsers);

//POST a new user
router.route('/').post(createUser);

// /api/users/:userId

//GET single user
router.route('/:userId').get(getSingleUser);

//PUT update single user - update provided in req.body
router.route('/:userId').put(updateUser);

//DELETE single user
router.route('/:userId').delete(deleteUser);

// /api/users/:userId/friends/:friendId

//POST new friend
router.route('/:userId/friends/:friendId').post(addFriend);

//DELETE friend
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;