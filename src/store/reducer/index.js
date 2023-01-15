import {combineReducers} from 'redux'
import login from './login'
import profile from './profile'
import home from './home'
export default combineReducers({
    
    profile,
    login,
    home
})