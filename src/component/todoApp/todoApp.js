import React, { Component } from "react";
import "./todoApp.css";

class Todo extends Component {
  state = {
    item: [],
    inputValue: "",
    isChecked: false,
    editStatus: false,
    editInput: "",
  };
  changeInputValue = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  storeItem = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    this.setState({
      item: [...this.state.item, inputValue],
      inputValue: "",
    });
  };

  deleteItem = (index) => {
    this.setState({
      item: this.state.item.filter((val, ind) => {
        return ind !== index;
      }),
    });
  };
  handlingCheckBox = () => {
    this.setState({
      isChecked: true,
    });
  };

  editHandling = (key) => {
    this.setState({
      editStatus: key,
    });
  };

  editing = (index) => {
    this.setState({
      item: this.state.item.map((val, key) => {
        return key === index ? (val = this.state.editInput) : val;
      }),
      editInput: "",
      editStatus: false,
    });
  };
  editInputChange = (event) => {
    this.setState({
      editInput: event.target.value,
    });
    console.log(this.state.editInput);
  };

  render() {
    console.log(this.state.item);
    const { inputValue, item } = this.state;
    return (
      <div className="todo-container">
        <h4>Todo App</h4>

        <form className="input-section" onSubmit={this.storeItem}>
          <input
            type="text"
            value={inputValue}
            onChange={this.changeInputValue}
            placeholder="Enter Task..."
          />
        </form>
        <ul>
          {item.map((item, index) => (
            <li key={index}>
              {index !== this.state.editStatus ? (
                <span>
                  <input type="checkbox" />
                  {item}
                </span>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    this.editing(index);
                  }}
                >
                  <input
                    type="text"
                    value={this.state.editInput}
                    onChange={this.editInputChange}
                  />
                </form>
              )}
              <i
                className="fa-solid fa-trash"
                onClick={() => this.deleteItem(index)}
              ></i>
              <button onClick={() => this.editHandling(index)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
