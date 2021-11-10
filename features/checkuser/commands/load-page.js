 
  const { getUserByPubKey,getUserById } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadUser(req, res) {


let pubKey;
let userId;



pubKey=req.body.publicKey;
userId=req.body.userId;
console.log("the received pubkey from body request: ",pubKey)
console.log("the user ID from body request: ",userId) 
let foundUser; 
const { user } = req;

  try {
    if(typeof pubKey ==undefined && typeof userId ==undefined )
    {
      req.session.messages = { databaseError: "please provide an ID or a public key" };

      console.log("Warning: Both userId and pubkey are underfined")
      res.render('vpages/users/check');
    }

    else{

    if( pubKey !==''){
          foundUser = await getUserByPubKey(pubKey);
          console.log("The user's public key ",foundUser)

    }
    if( userId !==''){
          foundUser = await getUserById(userId);
          console.log("ID user ",foundUser)

    }

    }

  } catch (getUserError) {

    req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
  }

  console.log("uthe user info : \n",foundUser,"the user: \n",user)
  
  req.session.userInfo = { ...user };
  // req.session.verified = { status:user.verified };

  if(foundUser){
  console.log("--------------------------------------locals.foundUser.verified",foundUser.verified)

  res.render('vpages/users/check',{userDetails:foundUser,verified:foundUser.verified,});

  }
  else{
    res.render('vpages/users/check',{userDetails:foundUser,verified:false,});
  }

}

module.exports = loadUser;


