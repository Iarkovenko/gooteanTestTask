import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TodoView from './TodoView';

export default class Todos extends Component {
  state = {
    newTypedTodoText: '',
    isEdit: false,
    editTypedTodoText: '',
  };

  onHandleChangeText = ({ target: { value } }) => {
    this.setState({ newTypedTodoText: value });
  };

  toogleEditTodo = idx => {
    this.setState({ isEdit: idx });
  };

  onHandleEditTodo = ({ target: { value } }) => {
    this.setState({ editTypedTodoText: value });
  };

  handleOnFocus = todoText => {
    this.setState(prevState => ({
      editTypedTodoText: prevState.editTypedTodoText === '' ? todoText : editTypedTodoText,
    }));
  };

  handleOnBlur = prevTodo => {
    const { editTypedTodoText } = this.state;
    const { todos, edit, remove } = this.props;

    if (editTypedTodoText === prevTodo) {
      this.setState({
        isEdit: false,
        editTypedTodoText: '',
      });
      return;
    }

    this.setState({
      isEdit: false,
      editTypedTodoText: '',
    });
    editTypedTodoText === ''
      ? remove(prevTodo)
      : this.validateForExistTodo(editTypedTodoText, todos)
      ? alert('Todo is exist or almost the same')
      : edit(prevTodo, editTypedTodoText);
  };

  onHandleAddNewTodo = () => {
    const { newTypedTodoText } = this.state;
    const { todos, add } = this.props;
    this.setState({ newTypedTodoText: '' });
    this.validateForExistTodo(newTypedTodoText, todos) || '' ? alert('Todo is exist or almost the same or empty') : add(newTypedTodoText);
  };

  validateForExistTodo = (todo, todos) => {
    const formatFunction = text =>
      text
        .replace(/\s+/gm, ' ')
        .trim()
        .toLowerCase();

    const formatedText = formatFunction(todo);
    const formatedDb = todos.map(el => formatFunction(el));

    return formatedDb.includes(formatedText) || !formatedText ? true : false;
  };

  render() {
    const { newTypedTodoText, isEdit, editTypedTodoText } = this.state;
    const { todos, remove } = this.props;
    return (
      <TodoView
        data={todos}
        isEdit={isEdit}
        remove={remove}
        toogleEditTodo={this.toogleEditTodo}
        editTypedTodoText={editTypedTodoText}
        onHandleEditTodo={this.onHandleEditTodo}
        handleOnFocus={this.handleOnFocus}
        handleOnBlur={this.handleOnBlur}
        newTypedTodoText={newTypedTodoText}
        onHandleChangeText={this.onHandleChangeText}
        onHandleAddNewTodo={this.onHandleAddNewTodo}
      />
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  editTypedTodoText: PropTypes.string,
  newTypedTodoText: PropTypes.string,
};
