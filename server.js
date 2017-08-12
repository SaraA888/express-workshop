var express = require('express');
var app = express();
var formidable = require('express-formidable');
var fs = require('fs');
var filename = __dirname + '/data/posts.json';

function maketimestamp(){
    return Math.floor(Date.now() / 1000);
}

app.use(formidable());

app.use(express.static("public"));

app.post('/create-post', function(req, res){
    //console.log('/create-post');
    //console.log(req.fields);
    fs.readFile(filename, function(error, file) {
        var parsedFile = JSON.parse(file);
        
        console.log('parsedFile 1', parsedFile);
        parsedFile[maketimestamp()] = req.fields.blogpost;
        var newFile = JSON.stringify(parsedFile)
        
        fs.writeFile(filename, newFile, function (error){
            console.log('parsedFile 2', parsedFile);
        })
    })
})

app.get('/get-posts', function(req, res){
    fs.readFile(filename, function(error, file) {
        var parsedFile = JSON.parse(file);
        res.json(parsedFile);
    })
})

app.listen(8080, function () {
    console.log('Server is listening on port 8080. Ready to accept requests!');
});

