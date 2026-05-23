const express=require("express");

const app=express();

app.use(express.json());

let tasks=[];



app.post(
"/login",
(req,res)=>{

res.json({

token:"demo123"

});

}
);



app.get(
"/tasks",
(req,res)=>{

res.json(tasks);

}
);



app.post(
"/tasks",
(req,res)=>{

tasks.push(req.body);

res.json({

message:
"Task Added"

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