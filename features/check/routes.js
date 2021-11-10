
const { wrap } = require('async-middleware');
//require multer for the file uploads
const multer = require('multer');
// // set the directory for the uploads to the uploaded to
var DIR = './uploads/';

//multer configs
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});

const requestBodyValidation = require('./commands/verify-request-body');
const checkFile = require('./commands/check-file');
var upload = multer({ storage: storage });

module.exports = router => {
  router.get('/check', (req, res)=> {

    res.render('vpages/check');
  })


  router.post('/check', upload.fields([{ name: 'filetocheck' }, {     name: 'qrCodeFile'   }]),wrap(requestBodyValidation), wrap(checkFile));
  return router;
};
