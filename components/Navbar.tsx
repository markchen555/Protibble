import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image
            src="/logo.svg"
            className="navbar_logo"
            width={40}
            height={40}
            alt="Protibble"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
