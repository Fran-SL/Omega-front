const Label = ({ htmlFor, children, className = '', required = false }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-semibold text-gray-700 mb-1 ${className}`}>
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export default Label;
