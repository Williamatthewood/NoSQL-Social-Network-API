const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    //GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //GET Single User
    //TODO: populate thought and friend data
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends');

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //POST new user
    async createUser(req, res) {
        try{
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //PUT/ update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!user) {
                res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err){
            res.status(500).json(err);
        }
    },

    //DELETE a user
    async deleteUser(req, res) {
        try { //might need to be findOneAndRemove? Documentation said this should work
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if(!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }
            //TODO: BONUS: delete associated thoughts?
            //first, find the username of the user by id since we have it
            // then do a deleteMany using that username as the criteria
            // const thoughts = await Thought.deleteMany({ username: }) 
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //POST a new friend to the user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );

            if(!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    //DELETE a friend on the user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friend: { _id: req.params.friendId }}},
                { runValidators: true, new: true}
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}