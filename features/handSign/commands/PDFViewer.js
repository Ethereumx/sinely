
async function PDFViewer(req, res) {
  console.log('file22',req.file);
    res.render('viewer',{file: req.file.filename});
    //res.redirect('/uplx2');
}

  
module.exports = PDFViewer;