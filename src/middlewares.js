export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.siteName = "Wetube"
    res.locals.loggedInUser = req.session.account
    next();
};

export const privateOnly= (req, res, next) => {
    if(!req.session.loggedIn)
    {
       return res.redirect("/login")
    }
    return  next() 
};

export const publicOnly= (req, res, next) => {
    if(req.session.loggedIn)
    {
        return  res.redirect("/")
    }
    return next()  
};