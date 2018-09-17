let data;
let keys;


function setup(){
  createCanvas(800,800);

  drawData();

  document.getElementById('submit').onclick = function(){
    //use inputs in index.html to add values to server's "data" then load them
    loadJSON('/add/'+document.getElementById('term').value+'/'+document.getElementById('num').value,drawData());
  };
}

function uploadFiles(){
  let files=document.getElementById('uploader').elements['uploads'].files;
  for (let i=0;i<files.length;i++){
    let req={method:'POST',body:files[i]}; //node.js doesn't handle blob's figure out what it does and send that
    fetch('/fileUp',req).then(checkRes);
  }
}
function checkRes(res){
  console.log(res);
}
function drawData(){
  background(0);
  loadJSON('/data',gotData);//since on same serv can just use /data to access api
}

function gotData(data){
  data=data;
  keys=Object.keys(data);

  for(let key in keys){//for all the data display it somewhere random
    fill(255);
    textSize((data[keys[key]]*32)%100);
    text(keys[key],random(width),random(height));
  }
}
