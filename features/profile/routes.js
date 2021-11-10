const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const updateUserInfo = require('./commands/update-user-info');

const loadPage = require('./commands/load-page');

const multer = require('multer');
// // set the directory for the uploads to the uploaded to
var DIR = './uploads/profile';

//multer configs
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
 

cb(null, 'profile-'+file.originalname)
      
    },
 
});
var upload = multer({ 
  storage: storage ,
  limits: {
  fileSize: 1024 * 1024 * 10
}
});
function afterUpload(req, res, next) {
   next();
}
module.exports = (router, middlewares = []) => {
  router.get('/profile', middlewares.map(middleware => wrap(middleware)), wrap(loadPage));

  router.post('/update-profile-info',
  upload.single('profilepic'),
  afterUpload,
  /*wrap(requestBodyValidation),*/
  wrap(updateUserInfo)
  );

  return router;
};
