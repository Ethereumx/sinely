
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

let signStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    let filename= '';
    console.log('req. file',req.session)
    if(req.session && req.session.originFileName)
      filename = req.session.originFileName;
    else
      filename = Date.now() +'-'+file.originalname;

cb(null, filename)
    
  },

});


const requestBodyValidation = require('./commands/verify-request-body');
const PDFViewer = require('./commands/PDFViewer');
const loadPage = require('./commands/load-page');
const signFile = require('./commands/sign-file');

const fs = require('fs');
const path = require('path');


var upload = multer({ 
  storage: storage ,
  limits: {
  fileSize: 1024 * 1024 * 10
}
});

let signUpload = multer({ 
  storage: signStorage ,
  limits: {
  fileSize: 1024 * 1024 * 10
}
});

function afterUpload(req, res, next) {
  //console.log('\n TESTING: Testing after upload midelware');
  next();
}

function beforeUpload(req, res, next) {
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

  router.post('/signedited',
  signUpload.single('editedfiletosign'),
  (req,res,next)=>{
    fs.rename(path.join(__dirname, '../../uploads/'+req.file.filename), path.join(__dirname, '../../uploads/'+req.body.originFileName), function(err) {
      if ( err ) console.log('ERROR: ' + err);
      req.file.path = `uploads/${req.body.originFileName}`;
      req.file.originalname = req.body.originFileName ;
      req.ajax = true;
      console.log('req',req.session,req.file);
      next();
  });
  },
  wrap(signFile)
  );
    
  return router;
};