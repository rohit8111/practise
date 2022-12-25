const mongoose = require('mongoose');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');


const sampleSchema=new mongoose.Schema({
 
  updateOnUrlShortner:{
    type: Boolean,
    required: [true],
   
  },
  updateOnbillGenerator:{
    type: Boolean,
    required: [true],
   
  },
  receiptName:{
    type:String,
  }
})
module.exports = mongoose.model('sample', sampleSchema);