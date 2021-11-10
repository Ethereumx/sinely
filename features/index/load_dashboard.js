
const { getFiles,getSignedFiles,getIssuedFiles,getPendingFiles,getPendingreceivedFiles, setQr,getPagginFiles } = require('./repository');
const { FETCH_INFO_ERROR_MESSAGE } = require('./constants');


async function loaddash(req, res, next) {
 
    
    let files;
    let totalsigned_=0;
    let totalissued_=0;

    let totalpending_=0;
    let totalbadges_=0;

    const { user } = req;
    try {
     

      files = await getFiles(user && user.id);
/* was used to keep backward compatibility
            for(var i=0; i<files.length;i++) {
               var f=files[i];
              const qrUrl= {'hash':f.hash, 'signature':f.signature,'publicKey':req.user.public_key};
                let objJsonStr = JSON.stringify(qrUrl);
                let base64Qr = Buffer.from(objJsonStr).toString("base64");
                console.log("base46 of ",base64Qr)
                await setQr(base64Qr,f.id)
          }
*/

      totalsigned_=await getSignedFiles(user.id);
      totalissued_=await getIssuedFiles(user.id);
      totalpending_=await getPendingFiles(user.id);
      totalbadges_=await getPendingreceivedFiles(user.email);

      totalsigned_=totalsigned_[0].count;
      totalissued_=totalissued_[0].count;
      totalpending_=totalpending_[0].count;
      totalbadges_=totalbadges_[0].count;
      const total=+totalsigned_ + +totalissued_; // To avoid concatenation instead sum
      var NumberPaginationPages=Math.floor(total/10) 
      console.log("pages to render",NumberPaginationPages)

      res.render('vpages/dashboard', 
      {files:files,
        totalsigned:totalsigned_,
        totalissued:totalissued_,
        totalpending:totalpending_,
        totalbadges:totalbadges_,
        publicKey:req.user.public_key,
        url:process.env.URL_ADDRESS,
        NumberPaginationPages:NumberPaginationPages || 1
      });

     } catch (getUserError) {
      req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
      console.log("An Error occured when loading dashboard error 125:\n",getUserError);
      res.render('vpages/dashboard');
    }

  

   }

   async function loaddashPagginated(req, res, next) {
 
    var perPage = 9
    var page = req.params.page || 0
    let files;
    let totalsigned_=0;
    let totalissued_=0;

    let totalpending_=0;
    let totalbadges_=0;

    const { user } = req;
    try {
     if(!user) throw "user not lgged";
//To optimize
      files = await getFiles(user && user.id);

      pagedfiles = await getPagginFiles(user && user.id,page);

      totalsigned_=await getSignedFiles(user.id);
      totalissued_=await getIssuedFiles(user.id);
      totalpending_=await getPendingFiles(user.id);
      totalbadges_=await getPendingreceivedFiles(user.email);

      totalsigned_=totalsigned_[0].count;
      totalissued_=totalissued_[0].count;
      totalpending_=totalpending_[0].count;
      totalbadges_=totalbadges_[0].count;

      const total=+totalsigned_ + +totalissued_; // To avoid concatenation instead sum
      var NumberPaginationPages=Math.floor(total/10) 

  

      req.session.userInfo = { ...user };
      console.log("-------------------------user",user)
      res.render('vpages/dashboard', 
      { files:pagedfiles,
        totalsigned:totalsigned_,
        totalissued:totalissued_,
        totalpending:totalpending_,
        totalbadges:totalbadges_,
        publicKey:req.user.public_key,
        url:process.env.URL_ADDRESS,
        NumberPaginationPages:NumberPaginationPages || 1,
        page:page,

      });

     } catch (getUserError) {
      req.session.userInfo = { ...user };
      req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
      console.log("An Error occured when loading dashboard 1789:\n",getUserError);
      res.redirect('/')
    }

  

   }
   module.exports = loaddash;
   module.exports =loaddashPagginated;