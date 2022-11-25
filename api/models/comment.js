const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const commentSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    content: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    commentState: {
        type: String,
        required: true,
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

commentSchema.plugin(AutoIncrement, { id: 'comment_seq', inc_field: '_id' });
module.exports = mongoose.model('Comment', commentSchema);