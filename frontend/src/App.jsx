import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import PageNotFound from './components/PageNotFound';
import ProtectedRouter from './components/ProtectedRouter';
import { useSelector } from 'react-redux';

function App() {

  const auths = useSelector((state)=> state.isAuthReducer);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route 
            path='/' 
            element={
              <ProtectedRouter isLoggedIn={auths.jwt == "" || auths.jwt == undefined || auths.jwt == null ? false : true}>
                <Home />
              </ProtectedRouter>
            } 
          />
        </Routes>
      </Router>
    </>
  )
}

export default App;
