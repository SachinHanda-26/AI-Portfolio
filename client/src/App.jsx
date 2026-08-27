import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';
import ChatPanel from './components/chat/ChatPanel';

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => setChatOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-surface-900 text-text-primary">
      {/* Dot pattern background */}
      <div className="fixed inset-0 dot-pattern opacity-40 pointer-events-none" />

      {/* Navigation */}
      <Navbar onChatToggle={toggleChat} />

      {/* Main content */}
      <main className="relative z-10">
        <Hero onChatToggle={toggleChat} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat panel — floating overlay */}
      <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

export default App;
