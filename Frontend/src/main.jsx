import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import {Route,RouterProvider,createRoutesFromElements} from 'react-router'
import {createBrowserRouter} from 'react-router-dom'
import Home from './pages/Home.jsx';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register.jsx'
import PrivateRouter from './pages/Auth/PrivateRouter.jsx'
import Profile from './pages/user/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import ListGenre from './pages/Admin/ListGenre.jsx'

const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
          <Route index={true} path='/' element={<Home/>}  />
          <Route  path='/login' element={<Login/>} />
          <Route  path='/register' element={<Register/>} />
        

        <Route path={""} element={<PrivateRouter/>}>
          <Route path={"/profile"} element={<Profile/>} />
        </Route>

        <Route path={""} element={<AdminRoute/>}>
           <Route path={"/admin/movies/genre"} element={<ListGenre/>} />
        </Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
