const {upload} = require('./aws');
// receive image
app.post('/uploadImage',upload.any(),(req,res) => {
    const form = new formidable.IncomingForm();
    form.on('file',(field,file) => {
        console.log(file);
    });
    form.on('error',(err) => {
        console.log(err);
    });
    form.on('end',() => {
        console.log('Image received successfully..');
    });
    form.parse(req);
});
