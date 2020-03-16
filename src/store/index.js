import { createStore } from 'redux'

const INITIAL_STATE = {
    data: [],
}

function user(state = INITIAL_STATE, action){
    switch(action.type){
        case 'LOAD_USER':
            return {...state, data:[...state.data, action.user]}
        default:
    }
}

const store = createStore(user)

export default store










