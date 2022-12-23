const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const{urlencoded} = require("body-parser");
const ejs = require("ejs");

const maincontent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eos impedit placeat nostrum dignissimos ut, laudantium quisquam, ratione quia repellendus dolores omnis, officia veniam est iusto earum unde nulla delectus eius tempora aperiam porro ducimus facilis? A illum repudiandae ab est amet accusamus molestias itaque deleniti iste dolor, temporibus mollitia.";

const contactcontent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eos impedit placeat nostrum dignissimos ut, laudantium quisquam, ratione quia repellendus dolores omnis, officia veniam est iusto earum unde nulla delectus eius tempora aperiam porro ducimus facilis?";

const aboutcontent = "Lorem ipsum dolor sit amet officia veniam est iusto earum unde nulla delectus eius tempora aperiam porro ducimus facilis? A illum repudiandae ab est amet accusamus molestias itaque deleniti iste dolor, temporibus mollitia.";

app.set('view engine','ejs');
app.use(urlencoded({extended:true}));
app.use(express.static("public"));

var posts = [];
app.get("/",function(req,res){
    res.render("main");
 });

app.get("/home",function(req,res){
   res.render("home",{posts : posts});
});

app.get("/about",function(req,res){
    res.render("about",{aboutinfo : aboutcontent});
});

app.get("/contact",function(req,res){
    res.render("contact",{contactinfo : contactcontent});
});


app.get("/posts/:name",function(req,res){
   for(var i=0;i<posts.length;i++){
    if(posts[i].title == req.params.name){
        res.render("post",{title : posts[i].title,
            blog : posts[i].blog
       });
   }
}
   console.log(req.params.name);
});
app.get("/login",function(req,res){
    res.render("login");
});
app.post("/compose",function(req,res){
    var datestamp = new Date();
    var date = datestamp.getDate();
    var day = datestamp.getMonth();
    var year = datestamp.getFullYear();
    var title = req.body.title;
    var titleofblog = title.toUpperCase();
    const post = {
        title : titleofblog,
        blog : req.body.blog,
        date : date,
        day : day,
        year : year
    }
    posts.push(post);

    res.redirect("/home");
});
app.post("/check",function(req,res){
 var id = req.body.id;
 var pwd = req.body.pwd;
 if(id == "1234" && pwd == "1234"){
res.redirect("/compose");
 }
 else{
    res.redirect("/login");
 }
 app.get("/compose",function(req,res)
   {
    res.render("compose");
   });

});

app.listen(8798,function(req,res){
    console.log("vivekonit is running on LocalHost:1212");
});