const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlenght: 5
    },
    text: {
        type: String,
        required: true,
        maxlenght: 5
    },
    author: {
        type : String,
        required: true,
    },
},
{
    timestamps: true, //createdAt, updatedAt
    versionKey: false, //remove version key
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('Post', schema);
