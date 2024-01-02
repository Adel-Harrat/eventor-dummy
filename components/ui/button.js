import Link from "next/link";

function Button(props) {
  const classes = `inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 gap-5 ${props.className}`;

  if (!props.link) {
    return (
      <button
        onClick={props.onClick}
        className={classes}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }

  return (
    <Link className={classes} href={props.link}>
      {props.children}
    </Link>
  );
}

export default Button;
