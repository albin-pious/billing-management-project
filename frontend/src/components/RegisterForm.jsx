import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { Button } from "@mui/material";

const RegisterForm = ({ onSubmit }) => {  // Ensure it's called onSubmit here
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">  {/* handleSubmit wraps onSubmit */}
      <InputField
        label="Name"
        name="name"
        register={register("name", { required: "Name is required" })}
        error={errors.name}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Invalid email address",
          },
        })}
        error={errors.email}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        register={register("password", { required: "Password is required" })}
        error={errors.password}
      />
      <InputField
        label="Phone"
        name="phone"
        type="tel"
        register={register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Invalid phone number",
          },
        })}
        error={errors.phone}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
