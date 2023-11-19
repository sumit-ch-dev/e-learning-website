import TextField from '@mui/material/TextField';
import './AtomicInput.styles.scss';


const AtomicInput = ({ label, name, register, error }) => {
  return (
    <div className="atomic-input">
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        {...register(name, { required: `${label} is required` })}
        error={!!error}
        helperText={error && error.message}
      />
    </div>
  );
};

export default AtomicInput;
