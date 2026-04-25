let lastMessage = "";
let repeatCount = 0;

export function checkRepeatMessage(query) {
  const q = query.toLowerCase().trim();

  if (q === lastMessage) {
    repeatCount++;
  } else {
    repeatCount = 0;
  }

  lastMessage = q;

  if (repeatCount >= 4) {
  return "Please stop repeating the same message. 🙏";
} else if (repeatCount >= 2) {
  return `Are you okay? You have sent the same message ${repeatCount} times.`;
}else if (repeatCount >= 1) {
  return `How are you? how can i help you?`;
}
  return null;
}