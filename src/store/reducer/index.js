import {combineReducers} from 'redux'

function test(state=0,action){
    return state
}
function user(state={name:'zx',age:10},action){
    return state
}

export default combineReducers({
    test,
    user
})