//adding comments you can do in the homepage if you are logged in 
Router.get('/', async (req, res) {
    if (req.params){
        req.session.logged_in = true;
    }
})