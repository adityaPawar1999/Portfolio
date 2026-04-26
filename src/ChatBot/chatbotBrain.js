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
    const nameKeywords = [ "what is your name", "name", "who are you", "who are u","your name", "who is this", "what should i call you","ur name", "wat is ur name", "yo name", "tell me ur name","name pls", "name please",  "may i know your name", "could you tell me your name","what may i call you", "how should i address you","what do people call you", "how do i call you","what are you called", "what's this bot called" ];
        if (nameKeywords.some(keyword => q.includes(keyword))) {
            return resumeData.name;
        }

    const currentlocation = ["what is your location","location","current location","where you live","where do you live","where r u living","where u live","ur location","your current place","where are you now","where r u now","where u at","your address","what is your address","where are you staying","where do you stay","your place now","where are you based","where r u based","where you based","where is your base","whr r u now","where u now","ur current location","present location","current place","where are you located","your live location","where you staying currently","which place you live in"];
        if (currentlocation.some(keyword => q.includes(keyword))) {
            return resumeData.currentlocation;
        }

    const hometown = ["hometown","where you from","your hometown","where r u from","where u from","ur place","which place u from","where you at from","where are you from","may i know where you are from","could you tell me your origin","what is your place of origin","what's your hometown","which city are you from","where do you belong","what place do you belong to","whr r u from","where u frm","ur hometown","which city u frm","where were you born","what's your native place","which planet are you from","where do you come from originally"];
        if (hometown.some(keyword => q.includes(keyword))) {
            return resumeData.hometown;
        }

    const aboutMe = ["tell me about you","about you","who are you","introduce yourself","give me your intro","what do you do","what are you","describe yourself","can you tell me about yourself","i want to know about you","info about you","information about you","what is your background","what can you do","what do you do for a living","who is this","who am i talking to","tell me something about you","say something about yourself","give your introduction","your introduction","brief about you","short intro about you","what’s your story","what is your role","what is your purpose","why were you created","what do you help with","what services do you provide","what are your capabilities","what are you capable of","what can you help me with","what do you know","what’s your identity","who exactly are you","tell me your details","give me details about you","what kind of bot are you","are you a bot","are you human","what type of assistant are you"];
         if (aboutMe.some(keyword => q.includes(keyword))) {
            return resumeData.aboutme;
        }
        

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