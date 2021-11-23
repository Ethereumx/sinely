const express = require('express');
const router = express.Router();

const mountRegisterRoutes = require('../features/register/routes');
const mountLoginRoutes = require('../features/login/routes');
const mountLogoutRoutes = require('../features/logout/routes');
const mountResetPasswordRoutes = require('../features/reset-password/routes');
const mountProfileRoutes = require('../features/profile/routes');
const mountIndexRoutes = require('../features/home/routes');
const mountSignRoutes = require('../features/sign/routes');
const mountCheckRoutes = require('../features/check/routes');
const mountIssueRoutes = require('../features/issue/routes');
const mountRequestoutes = require('../features/request/routes');
const mountFileRoutes = require('../features/file/routes');
const mountCheckFileRoutes = require('../features/checkfile/routes');
const mountUsersRoutes = require('../features/users/routes');
const mountOrganismesRoutes = require('../features/organismes/routes');
const mountSubscribeRoutes = require('../features/subscribe/routes');
 const loaddash = require('../features/index/load_dashboard');
const mountdashRoutes = require('../features/index/routes');

const mountAdaliaRoutes = require('../features/adalia/routes'); // Subdomaine
const mountCheckSigRoutes = require('../features/checksignature/routes');

const mountCheckUserRoutes = require('../features/checkuser/routes');
const mountConfirmRoutes = require('../features/confirm/routes');
const mountrequestDemoRoutes = require('../features/requestdemo/routes');
const { wrap } = require('async-middleware');

const handSignRoutes = require('../features/handSign/routes');



function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

function isAuthenticated2(req, res, next) { //This would redirect to home in the first visit
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/home');
}
async function userIsAllowed(callback) {

  callback(false);
};

async function  isAdmin(req, res, next) {
  if (req.user && req.user.type=="admin") {
    return next();
  }

  return res.redirect('/login');
}
/* GET home page. */
router.get('/', isAuthenticated2,wrap(loaddash))



router.get('/chart', (req, res) => {
  res.render('vpages/chart');
});


router.get('/checksignature', isAuthenticated, (req, res) => {
  res.render('vpages/checksignature');
});



router.get('/sign', isAuthenticated, (req, res) => {
  res.render('vpages/sign');
});

router.get('/signv2', isAuthenticated, (req, res) => {
  res.render('vpages/sign-v2');
});

router.get('/checkfile', isAuthenticated, (req, res) => {
  res.render('vpages/checkfile');
});

router.get('/check', (req, res) => {
  res.render('vpages/check');
});

router.get('/checksignature', (req, res) => {
  res.render('vpages/checksignature');
});


router.get('/plans', (req, res) => {
  res.render('vpages/plans');
});
router.get('/verify', isAuthenticated, (req, res) => {
  res.render('vpages/verify');
});

router.get('/home', (req, res) => {
  res.render('vpages/home');
});


router.get('/issue', isAuthenticated, (req, res) => {
  res.render('vpages/issue');
});

router.get('/request', isAuthenticated, (req, res) => {
  res.render('vpages/request');
});

const path = require('path');

router.get('/uploads/:name',  isAuthenticated,function (req, res, next) {
  var options = {
    root: path.join(__dirname, '../uploads'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  
 var fileName = req.params.name
  //console.log('fileName',fileName)
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Error in Sent:', fileName)
    }
  })
})


router.get('/uploads/profile/:name',function (req, res, next) {
  var options = {
    root: path.join(__dirname, '../uploads/profile'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  
 var fileName = req.params.name
  console.log('fileName',fileName)
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})

router.get('/keystore/:name',  isAuthenticated,function (req, res, next) {
  var options = {
    root: path.join(__dirname, '../keystore'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
 var fileName = req.params.name
  console.log('fileName',fileName)
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})
router.get('/uploadX/:fileName', function(req, res, next) {
   userIsAllowed(function(allowed) {
    if (allowed || isAdmin) {
 
  res.sendFile('/uploads/1596045018961-face.jpg', options, function (err) {
    if (err) {
      console.log('error:', err)

      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
     } else {
 
      res.end('You are not allowed to download this file!');
    }
  });
});

router.get('/test',(req,res)=>{

    res.render('viewer',{file:'http://localhost:4000/getfile/1637591311900-testdoc.pdf'});
});

router.get('/getfile/:filename',(req,res)=>{

  let file = req.params.filename || '';
  console.log('param file',file);
  let root = path.join(__dirname, '../uploads');
  res.sendFile(root+'/'+file);
})


 
mountRegisterRoutes(router);
mountLoginRoutes(router);
mountIndexRoutes(router);
mountSignRoutes(router, [isAuthenticated]);
mountLogoutRoutes(router, [isAuthenticated]);
mountResetPasswordRoutes(router);
mountProfileRoutes(router, [isAuthenticated]);
mountCheckRoutes(router, [isAuthenticated]);
mountIssueRoutes(router, [isAuthenticated]);
mountIssueRoutes(router, [isAuthenticated]);
mountRequestoutes(router, [isAuthenticated]);
mountCheckFileRoutes(router, [isAuthenticated]);
mountFileRoutes(router, [isAuthenticated]);
mountUsersRoutes(router, [isAdmin]);
mountOrganismesRoutes(router,[isAdmin]);
mountSubscribeRoutes(router);
mountrequestDemoRoutes(router);
mountCheckUserRoutes(router, [isAuthenticated]);
mountdashRoutes(router, [isAuthenticated]);
mountAdaliaRoutes(router);
mountConfirmRoutes(router);
mountCheckSigRoutes(router, [isAuthenticated]);

handSignRoutes(router);

module.exports = router;
