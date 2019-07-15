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
   postedBy: {
      type: ObjectId,
      ref: "User"
   },
   chkPrivate : {
      type: Boolean,
      required:false,
      default:false
   }
})


module.exports=mongoose.model('Post',PostSchema);

