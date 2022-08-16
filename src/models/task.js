
const mongoose = require('mongoose');

//El schema me permite definir el esquema de los datos
const {Schema} = mongoose;

const TaskSchema = new Schema({
  title: { type: String, required : true},
  description: {type: String, required: true}
});

module.exports = mongoose.model("Task", TaskSchema);
