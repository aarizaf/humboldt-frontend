import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

function Button({ isLoading = false, loadingText, children, disabled, className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`ui-button ${className}`.trim()}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? loadingText ?? children : children}
    </button>
  );
}

export default Button;
