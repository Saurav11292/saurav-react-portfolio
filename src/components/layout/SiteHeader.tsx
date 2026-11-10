import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navigationItems = ["About", "Skills", "Projects", "Experience", "Contact"];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="topbar">
      <a className="brand" href="#home" onClick={closeMenu}>
        SV<span>.</span>
      </a>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={menuOpen ? "nav nav-open" : "nav"}>
        {navigationItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>
            {item}
          </a>
        ))}
        <a
          className="resume-link"
          href="/Saurav_Verma_Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume <ArrowUpRight size={14} />
        </a>
      </nav>
    </header>
  );
}
