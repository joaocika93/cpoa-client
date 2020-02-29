import { createStore } from 'redux'

const INITIAL_STATE = {
    data: [[]],
}
function list(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOAD_CONTENT':
            //console.log(action.load)
            return {...state, data: [action.load]};
        default:
            return state;
    }
}

const store = createStore(list)

export default store










