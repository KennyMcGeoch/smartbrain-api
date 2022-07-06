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
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Kenny1!',
        database: 'smart-brain'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
})

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res)=> {
    res.send('success');
})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id',(req, res) => {profile.handleProfile(req, res, db)} )
app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.listen(3000, ()=> {
    console.log("app is running on port 3000");
})