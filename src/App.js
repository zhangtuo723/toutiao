import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import React,{Suspense} from 'react'


const Login = React.lazy(()=>import('@/pages/Login'))
const Home = React.lazy(()=>import('@/pages/Home'))
// import Login from '@/pages/Login'
// import Home from '@/pages/Home'

export default function App() {
  return <Router>
    {/* <Link to='/login'>登录</Link>
    <Link to='/home'>首页</Link> */}

    <Suspense fallback={<div>loding...</div>}>
    <Routes>

    <Route exact path='/' element={<Home></Home>}></Route>
    <Route  path='/login' element={<Login/>} ></Route>
    <Route  path='/home' element={<Home/>}></Route>
    </Routes>
    </Suspense>
      
    
    
  </Router>
}
