import React from 'react';

interface IButtonProps {
  title: string;
  color?: string;
}

type Button = React.FC<IButtonProps>;

const Button: Button = ({title, color}: IButtonProps) => {
  return <button style={{backgroundColor: color}}>{title}</button>;
};

export default Button;
