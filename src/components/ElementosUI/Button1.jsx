import { FaSpinner } from 'react-icons/fa';

const Button = ({ type = "button", onClick, className = '', children, disabled = false, loading = false }) => (
  <button
    type={type}
    onClick={onClick}
    className={`py-2 rounded-xl transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : ''} ${className}`}
    disabled={disabled || loading}
  >
    {loading ? <FaSpinner className="animate-spin mx-auto" /> : children}
  </button>
);

export default Button;
