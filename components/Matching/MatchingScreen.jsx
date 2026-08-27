"use client";

import { useState, useEffect } from "react";
import { Shield, Sparkles, X, Zap } from "lucide-react";
import ThemeToggle from "@/components/UI/ThemeToggle";
import { useChat } from "@/context/ChatContext";

export default function MatchingScreen({ myAlias: propAlias, onMatchFound, onCancel }) {
  const chat = useChat();
  const alias = propAlias || chat.myAlias;
  const handleMatch = onMatchFound || (() => chat.connectToMockPartner("random"));
  const handleCancel = onCancel || chat.resetChat;

  const [dots, setDots] = useState("");
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Animated searching dots & timer
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 450);

    const timerInterval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div
      id="matching-screen"
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
      {/* Top Bar with Cancel & Theme */}
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
          id="matching-cancel-top-btn"
          type="button"
          className="btn-ghost"
          onClick={handleCancel}
          style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem" }}
        >
          <X size={18} />
          Cancel
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ThemeToggle id="matching-theme-toggle" />
        </div>
      </div>

      {/* Main Sonar Pulse & Searching Area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
          margin: "auto 0",
        }}
      >
        {/* Radar Sonar Visual */}
        <div
          style={{
            position: "relative",
            width: "180px",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "36px",
          }}
        >
          {/* Outer Ripple 1 */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "2px solid var(--accent-primary)",
              animation: "radarSonar 2.5s cubic-bezier(0.2, 0.8, 0.4, 1) infinite",
            }}
          />
          {/* Outer Ripple 2 */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "2px solid var(--accent-secondary)",
              animation: "radarSonar 2.5s cubic-bezier(0.2, 0.8, 0.4, 1) 0.8s infinite",
            }}
          />
          {/* Outer Ripple 3 */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "2px solid rgba(139, 92, 246, 0.5)",
              animation: "radarSonar 2.5s cubic-bezier(0.2, 0.8, 0.4, 1) 1.6s infinite",
            }}
          />

          {/* Center Glowing User Avatar */}
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "50%",
              background: "var(--accent-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 35px var(--accent-glow)",
              zIndex: 2,
              position: "relative",
              border: "3px solid #ffffff",
            }}
          >
            <Sparkles size={38} color="#ffffff" />
          </div>
        </div>

        {/* State Text */}
        <h2
          id="ymv5b9"
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            marginBottom: "10px",
            color: "var(--text-primary)",
          }}
        >
          Finding someone to chat with{dots}
        </h2>

        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--text-muted)",
            marginBottom: "28px",
          }}
        >
          Searching active temporary queues ({secondsElapsed}s elapsed)
        </p>

        {/* User's assigned identity card */}
        <div
          className="glass-card"
          style={{
            width: "100%",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "28px",
            background: "var(--bg-surface)",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
              Your Assigned Persona
            </div>
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: "700",
                color: "var(--accent-primary)",
              }}
            >
              {alias}
            </div>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              padding: "4px 10px",
              borderRadius: "var(--radius-full)",
              background: "rgba(16, 185, 129, 0.15)",
              color: "var(--success)",
              fontWeight: "600",
            }}
          >
            Anonymous
          </span>
        </div>

        {/* Privacy Reassurance Card */}
        <div
          id="9fgnwq"
          style={{
            padding: "14px 18px",
            borderRadius: "var(--radius-md)",
            background: "rgba(139, 92, 246, 0.08)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            color: "var(--text-secondary)",
            fontSize: "0.88rem",
            lineHeight: "1.5",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textAlign: "left",
          }}
        >
          <Shield size={24} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
          <div>
            <strong>Your identity stays private.</strong>
            <br />
            Messages disappear automatically with zero database traces.
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", width: "100%", justifyContent: "center" }}>
          <button
            id="matching-cancel-btn"
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
            style={{ flex: 1, padding: "12px 20px" }}
          >
            <X size={16} />
            Cancel Matching
          </button>

          <button
            id="matching-instant-match-btn"
            type="button"
            className="btn-primary"
            onClick={handleMatch}
            style={{ flex: 1, padding: "12px 20px" }}
          >
            <Zap size={16} />
            Instant Connect
          </button>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
        🔒 Zero Logs • Encrypted in Transit • RAM Only
      </div>
    </div>
  );
}
