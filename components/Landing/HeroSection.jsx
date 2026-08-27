"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Flame,
  Lock,
  EyeOff,
  Sparkles,
  RefreshCw,
  Dices,
  Link as LinkIcon,
  DoorOpen,
} from "lucide-react";
import { useChat } from "@/context/ChatContext";

export default function HeroSection({
  onStartRandomChat,
  onCreateRoom,
  onJoinRoom,
  onOpenHowItWorks,
}) {
  const chat = useChat();

  const handleStartRandom = onStartRandomChat || chat.startRandomMatch;
  const handleCreateRoom = onCreateRoom || chat.openCreateRoomModal;
  const handleJoinRoom = onJoinRoom || chat.openJoinRoomModal;
  const handleHowItWorks = () => {
    if (onOpenHowItWorks) onOpenHowItWorks();
    else chat.openHowItWorks(true);
  };

  // Interactive mini-demo state to showcase disappearing messages in real-time
  const [demoTimer, setDemoTimer] = useState(10);
  const [demoMessageVisible, setDemoMessageVisible] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    setSecondsLeft(demoTimer);
    setDemoMessageVisible(true);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setDemoMessageVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [demoTimer]);

  const handleResetDemo = () => {
    setDemoMessageVisible(true);
    setSecondsLeft(demoTimer);
  };

  return (
    <section
      id="hero-section"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "50px 20px 40px",
        maxWidth: "1150px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {/* Badge */}
      <div
        id="hero-privacy-badge"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 16px",
          borderRadius: "var(--radius-full)",
          background: "rgba(139, 92, 246, 0.12)",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          color: "var(--accent-primary)",
          fontSize: "0.85rem",
          fontWeight: "600",
          marginBottom: "20px",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.15)",
        }}
      >
        <Sparkles size={15} />
        Zero Server Logs • RAM-Only Ephemeral Transit
      </div>

      {/* Main Headline */}
      <h1
        id="hr3g2f"
        style={{
          fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
          fontWeight: "800",
          letterSpacing: "-1.5px",
          lineHeight: "1.12",
          marginBottom: "18px",
          color: "var(--text-primary)",
        }}
      >
        Talk Freely.
        <br />
        <span
          style={{
            background: "var(--accent-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          Leave Nothing Behind.
        </span>
      </h1>

      {/* Subtitle */}
      <p
        id="ofrglp"
        style={{
          fontSize: "clamp(1.02rem, 1.8vw, 1.2rem)",
          color: "var(--text-secondary)",
          maxWidth: "680px",
          margin: "0 auto 36px",
          lineHeight: "1.6",
        }}
      >
        Private, anonymous conversations with no permanent message history.
        Connect with a random stranger or invite a friend to an encrypted private room.
      </p>

      {/* 3 CORE ENTRY CARDS (Random Match, Create Room, Join Room) */}
      <div
        id="chat-entry-options-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "20px",
          maxWidth: "1020px",
          margin: "0 auto 48px",
          textAlign: "left",
        }}
      >
        {/* CARD 1: Random Match */}
        <div
          id="entry-card-random"
          className="glass-card"
          style={{
            padding: "26px 22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid var(--border-active)",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            background: "linear-gradient(145deg, rgba(139, 92, 246, 0.1) 0%, var(--bg-glass) 100%)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(139, 92, 246, 0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "var(--accent-gradient)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 0 16px var(--accent-glow)",
                }}
              >
                <Dices size={24} />
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(139, 92, 246, 0.15)",
                  color: "var(--accent-primary)",
                  textTransform: "uppercase",
                }}
              >
                Instant Match
              </span>
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "6px" }}>
              🎲 Random Match
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "20px" }}>
              Get instantly matched with someone available for an anonymous conversation.
            </p>
          </div>

          <button
            id="hero-start-chat-btn"
            type="button"
            className="btn-primary"
            onClick={handleStartRandom}
            style={{ width: "100%", padding: "12px 18px", fontSize: "0.95rem" }}
          >
            Find Random Partner
            <ArrowRight size={16} />
          </button>
        </div>

        {/* CARD 2: Create Private Room */}
        <div
          id="entry-card-create-room"
          className="glass-card"
          style={{
            padding: "26px 22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid var(--border-glass)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            background: "linear-gradient(145deg, rgba(6, 182, 212, 0.08) 0%, var(--bg-glass) 100%)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(6, 182, 212, 0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 0 16px rgba(6, 182, 212, 0.35)",
                }}
              >
                <LinkIcon size={22} />
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(6, 182, 212, 0.15)",
                  color: "var(--accent-secondary)",
                  textTransform: "uppercase",
                }}
              >
                Temporary Code
              </span>
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "6px" }}>
              🔗 Create Private Room
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "20px" }}>
              Create a private anonymous room and invite someone using a temporary room code or shareable link.
            </p>
          </div>

          <button
            id="hero-create-room-btn"
            type="button"
            className="btn-secondary"
            onClick={handleCreateRoom}
            style={{ width: "100%", padding: "12px 18px", fontSize: "0.95rem" }}
          >
            <Lock size={15} color="var(--accent-secondary)" />
            Create Private Room
          </button>
        </div>

        {/* CARD 3: Join Private Room */}
        <div
          id="entry-card-join-room"
          className="glass-card"
          style={{
            padding: "26px 22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid var(--border-glass)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            background: "linear-gradient(145deg, rgba(16, 185, 129, 0.08) 0%, var(--bg-glass) 100%)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(16, 185, 129, 0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 0 16px rgba(16, 185, 129, 0.35)",
                }}
              >
                <DoorOpen size={22} />
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "var(--success)",
                  textTransform: "uppercase",
                }}
              >
                Join By Code
              </span>
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "6px" }}>
              🚪 Join Private Room
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "20px" }}>
              Enter a temporary room code to join an existing anonymous private session.
            </p>
          </div>

          <button
            id="hero-join-room-btn"
            type="button"
            className="btn-secondary"
            onClick={handleJoinRoom}
            style={{ width: "100%", padding: "12px 18px", fontSize: "0.95rem" }}
          >
            <DoorOpen size={16} color="var(--success)" />
            Join Private Room
          </button>
        </div>
      </div>

      {/* Interactive Visual Live Demo Card */}
      <div
        id="hero-live-demo-card"
        className="glass-card"
        style={{
          maxWidth: "760px",
          margin: "0 auto 24px",
          padding: "24px",
          textAlign: "left",
          border: "1px solid var(--border-active)",
          boxShadow: "var(--shadow-glow), var(--shadow-lg)",
        }}
      >
        {/* Mock Window Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "14px",
            borderBottom: "1px solid var(--border-subtle)",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "0.85rem",
                color: "#ffffff",
              }}
            >
              ST
            </div>
            <div>
              <div style={{ fontWeight: "700", fontSize: "0.92rem" }}>
                SilentTiger4832
              </div>
              <div
                style={{
                  fontSize: "0.74rem",
                  color: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "var(--success)",
                    display: "inline-block",
                    boxShadow: "0 0 6px var(--success)",
                  }}
                />
                Anonymous Peer Connected
              </div>
            </div>
          </div>

          {/* Interactive Demo Timer Control */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Auto-Destruct:
            </span>
            {[5, 10, 30].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setDemoTimer(t)}
                className="btn-ghost"
                style={{
                  padding: "4px 10px",
                  fontSize: "0.75rem",
                  borderRadius: "var(--radius-full)",
                  background:
                    demoTimer === t
                      ? "var(--accent-primary)"
                      : "var(--bg-surface)",
                  color: demoTimer === t ? "#ffffff" : "var(--text-secondary)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {t}s
              </button>
            ))}
          </div>
        </div>

        {/* Demo Message Stream */}
        <div
          style={{
            minHeight: "140px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          {/* Permanent greeting */}
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "80%",
              padding: "10px 16px",
              borderRadius: "14px 14px 14px 2px",
              background: "var(--bg-surface-elevated)",
              border: "1px solid var(--border-subtle)",
              fontSize: "0.92rem",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "3px" }}>
              SilentTiger4832
            </div>
            Hey! No messages are ever saved to a database here 👋
          </div>

          {/* Self-destructing message demo */}
          {demoMessageVisible ? (
            <div
              className="animate-fade-in"
              style={{
                alignSelf: "flex-end",
                maxWidth: "80%",
                padding: "10px 16px",
                borderRadius: "14px 14px 2px 14px",
                background: "var(--accent-gradient)",
                color: "#ffffff",
                fontSize: "0.92rem",
                boxShadow: "0 4px 15px var(--accent-glow)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "4px" }}>
                <span style={{ fontSize: "0.72rem", opacity: 0.9 }}>You</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "1px 6px",
                    borderRadius: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <Flame size={11} color="#f97316" />
                  Vanishes in {secondsLeft}s
                </span>
              </div>
              This secret message will disappear forever in {secondsLeft}s!
            </div>
          ) : (
            <div
              className="animate-fade-in"
              style={{
                alignSelf: "flex-end",
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px dashed var(--danger-border)",
                color: "var(--danger)",
                fontSize: "0.82rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <EyeOff size={14} />
              Message evaporated from memory.
              <button
                type="button"
                onClick={handleResetDemo}
                className="btn-ghost"
                style={{
                  padding: "2px 8px",
                  fontSize: "0.75rem",
                  color: "var(--accent-primary)",
                  textDecoration: "underline",
                }}
              >
                <RefreshCw size={12} /> Test Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trust Highlights Strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
          marginTop: "20px",
          color: "var(--text-muted)",
          fontSize: "0.86rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Lock size={14} style={{ color: "var(--accent-secondary)" }} />
          No IP or Session Logs
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Flame size={14} style={{ color: "#f97316" }} />
          Custom Disappearing Timers
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <EyeOff size={14} style={{ color: "var(--accent-primary)" }} />
          100% Anonymous Personas
        </div>
      </div>
    </section>
  );
}
