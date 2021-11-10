
const { wrap } = require('async-middleware');
//require multer for the file uploads
const multer = require('multer');
// // set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//Todo : fix file types to pdf/word/txt
//multer configs
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() +'-'+file.originalname)
      
    }
 
}); 

const requestBodyValidation = require('./commands/verify-request-body');
const signFile = require('./commands/sign-file');
const loadPage = require('./commands/load-page');
var upload = multer({ storage: storage ,limits: {
  fileSize: 1024 * 1024 * 10
}});

module.exports = router => {
  router.get('/issue', wrap(loadPage));

  router.post('/issue',  upload.single('filetosign'),wrap(requestBodyValidation), wrap(signFile));

  return router;
};