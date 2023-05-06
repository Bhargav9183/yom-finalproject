const sliderModel = require('../../model/categoryModel')
const recentPost = require('../../model/user/recentPostModel')
const blogpostModel = require('../../model/user/blogpostModel');




const home = async (req, res) => {
    try {
        const slider = await sliderModel.find({});
        const recentpost = await recentPost.find({}).sort({ _id: -1 });
        const Blogpost = await blogpostModel.find({});
        if (slider && recentpost) {
            return res.render('user/yomindex',{slider,recentpost,Blogpost});
        }
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = { home }