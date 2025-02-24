const mongoose = require('mongoose');  //requireing mongosh

const chatSchema = new mongoose.Schema({  //schema is defined
    from: {
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    msg:{
        type: String,
        maxLength: 50  
    },
    created_at:{
        type:Date
    }
})
const Chat = mongoose.model("Chat" ,chatSchema); //creates collection called chats & inserting schema named "chatSchema"
module.exports = Chat;    //exporting to index.js, init.js ....
