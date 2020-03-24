import { createStore } from 'redux'

const INITIAL_STATE = {
}

function user(state = INITIAL_STATE, action){
    switch(action.type){
        case 'LOAD_USER':
            return Object.assign(state, action.user)
        case 'ADD_INFORMATION':
            return Object.assign(state, action.user)
        default:
    }
}

const store = createStore(user)

export default store










