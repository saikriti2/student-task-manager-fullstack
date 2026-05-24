require("dotenv").config();

const mongoose=require("mongoose");
const express=require("express");

const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");

const User=require("./models/User");
const Task=require("./models/Task");

const auth=
require("./middleware/auth");

const app=express();

app.use(express.json());

let tasks=[];
mongoose.connect(
process.env.MONGO_URI
)

.then(()=>{

console.log(
"MongoDB Connected"
);

})

.catch(error=>{

console.log(error);

});


/* SIGNUP */

app.post(
"/signup",
async(req,res)=>{

let hashedPassword=

await bcrypt.hash(

req.body.password,
10

);

let user=

new User({

username:
req.body.username,

email:
req.body.email,

password:
hashedPassword

});

await user.save();

res.json({

message:
"User created"

});

}
);

app.post(
"/login",
async(req,res)=>{

let user=

await User.findOne({

email:
req.body.email

});

if(!user){

return res.json({

message:
"User not found"

});

}

let valid=

await bcrypt.compare(

req.body.password,

user.password

);

if(!valid){

return res.json({

message:
"Wrong password"

});

}

let token=

jwt.sign(

{

id:user._id

},

process.env.JWT_SECRET

);

res.json({

token

});

});

/* TASKS */

app.get(
"/tasks",
auth,

async(req,res)=>{

let tasks=

await Task.find({

userId:
req.userId

});

res.json(tasks);

});

app.post(
"/tasks",
(req,res)=>{

tasks.push(req.body);

res.json({

message:"Task Added"

});

}
);


app.listen(
5000,
()=>{

console.log(
"Server running on port 5000"
);

}
);