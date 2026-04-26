import { resumeData } from "./resumeData";
import { getTimeGreeting } from "./Templates/Greeting/timeGreeting";
import { checkRepeatMessage } from "./Templates/checkRepeatMessage/checkRepeatMessage"; 

export function getBotReply(query) {
  const q = query.toLowerCase();

  
  // 🔁 repeat message check (FIRST)
  const repeatReply = checkRepeatMessage(query);
  if (repeatReply) return repeatReply;
//------------------------------------------------------------------------------------------------------
  // 🌆 greeting
  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    const greetings = resumeData.greetings || ["Hello! How can I help you?"];
    const random = greetings[Math.floor(Math.random() * greetings.length)];
    return `${getTimeGreeting()}! ${random}`;
  }
//------------------------------------------------------------------------------------------------------
  // ✅ BAsic Details
    const nameKeywords = ["name", "who are you", "who are u", "your name", "who is this" ,"what should i call you"];
        if (nameKeywords.some(keyword => q.includes(keyword))) {
            return resumeData.name;
        }

    const currentlocation = ["location" , "current location", "where you live", "what is your location"];
        if (currentlocation.some(keyword => q.includes(keyword))) {
            return resumeData.currentlocation;
        }

    const hometown = ["hometown", "where you from", "your hometown"];
        if (hometown.some(keyword => q.includes(keyword))) {
            return resumeData.hometown;
        }

  if (q.includes("about yourself")) return resumeData.aboutme;
  if (q.includes("about")) return resumeData.aboutme;

  // ✅ role
  if (q.includes("role") || q.includes("job"))
    return resumeData.role;

  // ✅ location

  // ✅ skills
  if (q.includes("skill"))
    return [
      ...(resumeData.erp || []),
      ...(resumeData.technical || []),
      ...(resumeData.tools || []),
      ...(resumeData.domains || [])
    ].join(", ");

  // ✅ experience
  if (q.includes("experience"))
    return resumeData.experience;

  // ✅ company
  if (q.includes("company"))
    return resumeData.company;

  // ✅ project
  if (q.includes("project"))
    return resumeData.projects;

  // ✅ duration
  if (q.includes("duration") || q.includes("working"))
    return resumeData.duration;

  // ✅ contact
  if (q.includes("contact") || q.includes("email") || q.includes("phone"))
    return `${resumeData.email} | ${resumeData.phone}`;

  // ✅ portfolio
  if (q.includes("portfolio") || q.includes("website"))
    return resumeData.portfolio;

  return "Sorry, I don't understand that. Can you ask something else?";
}