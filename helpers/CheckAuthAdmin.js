module.exports.CheckAuthAdmin = function(req, res, next) {
    const admin = req.session.admin
    const userid = req.session.userid

    if (!userid || !admin) {
        res.redirect('/')    
    }

    next()
}