# Socket.IO — Phase 2 Architecture

> ⚠️ **This directory is prepared for Phase 2.** Socket.IO real-time messaging will be implemented here.

## Architecture Overview

### Anonymous Matching Flow

```
User connects to app
        ↓
Retrieve anonymous alias (e.g., "SilentTiger4832")
        ↓
User enters waiting queue
        ↓
Server finds another available user
        ↓
Create temporary private room (e.g., "room-abc123")
        ↓
Connect both users
        ↓
Users chat with anonymous identities
```

### Ephemeral Message Flow

```
User A types a message
        ↓
socket.emit("send_message", { text, sender, expiresIn })
        ↓
Socket.IO Server (temporary relay only)
        ↓
socket.to(roomId).emit("receive_message", { text, sender, createdAt, expiresIn })
        ↓
User B receives and displays the message
        ↓
After expiresIn ms → message removed from UI state
        ↓
Message is GONE forever
```

### What NEVER Happens

```
❌ Message.create()
❌ supabase.from("messages").insert()
❌ localStorage.setItem("messages", ...)
❌ sessionStorage.setItem("chat", ...)
❌ Any database write of chat content
```

### Disappearing Message Timer

Messages support configurable auto-delete timers:

| Setting | Timer |
|---------|-------|
| Off (session only) | Removed on page refresh/disconnect |
| 10 seconds | `setTimeout(() => removeMessage(id), 10000)` |
| 30 seconds | `setTimeout(() => removeMessage(id), 30000)` |
| 1 minute | `setTimeout(() => removeMessage(id), 60000)` |
| 5 minutes | `setTimeout(() => removeMessage(id), 300000)` |
| 30 minutes | `setTimeout(() => removeMessage(id), 1800000)` |

### Temporary Message Payload

```json
{
  "id": "temp-uuid-v4",
  "text": "Hello!",
  "sender": "SilentTiger4832",
  "createdAt": 1693180800000,
  "expiresIn": 30000
}
```

This object:
- ✅ Exists in browser memory temporarily
- ✅ Is emitted via Socket.IO
- ❌ Is NEVER written to Supabase
- ❌ Is NEVER saved to any database
- ❌ Is NEVER stored in localStorage/sessionStorage/IndexedDB

### Room Lifecycle

```
Room created → users connected
        ↓
Users chat (messages flow via Socket.IO only)
        ↓
User disconnects or leaves
        ↓
Room is destroyed, all metadata cleared
        ↓
No room history saved to Supabase
```

### Events Planned

| Event | Direction | Purpose |
|-------|-----------|---------|
| `send_message` | Client → Server | User sends a message |
| `receive_message` | Server → Client | Message delivered to recipient |
| `message_expired` | Client-side | Timer expired, remove from UI |
| `user_connected` | Server → Client | New user joined room |
| `user_disconnected` | Server → Client | User left room |
| `typing` | Client → Server → Client | Typing indicator |
| `stop_typing` | Client → Server → Client | Stop typing indicator |
| `find_match` | Client → Server | Request anonymous match |
| `match_found` | Server → Client | Match found, room created |
| `leave_room` | Client → Server | User leaves current room |

## Implementation Notes

- Next.js doesn't natively support WebSocket servers
- Phase 2 will create a custom `server.js` that wraps Next.js with `http.createServer` + Socket.IO
- Online users will be tracked in a `Map` in server memory (not database)
- Room data will be tracked in a `Map` in server memory (not database)
- Everything is ephemeral — server restart = all rooms + connections reset
