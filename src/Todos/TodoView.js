import React from 'react';

const TodoView = ({
  data,
  toogleEditTodo,
  isEdit,
  onHandleEditTodo,
  handleOnFocus,
  handleOnBlur,
  remove,
  newTypedTodoText,
  onHandleChangeText,
  onHandleAddNewTodo,
}) => (
  <div style={{ margin: '0 auto', maxWidth: '400px' }}>
    <h2>data:</h2>
    <ul className='list-group list-group-flush'>
      {data.length === 0 ? (
        <li className='list-group-item d-flex justify-content-between align-items-center'>Congrats! You did it!</li>
      ) : (
        data.map((t, idx) => (
          <li key={t} className='list-group-item d-flex justify-content-between align-items-center' onDoubleClick={() => toogleEditTodo(idx)}>
            {++idx}.{' '}
            {isEdit === idx ? (
              <input
                type='text'
                className='form-control'
                defaultValue={t}
                autoFocus={true}
                onChange={onHandleEditTodo}
                onFocus={() => handleOnFocus(t)}
                onBlur={() => handleOnBlur(t)}
              />
            ) : (
              t
            )}
            {isEdit !== idx ? (
              <button className='close' onClick={() => remove(t)}>
                <span>&times;</span>
              </button>
            ) : null}
          </li>
        ))
      )}
    </ul>

    <br />
    <div className='input-group'>
      <input type='text' value={newTypedTodoText} className='form-control' onChange={onHandleChangeText} placeholder='Write something' />
      <div className='input-group-append'>
        <button className='btn btn-outline-secondary' onClick={onHandleAddNewTodo}>
          Add
        </button>
      </div>
    </div>
  </div>
);

export default TodoView;
