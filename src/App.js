import {
  Route,
  Routes,
  Navigate,
  unstable_HistoryRouter as Router,
} from "react-router-dom";
import React, { Suspense } from "react";
import history from "./history";
import AuthoRoute from "@/components/AuthRoute";
const Login = React.lazy(() => import("@/pages/Login"));
const Home = React.lazy(() => import("@/pages/Layout"));
const ProfileEdit = React.lazy(() => import("@/pages/Profile/Edit"));

const Chat = React.lazy(() => import("@/pages/Profile/Chat"));
const NotFound = React.lazy(()=>import('@/pages/NotFound'))
// import Login from '@/pages/Login'
// import Home from '@/pages/Home'

export default function App() {
  return (
    <Router history={history}>
      {/* <Link to='/login'>登录</Link>
    <Link to='/home'>首页</Link> */}

      <Suspense fallback={<div>loding...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/home/*" element={<Home />}></Route>

          <Route
            path="/profile/edit"
            element={
              <AuthoRoute>
                <ProfileEdit />
              </AuthoRoute>
            }
          ></Route>
          <Route path="/profile/chat" element={<AuthoRoute><Chat></Chat></AuthoRoute>}></Route>
          <Route path="/*" element={<NotFound></NotFound>}></Route>

        </Routes>
      </Suspense>
    </Router>
  );
}
