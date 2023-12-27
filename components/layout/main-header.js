import Link from "next/link";
import LogoIcon from "../icons/logo-icon";

function MainHeader(props) {
  return (
    <header className="bg-blue-500 h-16 px-5 sm:px-10">
      <div className="flex items-center justify-between max-w-2xl h-full mx-auto">
        <div>
          <Link
            href="/"
            className="text-white font-bold tracking-tight text-2xl flex items-center gap-3"
          >
            <LogoIcon />
            Eventor
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link
                className="text-blue-100 hover:text-white transition-all ease-in-out duration-150"
                href="/events"
              >
                <span className="hidden sm:inline-block">Browse</span> All
                Events
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainHeader;
