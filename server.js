const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const image = require('./Controllers/image');
const profile = require('./Controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        host: 'db.xxxwmvxpzompkooyiafe.supabase.co',
        port: 6543,
        user: 'postgres',
        password: 'i1FNjl9yj8OFYU7M',
        database: 'postgres',
ssl: {
rejectUnauthorized: false,
},
}});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send(`This is working with API key`);
})

// app.post('/signin', signin.handleSignIn(db, bcrypt)) // alternate way of writing it
app.post('/signin', signin.handleSignIn(db, bcrypt))
// app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id',(req, res) => {profile.handleProfile(req, res, db)} )
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, '0.0.0.0',()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})