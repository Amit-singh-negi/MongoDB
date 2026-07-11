import express from "express";


const app = express();


app.set("view engine", "ejs");



app.use(express.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/profile", (req, res) => {
     res.setHeader("Set-Cookie", `name=${req.body.name}`);
  res.render("profile");
  
});
app.get("/", (req, res) => {
  let cookiesData = req.get("cookie");
    if (!cookiesData) {
    return res.render("home", { name: "Guest" });
  }

  cookiesData = cookiesData.split(";");
  cookiesData = cookiesData[0].split("=");
  console.log(cookiesData[1]);

  res.render("home", { name: cookiesData[1] });
});


app.listen(4400);
