const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js")  // requiring "chats.js" file which contains schema(collection are made)
const methodOverride = require('method-override');

app.set("views",path.join(__dirname,"views"))
app.set("views engine","ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
main()
.then(()=> console.log("connection Successful") )
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/watsapp');  
}

// let chat1 = new Chat({
//     from:"Neha",
//     to:"Priya",
//     msg:"Send me your exam sheets",
//     created_at: new Date()  //it is function in mongoose
// })
// chat1.save().then((res)=>{
//     console.log(res); 
//})

app.get("/chats", async (req,res)=>{  //all Chats
    let chats = await Chat.find();       //("find" is function of mangoose)
    // console.log(chats);
    res.render("index.ejs",{chats})
})

app.get("/chats/new",(req,res)=>{  //displayNewChat
    res.render("new.ejs");
})

app.post("/chats",(req,res)=>{  //inserting new chat
    let {from , msg , to}= req.body
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    newChat.save()
    .then( (result)=>{
         console.log("Chat was saved")  
         console.log(newChat);
         res.redirect("/chats");
        })   
    .catch((err)=> console.log(err)) 
    
    console.log(newChat);
    
})

app.get("/chats/:id/",async (req,res)=>{  //display edit file
    let {id} = req.params;
    let chat = await Chat.findById(id)  //function of mongose
    res.render("edit.ejs",{chat});
})

app.put("/chats/:id",async (req,res)=>{   //push edited file in mainChats
    let {id} = req.params;
    let {newMsg} = req.body;
    console.log(newMsg);
    let updateChat = await Chat.findByIdAndUpdate(id,{msg:newMsg}, {runValidators:true,new :true})
    console.log(updateChat);
    res.redirect("/chats");

})

app.delete("/chats/:id", async(req,res)=>{
      let  {id} = req.params;
      let deletedChat = await Chat.findByIdAndDelete(id)
      console.log(deletedChat);
      res.redirect("/chats")
})

app.get("/",(req,res)=>{  //displayHomePage
    res.send("Working")
})

app.listen(8080,()=>{
    console.log("Server is lestining on port 8080");
})