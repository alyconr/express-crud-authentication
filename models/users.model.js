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
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    password: {
        type: String,
        required: true,
     
    },
    bio : {
        type: String,
    },
    validate : { //validate the user
        type: Boolean, //if the user is active or not
        default: false //
    },
    social : {
        provider: String, //google
        id: String
},
},
{
    timestamps: true, //createdAt, updatedAt
    versionKey: false, //remove version key
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id; //remove _id from response
            delete ret._id; //
            delete ret.__v;
        }
    }
});

//hash password before saving

schema.pre('save', function(next) { //pre save hook
   if (this.isModified('password')) { //if password is modified
       bcrypt.hash(this.password, 10) //hash password
         .then(hashedPassword => { //save hashed password
                this.password = hashedPassword;
                next(); //continue
            })
            .catch(next);
    } else { //if password is not modified
        next(); //continue
    }
});

//check password

schema.methods.checkPassword = function(password) { //method
    return bcrypt.compare(password, this.password); //compare password
};







module.exports = mongoose.model('User', schema);