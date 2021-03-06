// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
var Article = require("../models/Article.js");
if (!process.env)
{
    var Secrets = require("../configs/secrets.js");
}

//var Secrets = require("../configs/secrets.js");
var request = require("request");
// Routes
// =============================================================
module.exports = function(app, db) 
{
//     `/api/saved` (get) - your components will use this to query MongoDB for all saved articles
    app.get("/api/saved", function(req, res)
    {
        Article.find({}, function(err, doc)
        {
            if(err)
            {
            console.log(err);
            res.status(500).send(err);
            }
            else
            {
            res.json(doc);
            }
        });
    });

//  * `/api/saved` (post) - your components will use this to save an article to the database
    app.post("/api/saved", function(req, res)
    {
        console.log("request body: "+ JSON.stringify(req.body));
        var newArticle = new Article(req.body);
        console.log("new Article: " + JSON.stringify(newArticle, null, 2));
        Article.create(newArticle, function(err, doc)
        {
            if(err)
            {
            console.log(err);
            res.status(500).send(err);
            }
            else
            {
            console.log("returned doc = " + doc);
            res.json(doc);
            }
        })
    });
//  * `/api/saved` (delete) - your components will use this to delete a saved article in the database
    app.delete("/api/saved/:_id", function(req, res)
    {
        console.log("in delete removing ID: " + req.params._id)
        Article.remove({"_id": req.params._id}, function(err, data)
        {
            if (err) 
            {
            res.status(500);
            console.log(err);
            }
            else
            {
            res.json(data);
            }
        });
    })

    app.post("/api/search", function(req, res)
    {
        console.log(req.body);
        
        request.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
            'api-key': process.env.nyt_key || Secrets.config.nyt_key,
            'q': req.body.q,
            //'begin_date': req.body.begin_date,
            //'end_date': req.body.end_date
        },
        }, function(err, response, body) {
        body = JSON.parse(body);
        //console.log(body.response.docs);
        res.json(body.response.docs);
        })
    })
};
