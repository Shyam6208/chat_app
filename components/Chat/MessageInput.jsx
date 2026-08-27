"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { useChat } from "@/context/ChatContext";

export default function MessageInput({ onSendMessage, isPartnerTyping: propTyping }) {
  const chat = useChat();

  const handleSendMessage = onSendMessage || chat.sendMessage;
  const isPartnerTyping = propTyping !== undefined ? propTyping : chat.isPartnerTyping;

  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const quickEmojis = ["👋", "😄", "🔥", "🔒", "🤫", "🚀", "✨"];

  const handleSend = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;

    handleSendMessage(text.trim());
    setText("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAddEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      id="chat-input-container"
      style={{
        width: "100%",
        padding: "14px 20px 18px",
        background: "var(--bg-glass-heavy)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid var(--border-subtle)",
        position: "sticky",
        bottom: 0,
        zIndex: 20,
      }}
    >
      {/* Partner Typing Indicator */}
      {isPartnerTyping && (
        <div
          id="partner-typing-indicator"
          className="animate-fade-in"
          style={{
            fontSize: "0.78rem",
            color: "var(--accent-secondary)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "8px",
            paddingLeft: "4px",
          }}
        >
          <div style={{ display: "flex", gap: "3px" }}>
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-secondary)",
                display: "inline-block",
                animation: "typingDot 1.4s infinite 0s",
              }}
            />
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-secondary)",
                display: "inline-block",
                animation: "typingDot 1.4s infinite 0.2s",
              }}
            />
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-secondary)",
                display: "inline-block",
                animation: "typingDot 1.4s infinite 0.4s",
              }}
            />
          </div>
          <span>Partner is typing...</span>
        </div>
      )}

      {/* Quick Emoji Bar */}
      <div
        id="chat-quick-emojis"
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "10px",
          overflowX: "auto",
          paddingBottom: "2px",
        }}
      >
        {quickEmojis.map((emoji, idx) => (
          <button
            key={idx}
            type="button"
            className="btn-ghost"
            onClick={() => handleAddEmoji(emoji)}
            style={{
              padding: "3px 8px",
              borderRadius: "var(--radius-full)",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.95rem",
            }}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Form Input Bar */}
      <form
        onSubmit={handleSend}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={{ position: "relative", flex: 1 }}>
          <input
            id="chat-message-input"
            ref={inputRef}
            type="text"
            className="glass-input"
            placeholder="Type a message (Enter to send)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: "100%",
              padding: "14px 18px",
              fontSize: "0.95rem",
              borderRadius: "var(--radius-full)",
            }}
            autoComplete="off"
          />
        </div>

        <button
          id="chat-send-btn"
          type="submit"
          disabled={!text.trim()}
          className="btn-primary"
          style={{
            width: "48px",
            height: "48px",
            padding: 0,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: text.trim() ? 1 : 0.45,
            cursor: text.trim() ? "pointer" : "not-allowed",
            flexShrink: 0,
          }}
          title="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
