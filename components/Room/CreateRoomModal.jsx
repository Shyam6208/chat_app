"use client";

import { useState, useEffect } from "react";
import { X, Lock, Copy, Check, Sparkles, Clock, ArrowRight, ShieldCheck, Link as LinkIcon } from "lucide-react";
import { generateRoomCode } from "@/lib/roomCode";
import { useChat } from "@/context/ChatContext";

export const ROOM_EXPIRY_OPTIONS = [
  "Ends when everyone leaves",
  "30 minutes",
  "1 hour",
  "6 hours",
  "24 hours",
];

export default function CreateRoomModal({ isOpen, onClose, onRoomCreated }) {
  const chat = useChat();

  const isModalOpen = isOpen !== undefined ? isOpen : chat.isCreateRoomModalOpen;
  const handleClose = onClose || chat.closeCreateRoomModal;

  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [roomExpiry, setRoomExpiry] = useState(ROOM_EXPIRY_OPTIONS[0]);
  const [step, setStep] = useState("configure"); // "configure" | "ready"
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setRoomCode(generateRoomCode());
      setRoomName("");
      setRoomExpiry(ROOM_EXPIRY_OPTIONS[0]);
      setStep("configure");
      setCopiedCode(false);
      setCopiedLink(false);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const mockInviteLink = typeof window !== "undefined"
    ? `${window.location.origin}/chat/room/${roomCode}`
    : `https://chatpulse.app/chat/room/${roomCode}`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(mockInviteLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setStep("ready");
  };

  const handleEnterRoom = () => {
    if (onRoomCreated) {
      onRoomCreated({
        roomCode,
        roomName: roomName.trim() || "Private Room",
        roomExpiry,
      });
    } else {
      chat.createPrivateRoom({
        roomCode,
        roomName: roomName.trim() || "Private Room",
        roomExpiry,
      });
    }
    handleClose();
  };

  return (
    <div
      id="create-room-modal-overlay"
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
        id="create-room-modal"
        className="glass-card animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "520px",
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
          id="create-room-close-btn"
          type="button"
          onClick={handleClose}
          className="btn-ghost"
          style={{ position: "absolute", top: "18px", right: "18px", padding: "6px", borderRadius: "50%" }}
        >
          <X size={20} />
        </button>

        {/* STEP 1: CONFIGURE ROOM */}
        {step === "configure" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "rgba(139, 92, 246, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Lock size={20} color="var(--accent-primary)" />
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: "700" }}>
                Create Private Room
              </h3>
            </div>

            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "22px", lineHeight: "1.5" }}>
              Create an encrypted ephemeral room and invite someone using a temporary room code or shareable link.
            </p>

            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Optional Room Name */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>
                  Room Name <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>(Optional)</span>
                </label>
                <input
                  id="create-room-name-input"
                  type="text"
                  className="glass-input"
                  placeholder="e.g. Weekend Chat, Project Discussion"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px", fontSize: "0.92rem" }}
                  maxLength={40}
                />
              </div>

              {/* Generated Room Code Preview */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>
                  Temporary Room Code
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: "var(--bg-surface-elevated)",
                    borderRadius: "var(--radius-md)",
                    border: "1px dashed var(--border-active)",
                  }}
                >
                  <span
                    id="generated-room-code-preview"
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "700",
                      fontSize: "1.15rem",
                      letterSpacing: "1.5px",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {roomCode}
                  </span>
                  <span
                    style={{
                      fontSize: "0.74rem",
                      color: "var(--text-muted)",
                      background: "var(--bg-surface)",
                      padding: "3px 8px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    RAM-Only
                  </span>
                </div>
              </div>

              {/* Room Expiry Selector */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "6px", display: "block" }}>
                  Room Duration
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    id="create-room-expiry-select"
                    className="glass-input"
                    value={roomExpiry}
                    onChange={(e) => setRoomExpiry(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: "0.9rem",
                      appearance: "none",
                      cursor: "pointer",
                      background: "var(--bg-surface-elevated)",
                    }}
                  >
                    {ROOM_EXPIRY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <Clock size={16} style={{ position: "absolute", right: "16px", top: "15px", color: "var(--text-muted)", pointerEvents: "none" }} />
                </div>
              </div>

              {/* Privacy Notice */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  color: "var(--success)",
                  fontSize: "0.8rem",
                }}
              >
                <ShieldCheck size={16} style={{ flexShrink: 0 }} />
                <span>Zero Database Records • Room and messages vanish when closed</span>
              </div>

              {/* Submit Button */}
              <button
                id="create-room-submit-btn"
                type="submit"
                className="btn-primary"
                style={{ width: "100%", padding: "14px", fontSize: "1rem", marginTop: "6px" }}
              >
                Create Room
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: ROOM READY & SHARE */}
        {step === "ready" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "var(--success)",
              }}
            >
              <Sparkles size={28} />
            </div>

            <h3 style={{ fontSize: "1.45rem", fontWeight: "700", marginBottom: "6px" }}>
              Your Private Room is Ready
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Share this temporary code or link with your friend to connect anonymously.
            </p>

            {/* Room Code Display Box */}
            <div
              style={{
                padding: "18px",
                background: "var(--bg-surface-elevated)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-active)",
                marginBottom: "16px",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
                Room Code
              </div>
              <div
                id="ready-room-code-text"
                style={{
                  fontFamily: "monospace",
                  fontSize: "1.6rem",
                  fontWeight: "800",
                  letterSpacing: "2px",
                  color: "var(--accent-primary)",
                  marginBottom: "12px",
                }}
              >
                {roomCode}
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button
                  id="copy-room-code-btn"
                  type="button"
                  className="btn-secondary"
                  onClick={handleCopyCode}
                  style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                >
                  {copiedCode ? <Check size={15} color="var(--success)" /> : <Copy size={15} />}
                  {copiedCode ? "Copied Code!" : "Copy Room Code"}
                </button>

                <button
                  id="copy-invite-link-btn"
                  type="button"
                  className="btn-secondary"
                  onClick={handleCopyLink}
                  style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                >
                  {copiedLink ? <Check size={15} color="var(--success)" /> : <LinkIcon size={15} />}
                  {copiedLink ? "Copied Link!" : "Copy Invite Link"}
                </button>
              </div>
            </div>

            {/* Room Meta details */}
            <div
              style={{
                fontSize: "0.82rem",
                color: "var(--text-muted)",
                marginBottom: "24px",
                display: "flex",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <span>🏷️ {roomName.trim() || "Private Room"}</span>
              <span>⏳ {roomExpiry}</span>
            </div>

            {/* Enter Room Button */}
            <button
              id="enter-private-room-btn"
              type="button"
              className="btn-primary"
              onClick={handleEnterRoom}
              style={{ width: "100%", padding: "14px", fontSize: "1rem" }}
            >
              Enter Room & Wait for Guest
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
