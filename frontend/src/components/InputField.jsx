import { Box, TextField } from "@mui/material"

const InputField = ({ label, name, register, error, type='text', ...rest})=>{
    return(
        <Box className="mb-4">
            <TextField
                label={label}
                fullWidth
                type={type}
                {...register}
                error={!!error}
                helperText={error?.message}
                {...rest}
            />
        </Box>
    )
}

export default InputField;