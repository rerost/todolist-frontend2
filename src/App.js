import React, { Component } from "react";
import "./App.css";

import { TaskServiceClient } from "./api/todo_grpc_web_pb";
import { ListTasksRequest, CreateTaskRequest, Task } from "./api/todo_pb";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

class App extends Component {
  constructor(props) {
    super(props);
    this.client = new TaskServiceClient("http://localhost:8080");
    this.state = {
      tasks: [],
      text: ""
    };
  }

  componentDidMount() {
    let req = new ListTasksRequest();
    this.client.listTasks(req, {}, (err, res) => {
      if (err != null) {
        console.log(err);
        return;
      }
      this.setState({
        tasks: res.getTasksList()
      });
    });
  }
  sendTask(e) {
    let req = new CreateTaskRequest();
    let task = new Task();
    task.setTitle(this.state.text);
    req.setTask(task);
    this.client.createTask(req, {}, (err, res) => {
      if (err != null) {
        console.log(err);
        return;
      }
      this.setState({
        tasks: [res, ...this.state.tasks]
      });
    });
  }
  onChange(e) {
    let text = e.target.value;
    this.setState({
      text: text
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <textarea onChange={e => this.onChange(e)} />
            <button onClick={e => this.sendTask(e)} />
            {this.state.tasks.map(task => {
              return <div key={task.getTaskId()}>{task.getTitle()}</div>;
            })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
