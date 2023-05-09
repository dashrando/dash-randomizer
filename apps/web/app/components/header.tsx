import Link from "next/link";

export default function Header() {
  return (
    <div id="header">
      <Link href="/">
        <img
          src="/images/dashLogo-noBG.png"
          alt="Super Metroid DASH Randomizer"
        />
      </Link>
    </div>
  );
}
