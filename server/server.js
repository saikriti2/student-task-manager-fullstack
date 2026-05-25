const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cors=require("cors");

const User=require("./models/User");

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(
process.env.MONGO_URI
)
.then(()=>{

console.log(
"MongoDB connected"
);

})
.catch((err)=>{

console.log(err);

});

app.get("/",(req,res)=>{

res.send(
"Student Task Manager API running"
);

});



app.post(
"/signup",

async(req,res)=>{

try{

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
"Signup successful"

});

}

catch(error){

res.json({

message:
"Signup failed"

});

}

}

);



app.post(
"/login",

async(req,res)=>{

try{

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

message:
"Login successful",

token

});

}

catch(error){

res.json({

message:
"Login error"

});

}

}

);


const PORT=

process.env.PORT || 5000;

app.listen(

PORT,

()=>{

console.log(

"Server running"

);

}

);