const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema
//------------------------------------------------------------------
const PostSchema  = new mongoose.Schema({
   title: {
      type:String,
      require:true
   },
   body: {
      type: String,
      require:true
   },
   created: {
      type:Date,
      default:Date.now
   },
   photo: {
      type: Buffer, 
      contenType: String
   },
   postedBy: {
      type: ObjectId,
      ref: "User"
   }
})


module.exports=mongoose.model('Post',PostSchema);

