const express = require('express');
const task = require('../models/task');
const router = express.Router();

//Esto me permite hacerle consultas a la db
const Task = require('../models/task')

router.get('/',  async (req ,  res ) =>{

  //Esta funcion me muestra en consola los datos de la db
  //Guardo los datos de la db dentro de una variable
    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks);
  
})

router.get('/:id', async (req, res) =>{
  const task = await Task.findById(req.params.id);
  res.json(task);
})

router.post('/', async (req, res) =>{
  //console.log(req.body);
  const { title, description } = req.body;
  //Esto me crea un nuevo objeto
  const task = new Task( { title,description } );
  //Esto utilizo para que se guarde en la base de datos
  //Como lleva tiempo le pongo await y luego sigue con el código
  await task.save();

  res.json( {status:'Task saved'});
});

//Para actualizar los datos
router.put('/:id' , async (req,res) =>{
  const {title , description } = req.body;
  const newTask = {title,description};
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({status: 'Taks updated'})
})

router.delete('/:id',async (req,res)=>{
  await Task.findByIdAndRemove(req.params.id);
  res.json( {status:'Taks deleted'})
})

module.exports = router;
