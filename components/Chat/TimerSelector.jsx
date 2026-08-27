"use client";

import { useState, useRef, useEffect } from "react";
import { Clock, Flame, ChevronDown } from "lucide-react";

export const TIMER_OPTIONS = [
  { label: "Off", value: 0, desc: "Disabled (Session only)" },
  { label: "10 seconds", value: 10, desc: "Vanishes 10s after sending" },
  { label: "30 seconds", value: 30, desc: "Vanishes 30s after sending" },
  { label: "1 minute", value: 60, desc: "Vanishes 1m after sending" },
  { label: "5 minutes", value: 300, desc: "Vanishes 5m after sending" },
  { label: "30 minutes", value: 1800, desc: "Vanishes 30m after sending" },
];

export default function TimerSelector({ currentTimer, onSelectTimer }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeOption =
    TIMER_OPTIONS.find((opt) => opt.value === currentTimer) || TIMER_OPTIONS[2];

  return (
    <div
      ref={dropdownRef}
      id="timer-selector-container"
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Dropdown Trigger */}
      <button
        id="d1ptca"
        type="button"
        className="btn-ghost"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "var(--radius-full)",
          background:
            activeOption.value > 0
              ? "rgba(249, 115, 22, 0.12)"
              : "var(--border-subtle)",
          border: `1px solid ${
            activeOption.value > 0
              ? "rgba(249, 115, 22, 0.3)"
              : "var(--border-glass)"
          }`,
          color: activeOption.value > 0 ? "#f97316" : "var(--text-secondary)",
          fontSize: "0.82rem",
          fontWeight: "600",
        }}
        title="Change Disappearing Timer"
      >
        {activeOption.value > 0 ? (
          <Flame size={14} style={{ color: "#f97316" }} />
        ) : (
          <Clock size={14} />
        )}
        <span>
          {activeOption.value === 0 ? "Timer Off" : activeOption.label}
        </span>
        <ChevronDown size={13} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="timer-dropdown-menu"
          className="glass-card animate-fade-in"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "230px",
            background: "var(--bg-surface-elevated)",
            border: "1px solid var(--border-glass)",
            borderRadius: "var(--radius-md)",
            padding: "6px",
            zIndex: 60,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: "700",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              padding: "6px 10px 4px",
              letterSpacing: "0.5px",
            }}
          >
            Disappearing Timer
          </div>

          {TIMER_OPTIONS.map((option) => (
            <button
              key={option.value}
              id={`timer-option-${option.value}`}
              type="button"
              onClick={() => {
                onSelectTimer(option.value);
                setIsOpen(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "8px 10px",
                border: "none",
                borderRadius: "var(--radius-sm)",
                background:
                  currentTimer === option.value
                    ? "rgba(139, 92, 246, 0.15)"
                    : "transparent",
                color:
                  currentTimer === option.value
                    ? "var(--accent-primary)"
                    : "var(--text-primary)",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (currentTimer !== option.value) {
                  e.currentTarget.style.background = "var(--border-subtle)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTimer !== option.value) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  fontWeight: currentTimer === option.value ? "700" : "500",
                  fontSize: "0.85rem",
                }}
              >
                <span>{option.label}</span>
                {option.value > 0 && <Flame size={12} color="#f97316" />}
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  marginTop: "2px",
                }}
              >
                {option.desc}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
