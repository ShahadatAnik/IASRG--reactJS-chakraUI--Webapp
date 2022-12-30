const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "IASRG",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extender: true }));

app.post("/user/create_user", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const profession = req.body.profession;
    //console.log(name, email, password, phone, profession)
    const create_user =
        "INSERT INTO users (name, email, phone, profession, password) VALUES (?, ?, ?, ?, ?);";
    db.query(
        create_user,
        [name, email, phone, profession, password],
        (err, result) => {
            res.send(result);
            if (err) {
                console.log(err);
            }
        }
    );
});

app.get("/paper/getPaper", (req, res) => {
    const sqlSelect = "SELECT * from papers";
    db.query(sqlSelect, (err, result) => {
        //console.log(result)
        res.send(result);
    });
});

app.post("/paper/publish/", (req, res) => {
    const publisher_id = req.body.publisher_id;
    const paper_name = req.body.paper_name;
    const publication_date = req.body.publication_date;
    const publication_place = req.body.publication_place;
    const paper_full_text = req.body.paper_full_text;

    const publish_paper =
        "INSERT INTO papers (publishers_id, paper_name, publication_date, publication_place, full_text) VALUES (?, ?, ?, ?, ?);";
    db.query(
        publish_paper,
        [
            publisher_id,
            paper_name,
            publication_date,
            publication_place,
            paper_full_text,
        ],
        (err, result) => {
            res.send("Paper published");
            if (err) {
                console.log(err);
            }
        }
    );
});

app.post("/user/verify_login/", (req, res) => {
    //console.log("verify login")
    const email = req.body.email;
    const password = req.body.password;
    //console.log(email, password)
    const get_user = "select id,password from users where email = ?";
    db.query(get_user, [email], (err, result) => {
        if (result.length == 0) {
            console.log("No user found");
            res.send("No user found");
        } else if (password == result[0].password) {
            res.send(result[0].id.toString());
        } else {
            console.log("wrong password");
            res.send("wrong password");
        }
        //res.send(result)
    });
});

app.delete("/paper/deletePaper/", (req, res) => {
    const id = req.body.id;
    const sqlDelete = "DELETE FROM papers WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err);
        else return res.send("Paper deleted");
    });
});

app.listen(3001, () => {
    console.log("Running on 3001");
});
