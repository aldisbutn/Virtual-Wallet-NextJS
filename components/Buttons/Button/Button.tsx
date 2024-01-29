import Style from '@/components/Buttons/Button/Button.module.css'

type ButtonProps = {
  buttonText: string;
  click?: () => void;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
};

const Button = (props: ButtonProps) => {
  const { buttonText, click, variant, size } = props;

  const getButtonStyle = () => {
    if (variant === 'primary') {
      return Style.buttonPrimary;
    } else if (variant === 'secondary') {
      return Style.buttonSecondary;
    } else if (variant === 'success') {
      return Style.buttonSuccess;
    } else if (variant === 'danger') {
      return Style.buttonDanger;
    } else if (variant === 'warning') {
      return Style.buttonWarning;
    } else if (variant === 'info') {
      return Style.buttonInfo;
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
