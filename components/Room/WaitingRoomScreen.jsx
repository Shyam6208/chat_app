"use client";

import { useState, useEffect } from "react";
import { Copy, Check, X, Users, Link as LinkIcon } from "lucide-react";
import ThemeToggle from "@/components/UI/ThemeToggle";
import { useChat } from "@/context/ChatContext";

export default function WaitingRoomScreen({
  roomCode: propCode,
  roomName: propName,
  roomExpiry: propExpiry,
  myAlias: propAlias,
  onGuestJoined,
  onCancel,
}) {
  const chat = useChat();

  const roomCode = propCode || chat.room?.code || "CP-XXXX-XXXX";
  const roomName = propName || chat.room?.name || "Private Room";
  const roomExpiry = propExpiry || chat.room?.expiry || "Ends when everyone leaves";
  const myAlias = propAlias || chat.myAlias;

  const handleGuestJoined = onGuestJoined || chat.simulateGuestJoined;
  const handleCancel = onCancel || chat.resetChat;

  const [dots, setDots] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [guestJoining, setGuestJoining] = useState(false);

  const mockInviteLink = typeof window !== "undefined"
    ? `${window.location.origin}/chat/room/${roomCode}`
    : `https://chatpulse.app/chat/room/${roomCode}`;

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 450);

    return () => {
      clearInterval(dotInterval);
    };
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(mockInviteLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSimulateInstantJoin = () => {
    setGuestJoining(true);
    setTimeout(() => {
      handleGuestJoined();
    }, 600);
  };

  return (
    <div
      id="waiting-room-screen"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 20px 40px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          id="waiting-room-cancel-top-btn"
          type="button"
          className="btn-ghost"
          onClick={handleCancel}
          style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem" }}
        >
          <X size={18} />
          Cancel Room
        </button>

        <ThemeToggle id="waiting-room-theme-toggle" />
      </div>

      {/* Main Waiting Card */}
      <div
        className="glass-card animate-fade-in"
        style={{
          maxWidth: "540px",
          width: "100%",
          padding: "36px 30px",
          textAlign: "center",
          margin: "auto 0",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-active)",
        }}
      >
        {/* Animated Avatar / Room Indicator */}
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "2px solid var(--accent-secondary)",
              animation: "radarSonar 2.4s cubic-bezier(0.2, 0.8, 0.4, 1) infinite",
            }}
          />
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 0 24px rgba(6, 182, 212, 0.35)",
              zIndex: 2,
            }}
          >
            <Users size={34} />
          </div>
        </div>

        {/* State Title */}
        <div style={{ fontSize: "0.85rem", color: "var(--accent-secondary)", fontWeight: "600", textTransform: "uppercase", marginBottom: "4px" }}>
          {roomName}
        </div>

        <h2 style={{ fontSize: "1.7rem", fontWeight: "700", marginBottom: "8px" }}>
          {guestJoining ? "Someone joined your room! 🎉" : `Waiting for someone to join${dots}`}
        </h2>

        <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginBottom: "26px" }}>
          {guestJoining
            ? "Establishing secure ephemeral session..."
            : "Share this temporary code or invite link. The session begins when they join."}
        </p>

        {/* Room Code Display Box */}
        <div
          style={{
            padding: "16px",
            background: "var(--bg-surface-elevated)",
            borderRadius: "var(--radius-md)",
            border: "1px dashed var(--border-active)",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>
            Room Code
          </div>
          <div
            id="waiting-room-code-display"
            style={{
              fontFamily: "monospace",
              fontSize: "1.5rem",
              fontWeight: "800",
              letterSpacing: "2px",
              color: "var(--accent-primary)",
              marginBottom: "12px",
            }}
          >
            {roomCode}
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              id="waiting-copy-code-btn"
              type="button"
              className="btn-secondary"
              onClick={handleCopyCode}
              style={{ padding: "8px 14px", fontSize: "0.82rem" }}
            >
              {copiedCode ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
              {copiedCode ? "Copied!" : "Copy Code"}
            </button>

            <button
              id="waiting-copy-link-btn"
              type="button"
              className="btn-secondary"
              onClick={handleCopyLink}
              style={{ padding: "8px 14px", fontSize: "0.82rem" }}
            >
              {copiedLink ? <Check size={14} color="var(--success)" /> : <LinkIcon size={14} />}
              {copiedLink ? "Link Copied!" : "Copy Invite Link"}
            </button>
          </div>
        </div>

        {/* Assigned Persona Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            background: "var(--bg-surface-elevated)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.82rem",
            marginBottom: "24px",
            color: "var(--text-muted)",
          }}
        >
          <span>Your persona: <strong style={{ color: "var(--text-primary)" }}>{myAlias}</strong></span>
          <span>Duration: <strong style={{ color: "var(--text-primary)" }}>{roomExpiry}</strong></span>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            id="waiting-cancel-btn"
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
            style={{ flex: 1, padding: "12px" }}
          >
            <X size={15} />
            Cancel Room
          </button>

          <button
            id="waiting-simulate-join-btn"
            type="button"
            className="btn-primary"
            onClick={handleSimulateInstantJoin}
            disabled={guestJoining}
            style={{ flex: 1.4, padding: "12px", justifyContent: "center" }}
          >
            Simulate Guest Join
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
        🔒 Private Encrypted Room • Disappears when closed
      </div>
    </div>
  );
}
