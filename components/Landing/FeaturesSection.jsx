"use client";

import { Shield, Flame, UserCheck, Zap, Lock, RefreshCw } from "lucide-react";

export default function FeaturesSection({ onStartChat }) {
  const features = [
    {
      icon: <Shield size={24} style={{ color: "var(--accent-primary)" }} />,
      title: "Zero Message Storage",
      description:
        "There is no database table for chat logs. Messages exist strictly in RAM during active transmission and are deleted permanently upon delivery.",
      tag: "Guaranteed Privacy",
    },
    {
      icon: <Flame size={24} style={{ color: "#f97316" }} />,
      title: "Auto-Destruct Timers",
      description:
        "Select customizable disappearing timers from 10 seconds to 30 minutes. Once the countdown expires, the message burns from screen state forever.",
      tag: "Self-Destruct",
    },
    {
      icon: <UserCheck size={24} style={{ color: "var(--accent-secondary)" }} />,
      title: "Dynamic Anonymous Aliases",
      description:
        "Your real email, name, and identity are never exposed to your chat partner. You are assigned randomized anonymous personas like 'SilentTiger4832'.",
      tag: "Total Anonymity",
    },
    {
      icon: <Zap size={24} style={{ color: "var(--warning)" }} />,
      title: "Ephemeral Rooms",
      description:
        "Temporary 1-to-1 rooms exist solely while users are active. When either participant ends the session, the room is torn down immediately.",
      tag: "Zero Residuals",
    },
  ];

  return (
    <section
      id="features-section"
      style={{
        padding: "60px 20px 80px",
        maxWidth: "1150px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            marginBottom: "12px",
            color: "var(--text-primary)",
          }}
        >
          Built from the ground up for{" "}
          <span
            style={{
              background: "var(--accent-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            absolute privacy
          </span>
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Traditional chat platforms record every word you say. ChatPulse treats every conversation as disposable.
        </p>
      </div>

      {/* Grid of 4 Feature Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          marginBottom: "50px",
        }}
      >
        {features.map((item, index) => (
          <div
            key={index}
            className="glass-card"
            style={{
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.25s ease, border-color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "var(--border-active)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "var(--border-glass)";
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "var(--bg-surface-elevated)",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </div>

            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: "700",
                color: "var(--accent-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {item.tag}
            </div>

            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "var(--text-primary)",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--text-secondary)",
                lineHeight: "1.55",
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div
        className="glass-panel"
        style={{
          padding: "36px",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
          border: "1px solid var(--border-active)",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)",
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "6px" }}>
            Ready for a truly private conversation?
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            No phone numbers, no contacts sync, no conversation archives.
          </p>
        </div>
        <button
          id="features-start-chat-btn"
          type="button"
          className="btn-primary"
          onClick={onStartChat}
          style={{ padding: "14px 28px", fontSize: "1rem" }}
        >
          <Lock size={16} />
          Launch Anonymous Session
        </button>
      </div>
    </section>
  );
}
