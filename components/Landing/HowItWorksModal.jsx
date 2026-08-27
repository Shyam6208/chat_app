"use client";

import { X, ShieldCheck, Flame, UserCheck, Trash2 } from "lucide-react";
import { useChat } from "@/context/ChatContext";

export default function HowItWorksModal({ isOpen, onClose, onStartChat }) {
  const chat = useChat();

  const isModalOpen = isOpen !== undefined ? isOpen : chat.isHowItWorksOpen;
  const handleClose = onClose || (() => chat.openHowItWorks(false));
  const handleStart = onStartChat || (() => {
    chat.openHowItWorks(false);
    chat.startRandomMatch();
  });

  if (!isModalOpen) return null;

  const steps = [
    {
      number: "01",
      icon: <UserCheck size={20} color="#8b5cf6" />,
      title: "Receive a Random Persona",
      desc: "When you join, ChatPulse assigns you an ephemeral codename and avatar (e.g. 'SilentTiger4832'). Your real identity is never sent to your peer.",
    },
    {
      number: "02",
      icon: <Flame size={20} color="#f97316" />,
      title: "Chat with Active Auto-Destruct",
      desc: "Pick a timer from 10 seconds to 30 minutes. Messages burn from memory the moment their countdown reaches zero.",
    },
    {
      number: "03",
      icon: <Trash2 size={20} color="#ef4444" />,
      title: "Zero Trace Disconnect",
      desc: "Closing the tab, hitting refresh, or clicking 'End Chat' tears down the room and completely purges all in-memory state forever.",
    },
  ];

  return (
    <div
      id="how-it-works-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "20px",
      }}
      onClick={handleClose}
    >
      <div
        id="how-it-works-modal"
        className="glass-card animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "580px",
          padding: "32px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-active)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="how-it-works-close-btn"
          type="button"
          onClick={handleClose}
          className="btn-ghost"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "6px",
            borderRadius: "50%",
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
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
            <ShieldCheck size={22} color="var(--accent-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700" }}>
              How ChatPulse Works
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              The Zero-Persistence Messaging Lifecycle
            </p>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", margin: "24px 0" }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "16px",
                padding: "14px",
                background: "var(--bg-surface-elevated)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  fontWeight: "800",
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  minWidth: "28px",
                }}
              >
                {step.number}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: "600",
                    fontSize: "0.98rem",
                    marginBottom: "4px",
                  }}
                >
                  {step.icon}
                  {step.title}
                </div>
                <div style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Actions */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            id="how-it-works-got-it-btn"
            type="button"
            className="btn-secondary"
            onClick={handleClose}
          >
            Got It
          </button>
          <button
            id="how-it-works-try-now-btn"
            type="button"
            className="btn-primary"
            onClick={handleStart}
          >
            Start Chat Now
          </button>
        </div>
      </div>
    </div>
  );
}
