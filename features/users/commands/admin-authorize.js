
async function  isAdmin(req, res, next) {
    if (req.user && req.user.type=="admin") {
      return next();
    }
  
    return res.redirect('/');
  }

  module.exports = isAdmin;