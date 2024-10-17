const InputField = ({ id, type = "text", placeholder, value, onChange, errorMessage, disabled }) => (
  <div className="mb-4">
    <Label htmlFor={id}>{placeholder}</Label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen`}
      value={value}
      onChange={onChange}
      required
      aria-describedby={errorMessage ? `${id}-error` : undefined}
      disabled={disabled}
    />
    {errorMessage && (
      <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
        {errorMessage}
      </p>
    )}
  </div>
);

export default InputField;
