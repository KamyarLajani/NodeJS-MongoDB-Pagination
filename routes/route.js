const express = require("express");
const route = express();
const bodyParser = require("body-parser");
const path = require("path");
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended: false}));
route.set("view engine", "pug");
route.set("views", path.join(__dirname , "../views"));
route.use(['/public', '/page/public'], express.static('public'));
const mongo = require("mongodb").MongoClient;
let mongoUrl = "mongodb://127.0.0.1:27017/";

// limit the documents to 5 for each page
let skip, currentPage, totalPages, counter, limit = 5;

// redirecting user from '/' to 'page/1'
route.get('/', (req, res)=>{
    res.redirect('/page/1');
});

route.get('/page/:num', (req, res)=>{
    // number of page by parameter in URL
    currentPage = parseInt(req.params.num);
    // skip: where should index of documents start at
    skip = (limit*currentPage) - limit
   
    mongo.connect(mongoUrl, {useNewUrlParser: true}, (err, database)=>{
        if(err) throw err;
        let db = database.db("test");
        
        db.collection("users").countDocuments((err, result)=>{
            counter = result;
           
               
        });

        setTimeout(()=>{
            totalPages = Math.ceil(counter / limit);
           
            db.collection("users").find({}).limit(limit).skip(skip).toArray((err, result)=>{
            
                res.render("index.pug", {result, totalPages, currentPage, limit});
            });
           
            database.close();
        }, 15);
    });


    
});





module.exports = route;