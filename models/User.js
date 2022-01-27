var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;
     
var UserSchema = new Schema({
    nickname: { type: String, required: true },
    google: {
        type: String,
        index: true,
        unique: true,
        sparse: true
    },
    yandex: {
        type: String,
        index: true,
        unique: true,
        sparse: true
    },
    vkontakte: {
        type: String,
        index: true,
        unique: true,
        sparse: true
    },
    discord: {
        type: String,
        index: true,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        sparse: true
    },
    course: {
        type: Boolean,
        default: false
    },
    password: { type: String },
    profile: {
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Games'
        },
        avatar: {
            type: String,
            default: '/images/default-avatar.jpg',
            required: true
        }
    },
    slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LessonSlots'
    }]
});
     
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password') || !user.password) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    if (!this.password) {
        return cb('No password');
    }
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
     
module.exports = mongoose.model('User', UserSchema);
