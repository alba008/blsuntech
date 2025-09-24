import React from 'react';

const Header = () => {
  return (
    <header
      className="text-white p-10 shadow-md  bg-black/50 bg-cover bg-center bg-blend-multiply"
      
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-4xl font-extrabold tracking-wide
               bg-gradient-to-r from-blue-900 to-green-600
               bg-clip-text text-transparent transition
               hover:from-blue-700 hover:to-emerald-400">
  BlsunTech
</h1>
        <nav className="mt-6 md:mt-0">
          <ul className="flex space-x-8 text-lg font-semibold">
            <li>
              <a href="#about" className="hover:text-yellow-300 transition">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-yellow-300 transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-300 transition">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
