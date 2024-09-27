exports.verify = async(req, res, next) => {
    try {
        let {nickname, password: pwd, rol} = JSON.parse(req.cookies.token).data;
        req.data = {
            nickname,
            pwd,
            rol
        }
        
        next();
    } catch (error) {
        res.status(401).json({status: 401, message: "You cannot access the requested view", error: error})}
};