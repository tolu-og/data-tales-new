import Link from "next/link";
import Themebutton from "./ThemeButton";
import { SearchBar } from ".";

export default function Navbar() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-4  border-b mb-4">
      <div className="flex justify-between h-16">
        <div className="flex justify-between items-center w-full pb-2 ">
          <Link href="/">
            <h1 className="text-2xl font-medium">
              Data Tales <span className="text-teal-500">by Tolu Labs</span>
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <SearchBar />
            <Themebutton />
          </div>
        </div>
      </div>
    </div>
  );
}
