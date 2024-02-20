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
}