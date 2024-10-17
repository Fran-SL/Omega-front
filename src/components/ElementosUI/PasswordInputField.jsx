const PasswordInputField = ({ id, placeholder, value, onChange, showPassword, togglePasswordVisibility, errorMessage, disabled }) => (
  <div className="mb-4">
    <Label htmlFor={id}>{placeholder}</Label>
    <div className="relative">
      <input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-sgreen pr-10`}
        value={value}
        onChange={onChange}
        required
        aria-describedby={errorMessage ? `${id}-error` : undefined}
        disabled={disabled}
      />
      <Button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-2 text-sgreen"
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </Button>
    </div>
    {errorMessage && (
      <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
        {errorMessage}
      </p>
    )}
  </div>
);

export default PasswordInputField;
