const {Schema, Types} = require('mongoose');
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            fet: reformatDate
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
function reformatDate(createdAt) {
    return createdAt.toLocaleDateString();
};

module.exports = reactionSchema;