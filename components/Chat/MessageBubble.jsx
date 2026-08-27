"use client";

import { Flame, Clock, Shield } from "lucide-react";

export default function MessageBubble({ message, isMe, partnerAlias }) {
  if (message.type === "system") {
    return (
      <div
        id={`system-msg-${message.id}`}
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "12px 0",
        }}
      >
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-full)",
            padding: "5px 14px",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Shield size={13} color="var(--accent-primary)" />
          <span>{message.text}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`msg-bubble-${message.id}`}
      className="animate-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMe ? "flex-end" : "flex-start",
        margin: "10px 0",
        width: "100%",
      }}
    >
      {/* Sender Header & Metadata */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "4px",
          padding: "0 4px",
          fontSize: "0.74rem",
          color: "var(--text-muted)",
        }}
      >
        <span style={{ fontWeight: "600", color: isMe ? "var(--accent-primary)" : "var(--text-secondary)" }}>
          {isMe ? "You" : partnerAlias}
        </span>
        <span>•</span>
        <span>{message.timestamp}</span>

        {/* Live Disappearing Timer Badge */}
        {message.expiresIn > 0 && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              padding: "1px 6px",
              borderRadius: "var(--radius-full)",
              background: "rgba(249, 115, 22, 0.12)",
              color: "#f97316",
              fontSize: "0.68rem",
              fontWeight: "600",
            }}
            title="This message will self-destruct"
          >
            <Flame size={10} color="#f97316" />
            {message.remainingSeconds !== undefined
              ? `${message.remainingSeconds}s`
              : `${message.expiresIn}s`}
          </span>
        )}
      </div>

      {/* Message Bubble Card */}
      <div
        style={{
          maxWidth: "80%",
          padding: "12px 18px",
          borderRadius: isMe
            ? "18px 18px 4px 18px"
            : "18px 18px 18px 4px",
          background: isMe
            ? "var(--accent-gradient)"
            : "var(--bg-surface-elevated)",
          color: isMe ? "#ffffff" : "var(--text-primary)",
          border: isMe
            ? "none"
            : "1px solid var(--border-glass)",
          boxShadow: isMe
            ? "0 4px 16px var(--accent-glow)"
            : "var(--shadow-sm)",
          fontSize: "0.95rem",
          lineHeight: "1.5",
          wordBreak: "break-word",
          position: "relative",
        }}
      >
        {message.text}
      </div>
    </div>
  );
}
