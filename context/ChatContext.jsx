"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { generateRoomCode } from "@/lib/roomCode";
import { generateAnonymousAlias } from "@/lib/anonymousAlias";

const ChatContext = createContext(null);

// Preset initial partner and reply patterns for simulated interaction
const MOCK_PARTNER_REPLIES = [
  "Love how fast and clean this UI feels! ✨",
  "The auto-destruct timer is crazy neat 🔥",
  "Totally! No traces, no database records. Pure privacy.",
  "Did you see the disappearing message countdown? So satisfying.",
  "Talking anonymously without email or phone numbers is awesome 🚀",
  "Let's test sending another disappearing message!",
];

export function ChatProvider({ children }) {
  // 1. Explicit Screen Identifier
  // Options: "home" | "matching" | "create-room" | "waiting-room" | "chat" | "disconnected" | "room-ended"
  const [screen, setScreen] = useState("home");

  // 2. Chat Mode: null | "random" | "private"
  const [chatMode, setChatMode] = useState(null);

  // 3. Room State (In-memory object, never persisted)
  // Structure: { code, name, expiry, createdAt } | null
  const [room, setRoom] = useState(null);

  // 4. Partner State (In-memory object)
  // Structure: { alias, profilePic, status } | null
  const [partner, setPartner] = useState(null);

  // 5. User's Session Persona
  const [myAlias, setMyAlias] = useState("MysticFalcon7429");

  // 6. Messages State (RAM only)
  const [messages, setMessages] = useState([]);

  // 7. Disappearing Timer in Seconds (0 = Off, 10, 30, 60, 300, 1800)
  const [timer, setTimer] = useState(30);

  // 8. Connection Status
  // Options: "idle" | "matching" | "waiting" | "connected" | "disconnected" | "ended"
  const [connectionStatus, setConnectionStatus] = useState("idle");

  // 9. Partner Typing Indicator
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);

  // 10. Modals State
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isEndChatModalOpen, setIsEndChatModalOpen] = useState(false);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  // Ref tracking pending timers for leak-free cleanup
  const activeTimeoutsRef = useRef([]);

  // Clear all pending simulated timeouts
  const clearPendingTimeouts = useCallback(() => {
    activeTimeoutsRef.current.forEach((id) => clearTimeout(id));
    activeTimeoutsRef.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearPendingTimeouts();
    };
  }, [clearPendingTimeouts]);

  // Disappearing message interval countdown
  useEffect(() => {
    if (screen !== "chat") return;

    const interval = setInterval(() => {
      setMessages((prevMessages) => {
        return prevMessages
          .map((msg) => {
            if (msg.expiresIn && msg.expiresIn > 0 && msg.remainingSeconds > 0) {
              return {
                ...msg,
                remainingSeconds: msg.remainingSeconds - 1,
              };
            }
            return msg;
          })
          .filter((msg) => {
            // Remove message when timer expires
            if (msg.expiresIn && msg.expiresIn > 0) {
              return msg.remainingSeconds > 0;
            }
            return true;
          });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [screen]);

  // ==========================================
  // CENTRALIZED ACTIONS
  // ==========================================

  /**
   * Start Random Match Flow
   * FUTURE SOCKET.IO INTEGRATION:
   * socket.emit("find_random_match", { alias: myAlias });
   */
  const startRandomMatch = useCallback(() => {
    clearPendingTimeouts();
    const alias = generateAnonymousAlias();
    setMyAlias(alias);
    setChatMode("random");
    setRoom(null);
    setConnectionStatus("matching");
    setScreen("matching");

    // Auto-match simulation after 3.8s
    const matchTimeout = setTimeout(() => {
      connectToMockPartner("random");
    }, 3800);
    activeTimeoutsRef.current.push(matchTimeout);
  }, [clearPendingTimeouts]);

  /**
   * Connect to Mock Partner
   * FUTURE SOCKET.IO INTEGRATION:
   * Triggered by socket.on("match_found", (partnerData) => ...)
   */
  const connectToMockPartner = useCallback(
    (mode = "random", customPartnerAlias = null) => {
      clearPendingTimeouts();
      const partnerAlias =
        customPartnerAlias ||
        generateAnonymousAlias();

      const newPartner = {
        alias: partnerAlias,
        profilePic: `https://api.dicebear.com/9.x/avataaars/svg?seed=${partnerAlias}`,
        status: "connected",
      };

      setPartner(newPartner);
      setConnectionStatus("connected");

      // Initial in-memory message stream
      setMessages([
        {
          id: `sys-${Date.now()}`,
          type: "system",
          text:
            mode === "private"
              ? `🔒 Connected to Private Room. Zero chat logs are stored.`
              : `🔒 Connected to random partner. Zero chat logs are stored.`,
          timestamp: "Just now",
        },
        {
          id: `m1-${Date.now()}`,
          sender: partnerAlias,
          text:
            mode === "private"
              ? `Hey! Joined your private room 👋`
              : "Hey! How are you?",
          timestamp: "Just now",
          isMe: false,
          expiresIn: timer,
          remainingSeconds: timer,
        },
        {
          id: `m2-${Date.now()}`,
          sender: "You",
          text: "I'm doing good. Nice to meet you anonymously 😄",
          timestamp: "Just now",
          isMe: true,
          expiresIn: timer,
          remainingSeconds: timer,
        },
      ]);

      setScreen("chat");
    },
    [timer, clearPendingTimeouts]
  );

  /**
   * Open Create Private Room Modal
   */
  const openCreateRoomModal = useCallback(() => {
    setIsCreateRoomModalOpen(true);
  }, []);

  /**
   * Close Create Private Room Modal
   */
  const closeCreateRoomModal = useCallback(() => {
    setIsCreateRoomModalOpen(false);
  }, []);

  /**
   * Create Private Room
   * FUTURE SOCKET.IO INTEGRATION:
   * socket.emit("create_private_room", { roomName, roomExpiry });
   */
  const createPrivateRoom = useCallback(
    ({ roomName, roomExpiry, roomCode: customCode }) => {
      clearPendingTimeouts();
      const code = customCode || generateRoomCode();
      const alias = generateAnonymousAlias();

      setMyAlias(alias);
      setChatMode("private");
      setRoom({
        code,
        name: roomName?.trim() || "Private Room",
        expiry: roomExpiry || "Ends when everyone leaves",
        createdAt: Date.now(),
      });
      setConnectionStatus("waiting");
      setIsCreateRoomModalOpen(false);
      setScreen("waiting-room");

      // Auto-simulate guest joining after 4.5s
      const guestTimeout = setTimeout(() => {
        simulateGuestJoined();
      }, 4500);
      activeTimeoutsRef.current.push(guestTimeout);
    },
    [clearPendingTimeouts]
  );

  /**
   * Simulate Guest Joining Private Room
   * FUTURE SOCKET.IO INTEGRATION:
   * socket.on("guest_joined_room", (guestData) => ...)
   */
  const simulateGuestJoined = useCallback(() => {
    connectToMockPartner("private");
  }, [connectToMockPartner]);

  /**
   * Open Join Room Modal
   */
  const openJoinRoomModal = useCallback(() => {
    setIsJoinRoomModalOpen(true);
  }, []);

  /**
   * Close Join Room Modal
   */
  const closeJoinRoomModal = useCallback(() => {
    setIsJoinRoomModalOpen(false);
  }, []);

  /**
   * Join Private Room by Code
   * FUTURE SOCKET.IO INTEGRATION:
   * socket.emit("join_private_room", { roomCode });
   */
  const joinPrivateRoom = useCallback(
    (enteredCode) => {
      clearPendingTimeouts();
      const alias = generateAnonymousAlias();
      setMyAlias(alias);
      setChatMode("private");
      setRoom({
        code: enteredCode,
        name: "Private Room",
        expiry: "Ends when everyone leaves",
        createdAt: Date.now(),
      });
      setIsJoinRoomModalOpen(false);
      connectToMockPartner("private");
    },
    [clearPendingTimeouts, connectToMockPartner]
  );

  /**
   * Send Message
   * FUTURE SOCKET.IO INTEGRATION:
   * socket.emit("send_message", { roomId, text, expiresIn: timer });
   */
  const sendMessage = useCallback(
    (text) => {
      if (!text || !text.trim()) return;

      const newMsg = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        sender: "You",
        text: text.trim(),
        timestamp: "Just now",
        isMe: true,
        expiresIn: timer,
        remainingSeconds: timer,
      };

      setMessages((prev) => [...prev, newMsg]);

      // Simulate partner reply
      const typingTimeout = setTimeout(() => {
        setIsPartnerTyping(true);

        const replyTimeout = setTimeout(() => {
          setIsPartnerTyping(false);
          const randomReply =
            MOCK_PARTNER_REPLIES[
              Math.floor(Math.random() * MOCK_PARTNER_REPLIES.length)
            ];

          const partnerMsg = {
            id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            sender: partner?.alias || "Partner",
            text: randomReply,
            timestamp: "Just now",
            isMe: false,
            expiresIn: timer,
            remainingSeconds: timer,
          };

          setMessages((prev) => [...prev, partnerMsg]);
        }, 1600);
        activeTimeoutsRef.current.push(replyTimeout);
      }, 800);
      activeTimeoutsRef.current.push(typingTimeout);
    },
    [timer, partner]
  );

  /**
   * Remove single message (when expiry countdown hits 0)
   */
  const removeMessage = useCallback((messageId) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
  }, []);

  /**
   * Change Disappearing Timer
   * FUTURE SOCKET.IO INTEGRATION:
   * socket.emit("change_timer", { roomId, timer: seconds });
   */
  const setDisappearingTimer = useCallback((seconds) => {
    setTimer(seconds);
  }, []);

  /**
   * Open End Chat Confirmation Dialog
   */
  const openEndChatModal = useCallback(() => {
    setIsEndChatModalOpen(true);
  }, []);

  /**
   * Close End Chat Confirmation Dialog
   */
  const closeEndChatModal = useCallback(() => {
    setIsEndChatModalOpen(false);
  }, []);

  /**
   * Confirm End Chat
   * FUTURE SOCKET.IO INTEGRATION:
   * socket.emit("leave_chat", { roomId: room?.code });
   */
  const confirmEndChat = useCallback(() => {
    clearPendingTimeouts();
    setIsEndChatModalOpen(false);
    setMessages([]); // Instant RAM memory wipe
    setConnectionStatus(chatMode === "private" ? "ended" : "disconnected");
    setScreen(chatMode === "private" ? "room-ended" : "disconnected");
  }, [chatMode, clearPendingTimeouts]);

  /**
   * Full Chat Session Reset
   * Clears all in-memory chat state, intervals, and returns to home.
   */
  const resetChat = useCallback(() => {
    clearPendingTimeouts();
    setMessages([]);
    setPartner(null);
    setRoom(null);
    setChatMode(null);
    setConnectionStatus("idle");
    setIsPartnerTyping(false);
    setScreen("home");
  }, [clearPendingTimeouts]);

  /**
   * Navigate directly to a specific screen identifier
   */
  const navigateTo = useCallback((targetScreen) => {
    setScreen(targetScreen);
  }, []);

  // Modal helpers
  const openHowItWorks = useCallback((isOpen) => setIsHowItWorksOpen(isOpen), []);
  const openAuth = useCallback((mode = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  }, []);
  const closeAuth = useCallback(() => setIsAuthModalOpen(false), []);

  const value = {
    // State
    screen,
    chatMode,
    room,
    partner,
    myAlias,
    messages,
    timer,
    connectionStatus,
    isPartnerTyping,
    isHowItWorksOpen,
    isEndChatModalOpen,
    isCreateRoomModalOpen,
    isJoinRoomModalOpen,
    isAuthModalOpen,
    authMode,

    // Navigation & Flows
    startRandomMatch,
    connectToMockPartner,
    openCreateRoomModal,
    closeCreateRoomModal,
    createPrivateRoom,
    simulateGuestJoined,
    openJoinRoomModal,
    closeJoinRoomModal,
    joinPrivateRoom,

    // Chat Actions
    sendMessage,
    removeMessage,
    setDisappearingTimer,
    openEndChatModal,
    closeEndChatModal,
    confirmEndChat,
    resetChat,
    navigateTo,

    // Modal Triggers
    openHowItWorks,
    openAuth,
    closeAuth,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
