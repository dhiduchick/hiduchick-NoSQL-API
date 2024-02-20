const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type:String,
            required: true,
            minLength: 1,
            maxLength: 280,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: reformatDate,
          },
          username: {
            type: String,
            required: true,
          },
          reactions: [reactionSchema],
        },
        {
          toJSON: {
            getters: true,
          },
        }
      );
      
      function reformatDate(createdAt) {
        return createdAt.toLocaleDateString();
      };
      
      thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
      })
      
      const Thought = model('thought', thoughtSchema);
      
      module.exports = Thought;
      