const mongoose = require('mongoose');

const postschema = mongoose.Schema({
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

const recentPost  = mongoose.model('post-recent',postschema);

module.exports = recentPost;