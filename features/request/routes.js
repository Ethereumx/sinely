
const { wrap } = require('async-middleware');
//require multer for the file uploads
const multer = require('multer');
// // set the directory for the uploads to the uploaded to
var DIR = './uploads/';
const loadRequests = require('./commands/load-all-requests');
const signRequest = require('./commands/sign-request');

//multer configs
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {

 
cb(null, Date.now() +'-'+file.originalname)
      
    }
 
}); 

//const requestBodyValidation = require('./commands/verify-request-body');
const createRequest = require('./commands/request-signature');
const loadPage = require('./commands/load-page');
var upload = multer({ storage: storage ,limits: {
  fileSize: 1024 * 1024 * 10
}});

function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

module.exports = router => {
  router.get('/request', wrap(loadPage));

  router.post('/request',  upload.single('filetosign'), wrap(createRequest));
  router.post('/request/sign/:fileId',isAuthenticated,   wrap(signRequest));
  router.get('/requests',isAuthenticated, wrap(loadRequests));

  return router;
};
