export default function Label({ children, htmlFor }) {
  return (
    <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
