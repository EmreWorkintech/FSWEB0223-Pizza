const User = require('./users-model');

const payloadCheck = (req,res,next)=>{
    try {
        const { firstName, lastName, email, phoneNumber, password } = req.body;
        if ( !firstName || !firstName.trim() || firstName.length < 3) {
            next({status: 400, message: "Name 3 karakterden büyük olmalı!..."})
        } else if(!lastName || !lastName.trim() || lastName.length < 3) {
            next({status: 400, message: "Surname 3 karakterden büyük olmalı!..."})
        } else if(!email || !email.trim() || !isEmailValid(email)) {
            next({status: 400, message: "Geçerli bir email adresi giriniz!..."})
        } else if(!password || !password.trim() || password.length < 4) {
            next({status: 400, message: "Password'ünüz en az 4 karakter olmalı!..."})
        }  else if(phoneNumber && phoneNumber.length > 11) {
            next({status: 400, message: "Telefon numaranızı 11 karakter olarak başında 0 kullanarak giriniz!..."})
        } else {
            next()
        }

    } catch (err) {
        next(err)
    }
}

const isIdExist = async (req,res,next)=>{
    try {
        const { id } = req.params;
        const users = await User.getByFilter({"id": id});
        if(users.length == 0) {
            next({status: 400, message: `HATA: ${id} id'li kullanıcı bulunamadı!...`})
        } else {
            req.user = users[0];
            next()
        }

    } catch (err) {
        next(err)
    }
}

const isEmailValid = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

module.exports = {
    payloadCheck,
    isIdExist,
}