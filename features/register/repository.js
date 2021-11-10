const bcrypt = require('bcrypt');
const knex = require('../../db');
//const { try } = require('bluebird');
const knexConfig = require('../../db/knexfile');

const crypto = require("crypto");
const util = require("ethereumjs-util");

const { Wallet } = require('ethereumjs-wallet');
var keythereum = require("keythereum-pure-js");
const { fileLoader } = require('ejs');


var options = {
  kdf: "pbkdf2",
  cipher: "aes-128-ctr",
  kdfparams: {
    c: 262144,
    dklen: 32,
    prf: "hmac-sha256"
  }
};
 

async function getorganismesLists() {
  let xfiles= await knex('etablissements').select()
    .orderBy('etabId', 'desc') ;

  return xfiles;
}

async function createUser({ name, username: email, password,etablissement }) {

  const hashedPass = await bcrypt.hash(password, 5);
  let user_status="pending";
  let user_type;
  if( etablissement !=='') {
    user_status="pending"
    user_type="etablissement"
  }
 
 
    var params = { keyBytes: 32, ivBytes: 16 };
 
// synchronous
    var dk = keythereum.create(params);
    var keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options);
    console.log('--------keyObject------------\n',keyObject)
 
    const userPrivateKey=dk.privateKey.toString("hex")
    const userPublicKey="0x"+util.privateToPublic(dk.privateKey).toString("hex");
    const userAddress="0x"+util.pubToAddress(util.privateToPublic(dk.privateKey)).toString("hex");
    console.log('\nprivate key',userPrivateKey,'\npublic key',userPublicKey,'\naddresse',userAddress)
 
    console.log("end writig keystore")
    const file= keythereum.exportToFile(keyObject);

    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }

  const [user] = await knex('users')
    .insert({
      name,
      email,
      password: hashedPass,
      created_at: new Date(),
      updated_at: new Date(),
      email_verified_at: new Date(),
      private_key:userPrivateKey,
      public_key:userPublicKey,
      b_address:userAddress,
      claim:etablissement||null,
      type:user_type||"normal",
      status:user_status,
      etablissement: null, //until admin set true affiliation
      verified:false,
      keystore:file,
      confirmationCode:token,

    })
    .returning(['email', 'name','claim','confirmationCode']);
 
  return user;
}

module.exports = {
  createUser,
  getorganismesLists,
};
