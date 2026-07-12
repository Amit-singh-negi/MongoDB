import express from "express";
import session from "express-session";

const app = express();


app.set("view engine", "ejs");

app.use(session({
    secret:'apple',
    resave:false,
      saveUninitialized: true,
}))

app.use(express.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.render("login");
});
app.post('/userProfile',(req,res)=>{
    req.session.data=req.body;
    console.log(req.session.data);
    res.render('userProfile')
    


})
app.get("/", (req, res) => {
    console.log(req.session.data);

    res.render("hero", {
        data: req.session.data
    });
});

app.listen(4500);
