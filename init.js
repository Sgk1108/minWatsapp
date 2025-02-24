//this file is used just to insert some data in chatSchema
const mongoose = require('mongoose');  //requireing mongosh
const Chat = require("./models/chat.js")

main()
.then(()=> console.log("connection Successful") )
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/watsapp');
}


let allchats = [
    {
    from:"Supriya",
    to:"Sushila",
    msg:"When shall we go for outing",
    created_at: new Date()  //it is function in mongoose
   },

   {
    from:"Babulal",
    to: "Shymlal",
    msg:"Aagh Chale bhai",
    created_at: new Date() 
  },

  {
   from:"Aunu",
   to: "Sonu",
   msg: "Aagh chale kya sonu",
   created_at: new Date() 
  }
]

Chat.insertMany(allchats);
