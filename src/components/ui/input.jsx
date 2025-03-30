export function Input({ type, value, onChange, className }) {
    return (
      <input type={type} value={value} onChange={onChange} className={`border p-2 rounded ${className}`} />
    );
  }
  