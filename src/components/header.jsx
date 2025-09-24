import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Make sure lucide-react is installed
import StockTicker from "./StockTicker";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 bg-black/50 bg-cover bg-center bg-blend-multiply backdrop-blur border-b border-white/10">
      {/* Stock ticker on top */}
      <StockTicker />

      {/* Main header content */}
      <div
        className="max-w-8xl mx-auto px-8 py-4 flex items-center justify-between"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-white">
          <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            BlsunTech
          </span>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium text-white">
          <a href="#about" className="hover:text-yellow-300 transition duration-200">
            About
          </a>
          <a href="#projects" className="hover:text-yellow-300 transition duration-200">
            Projects
          </a>
          <a href="#contact" className="hover:text-yellow-300 transition duration-200">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur px-6 py-4">
          <nav className="flex flex-col space-y-4 text-white text-lg font-medium">
            <a href="#about" onClick={toggleMenu} className="hover:text-yellow-300">
              About
            </a>
            <a href="#projects" onClick={toggleMenu} className="hover:text-yellow-300">
              Projects
            </a>
            <a href="#contact" onClick={toggleMenu} className="hover:text-yellow-300">
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
