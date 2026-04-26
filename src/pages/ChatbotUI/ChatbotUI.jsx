import React, { useState, useRef, useEffect } from "react";
import { getBotReply } from "../../ChatBot/chatbotBrain";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";

// ── Color Variables ──────────────────────────────────────────
const COLORS = {
  primary:       "#1477d2",
  primaryDark:   "#1260b0",
  primaryLight:  "#dbeafe",
  textDark:      "#0f1a2b",
  textMid:       "#374151",
  textMuted:     "#6b7280",
  textWhite:     "#ffffff",
  bgPage:        "#f1f5f9",
  bgChat:        "#ffffff",
  bgUserBubble:  "#1477d2",
  bgBotBubble:   "#f1f5f9",
  borderLight:   "#e2e8f0",
  headerBg:      "#ffffff",
};
// ─────────────────────────────────────────────────────────────

const SUGGESTED = [
  "What are Aditya's skills?",
  "Work experience?",
  "Current role?",
];

// Typing animation component — renders text letter by letter
function TypingMessage({ text, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, 18);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="typing-cursor" />
      )}
    </span>
  );
}

// Pulsing dots while waiting for reply
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <span className="dot" style={{ animationDelay: "0ms" }} />
      <span className="dot" style={{ animationDelay: "160ms" }} />
      <span className="dot" style={{ animationDelay: "320ms" }} />
    </div>
  );
}

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I'm AdiBot! Ask me anything about Aditya's profile, skills, or experience.", animate: false }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages, thinking]);

  const sendMessage = async (text) => {
    const msg = text || input;
    if (!msg.trim() || thinking || isTyping) return;

    const userMsg = { role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    // Simulate slight delay for realism
    setTimeout(() => {
      const reply = getBotReply(msg);
      setThinking(false);
      setIsTyping(true);
      setMessages((prev) => [...prev, { role: "bot", text: reply, animate: true }]);
    }, 700);
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center py-10 px-4"
      style={{ background: COLORS.bgPage, fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .chat-container {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .bubble-in {
          animation: bubbleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: scale(0.92) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 13px;
          background: ${COLORS.primary};
          margin-left: 2px;
          vertical-align: middle;
          border-radius: 1px;
          animation: blink 0.7s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .dot {
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: ${COLORS.textMuted};
          animation: bounce 1s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(-5px); opacity: 1; }
        }

        .suggest-chip {
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid ${COLORS.borderLight};
          color: ${COLORS.primary};
          background: ${COLORS.bgChat};
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .suggest-chip:hover {
          background: ${COLORS.primaryLight};
          border-color: ${COLORS.primary};
        }

        .send-btn {
          background: ${COLORS.primary};
          color: ${COLORS.textWhite};
          border-radius: 10px;
          padding: 0 16px;
          height: 40px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background 0.18s, transform 0.1s;
        }
        .send-btn:hover  { background: ${COLORS.primaryDark}; }
        .send-btn:active { transform: scale(0.97); }
        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .chat-input {
          flex: 1;
          height: 40px;
          padding: 0 14px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          border: 1px solid ${COLORS.borderLight};
          border-radius: 10px;
          outline: none;
          color: ${COLORS.textDark};
          background: ${COLORS.bgPage};
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .chat-input:focus {
          border-color: ${COLORS.primary};
          box-shadow: 0 0 0 3px ${COLORS.primaryLight};
        }

        .scroll-area::-webkit-scrollbar { width: 4px; }
        .scroll-area::-webkit-scrollbar-track { background: transparent; }
        .scroll-area::-webkit-scrollbar-thumb { background: ${COLORS.borderLight}; border-radius: 4px; }
      `}</style>

      {/* ── Chat Window ── */}
      <div
        className="chat-container flex flex-col w-full rounded-2xl overflow-hidden"
        style={{
          maxWidth: 560,
          height: "82vh",
          background: COLORS.bgChat,
          border: `1px solid ${COLORS.borderLight}`,
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        }}
      >

        {/* ── Header ── */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{
            borderBottom: `1px solid ${COLORS.borderLight}`,
            background: COLORS.headerBg,
          }}
        >
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 38, height: 38, background: COLORS.primaryLight }}
          >
            <SmartToyIcon style={{ color: COLORS.primary, fontSize: 20 }} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: COLORS.textDark, margin: 0 }}>AdiBot</p>
            <p style={{ fontSize: 11, color: COLORS.accentGreen, margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span style={{ color: COLORS.textMuted }}>Ask me about Aditya</span>
            </p>
          </div>
        </div>

        {/* ── Messages ── */}
        <div
          className="scroll-area flex-1 overflow-y-auto px-4 py-4"
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className="bubble-in flex"
              style={{ justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}
            >
              {/* Bot avatar dot */}
              {m.role === "bot" && (
                <div
                  className="flex-shrink-0 mr-2 mt-1 flex items-center justify-center rounded-lg"
                  style={{ width: 28, height: 28, background: COLORS.primaryLight }}
                >
                  <SmartToyIcon style={{ color: COLORS.primary, fontSize: 15 }} />
                </div>
              )}

              <div
                style={{
                  maxWidth: "75%",
                  padding: "10px 14px",
                  fontSize: 13,
                  lineHeight: 1.6,
                  borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: m.role === "user" ? COLORS.bgUserBubble : COLORS.bgBotBubble,
                  color: m.role === "user" ? COLORS.textWhite : COLORS.textMid,
                  boxShadow: m.role === "user" ? "0 2px 8px rgba(20,119,210,0.18)" : "none",
                }}
              >
                {m.role === "bot" && m.animate
                  ? <TypingMessage text={m.text} onDone={() => setIsTyping(false)} />
                  : m.text
                }
              </div>
            </div>
          ))}

          {/* Thinking dots */}
          {thinking && (
            <div className="bubble-in flex items-start gap-2">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-lg"
                style={{ width: 28, height: 28, background: COLORS.primaryLight }}
              >
                <SmartToyIcon style={{ color: COLORS.primary, fontSize: 15 }} />
              </div>
              <div style={{ background: COLORS.bgBotBubble, borderRadius: "18px 18px 18px 4px", display: "inline-block" }}>
                <ThinkingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Suggested chips ── */}
        <div
          className="flex gap-2 overflow-x-auto px-4 py-2"
          style={{ borderTop: `1px solid ${COLORS.borderLight}`, scrollbarWidth: "none" }}
        >
          {SUGGESTED.map((s) => (
            <button key={s} className="suggest-chip flex-shrink-0" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>

        {/* ── Input Bar ── */}
        <div
          className="flex gap-2 px-4 py-3"
          style={{ borderTop: `1px solid ${COLORS.borderLight}` }}
        >
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about skills, experience..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage()}
            disabled={thinking || isTyping || !input.trim()}
          >
            <SendIcon style={{ fontSize: 15 }} />
            Send
          </button>
        </div>

      </div>
    </div>
  );
}