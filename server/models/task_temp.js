const mongoose=require("mongoose");

const TaskSchema=new mongoose.Schema({

task:String,

userId:String,

completed:{
type:Boolean,
default:false
}

});

module.exports=
mongoose.model(
"Task",
TaskSchema
);