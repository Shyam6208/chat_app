"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import { useChat } from "@/context/ChatContext";

export default function EndChatModal({ isOpen, onClose, onConfirmEnd }) {
  const chat = useChat();

  const isModalOpen = isOpen !== undefined ? isOpen : chat.isEndChatModalOpen;
  const handleClose = onClose || chat.closeEndChatModal;
  const handleConfirm = onConfirmEnd || chat.confirmEndChat;

  if (!isModalOpen) return null;

  return (
    <div
      id="end-chat-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "20px",
      }}
      onClick={handleClose}
    >
      <div
        id="end-chat-modal"
        className="glass-card animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "28px",
          background: "var(--bg-surface)",
          border: "1px solid var(--danger-border)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          textAlign: "center",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "var(--danger-bg)",
            border: "1px solid var(--danger-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
            color: "var(--danger)",
          }}
        >
          <AlertTriangle size={28} />
        </div>

        {/* Title */}
        <h3
          id="chzsqx"
          style={{
            fontSize: "1.35rem",
            fontWeight: "700",
            color: "var(--text-primary)",
            marginBottom: "10px",
          }}
        >
          End this conversation?
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.92rem",
            color: "var(--text-secondary)",
            lineHeight: "1.55",
            marginBottom: "24px",
          }}
        >
          Once ended, this chat cannot be recovered. All temporary messages from this session will be permanently wiped from browser memory.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            id="end-chat-cancel-btn"
            type="button"
            className="btn-secondary"
            onClick={handleClose}
            style={{ flex: 1, padding: "12px 18px" }}
          >
            Cancel
          </button>

          <button
            id="end-chat-confirm-btn"
            type="button"
            className="btn-danger"
            onClick={handleConfirm}
            style={{ flex: 1, padding: "12px 18px", justifyContent: "center" }}
          >
            <Trash2 size={16} />
            End & Erase
          </button>
        </div>
      </div>
    </div>
  );
}
