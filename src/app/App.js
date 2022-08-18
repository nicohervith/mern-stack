import React, { Component } from "react";


class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      tasks: [],
      _id: " ",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  addTask(e) {
    e.preventDefault();
    //Para evitar que el navegador se refresque y poder ver el resultado

    //Para enviar los datos
    if (this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          window.M.toast({ html: "Task Updated" });
          this.setState({ _id: "", title: "", description: "" });
          this.fetchTasks();
        });
    } else {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.M.toast({ html: "Task Saved" });
          this.setState({ title: "", description: "" });
          this.fetchTasks();
        })
        .catch((err) => console.error(err));
    }
  }

  //Me muestra todos los datos del servidor utilizando el get de la funcion fetch
  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    //Por defecto envia una peticion GET
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        this.setState({ tasks: data });
        console.log(this.state.tasks);
      });
  }

  deleteTask(id) {
    if (confirm("Are you sure you want to delete it?")) {
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
           window.M.toast({ html: "Task deleted" });
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id,
        });
      });
  }

  handleChange(e) {
    //Obtengo el valor de cada input
    //Desde el e.target quiero el elemento y el valor
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
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
                          value={this.state.title}
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
                          value={this.state.description}
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
              <table className="">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            className="btn light-blue darken-4"
                            onClick={() => this.deleteTask(task._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <button
                            className="btn light-blue darken-4"
                            style={{ margin: "5px" }}
                            onClick={() => this.editTask(task._id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;