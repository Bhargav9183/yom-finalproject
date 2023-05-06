const CategoryModel = require('../model/categoryModel')
const path = require('path');
const imgPath = path.join('uploads')
const fs = require('fs');
const addcategory = async (req, res) => {
    try {
        const data = await CategoryModel.find({});
        if (data) {
            return res.render('Addcategory', { data })
        } else {
            console.log('err in view');
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error.message);
    }

}

const categoryData = async (req, res) => {

    try {
        const { title, subtitle, image } = req.body

        const img = `${imgPath}/${req.file.filename}`;
        const data = await CategoryModel.create({ title, subtitle, image: img });

        if (data) {
            console.log('category added successfully');
            return res.redirect('back');
        } else {
            return res.redirect('back')
        }

    } catch (error) {
        console.log(error.message);
    }
}

const deleteCategory = async (req, res) => {

    try {
        const id = req.params.id
        const data = await CategoryModel.findByIdAndDelete(id);
        if (data) {
            fs.unlinkSync(data.image);
            return res.redirect('back');
        } else {
            console.log('successfully deleted');
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error.messsage);
    }

}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const data = await CategoryModel.findById(id);
        if (data) {
            return res.render('editcategory', { upd: data })
        } else {
            return res.redirect('back');
        }

    } catch (error) {
        console.log(error.message);
    }
}
const updateDatacategory = async (req, res) => {
    const { id } = req.params;
    const { title, subtitle } = req.body;
    if (req.file) {
        let img = `${imgPath}/${req.file.filename}`;
        let obj = {
            title, subtitle, image: img
        }
        const data = await CategoryModel.findByIdAndUpdate(id, obj);
        if (data) {
            console.log('req.file updated thy gy');
            fs.unlinkSync(data.image);
        }
        return res.redirect('/addcategory')
    } else {
        let obj = {
            title, subtitle
        }
        const data = await CategoryModel.findByIdAndUpdate(id, obj);
        if (data) {
            return res.redirect('/addcategory')
        } else {
            res.redirect('back')
        }
    }
}

const activeCategory = async (req, res) => {
    try {
        const { id } = req.params
        const status = 0
        const data = await CategoryModel.findByIdAndUpdate(id, { status: status });
        if (data) {
            return res.redirect('/addcategory')
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error.message);
    }
}
const DeactiveCategory = async (req, res) => {
    try {
        const { id } = req.params
        const status = 1
        const data = await CategoryModel.findByIdAndUpdate(id, { status: status });
        if (data) {
            return res.redirect('/addcategory')
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = { addcategory, categoryData, deleteCategory, updateCategory, updateDatacategory, activeCategory, DeactiveCategory, }