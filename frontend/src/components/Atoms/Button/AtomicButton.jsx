import Button from '@mui/material/Button';
import './AtomicButton.styles.scss';

const AtomicButton = ({ children, onClick, variant = 'contained', color = 'primary' }) => {
  return (
    <Button className={`atomic-button ${variant}`} color={color} onClick={onClick}>
      {children}
    </Button>
  );
};

export default AtomicButton;
