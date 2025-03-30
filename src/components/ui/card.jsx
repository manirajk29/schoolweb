export function Card({ children, className }) {
    return <div className={`border rounded-lg shadow p-4 ${className}`}>{children}</div>;
  }
  
  export function CardHeader({ children }) {
    return <div className="font-bold text-lg">{children}</div>;
  }
  
  export function CardTitle({ children }) {
    return <h2 className="text-xl font-semibold">{children}</h2>;
  }
  
  export function CardDescription({ children }) {
    return <p className="text-gray-600">{children}</p>;
  }
  
  export function CardContent({ children }) {
    return <div>{children}</div>;
  }
  