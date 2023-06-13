import classNames from 'classnames';
import { ReactNode } from 'react';

interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
  transparent?: boolean;
  isSelected?: boolean;
}

export const Button = ({
  icon,
  label,
  onClick,
  transparent,
  isSelected,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        'inline-flex items-center border border-transparent text-sm font-medium rounded-md shadow-sm text-white outline-none',
        transparent
          ? 'bg-transparent hover:text-orange-400 pt-2'
          : 'bg-orange-600 hover:bg-orange-700 px-4 py-2',
        isSelected && 'text-orange-400',
      )}
    >
      {icon && <div className="mr-2">{icon}</div>}
      {label}
    </button>
  );
};
