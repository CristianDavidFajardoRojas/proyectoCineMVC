const User = require('../model/signupModel');
const bcrypt = require('bcrypt');

const user = new User();

exports.createUser = async (req, res) => {
    try {
        let {nickname, email, password, name} = req.body;

        let nicknameExist = await user.findExistNickname(nickname);
        if(nicknameExist.status == 200) return res.status(401).json({status: 401, message: "Nickname already exists"})

        let emailExist = await user.findExistEmail(email);
        if(emailExist.status == 200) return res.status(401).json({status: 401, message: "Email already exists"})

        password = await bcrypt.hash(password, 12);
        let resUser = await user.insertCollection({nickname, email, password, name});

        password = password.replace(/[^\w\s]|_/g, '');
        if(resUser.status == 201 ) resCreatedUser = await user.createUser(nickname, password);
        if(resCreatedUser.status == 201) return res.status(resUser.status).json(resUser);
        res.status(resCreatedUser.status).json(resCreatedUser);

    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);
    }
}