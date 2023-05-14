const withAuth = (req, res, next) => {
 if (!rec.session.logged_id){
    res.redirect('/login');
 } else{
    next();
 }
}

module.exports = withAuth;