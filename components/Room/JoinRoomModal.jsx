"use client";

import { useState } from "react";
import { X, DoorOpen, ArrowRight, ShieldCheck, Key } from "lucide-react";
import { formatRoomCodeInput } from "@/lib/roomCode";
import { useChat } from "@/context/ChatContext";

export default function JoinRoomModal({ isOpen, onClose, onJoinRoom }) {
  const chat = useChat();

  const isModalOpen = isOpen !== undefined ? isOpen : chat.isJoinRoomModalOpen;
  const handleClose = onClose || chat.closeJoinRoomModal;
  const handleJoin = onJoinRoom || chat.joinPrivateRoom;

  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  if (!isModalOpen) return null;

  const handleInputChange = (e) => {
    setError("");
    const formatted = formatRoomCodeInput(e.target.value);
    setInputCode(formatted);
  };

  const handlePasteCode = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const formatted = formatRoomCodeInput(text);
      setInputCode(formatted);
      setError("");
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputCode || inputCode.length < 10) {
      setError("Please enter a valid room code (e.g. CP-X7K9-M4Q2)");
      return;
    }

    handleJoin(inputCode);
    handleClose();
  };

  return (
    <div
      id="join-room-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.78)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 80,
        padding: "20px",
      }}
      onClick={handleClose}
    >
      <div
        id="join-room-modal"
        className="glass-card animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "32px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-active)",
          position: "relative",
          boxShadow: "var(--shadow-glow), var(--shadow-lg)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="join-room-close-btn"
          type="button"
          onClick={handleClose}
          className="btn-ghost"
          style={{ position: "absolute", top: "18px", right: "18px", padding: "6px", borderRadius: "50%" }}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(6, 182, 212, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DoorOpen size={20} color="var(--accent-secondary)" />
          </div>
          <h3 style={{ fontSize: "1.35rem", fontWeight: "700" }}>
            Join Private Room
          </h3>
        </div>

        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "22px", lineHeight: "1.5" }}>
          Enter the temporary room code shared by your friend to connect into an anonymous ephemeral session.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--text-secondary)" }}>
                Enter Room Code
              </label>
              <button
                type="button"
                className="btn-ghost"
                onClick={handlePasteCode}
                style={{ fontSize: "0.74rem", padding: "2px 6px", color: "var(--accent-primary)" }}
              >
                Paste from Clipboard
              </button>
            </div>

            <div style={{ position: "relative" }}>
              <input
                id="join-room-code-input"
                type="text"
                className="glass-input"
                placeholder="CP-XXXX-XXXX"
                value={inputCode}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 44px",
                  fontSize: "1.1rem",
                  fontFamily: "monospace",
                  letterSpacing: "1.5px",
                  fontWeight: "700",
                }}
                maxLength={12}
                autoFocus
              />
              <Key size={18} style={{ position: "absolute", left: "16px", top: "16px", color: "var(--text-muted)" }} />
            </div>

            {error && (
              <div style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "6px" }}>
                {error}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              borderRadius: "var(--radius-sm)",
              background: "rgba(139, 92, 246, 0.08)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              color: "var(--text-secondary)",
              fontSize: "0.8rem",
            }}
          >
            <ShieldCheck size={16} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
            <span>Your real identity stays hidden. You join with an anonymous alias.</span>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              id="join-room-cancel-btn"
              type="button"
              className="btn-secondary"
              onClick={handleClose}
              style={{ flex: 1, padding: "12px" }}
            >
              Cancel
            </button>

            <button
              id="join-room-submit-btn"
              type="submit"
              className="btn-primary"
              style={{ flex: 1.5, padding: "12px", justifyContent: "center" }}
            >
              Join Room
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
