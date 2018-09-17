//allow node filesystem access
const fs=require('fs');


//load "data" from JSON file
let data=JSON.parse(fs.readFileSync('data.json'));

//setup and start server
const express= require('express');
const app=express();
app.use(express.static("public"))
const server=app.listen(8080);
console.log("server running on port 8080 ctrl+c to stop");

//handling requests

//view all "data" stored on server
app.get('/data',sendData);

function sendData(req,res){
  res.send(data);
}

//seaching for "data"
app.get('/search/:term',searchTerm);

function searchTerm(req,res){
  let searchInfo=req.params;
  let test=data[searchInfo.term];
  let reply;

  if(test){
    reply={
      status:'found',
      term:searchInfo.term,
      num:test
    };
  }
  else{
    reply={
      status:'not found',
      term:searchInfo.term
    };
  }
  res.send(reply);
}

//adding "data"
app.get('/add/:term/:num?',addTerm);

function addTerm(req,res){
  let searchInfo=req.params;
  if(!searchInfo.num){
    res.send('Please add a number to your request.');
  }
  else{
    data[searchInfo.term]=Number(searchInfo.num);
    //write to file so changes are saved(not syncronous so server can still do other things while writing)
    //this rewrites JSON formatted(it rewrites all data not good if large amount of data then append)
    fs.writeFile('data.json',JSON.stringify(data,null,3),written);
    function written(){
      res.send(searchInfo.term+' was added to the database with a value of '+data[searchInfo.term]);
    }
  }
}

//post example image upload to server
app.post('/fileUp',saveImg);

function saveImg(req,res){
}
