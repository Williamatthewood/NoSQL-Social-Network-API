const { Thought, User } = require('../models');

module.exports = {
    //GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET a thought by ID
    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    // POST a thought. req.body should have userId and push the thought's _id to that user 
    async createThought(req, res) {
        try {
        //is it ok to send the userId i the body? maybe just send username and try findOneAndUpdate with username instead?
        const thought = await Thought.create(req.body);
        
        //push the newly created thought to the associated user
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id }},
            { runValidators: true, new: true }
        );

        res.json(thought, user);
        } catch (err) {
        console.log(err);
        return res.status(500).json(err);
        }
    },
    //PUT/ update a thought by ID
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err){
            res.status(500).json(err);
        }
    },

    //DELETE a thought by ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought) {
                return res.status(404).json({ message: 'No such user exists' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // /api/thoughts/:thoughtId/reactions

    //POST - create a new reaction stored in a single thought's reactions array field
    

    //DELETE - pull and remove a reaction by the reactionId
}