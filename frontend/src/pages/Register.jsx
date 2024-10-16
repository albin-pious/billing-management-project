import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import { postApi } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const auths = useSelector(state => state.isAuthReducer)

  useEffect(() => {
    if (auths && auths.jwt != "" && auths.jwt != undefined && auths.jwt != null) {
        navigate("/")
    }
}, [])

  // Define the async onSubmit handler
  const handleRegister = async (data) => {
    try {
       const response = await postApi('/auth/register', data);
       console.log("::: ",response);
      if (response.status === 201) {
        // If successful, show success message
        setSuccessMessage(`Registration successful for ${data.name}`);
      }else {
        setErrorMessage('email or password already existing.')
      }
    } catch (error) {
      console.error("Registration failed", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage("check email and password");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again."); 
      }
      setSuccessMessage("");
    }
  };
  console.log(errorMessage);
  return (
    <Box className="min-h-screen flex justify-center items-center bg-gray-100">
      <Box className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <Typography variant="h3" className="text-2xl mb-6 text-center">
          Register
        </Typography>
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} 
        <RegisterForm onSubmit={handleRegister} /> 
        <Typography className="p-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
                Log in here
            </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
