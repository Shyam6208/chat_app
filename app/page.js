"use client";

import { useEffect, useRef } from "react";
import { ChatProvider, useChat } from "@/context/ChatContext";
import Navbar from "@/components/Header/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import HowItWorksModal from "@/components/Landing/HowItWorksModal";
import MatchingScreen from "@/components/Matching/MatchingScreen";
import CreateRoomModal from "@/components/Room/CreateRoomModal";
import JoinRoomModal from "@/components/Room/JoinRoomModal";
import WaitingRoomScreen from "@/components/Room/WaitingRoomScreen";
import ChatHeader from "@/components/Chat/ChatHeader";
import MessageBubble from "@/components/Chat/MessageBubble";
import MessageInput from "@/components/Chat/MessageInput";
import EndChatModal from "@/components/Chat/EndChatModal";
import DisconnectedScreen from "@/components/Disconnected/DisconnectedScreen";
import AuthModal from "@/components/Auth/AuthModal";

function ChatAppContent() {
  const {
    screen,
    chatMode,
    room,
    partner,
    messages,
  } = useChat();

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (screen === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, screen]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Ambient glowing mesh background */}
      <div className="ambient-glow" />

      {/* 1. SCREEN: HOME (LANDING PAGE) */}
      {screen === "home" && (
        <div className="animate-fade-in" style={{ flex: 1 }}>
          <Navbar />
          <HeroSection />
          <FeaturesSection />
        </div>
      )}

      {/* 2. SCREEN: RANDOM MATCHING SEARCH */}
      {screen === "matching" && <MatchingScreen />}

      {/* 3. SCREEN: WAITING FOR GUEST IN PRIVATE ROOM */}
      {screen === "waiting-room" && <WaitingRoomScreen />}

      {/* 4. SCREEN: ACTIVE CHAT SESSION (Random or Private Room) */}
      {screen === "chat" && (
        <div
          id="chat-interface-view"
          className="animate-fade-in"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            maxHeight: "100vh",
            overflow: "hidden",
            position: "relative",
            zIndex: 10,
          }}
        >
          <ChatHeader />

          {/* Messages Stream Area */}
          <div
            id="vljyl5"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              maxWidth: "880px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {messages.length === 0 ? (
              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                  color: "var(--text-muted)",
                  padding: "40px 20px",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🤫</div>
                <div style={{ fontWeight: "600", fontSize: "1.1rem", marginBottom: "4px" }}>
                  Clean Slate
                </div>
                <p style={{ fontSize: "0.85rem", maxWidth: "340px", margin: "0 auto" }}>
                  All previous messages have evaporated. Type a message below to start chatting.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isMe={msg.isMe}
                  partnerAlias={partner?.alias || "Partner"}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Message Input */}
          <div style={{ maxWidth: "880px", width: "100%", margin: "0 auto" }}>
            <MessageInput />
          </div>
        </div>
      )}

      {/* 5. SCREEN: DISCONNECTED / ROOM ENDED */}
      {(screen === "disconnected" || screen === "room-ended") && (
        <DisconnectedScreen />
      )}

      {/* GLOBAL MODALS (State controlled via ChatContext) */}
      <CreateRoomModal />
      <JoinRoomModal />
      <HowItWorksModal />
      <EndChatModal />
      <AuthModal />
    </div>
  );
}

export default function Home() {
  return (
    <ChatProvider>
      <ChatAppContent />
    </ChatProvider>
  );
}
