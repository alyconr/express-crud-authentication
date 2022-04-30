const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bio : {
        type: String,
    },
    active : {
        type: Boolean,
        default: false
    }
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

//hash password before saving

schema.pre('save', function(next) {
   if (this.isModified('password')) {
       bcrypt.hash(this.password, 10)
         .then(hashedPassword => {
                this.password = hashedPassword;
                next();
            })
            .catch(next);
    } else {
        next();
    }
});

//check password

schema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};






module.exports = mongoose.model('User', schema);