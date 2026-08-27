"use client";

import { UserX, RefreshCw, Home, ShieldCheck, Lock, Dices, Plus } from "lucide-react";
import ThemeToggle from "@/components/UI/ThemeToggle";
import { useChat } from "@/context/ChatContext";

export default function DisconnectedScreen({
  chatMode: propMode,
  roomCode: propCode,
  roomName: propName,
  onFindNewPartner,
  onCreateNewRoom,
  onReturnHome,
}) {
  const chat = useChat();

  const chatMode = propMode || chat.chatMode || "random";
  const roomCode = propCode !== undefined ? propCode : chat.room?.code;
  const isPrivate = chatMode === "private";

  const handleFindNew = onFindNewPartner || chat.startRandomMatch;
  const handleCreateNew = onCreateNewRoom || (() => {
    chat.resetChat();
    chat.openCreateRoomModal();
  });
  const handleHome = onReturnHome || chat.resetChat;

  return (
    <div
      id="disconnected-screen"
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
          justifyContent: "flex-end",
        }}
      >
        <ThemeToggle id="disconnected-theme-toggle" />
      </div>

      {/* Main Disconnected Card */}
      <div
        className="glass-card animate-fade-in"
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "36px 28px",
          textAlign: "center",
          margin: "auto 0",
          background: "var(--bg-surface)",
          border: isPrivate ? "1px solid rgba(6, 182, 212, 0.3)" : "1px solid var(--border-glass)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: isPrivate ? "rgba(6, 182, 212, 0.12)" : "rgba(100, 116, 139, 0.15)",
            border: isPrivate ? "1px solid rgba(6, 182, 212, 0.3)" : "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: isPrivate ? "var(--accent-secondary)" : "var(--text-muted)",
          }}
        >
          {isPrivate ? <Lock size={30} /> : <UserX size={32} />}
        </div>

        {/* Heading */}
        <h2
          id="jrls0g"
          style={{
            fontSize: "1.6rem",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            marginBottom: "10px",
            color: "var(--text-primary)",
          }}
        >
          {isPrivate ? "Private Room Ended" : "Your chat partner disconnected."}
        </h2>

        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            lineHeight: "1.55",
            marginBottom: "24px",
          }}
        >
          {isPrivate
            ? `The temporary room ${roomCode ? `(${roomCode})` : ""} is no longer active. In accordance with our zero-persistence policy, all conversation data has been purged from memory.`
            : "The private session has ended. All conversation data has been completely erased with zero database logs."}
        </p>

        {/* Zero Trace Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px 16px",
            borderRadius: "var(--radius-md)",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            color: "var(--success)",
            fontSize: "0.84rem",
            fontWeight: "500",
            marginBottom: "32px",
          }}
        >
          <ShieldCheck size={16} />
          <span>No chat history was saved • 0 bytes stored</span>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {isPrivate && (
            <button
              id="disconnected-create-new-room-btn"
              type="button"
              className="btn-primary"
              onClick={handleCreateNew}
              style={{ padding: "14px 20px", fontSize: "1rem" }}
            >
              <Plus size={17} />
              Create New Room
            </button>
          )}

          <button
            id="disconnected-find-new-btn"
            type="button"
            className={isPrivate ? "btn-secondary" : "btn-primary"}
            onClick={handleFindNew}
            style={{ padding: isPrivate ? "12px 20px" : "14px 20px", fontSize: isPrivate ? "0.95rem" : "1rem" }}
          >
            {isPrivate ? <Dices size={17} /> : <RefreshCw size={17} />}
            Find Random Partner
          </button>

          <button
            id="disconnected-return-home-btn"
            type="button"
            className="btn-secondary"
            onClick={handleHome}
            style={{ padding: "12px 20px" }}
          >
            <Home size={17} />
            Return Home
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
        ChatPulse • The Ephemeral Messaging Platform
      </div>
    </div>
  );
}
