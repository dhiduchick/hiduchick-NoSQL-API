const {User,Thought} = require('../models');

module.exports = {
    async getUsers(req,res) {
        try {
            const user = await User.find()
            .populate('friends')
            .populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser (req,res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
            .populate('friends')
            .populate('thoughts');

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    
}