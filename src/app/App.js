import React, { Component } from "react";


class App extends Component {

  constructor(){
    super();
    this.state = {
      title:'',
      description:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  };


  addTask(e){
    //Para enviar los datos
    fetch('/api/tasks',{
      method:'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res =>console.log(res))
      .catch(err=>console.error(err))
    e.preventDefault();
    //Para evitar que el navegador se refresque y poder ver el resultado
  }

  handleChange(e){
    //Obtengo el valor de cada input
    //Desde el e.target quiero el elemento y el valor
    const { name,value } = e.target;
    this.setState({
      [name]:value
    })
  }

  render() {
    return (
      <div>
        {/* Navigation*/}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              MERN STACK
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="title"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="description"
                          onChange={this.handleChange}
                          className="materialize-textarea"
                          placeholder="description"
                        ></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;