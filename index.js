const express=require("express")
const path=require("path")

const app=express()
//setters
app.set("PORT",process.env.PORT||3001)
app.set('views',"./views")
app.set("view engine", "ejs");


//use
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use("/",require('./routes/index'))
app.use("/stock",require("./routes/index"))
app.use(express.urlencoded({extended:false}));


//middleware
app.listen(app.get("PORT"),()=>
console.log(`Server listen at port ${app.get("PORT")}`)
);
