const recentPost = require('../model/user/recentPostModel');
const path = require('path');
const imgPath = path.join('uploads')
const fs = require('fs')
const recentPosts = async (req, res) => {

    try {
        const recentPostdata = await recentPost.find({});
        if (recentPostdata) {
            return res.render('recentPost',{recentPostdata});
        }
    } catch (error) {
        console.log(error.message);
    }
}

const recentpostinsert = async (req, res) => {

    try {
        const { title, subtitle, image } = req.body

        const img = `${imgPath}/${req.file.filename}`;
        const recentpostData = await recentPost.create({ title, subtitle, image: img });

        if (recentpostData) {
            console.log('post added successfully');
            return res.redirect('back');
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error.message);
    }

}

const recentPostsdelete = async (req, res) => {
       
    try {
        const id = req.params.id
        const recentpost = await recentPost.findByIdAndDelete(id);
        if (recentpost) {
            fs.unlinkSync(recentpost.image);
            return res.redirect('back');
        } else {
            console.log('successfully deleted');
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error.messsage);
    }
}

const recentPostsedit = async(req,res)=>{
          
    try {
        const { id } = req.params
        const data = await recentPost.findById(id);
        if (data) {
            return res.render('updateRecentPost', { upd: data })
        } else {
            return res.redirect('back');
        }

    } catch (error) {
        console.log(error.message);
    }
}

const recentpostinsertData = async(req,res)=>{
     
    const { id } = req.params;
    const { title, subtitle } = req.body;
    if (req.file) {
        let img = `${imgPath}/${req.file.filename}`;
        let obj = {
            title, subtitle, image: img
        }
        const data = await recentPost.findByIdAndUpdate(id, obj);
        if (data) {
            console.log('req.file updated thy gy');
            fs.unlinkSync(data.image);
        }
        return res.redirect('/recentpost')
    } else {
        let obj = {
            title, subtitle
        }
        const data = await recentPost.findByIdAndUpdate(id, obj);
        if (data) {
            return res.redirect('/recentpost')
        } else {
            res.redirect('back')
        }
    }
      
}

const recentPostactive = async (req,res)=>{
       
    try {
        const { id } = req.params
        const status = 0
        const data = await recentPost.findByIdAndUpdate(id, { status: status });
        if (data) {
            return res.redirect('/recentpost')
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const recentPostdeactive = async(req,res)=>{
    try {
        const { id } = req.params
        const status = 1
        const data = await recentPost.findByIdAndUpdate(id, { status: status });
        if (data) {
            return res.redirect('/recentpost')
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { recentPosts, recentpostinsert,recentPostsdelete,recentPostsedit ,recentpostinsertData,recentPostactive,recentPostdeactive}