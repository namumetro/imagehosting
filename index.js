const express = require('express')
const app = express()
const ejs = require('ejs')
const fs = require('fs')
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') // 파일 업로드 경로
  },
  filename: function (req, file, cb) {
    while(true){
      var name = Math.random().toString(16).substr(2,11)+'.'+file.mimetype.replace('image/', '')
      var ex
      fs.exists('./uploads/'+name, (exists) => {
        if(exists){
          ex = true
          return
        }else{
          ex = false
          return
        }
      })
      if(!ex){
        break;
      }
    }
    cb(null, name) //파일 이름 설정
  }
})
const uploader = multer({ storage: storage })

const port = 3000

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/upload', uploader.single('_file'), (req, res, next) => {
  res.render('output', {name:'https://image.namustu.ml/upload/'+req.file.filename})
})

app.listen(port, () => {
  console.log(`Running!`)
})