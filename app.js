//jshint esversion:6
//Bouiler plate;;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//Create a Database
mongoose.connect("INSERT YOUR DB HERE", {useNewUrlParser: true});

//DB Schema
const wikiSchema = {
  title: String,
  content: String
};

//Collection Name #Always in Capital and Singular word
const Article = mongoose.model("Article", wikiSchema);

//////////////Request targetting all foundArticles






//A more succeint way to manipulate

app.route("/articles")
.get(function(req, res){
  // Get articles
  Article.find(function(err, foundArticles){
    if (!err){
    res.send(foundArticles)
  }else {
    console.log(err);
  }
  });

  //Post Rest API method//Post Rest API method

})
.post(function(req, res){
  //Tap into the post body to grab the article
  console.log();
  console.log();

  //Saving the content to the Database
  const newArticle = new Article ({
    title: req.body.title,
    content: req.body.content
  })
  newArticle.save(function(err){
    if (!err){
      res.send("Successfuly added new article");
    }else {
      res.send(err);
    };
  });
})
.delete(function (req, res){
  //Delete Rest API method
  Article.deleteMany(function (err){
    if (!err){
      res.send("Successfully deleted all articles");
    } else {
      res.send(err);
    }
  })
});


//////////////Request targetting a specific Article.

app.route("/articles/:articleTitle")

.get(function (req, res){
  //When you find an article, assign it to foundArticle
  Article.findOne({title: req.params.articleTitle}, function (err, foundArticle){
    if (foundArticle){
      res.send(foundArticle);
    } else {
      res.send("No article matching that title was found")
    }
  });

})

.put(function (req, res){
  Article.replaceOne(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if (!err){
        res.send("Successfully Updated article")
      } else {
        console.log(err);
      }
    }

  );
})
.patch(function (req, res){
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body}, //only replace the field that was edited
    function(err){
      if (!err){
        res.send("Successfully updated article.")
      } else {
        res.send(err);
      }
    }
  );
})
.delete(function (req, res){
  Article.deleteOne(
    {title: req.params.articleTitle}, //Whatever the person inputs to delete
    function(err){
      if (!err){
        res.send("Successfuly deleted the corresponding article.")
      } else {
        res.send(err)
      }
    }
  );
});



//Listening port for the localhost
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
