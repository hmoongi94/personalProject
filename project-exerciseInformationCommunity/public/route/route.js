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
    fs.readFile(indexHtmlFilePath,(err,data)=>{
      if(err){
        res.status(500).send('index.html파일을 읽지 못함.')
      } else {
        res.sendFile(indexHtmlFilePath)
      }
    })
  });
  