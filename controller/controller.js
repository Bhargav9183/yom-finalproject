const RegisterModel = require("../model/registerModel")
const nodemailer = require('nodemailer')
const cookie = require('cookie-parser');
const oTP = Math.floor(Math.random() * 1000000);

const sendVeryfiMail = async (name, email, userid) => {
    try {
        const transporter = nodemailer.createTransport({

            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'makwana9183@gmail.com',
                pass: 'grczzomxewghipga'
            }

        })

        const mailoptions = {
            from: 'makwana9183@gmail.com',
            to: email,
            subject: 'For veryfication Mail',
            html: name + 'Your OTP IS :' + oTP
        }
        transporter.sendMail(mailoptions, function (err, info) {

            if (err) {
                console.log(err.message);

            } else {
                console.log('email has been sent', info.response);
            }

        })

    } catch (error) {
        console.log(error.message);
    }

}
const home = (req, res) => {
    res.render('home')
}

const register = (req, res) => {
    res.render('register')
}
const registerData = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const data = await RegisterModel.create({ username, email, password });
        if (data) {
            return res.redirect('/login');
        } else {
            console.log('register in error');
            return res.redirect('back');
        }

    } catch (error) {
        console.log(error.message);
    }
}
const login = (req, res) => {
    if (res.locals.user) {
        return res.redirect('/home')
    }
    return res.render('login')
}

const loginDAta = async (req, res) => {
    res.redirect('/home')
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
            return false
        }
        return res.redirect('/login')
    })
}

const forgot = (req, res) => {
    res.render('forgot')
}
const forgetData = async (req, res) => {

    try {
        const email = req.body.email;
        const data = await RegisterModel.findOne({ email: email });

        if (data) {
            const name = data.username;
            const id = data.id;
            const mail = await sendVeryfiMail(name, email, id);
            let obj = {
                otp: oTP, email: email, id: id
            }
            res.cookie('otp', obj);
            res.redirect('/otp')
        } else {
            return res.redirect('back');
        }

    } catch (error) {
        console.log(error.message);
    }

}
const otp = (req, res) => {
    if(req.cookies.otp){
      return  res.render('otp')      
    }else{
        res.redirect('/login')
    }
}

const otpData = (req, res) => {
    const otp = req.body.otp;
    if (req.cookies.otp.otp == otp) {
        res.redirect('/newpassword')
    } else {
        res.redirect('back')
    }
}

const newpassword = (req, res) => {
    res.render('newPassword')
}
const newpasswordDATA = async (req, res) => {
    try {
        const id = req.cookies.otp.id
        const email = req.cookies.otp.email
        const password = req.body.password;
        if (req.body.password == req.body.cpassword) {
            const data = await RegisterModel.findByIdAndUpdate(id, { password })
            if (data) {
                res.clearCookie('otp')
                res.redirect('/login')
            } else {
                res.redirect('back')
            }
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error.message);
    }

}

const profile = (req, res) => {
    res.render('profile');
}
const profileupdate = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    const data = await RegisterModel.findByIdAndUpdate(id, { username, email });
    if (data) {
        return res.redirect('back')
    } else {
        console.log('err in update profile');
        return res.redirect('back');
    }
}
module.exports = { home, register, login, registerData, loginDAta, logout, forgot, otp, forgetData, otpData, newpassword, newpasswordDATA, profile, profileupdate }