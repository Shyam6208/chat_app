"use client";

import { Shield, Zap, Lock } from "lucide-react";
import ThemeToggle from "@/components/UI/ThemeToggle";
import { useChat } from "@/context/ChatContext";

export default function Navbar({ onStartChat, onOpenHowItWorks, onOpenAuth }) {
  const chat = useChat();

  const handleStartChat = onStartChat || chat.startRandomMatch;
  const handleOpenHowItWorks = () => {
    if (onOpenHowItWorks) onOpenHowItWorks();
    else chat.openHowItWorks(true);
  };
  const handleOpenAuth = (mode) => {
    if (onOpenAuth) onOpenAuth(mode);
    else chat.openAuth(mode);
  };

  return (
    <header
      id="main-navbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        width: "100%",
        background: "var(--bg-glass)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid var(--border-subtle)",
        transition: "all 0.25s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          id="nav-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => {
            chat.resetChat();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "var(--accent-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px var(--accent-glow)",
            }}
          >
            <Zap size={20} color="#ffffff" fill="#ffffff" />
          </div>
          <div>
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                letterSpacing: "-0.5px",
                background: "var(--accent-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ChatPulse
            </span>
            <span
              style={{
                marginLeft: "6px",
                fontSize: "0.68rem",
                padding: "2px 6px",
                borderRadius: "var(--radius-full)",
                background: "var(--border-subtle)",
                color: "var(--accent-secondary)",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Zero-Log
            </span>
          </div>
        </div>

        {/* Minimal Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <button
            id="nav-how-it-works"
            type="button"
            className="btn-ghost"
            onClick={handleOpenHowItWorks}
            style={{ fontSize: "0.9rem" }}
          >
            <Shield size={16} />
            How It Works
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ThemeToggle id="nav-theme-toggle" />

            <button
              id="nav-login-btn"
              type="button"
              className="btn-secondary"
              onClick={() => handleOpenAuth("login")}
              style={{
                padding: "8px 16px",
                fontSize: "0.88rem",
              }}
            >
              Sign In
            </button>

            <button
              id="nav-start-chat-btn"
              type="button"
              className="btn-primary"
              onClick={handleStartChat}
              style={{
                padding: "8px 18px",
                fontSize: "0.88rem",
              }}
            >
              <Lock size={14} />
              Start Chat
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
