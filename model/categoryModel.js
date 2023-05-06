const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required : true
    },
    status:{
        type: String,
        default: 1
    }

})

const CategoryModel  = mongoose.model('categoydata',schema);

module.exports = CategoryModel;