// ------------------------------------
// Constants
// ------------------------------------
export const TODOS_ADD = 'TODOS_ADD';
export const TODOS_EDIT = 'TODOS_EDIT';
export const TODOS_REMOVE = 'TODOS_REMOVE';

// ------------------------------------
// Actions
// ------------------------------------
export function add(todo = '') {
  return {
    type: TODOS_ADD,
    payload: todo,
  };
}

export function edit(todo, newTodo) {
  return {
    type: TODOS_EDIT,
    payload: {
      prev: todo,
      new: newTodo,
    },
  };
}

export function remove(todo) {
  return {
    type: TODOS_REMOVE,
    payload: todo,
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TODOS_ADD]: (state, action) => ({ data: [...state.data, action.payload] }),
  [TODOS_EDIT]: (state, action) => ({ data: state.data.map(t => (t === action.payload.prev ? action.payload.new : t)) }),
  [TODOS_REMOVE]: (state, action) => ({ data: state.data.filter(t => t !== action.payload) }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ['Buy milk', 'Do exercises', 'Cook dinner'];
export default function todosReducer(state = { data: initialState }, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
