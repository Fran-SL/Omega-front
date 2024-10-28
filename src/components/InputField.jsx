const InputField = ({ label, name, type, value, onChange, placeholder = '', required = false }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 border border-gray-300 rounded-2xl w-full"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
  
  export default InputField;
  