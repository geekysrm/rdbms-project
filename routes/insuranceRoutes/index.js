const express = require('express');

const pg = require("pg");
const DBconfig = require('../../helper/DBconfig');

const pool = new pg.Pool(DBconfig);

const jwt = require("jsonwebtoken");
const SECRET = require('../../helper/JWTsecret');

const getAuthToken = require("../../middleware/authToken");

const router = express.Router();

router.get("/api/has-insurance", getAuthToken, (req,res) => {

    jwt.verify(req.token, SECRET, (err, authData) => {
        
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            const id = authData.id;

            pool.query(`
                SELECT * FROM "Users" WHERE id = $1
            `,
            [id],
            (err,result) => {

                if(err)
                {
                    res.status(500).send(err.toString());
                }
                else
                {
                    if(result.rows.length === 0)
                    {
                      res.status(404).send("User not found!");
                    }
                    else
                    {
                        const hasInsurance = result.rows[0].hasInsurance;
                        res.status(200).send(hasInsurance);
                    }
                }

            })
        }

    });

});

router.post("/api/insurance", getAuthToken, (req,res) => {

    jwt.verify(req.token, SECRET, (err, authData) => {
        
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            const id = authData.id;

            pool.query(`
                SELECT * FROM "Users" WHERE id = $1
            `,
            [id],
            (err,result) => {

                if(err)
                {
                    res.status(500).send(err.toString());
                }
                else
                {
                    if(result.rows.length === 0)
                    {
                      res.status(404).send("User not found!");
                    }
                    else
                    {
                        const hasInsurance = result.rows[0].hasInsurance;
                        res.status(200).send(hasInsurance);
                    }
                }

            })
        }

    });

});

module.exports = router;
