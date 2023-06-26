const { Schema, model } = require('mongoose');
//TODO: create reactionSchema and export
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now()
            //TODO: getter method to format the timestamp on query?
        },
        username: { //need to get the user that creates the thought
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;