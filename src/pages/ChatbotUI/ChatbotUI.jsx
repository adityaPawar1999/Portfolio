import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { getBotReply } from "../../ChatBot/chatbotBrain";
import { useTheme } from "../../themes/ThemeContext";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import { db } from "../../firebase/index";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

const ChatPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  background-color: ${props => props.theme.bgPage};
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 80px 16px 16px;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 560px;
  height: 82vh;
  background-color: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.borderCard};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${props => props.theme.glowMulti || props.theme.shadowLg};
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transition: all 0.3s ease;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid ${props => props.theme.borderCard};
  background-color: ${props => props.theme.bgCard};
  transition: all 0.3s ease;
`;

const AvatarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background-color: ${props => props.theme.primaryLight};
  flex-shrink: 0;

  svg {
    color: ${props => props.theme.primary};
    font-size: 20px;
  }
`;

const HeaderTitle = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.textDark};
  margin: 0;
  transition: color 0.3s ease;
`;

const HeaderSubtitle = styled.p`
  font-size: 11px;
  color: ${props => props.theme.textMuted};
  margin: 4px 0 0 0;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s ease;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${props => props.theme.accentGreen};
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${props => props.theme.bgPage};
  transition: background-color 0.3s ease;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.borderCard};
    border-radius: 4px;

    &:hover {
      background: ${props => props.theme.borderMuted};
    }
  }
`;

const BubbleWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  gap: 8px;
  animation: bubbleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes bubbleIn {
    from { opacity: 0; transform: scale(0.92) translateY(6px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

const BotAvatarSmall = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: ${props => props.theme.primaryLight};
  flex-shrink: 0;
  margin-top: 4px;

  svg {
    color: ${props => props.theme.primary};
    font-size: 15px;
  }
`;

const MessageBubble = styled.div`
  max-width: 75%;
  padding: 10px 14px;
  font-size: 13px;
  line-height: 1.6;
  border-radius: ${props => props.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
  background-color: ${props => props.isUser ? props.theme.primary : props.theme.bgCard};
  color: ${props => props.isUser ? props.theme.textWhite : props.theme.textMid};
  box-shadow: ${props => props.isUser ? (props.theme.glowGreen || `0 2px 8px ${props.theme.primaryLight}40`) : (props.theme.glowPink || 'none')};
  word-break: break-word;
  transition: all 0.3s ease;
`;

const ThinkingDotsContainer = styled.div`
  display: inline-block;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
`;

const Dot = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${props => props.theme.textMuted};
  animation: bounce 1s infinite ease-in-out;
  animation-delay: ${props => props.delay}ms;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); opacity: 0.4; }
    50% { transform: translateY(-5px); opacity: 1; }
  }
`;

const SuggestedChipsContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 8px 16px;
  border-top: 1px solid ${props => props.theme.borderCard};
  background-color: ${props => props.theme.bgCard};
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: all 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SuggestedChip = styled.button`
  font-size: 11px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid ${props => props.theme.borderCard};
  color: ${props => props.theme.primary};
  background-color: transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background-color: ${props => props.theme.primaryLight};
    border-color: ${props => props.theme.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const InputBar = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid ${props => props.theme.borderCard};
  background-color: ${props => props.theme.bgCard};
  transition: all 0.3s ease;
`;

const ChatInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 14px;
  font-size: 13px;
  font-family: 'DM Sans', inherit;
  border: 1px solid ${props => props.theme.borderCard};
  border-radius: 10px;
  outline: none;
  color: ${props => props.theme.textDark};
  background-color: ${props => props.theme.bgPage};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${props => props.theme.textMuted};
  }

  &:focus {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primaryLight};
  }
`;

const SendButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.textWhite};
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
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.primaryHover};
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 15px;
  }
`;

const SUGGESTED = [
  "What are Aditya's skills?",
  "Work experience?",
  "Current role?",
];

// Typing animation component
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
  }, [text, onDone]);

  return (
    <span>
      {displayed}
      {!done && (
        <span style={{
          display: 'inline-block',
          width: '2px',
          height: '13px',
          backgroundColor: 'currentColor',
          marginLeft: '2px',
          verticalAlign: 'middle',
          borderRadius: '1px',
          animation: 'blink 0.7s infinite',
          '@keyframes blink': '0%, 100% { opacity: 1; } 50% { opacity: 0; }',
        }} />
      )}
    </span>
  );
}

// Thinking dots component
function ThinkingDots() {
  return (
    <ThinkingDotsContainer>
      <Dot delay={0} />
      <Dot delay={160} />
      <Dot delay={320} />
    </ThinkingDotsContainer>
  );
}

export default function ChatbotUI() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I'm AdiBot! Ask me anything about Aditya's profile, skills, or experience.", animate: false }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userChats, setUserChats] = useState([]);
  const [sessionId] = useState(Date.now().toString());
  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Save all user messages as array to Firebase in one document
  const saveUserChatsToFirebase = async (allChats) => {
    try {
      await setDoc(doc(db, "userChats", sessionId), {
        messages: allChats,
        sessionId: sessionId,
        timestamp: serverTimestamp(),
      });
      console.log("All messages saved to Firebase!");
    } catch (error) {
      console.error("Error saving messages to Firebase:", error);
    }
  };

  useEffect(() => { scrollToBottom(); }, [messages, thinking]);

  const sendMessage = async (text) => {
    const msg = text || input;
    if (!msg.trim() || thinking) return;

    const userMsg = { role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    
    // Add to userChats array and save to Firebase
    const updatedChats = [...userChats, msg];
    setUserChats(updatedChats);
    await saveUserChatsToFirebase(updatedChats);
    
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const reply = getBotReply(msg);
      setThinking(false);
      setMessages((prev) => [...prev, { role: "bot", text: reply, animate: false }]);
    }, 700);
  };

  return (
    <ChatPageContainer>
      <ChatContainer>
        {/* Header */}
        <ChatHeader>
          <AvatarBox>
            <SmartToyIcon />
          </AvatarBox>
          <div>
            <HeaderTitle>AdiBot</HeaderTitle>
            <HeaderSubtitle>Ask me about Aditya</HeaderSubtitle>
          </div>
        </ChatHeader>

        {/* Messages */}
        <MessagesArea>
          {messages.map((m, i) => (
            <BubbleWrapper key={i} isUser={m.role === "user"}>
              {m.role === "bot" && <BotAvatarSmall><SmartToyIcon /></BotAvatarSmall>}
              <MessageBubble isUser={m.role === "user"}>
                {m.role === "bot" && m.animate
                  ? <TypingMessage text={m.text} onDone={() => setIsTyping(false)} />
                  : m.text
                }
              </MessageBubble>
            </BubbleWrapper>
          ))}

          {thinking && (
            <BubbleWrapper isUser={false}>
              <BotAvatarSmall><SmartToyIcon /></BotAvatarSmall>
              <div style={{ background: theme.bgCard, borderRadius: "18px 18px 18px 4px" }}>
                <ThinkingDots />
              </div>
            </BubbleWrapper>
          )}

          <div ref={bottomRef} />
        </MessagesArea>

        {/* Suggested Chips */}
        <SuggestedChipsContainer>
          {SUGGESTED.map((s) => (
            <SuggestedChip key={s} onClick={() => sendMessage(s)}>
              {s}
            </SuggestedChip>
          ))}
        </SuggestedChipsContainer>

        {/* Input Bar */}
        <InputBar>
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about skills, experience..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <SendButton
            onClick={() => sendMessage()}
            disabled={thinking || !input.trim()}
          >
            <SendIcon />
            Send
          </SendButton>
        </InputBar>
      </ChatContainer>
    </ChatPageContainer>
  );
}