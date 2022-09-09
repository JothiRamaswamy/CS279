
// import all the packages that we need to render the app
// express provides the backend and allows us to process get/post
// requests, etc
// dotenv allows us to use env variables so that we can keep
// some variables (passwords, etc) secure
// mongoose allows us to connect our todo list to mongodb
// where the todo items are stored
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//models
// import the logic from TodoTask so we can use it in the CRUD operations below
// This model deals with the logic behind updating the mongodb database
const TodoTask = require("./models/TodoTask");

// create our express app to process api requests
const app = express();

// config dotenv so we can use env variables
dotenv.config();

// allows us to access our CSS styles
app.use("/static", express.static("public"))

// urlencoded allows us to extract data from the form by adding it to the body 
// property of the request
app.use(express.urlencoded({ extended: true }));

//connection to db
// mongoose.set("useFindAndModify", falseß);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");

    // telling our app to connect to port 3000 and to listen to this port
    // and any requests coming in
    app.listen(3000, () => console.log("Server Up and running"));
});

// set the view engine of the todo list site to ejs, which is the type of file we
// are using to create our view frontend
app.set("view engine", "ejs")

// GET METHOD
// when we receive a get request through this route, use TodoTasks to find 
// any existing tasks and use these to render the html in todo.ejs
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });
});

// POST METHOD
// when we receive a post request through this route, create a TodoTask out of the
// content sent through the request body and try to save this if possible. Then,
// redirect back to the same page
app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

//UPDATE
// if we receive a request that has a route of the form /edit/{id}, perform the
// update operations. If its a get: use TodoTask to search mongodb for the valid tasks,
// and render those tasks plus the newly updated task. If its a post: use `findByIdAndUpdate`
// to update the newly updated task in the database itself, then redirect.
app
    .route("/edit/:id")
    // get requests usually when the user presses the initial edit button
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    // post requests usually when the user resaves a task after editing
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

//DELETE
// if we receive a request that has a route of the form /remove/{id}, perform the
// delete operations. Use `findByIdAndRemove` to delete the task based on the id in
// the database itself, then redirect.
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});
