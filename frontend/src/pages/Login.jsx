import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { postApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../statemanagement'
import { Constants } from '../utils/Constants';

const LoginPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const auths = useSelector(state => state.isAuthReducer);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        if (auths && auths.jwt != "" && auths.jwt != undefined && auths.jwt != null) {
            navigate("/")
        }
    }, [])

  const handleLogin = async(data) => {
    try {
        const response = await postApi('/auth/login', data);
        console.log(response);
        if(response.success){
            setSuccessMessage(`Login successful for ${data.email}`);
            localStorage.setItem(Constants.token, response.token);
            localStorage.setItem(Constants.refreshToken, response.refreshToken);
            actions.isAuthenticated({ jwt: response.token })
            navigate('/');
        }
    } catch (error) {
        console.error('error occured while submitting ',error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl mb-6 text-center">Login</h1>
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;