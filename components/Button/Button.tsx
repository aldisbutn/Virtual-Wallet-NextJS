import Style from '@/components/Button/Button.module.css';

type ButtonProps = {
  buttonText: string;
  click?: () => void;
  variant: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
};

const Button = (props: ButtonProps) => {
  const { buttonText, click, variant, size } = props;

  const getButtonStyle = () => {
    if (variant === 'primary') {
      return Style.buttonPrimary;
    } else if (variant === 'secondary') {
      return Style.buttonSecondary;
    }
  };

  const getButtonSize = () => {
    if (size === 'small') {
      return Style.buttonSmall;
    } else if (size === 'medium') {
      return Style.buttonMedium;
    } else if (size === 'large') {
      return Style.buttonLarge;
    }
  };
  return (
    <>
      <button onClick={click} className={`${Style.button} ${getButtonStyle()} ${getButtonSize()}`}>
        {buttonText}
      </button>
    </>
  );
};

export default Button;
