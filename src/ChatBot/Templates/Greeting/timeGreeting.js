export const resumeData = {
  greetings: [
    "Hi 👋",
    "Hello sir 😊",
    "Hey! What's up?",
    "Hi there!",
    "Hello 👋 How can I help you?",
    "What's up! How can I assist you today?"
  ]
};

// time-based greeting
export function getTimeGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good morning ☀️";
  if (hour >= 12 && hour < 17) return "Good afternoon 🌤️";
  if (hour >= 17 && hour < 21) return "Good evening 🌆";
  return "Hello 🌙";
}

// chatbot reply
export function getBotReply(query) {
  const q = query.toLowerCase();

  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    const random =
      resumeData.greetings[
        Math.floor(Math.random() * resumeData.greetings.length)
      ];

    return `${getTimeGreeting()} ${random}`;
  }

  return "Ask something else 🙂";
}