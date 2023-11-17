const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// route-module
// 

module.exports = {
  mainpageRequest: router.get('/')
}

router.get('/', (req, res) => {
    const indexHtmlFilePath = path.join(__dirname, '../static/index.html')
    const indexJSFilePath = path.join(__dirname, '../static/index.js')
    fs.readFile(indexJSFilePath,'utf8',(err,data)=>{
      if(err){
        console.log("js파일을 읽지못함")
      } else{
        res.sendFile(indexHtmlFilePath)
      }
    })
   
      
    })
  ;
  