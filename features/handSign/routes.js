
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
 

cb(null, Date.now() +'-'+file.originalname)
      
    },
 
});


const requestBodyValidation = require('./commands/verify-request-body');
const PDFViewer = require('./commands/PDFViewer');
const loadPage = require('./commands/load-page');
var upload = multer({ 
  storage: storage ,
  limits: {
  fileSize: 1024 * 1024 * 10
}
});

function afterUpload(req, res, next) {
  //console.log('\n TESTING: Testing after upload midelware');
  next();
}

module.exports = router => {
  router.get('/signv2', wrap(loadPage));

  router.post('/uploadsign',
  upload.single('filetosign'),
  afterUpload,
  wrap(requestBodyValidation),
  wrap(PDFViewer)
  );
    
  return router;
};