// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/header";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/contact";
import NewsFeed from "./components/NewsFeed";
import AdminEnquiries from "./pages/AdminEnquiries";

function Home() {
  return (
    <>
      <About />
      <Services />
      <Projects />
      <NewsFeed />
      <Contact />
    </>
  );
}

function Layout() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 font-inter">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>&copy; 2025 BlsunTech. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          <Route path="*" element={<div className="p-8">Not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
