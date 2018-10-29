const express = require('express');
const crypto = require('crypto');

const pg = require("pg");

const pool = new pg.Pool({
    user: "admin",
    host: "127.0.0.1",
    database: "rdbms",
    password: "password",
    port: "5432"
});

const router = express.Router();

const hashPassword = require('../../helper/hashPassword');

router.post("/register", (req,res) => {
    
    const { username, email, password } = req.body;

    const salt = crypto.randomBytes(128).toString('hex');

    const passwordHash = hashPassword(password,salt);

    pool.query(`
    INSERT INTO "Users" ("name", "email", "passwordHash") VALUES ($1,$2,$3);
    `,
    [username,email,passwordHash],
    (err, result) => {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.status(200).send('User succesfully registered');
        }
    });

});

router.post("/login", (req,res) => {

    const { email, password } = req.body;

    pool.query(`
        SELECT * FROM "Users" WHERE email = $1
    `,
    [email],
    (err, result) => {

        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length === 0)
            {
              res.status(403).send("UserID/password invalid !");
            }
            else
            {
                const dbstring = result.rows[0].passwordHash;
                const inputsalt = dbstring.split('$')[2];
                const hashedPassword = hashPassword(password,inputsalt);

                if(hashedPassword === dbstring)
                {
                    res.status(200).send("Log in succesfull");
                }
                else
                {
                    res.status(403).send("UserID/password invalid !");
                }
            }
        }

    })

});

module.exports = router;
