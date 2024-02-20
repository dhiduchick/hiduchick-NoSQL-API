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

    
}