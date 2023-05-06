const blogpostModel = require('../model/user/blogpostModel');
const path = require('path');
const imgPath = path.join('uploads')
const fs = require('fs')


const blogpost = async (req, res) => {

    try {
        const blogPostdata = await blogpostModel.find({});
        if (blogPostdata) {
            return res.render('blogPost',{blogPostdata});
        }
    } catch (error) {
        console.log(error.message);
    }
   
}

const blogpostData = async (req, res) => {
      
    try {
        const { title, description, date,author } = req.body

        const img = `${imgPath}/${req.file.filename}`;
        const recentpostData = await blogpostModel.create({ title, description, date,author, image: img });

        if (recentpostData) {
            console.log('blogpost added successfully');
            return res.redirect('back');
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const blogpostDelete = async (req,res)=>{
     
    try {
        const id = req.params.id
        const blogpost = await blogpostModel.findByIdAndDelete(id);
        if (blogpost) {
            fs.unlinkSync(blogpost.image);
            return res.redirect('back');
        } else {
            console.log('successfully deleted');
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error.messsage);
    }
}

const blogpostedit = async(req,res)=>{
       
    try {
        const { id } = req.params
        const data = await blogpostModel.findById(id);
        if (data) {
            return res.render('updareblogPost', { upd: data })
        } else {
            return res.redirect('back');
        }

    } catch (error) {
        console.log(error.message);
    }
}

const blogpostupdated = async (req,res)=>{
   
         
    const { id } = req.params;
    const { title, description, date,author } = req.body
    if (req.file) {
        let img = `${imgPath}/${req.file.filename}`;
        let obj = {
            title, description,date,author ,image: img
        }
        const data = await blogpostModel.findByIdAndUpdate(id, obj);
        if (data) {
            console.log('req.file updated thy gy');
            fs.unlinkSync(data.image);
        }
        return res.redirect('/blogpost')
    } else {
        let obj = {
            title, description,date,author
        }
        const data = await blogpostModel.findByIdAndUpdate(id, obj);
        if (data) {
            return res.redirect('/blogpost')
        } else {
            res.redirect('back')
        }
    }
        
}

const blogpostActive = async(req,res)=>{

    try {
        const { id } = req.params
        const status = 0
        const data = await blogpostModel.findByIdAndUpdate(id, { status: status });
        if (data) {
            return res.redirect('/blogpost')
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const blogpostDeactive = async (req,res)=>{
  
    try {
        const { id } = req.params
        const status = 1
        const data = await blogpostModel.findByIdAndUpdate(id, { status: status });
        if (data) {
            return res.redirect('/blogpost')
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const blogFullPost = async (req,res)=>{
      try {

          const id = req.params.id;
          const blogdatass = await blogpostModel.findById(id);
          if(blogdatass){
            res.render('fullBlog',{blogdatass})
          }
      } catch (error) {
        console.log(error.message);
      }
}

module.exports = { blogpost, blogpostData,blogpostDelete,blogpostedit,blogpostupdated ,blogpostActive,blogpostDeactive,blogFullPost}