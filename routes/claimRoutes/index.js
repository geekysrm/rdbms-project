const express = require('express');
const path = require("path");
const multer = require("multer");

const pg = require("pg");
const DBconfig = require('../../helper/DBconfig');

const pool = new pg.Pool(DBconfig);

const jwt = require("jsonwebtoken");
const SECRET = require('../../helper/JWTsecret');

const getAuthToken = require("../../middleware/authToken");

const router = express.Router();

let counter = 0;

const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + counter.toString() + path.extname(file.originalname));
    }
});

function checkFileType(file, cb)
{
    const filetypes = /jpeg|jpg|png|JPEG/;

    const extname = filetypes.test(path.extname(file.originalname));
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype)
    {
        return cb(null, true);
    }
    else
    {
        cb("Error: only images!!"); 
    }
}

const upload = multer({
    storage: storage,
    limit: {
        fileSize: 10000000
    },
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('image');


/*router.post("/api/claim", getAuthToken, (req,res) => {

    jwt.verify(req.token, SECRET, (err, authData) => {
        
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            const id = authData.id;

            const {
                name,
                image
            } = req.body;

            pool.query(`
                SELECT * FROM "user" WHERE id = $1
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
                        const carPrice = result.rows[0].car_currentPrice;

                        
                    }   
                }

            });
        }

    });

});*/

router.post("/api/upload", (req,res)=>{
    
        upload(req, res, (err) => {
            if(err)
            {
                res.send(err);
            }
            else
            {
                if(req.file == undefined)
                {
                    res.send("No file selected");
                }
                else
                {
                    const fileName = req.file.fieldname + counter.toString() + path.extname(req.file.originalname)
                    counter++;
                    res.redirect('/images/' + fileName);
                }
            }
        })
    });

module.exports = router;
