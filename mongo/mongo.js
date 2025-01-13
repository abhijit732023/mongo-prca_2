const mongo= require('mongoose')

mongo.connect('mongodb://localhost/mongoprac')

const userschema=mongo.Schema({
    filename:String,
    email:String,
    imageURL:String
})

module.exports=mongo.model('user',userschema)