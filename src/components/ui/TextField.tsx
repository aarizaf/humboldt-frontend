import type { InputHTMLAttributes, ReactNode } from 'react';
import './TextField.css';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  endAction?: ReactNode;
  errorId?: string;
}

function TextField({ label, icon, endAction, errorId, id, className = '', ...rest }: TextFieldProps) {
  return (
    <div className="login-input-group">
      <label htmlFor={id} className="login-label">
        {label}
      </label>
      <div className="login-input-wrapper">
        {icon && (
          <span className="login-input-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`login-input ${icon ? 'login-input--has-icon' : ''} ${endAction ? 'login-input--has-end-action' : ''} ${className}`.trim()}
          aria-describedby={errorId}
          {...rest}
        />
        {endAction && <span className="login-input-end-action">{endAction}</span>}
      </div>
    </div>
  );
}

export default TextField;
