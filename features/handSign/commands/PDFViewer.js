

async function PDFViewer(req, res) {
  console.log('file',req.file);
  const URL = process.env.URL_ADDRESS+"/getfile/"+req.file.filename;
  res.render('viewer',{file: URL});
}

module.exports = PDFViewer;