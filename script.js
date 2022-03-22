var express = require("express");
var app = express();

app.use(express.static("Final_Project"));

app.get("/", function(req, res){
   res.redirect("game.html");
});

app.get("/google", function(req, res){
    res.redirect('http://google.com')
});

app.get("/search/:value", function(req, res){
    let value = req.params.value;
    res.redirect('https://google.com/search?q='+value)
});

app.get("/*", function(req, res){
    res.send("<h1>Error 404</h1>")
});

app.listen(3050, function(){
   console.log("Example is running on port 3050");
});