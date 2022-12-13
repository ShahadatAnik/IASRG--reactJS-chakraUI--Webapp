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



app.listen(3001, () => {
    console.log('Running on 3001');
});