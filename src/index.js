const express = require('express');
const morgan = require('morgan');
const app = express()

//Settings
app.set('port', process.env.PORT || 3000) 
//En esta configuracion defino que tome el servidor que le de la nube y que en caso de no haber tome el puerto 3000



//Middlewares funciones que se ejecutan antes de que lleguen a las rutas

//De esta forma me permite ver el las peticiones formateadas
app.use(morgan('dev'));
app.use(express.json())

//Routes
app.use('/api/tasks',require('./routes/task.routes'))

//Static files


//Starting server
app.listen(app.get('port'), () =>{
  console.log(`Server on port ${app.get('port')}`)
})