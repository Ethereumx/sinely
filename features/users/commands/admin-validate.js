
const { validateUsers } = require('../repository');

async function  Updateusers(req, res) {

console.log("===== updating process ======",req.body)
let id=req.body.id;
let name = req.body.name;
let status=req.body.status;
let etablissement=req.body.etablissement;
let type=req.body.type;
console.log("\n INFO: user's institution is",etablissement)
if(typeof etablissement ==='undefined' || etablissement=='')
etablissement=null

let verified=req.body.verified;

console.log("\n INFO : details validation :",id,name,status, etablissement,verified)
    try {
user = await validateUsers(id,name,status, etablissement,verified,type);
      } catch (error) {
        user = error;
        console.log("\n ERROR: an error occured while updating user ", error)
        req.session.messages = { errors:"error" };
        return res.status(400).redirect('/users');
      }
   
      res.redirect('/users')

    
 
  }

  module.exports = Updateusers;
