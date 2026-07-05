import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const dbName = "school";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
client.connect().then((connection) => {
  const db = connection.db(dbName);

  app.get("/api", async (req, res) => {
    const collection = db.collection("students");
    const students = await collection.find().toArray();
    res.send(students);
  });
  app.get("/ui", async (req, res) => {
    const collection = db.collection("students");
    const students = await collection.find().toArray();
    res.render("students", { students });
  });

  app.get("/add", async (req, res) => {
    res.render("addStudent");
  });
  app.post("/addStudent", async (req, res) => {
    const collection = db.collection("students");
    const result = await collection.insertOne(req.body);
    console.log(result);

    const student = await collection.find().toArray();
    // res.send(students)
    res.send("data saved");
  });
  app.post("/add-student-api", async (req, res) => {
    console.log(req.body);
    const { name, age, email } = req.body;
    if (!name || !age || !email) {
      res.send({ message: "operation failed", success: false });
      return false;
    }
    const collection = db.collection("students");
    const result = await collection.insertOne(req.body);
    res.send({ message: "data stored", success: "true", result: result });
  });
  app.delete("/delete/:id", async (req, res) => {
    console.log(req.params.id);
    const collection = db.collection("students");
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result) {
      res.send({
        message: "student data deleted",
        success: "true",
      });
    } else {
      res.send({
        message: "student data not deleted , try after sometime",
        success: "false",
      });
    }
  });

  app.get("/ui/delete/:id", async (req, res) => {
    console.log(req.params.id);
    const collection = db.collection("students");
    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result) {
      res.send("<h1>Data deleted</h1>");
    } else {
      res.send("<h1>data not deleted</h1>");
    }
  });
  app.get("/ui/student/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
const collection= db.collection("students")
  const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
  res.render("updateStudents", { result });
});
app.get('/student/:id', async (req, res) => {
    const id = req.params.id;

    console.log(id);

    const collection = db.collection("students");

    const result = await collection.findOne({
        _id: new ObjectId(id)
    });

    res.send({
        message: "Data fetched",
        success: true,
        result: result
    });


    
 })
 app.post('/ui/update/:id',async(req,res)=>{
    console.log(req.body);
    console.log(req.params.id);

    const collection= db.collection("students");
    const filter= { _id: new ObjectId(req.params.id)};
    const update={$set: req.body}
    const result =await collection.updateOne(filter,update)
    
    if(result){
        res.send(" data updated")
    }else{
        res.send("data not updated")
    }

 })
  app.put('/ui/update/:id',(req,res)=>{
    console.log(req.body);
    console.log(req.params._id);

    const collection= db.collection("students");
    const filter= { _id: new ObjectId(req.params.id)};
    const update = collection.updateOne(filter,update)
    
    if(result){
        res.send({
        message: "Data updated",
        success: true,
        result: req.body
    })
    }else{
         res.send({
        message: "Data not updated",
        success: true,
        result: null
    });
    }

 })

});


app.listen(4100);
//------------------------------- other method-------------------

// app.set('view engine','ejs')

// app.get('/',async(req,res)=>{
//        await client.connect()
//     const db= client.db(dbName)
//     const collection = db.collection('students')
//     const  students= await collection.find().toArray()
//     console.log(students);
//     res.render('students',{students})

// })
