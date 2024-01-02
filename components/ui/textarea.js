function Textarea({ id, placeholder, className, rows = 3, inputRef }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={`bshadow-sm focus:outline-none border-2 border-transparent focus:border-blue-500 block w-full sm:text-sm rounded-md px-3 py-1.5 ${className}`}
      rows={rows}
      ref={inputRef}
    ></textarea>
  );
}

export default Textarea;
