import { useForm } from 'react-hook-form';
import InputField from './InputField';
import { Button } from '@mui/material';

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <InputField
        label="Email"
        name="email"
        type="email"
        register={register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'Invalid email address',
          },
        })}
        error={errors.email}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        register={register('password', { required: 'Password is required' })}
        error={errors.password}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;