import mongoose from "mongoose"

const studentSchema = mongoose.Schema({
    name:String,
    email:String,
   age:Number,

});
export default studentSchema