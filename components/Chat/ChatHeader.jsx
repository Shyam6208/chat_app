"use client";

import { useState } from "react";
import { LogOut, Flame, Shield, Lock, Dices, Copy, Check } from "lucide-react";
import ThemeToggle from "@/components/UI/ThemeToggle";
import TimerSelector, { TIMER_OPTIONS } from "@/components/Chat/TimerSelector";
import { useChat } from "@/context/ChatContext";

export default function ChatHeader({
  partner: propPartner,
  chatMode: propMode,
  roomCode: propRoomCode,
  roomName: propRoomName,
  currentTimer: propTimer,
  onSelectTimer,
  onOpenEndChatModal,
}) {
  const chat = useChat();

  const partner = propPartner || chat.partner || { alias: "SilentTiger4832" };
  const chatMode = propMode || chat.chatMode || "random";
  const roomCode = propRoomCode !== undefined ? propRoomCode : chat.room?.code;
  const roomName = propRoomName !== undefined ? propRoomName : chat.room?.name;
  const currentTimer = propTimer !== undefined ? propTimer : chat.timer;

  const handleSelectTimer = onSelectTimer || chat.setDisappearingTimer;
  const handleOpenEndChat = onOpenEndChatModal || chat.openEndChatModal;

  const [copiedCode, setCopiedCode] = useState(false);
  const activeTimerOption = TIMER_OPTIONS.find((t) => t.value === currentTimer);

  const handleCopyRoomCode = async () => {
    if (!roomCode) return;
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      id="chat-header-root"
      style={{
        width: "100%",
        background: "var(--bg-glass-heavy)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Top Main Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {/* Partner Info & Room Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Avatar with online dot */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background:
                  chatMode === "private"
                    ? "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)"
                    : "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "0.95rem",
                color: "#ffffff",
                boxShadow: "0 0 16px rgba(16, 185, 129, 0.35)",
              }}
            >
              {partner?.alias ? partner.alias.slice(0, 2).toUpperCase() : "ST"}
            </div>
            <span
              style={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--success)",
                border: "2px solid var(--bg-surface)",
                boxShadow: "0 0 8px var(--success)",
              }}
            />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "1rem",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.3px",
                }}
              >
                {partner?.alias || "SilentTiger4832"}
              </div>

              {/* Chat Mode Badge */}
              {chatMode === "private" ? (
                <div
                  id="chat-mode-badge-private"
                  onClick={handleCopyRoomCode}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 8px",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(6, 182, 212, 0.14)",
                    color: "var(--accent-secondary)",
                    fontSize: "0.72rem",
                    fontWeight: "600",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    cursor: "pointer",
                  }}
                  title="Click to copy Room Code"
                >
                  <Lock size={10} />
                  <span>{roomName || "Private Room"}</span>
                  <span style={{ fontFamily: "monospace", opacity: 0.9 }}>• {roomCode}</span>
                  {copiedCode ? <Check size={10} color="var(--success)" /> : <Copy size={10} />}
                </div>
              ) : (
                <div
                  id="chat-mode-badge-random"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 8px",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(139, 92, 246, 0.12)",
                    color: "var(--accent-primary)",
                    fontSize: "0.72rem",
                    fontWeight: "600",
                    border: "1px solid rgba(139, 92, 246, 0.25)",
                  }}
                >
                  <Dices size={11} />
                  <span>Random Chat</span>
                </div>
              )}
            </div>

            <div
              id="b0rcng"
              style={{
                fontSize: "0.78rem",
                color: "var(--success)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontWeight: "500",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--success)",
                  display: "inline-block",
                  animation: "pulseGlow 2s infinite ease-in-out",
                }}
              />
              ● Connected
            </div>
          </div>
        </div>

        {/* Right Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Disappearing Timer Selector */}
          <TimerSelector
            currentTimer={currentTimer}
            onSelectTimer={handleSelectTimer}
          />

          <ThemeToggle id="chat-theme-toggle" />

          {/* End Chat Button */}
          <button
            id="chat-end-btn"
            type="button"
            className="btn-danger"
            onClick={handleOpenEndChat}
            title="End conversation permanently"
          >
            <LogOut size={15} />
            <span style={{ display: "inline" }}>End Chat</span>
          </button>
        </div>
      </div>

      {/* Disappearing Timer Privacy Indicator Banner */}
      <div
        id="slf0uh"
        style={{
          background:
            currentTimer > 0
              ? "rgba(249, 115, 22, 0.08)"
              : "rgba(139, 92, 246, 0.06)",
          borderTop: "1px solid var(--border-subtle)",
          padding: "5px 20px",
          fontSize: "0.78rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          color: currentTimer > 0 ? "#f97316" : "var(--text-muted)",
        }}
      >
        {currentTimer > 0 ? (
          <>
            <Flame size={13} style={{ color: "#f97316" }} />
            <span>
              Messages disappear after <strong>{activeTimerOption?.label}</strong>
            </span>
          </>
        ) : (
          <>
            <Shield size={13} style={{ color: "var(--accent-secondary)" }} />
            <span>
              {chatMode === "private"
                ? `Private Encrypted Room (${roomCode}) • Messages stored in RAM only, destroyed on exit`
                : "Random Ephemeral Session • Messages stored in RAM only, cleared on disconnect"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
