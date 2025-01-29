import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const Input = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  errorMessage,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-lg border border-border-light bg-background-main px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 ${
            errorMessage ? "border-error" : ""
          }`}
        />
        
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      
      {errorMessage && (
        <p className="text-sm text-error">{errorMessage}</p>
      )}
    </div>
  );
};