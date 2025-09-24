// src/App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import LandingHero from "./components/LandingHero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import NewsFeed from "./components/NewsFeed";
import Contact from "./components/contact";
import AdminEnquiries from "./pages/AdminEnquiries";
import StartProjectModal from "./components/StartProjectModal";

function Home({ onOpenStartProject }) {
  return (
    <>
      <LandingHero onOpenStartProject={onOpenStartProject} />
      <About />
      <Services />
      <Projects />
      <NewsFeed />
      <Contact onOpenStartProject={onOpenStartProject} />
    </>
  );
}

export default function App() {
  const [startOpen, setStartOpen] = useState(false);
  const [presetService, setPresetService] = useState("");

  const openStart = (serviceName = "") => {
    setPresetService(serviceName);
    setStartOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-indigo-950 text-white">
        <Header onOpenStartProject={() => openStart()} />
        <main>
          <Routes>
            <Route path="/" element={<Home onOpenStartProject={() => openStart()} />} />
            <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          </Routes>
        </main>

        {/* The modal sits once at the root so any page can open it */}
        <StartProjectModal
          open={startOpen}
          onClose={() => setStartOpen(false)}
          presetService={presetService}
        />
      </div>
    </BrowserRouter>
  );
}
