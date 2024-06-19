import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './pages/Home';
import { Register } from './pages/auth/Register';
import { Login } from './pages/auth/Login';
import Navbar from './components/common/Navbar';
import { ProductsList } from './pages/ProductsList';
import { Addproducts } from './pages/Addproduct';
import { Updateproduct } from './pages/Updateproduct';

function App() {

  const PublicRoutes = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/register',
      component: <Register />
    },
    {
      path: '/login',
      component: <Login />
    },
  ]


  const PrivateRoutes = [
    {
      path: '/products',
      component: <ProductsList />
    },
    {
      path: '/addproduct',
      component: <Addproducts />
    },
    {
      path: '/update/:id',
      component: <Updateproduct />
    },
  ]

  return (
    <div className="App">

      <Router >
        <ToastContainer />
        <Navbar />
        <Routes >

          {
            PublicRoutes?.map(route => {
              return (
                <Route path={route.path} element={route.component} key={route} />
              )
            })
          }

          {
            PrivateRoutes?.map(route => {
              return (
                <Route path={route.path} element={route.component} key={route} />
              )
            })
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
