"use client";

import { useState } from "react";
import { X, Lock, Mail, User, Shield, ArrowRight } from "lucide-react";
import { useChat } from "@/context/ChatContext";

export default function AuthModal({ isOpen, initialMode, onClose, onGuestLogin }) {
  const chat = useChat();

  const isModalOpen = isOpen !== undefined ? isOpen : chat.isAuthModalOpen;
  const mode = initialMode || chat.authMode || "login";
  const handleClose = onClose || chat.closeAuth;
  const handleGuest = onGuestLogin || (() => {
    chat.closeAuth();
    chat.startRandomMatch();
  });

  const [activeTab, setActiveTab] = useState(mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg(
      activeTab === "login"
        ? "Mock login successful! (UI-only preview)"
        : "Mock account registered! (UI-only preview)"
    );
    setTimeout(() => {
      setSuccessMsg("");
      handleClose();
      handleGuest();
    }, 1000);
  };

  return (
    <div
      id="auth-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 90,
        padding: "20px",
      }}
      onClick={handleClose}
    >
      <div
        id="auth-modal"
        className="glass-card animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "460px",
          padding: "32px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-active)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="auth-modal-close-btn"
          type="button"
          onClick={handleClose}
          className="btn-ghost"
          style={{ position: "absolute", top: "18px", right: "18px", padding: "6px", borderRadius: "50%" }}
        >
          <X size={20} />
        </button>

        {/* Tab switch */}
        <div
          style={{
            display: "flex",
            background: "var(--bg-surface-elevated)",
            borderRadius: "var(--radius-full)",
            padding: "4px",
            marginBottom: "24px",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <button
            id="auth-tab-login"
            type="button"
            onClick={() => setActiveTab("login")}
            style={{
              flex: 1,
              padding: "8px 16px",
              borderRadius: "var(--radius-full)",
              border: "none",
              background: activeTab === "login" ? "var(--accent-primary)" : "transparent",
              color: activeTab === "login" ? "#ffffff" : "var(--text-secondary)",
              fontWeight: "600",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Sign In
          </button>

          <button
            id="auth-tab-signup"
            type="button"
            onClick={() => setActiveTab("signup")}
            style={{
              flex: 1,
              padding: "8px 16px",
              borderRadius: "var(--radius-full)",
              border: "none",
              background: activeTab === "signup" ? "var(--accent-primary)" : "transparent",
              color: activeTab === "signup" ? "#ffffff" : "var(--text-secondary)",
              fontWeight: "600",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Create Account
          </button>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "1.35rem", fontWeight: "700", marginBottom: "6px" }}>
            {activeTab === "login" ? "Welcome Back to ChatPulse" : "Join ChatPulse"}
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {activeTab === "login"
              ? "Sign in to access your anonymous alias & preferences"
              : "Create an account while keeping 100% anonymous chat privacy"}
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div
            style={{
              padding: "10px",
              borderRadius: "var(--radius-sm)",
              background: "var(--success-bg)",
              color: "var(--success)",
              border: "1px solid var(--success-border)",
              fontSize: "0.85rem",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {activeTab === "signup" && (
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="auth-name-input"
                  type="text"
                  required
                  className="glass-input"
                  placeholder="Alex Mercer"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px 12px 40px", fontSize: "0.9rem" }}
                />
                <User size={17} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="auth-email-input"
                type="email"
                required
                className="glass-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "12px 14px 12px 40px", fontSize: "0.9rem" }}
              />
              <Mail size={17} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "4px", display: "block" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="auth-password-input"
                type="password"
                required
                className="glass-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "12px 14px 12px 40px", fontSize: "0.9rem" }}
              />
              <Lock size={17} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
            </div>
          </div>

          <button
            id="auth-submit-btn"
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "12px", marginTop: "8px", fontSize: "0.95rem" }}
          >
            {activeTab === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
        </div>

        {/* Fast Guest Path */}
        <button
          id="auth-guest-btn"
          type="button"
          className="btn-secondary"
          onClick={() => {
            handleClose();
            handleGuest();
          }}
          style={{ width: "100%", padding: "12px", fontSize: "0.92rem" }}
        >
          <Shield size={16} color="var(--accent-secondary)" />
          Continue as Anonymous Guest
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
