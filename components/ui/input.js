function Input({
  id,
  type = "text",
  placeholder,
  className,
  inputRef,
  readOnly = false,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      ref={inputRef}
      className={`shadow-sm focus:outline-none border-2 border-transparent focus:border-blue-500 block w-full sm:text-sm rounded-md px-3 py-1.5 ${className}`}
      readOnly={readOnly}
    />
  );
}

export default Input;
