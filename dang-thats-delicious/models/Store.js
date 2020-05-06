const mongoose = require('mongoose');
// Sets Mongoose Promise property to be global
mongoose.Promise = global.Promise;
const slug = require('slugs');

//Schema

const storeSchema = new mongoose.Schema({

        name: {
            type: String,
            trim: true,
            required: 'Please enter a store name!'
        },
        slug: String,
        description: {
            type: String,
            trim: true
        },
        tags: [String]


});

storeSchema.pre('save', function(next) {
    if (!this.isModified('name')) {
        next(); //skip it
        return; // stop this function from running

    }
    this.slug = slug(this.name);
    next();
});

module.exports = mongoose.model('Store', storeSchema);
