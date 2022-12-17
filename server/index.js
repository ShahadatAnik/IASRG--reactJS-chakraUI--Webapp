const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'IASRG'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extender: true}));


app.post('/user/create_user', (req, res)=>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone
    const profession = req.body.profession
    console.log(name, email, password, phone, profession)
    const create_user = "INSERT INTO users (name, email, phone, profession, password) VALUES (?, ?, ?, ?, ?);"
    db.query(create_user, [email, name, phone, profession, password], (err, result)=>{
        res.send(result)
        if(err){
            console.log(err)
        }
        
    });
    
})


app.listen(3001, () => {
    console.log('Running on 3001');
});