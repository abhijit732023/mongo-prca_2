const express = require('express')
const userschema = require('./mongo/mongo')
const app = express()
const path = require('path')
const { read } = require('fs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index')
})

app.post('/create', async (req, res) => {
    const { filename, email, imageURL } = req.body
    const user = await userschema.create({
        filename: filename,
        email: email,
        imageURL: imageURL
    })
    res.redirect('/read')


})
app.get('/read', async (req, res) => {
    const read = await userschema.find()
    res.render('read', { Allread: read })
})
app.get('/delete/:id', async (req, res) => {
    const del = await userschema.findOneAndDelete({ _id: req.params.id })
    res.redirect('/read')
})

app.get('/edit/:userid', async (req, res) => {
    const user = await userschema.findOne({ _id: req.params.userid })
    res.render('edit', { user: user })
})

app.post('/update/:userid',  async (req, res) => {
    const { filename, email, imageURL } = req.body
    const user = await userschema.findOneAndUpdate({ _id: req.params.userid }, {filename,email,imageURL},{new:true})
    //{filename,email,imageURL} this is are the variables or object going to be updated and true indicate update true
    res.redirect('/read')
})


app.listen(3000)