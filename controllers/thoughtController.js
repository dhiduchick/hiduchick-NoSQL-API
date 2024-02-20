const {Thought, User} = require('../models');

module.exports = {
    async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req,res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
            .select('-__V');

            if(!thought) {
                return res.status(400).json({message: "No thought with that ID"})
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought(req,res){
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts:thought.id}},
                {new:true},
            )
            if (!user) {
                return res.status(400).json({message: 'No user found with that username'})
            }
            res.json(thought);
        }catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            if (!thought) {
                return res.status(400).json({message:'No thoughts exists with that ID'})
            }
            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new:true}
            )
            if (!user){
                return res.status(400).json({message: 'Thought has been deleted, but no users have been found'})
            }
            res.json({message:'Thought successfully deleted'})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $set: req.body },
                {runValidators: true, new:true}
            );
            if (!thought) {
                res.status(400).json({ message:'No thought found with this ID'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new:true}
            )
            if(!thought) {
                return res.status(400).json({message: 'No thought found with that ID'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $pull: {reactions: {_id: req.params.reactionId}}},
                {runValidators: true, new:true}
            );
            if(!thought) {
                return res.status(400).json({message:'No thought found with that ID'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
}