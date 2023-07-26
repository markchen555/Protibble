import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";

const Navbar = () => {
  const session = { user: "test" };
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
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href}>{link.text}</Link>
          ))}
        </ul>
      </div>

      <div className="flexCener gap-4">
        {session?.user ? (
          <>
            UserPhoto
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders></AuthProviders>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
