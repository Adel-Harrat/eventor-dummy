import MainHeader from "./main-header";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

function Layout(props) {
  return (
    <div className={`${inter.className}`}>
      <MainHeader />
      <main className="mt-10">{props.children}</main>
    </div>
  );
}

export default Layout;
