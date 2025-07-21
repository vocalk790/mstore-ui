import React from 'react';
import clsx from 'clsx';
import './Button.css';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...rest }, ref) => {
    const classes = clsx(
      'ui-button',
      variant && `ui-button--variant-${variant}`,
      size && `ui-button--size-${size}`
      ,
      className
    );

    return (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
