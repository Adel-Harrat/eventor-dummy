import Link from "next/link";

function Button(props) {
  if (!props.link) {
    return (
      <button
        onClick={props.onClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold tracking-tight text-sm sm:text-lg hover:bg-blue-400 transition-all ease-in-out duration-500 flex items-center justify-between gap-3"
      >
        {props.children}
      </button>
    );
  }

  return (
    <Link
      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold tracking-tight text-sm sm:text-lg hover:bg-blue-400 transition-all ease-in-out duration-500 flex items-center justify-between gap-3"
      href={props.link}
    >
      {props.children}
    </Link>
  );
}

export default Button;
