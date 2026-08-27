import "./globals.css";

export const metadata = {
  title: "ChatPulse — Anonymous Ephemeral Chat",
  description:
    "Private, anonymous, real-time 1-to-1 chat. Messages disappear automatically. No chat history is ever stored.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
