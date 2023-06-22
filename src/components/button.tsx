import clsx from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
  transparent?: boolean;
  isSelected?: boolean;
  className?: string;
}

export const Button = ({
  icon,
  label,
  onClick,
  transparent,
  isSelected,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        className,
        'inline-flex items-center border border-transparent text-sm font-medium rounded-md shadow-sm marker:outline-none',
        transparent
          ? 'bg-transparent hover:text-orange-400'
          : 'bg-orange-600 hover:bg-orange-700 px-4 py-2',
        isSelected ? 'text-orange-400' : 'text-white',
      )}
    >
      {icon && <div className="mr-2">{icon}</div>}
      {label}
    </button>
  );
};
