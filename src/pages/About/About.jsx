import React from "react";
import styled from "styled-components";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SelfPic from "./img1.jpg";

// ── Themed atoms (only these touch theme colors — everything else is Tailwind) ──

const Bg = styled.div`
  background-color: ${(props) => props.theme.bgPage};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Accent = styled.span`
  color: ${(props) => props.theme.primary};
`;

const TextDark = styled.span`
  color: ${(props) => props.theme.textDark};
`;

const TextMid = styled.span`
  color: ${(props) => props.theme.textMid};
`;

const AccentBar = styled.div`
  background-color: ${(props) => props.theme.primary};
`;

const HairlineDivider = styled.div`
  background-color: ${(props) => props.theme.borderCard};
`;

const Tag = styled.span`
  border: 1px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.textWhite};
  }
`;

const IconWrap = styled.span`
  color: ${(props) => props.theme.primary};
  display: inline-flex;

  svg {
    font-size: 16px;
  }
`;

const CardLink = styled.a`
  color: ${(props) => props.theme.primary};

  &:hover {
    color: ${(props) => props.theme.primaryHover};
  }
`;

const StatusDot = styled.span`
  background-color: ${(props) => props.theme.accentGreen};

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  animation: pulse 2s infinite;
`;

// ── Content data ─────────────────────────────────────────────
// Swap these placeholders for your real history — shape is ready to go.

const tags = [
  "ERP Implementation",
  "Functional & Technical Consulting",
  "Accounting & Finance",
  "Inventory & Warehouse",
  "Manufacturing & Production",
  "Automation & Client Scripting",
];

const experience = [
  {
    role: "ERP Techno-Functional Consultant",
    org: "Company Name",
    period: "2023 — Present",
    points: [
      "Led end-to-end ERP implementations across accounting and inventory modules.",
      "Built custom automation scripts to streamline client workflows.",
    ],
  },
  {
    role: "ERP Support Consultant",
    org: "Company Name",
    period: "2021 — 2023",
    points: [
      "Provided functional support for manufacturing and procurement modules.",
      "Partnered with clients to translate business needs into system configs.",
    ],
  },
];

const education = [
  {
    degree: "B.E. in Your Field",
    school: "Your College / University",
    period: "2017 — 2021",
  },
];

// ── Component ────────────────────────────────────────────────

export default function About() {
  return (
    <Bg className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl font-sans">
        {/* Top: photo + intro */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start">
          <img
            src={SelfPic}
            alt="Aditya Vilas Pawar"
            className="w-full max-w-[220px] h-[280px] object-cover rounded-md mx-auto md:mx-0"
          />

          <div>
            <Accent className="block text-[11px] font-bold tracking-widest uppercase mb-1.5">
              About Me
            </Accent>

            <TextDark className="block text-[1.6rem] md:text-[2rem] font-black leading-tight mb-2">
              ERP Consultant & <Accent>Techno-Functional Expert</Accent>
            </TextDark>

            <AccentBar className="w-9 h-[3px] rounded-full mb-3" />

            <TextMid className="block text-sm leading-relaxed max-w-md mb-4">
              Hi! I'm{" "}
              <Accent className="font-semibold">Aditya Vilas Pawar</Accent>,
              an ERP techno-functional consultant experienced in designing
              and implementing practical, scalable ERP solutions across
              accounting, inventory, manufacturing, procurement, and supply
              chain.
            </TextMid>

            <TextDark className="block text-[11px] font-bold tracking-widest uppercase mb-2.5">
              Areas of Focus
            </TextDark>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  className="text-[10px] font-medium px-3 py-1.5 rounded-full cursor-default"
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <HairlineDivider className="h-px my-8" />

        {/* Experience */}
        <TextDark className="block text-[11px] font-bold tracking-widest uppercase mb-4">
          Work Experience
        </TextDark>

        <div className="flex flex-col gap-5 mb-8">
          {experience.map((job) => (
            <div key={job.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 mb-1">
                <TextDark className="text-sm font-semibold">
                  {job.role} · <Accent>{job.org}</Accent>
                </TextDark>
                <TextMid className="text-xs">{job.period}</TextMid>
              </div>
              <ul className="list-disc list-inside space-y-0.5">
                {job.points.map((point) => (
                  <TextMid key={point} className="block text-xs leading-relaxed">
                    <li>{point}</li>
                  </TextMid>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <HairlineDivider className="h-px my-8" />

        {/* Education */}
        <TextDark className="block text-[11px] font-bold tracking-widest uppercase mb-4">
          Education
        </TextDark>

        <div className="flex flex-col gap-3 mb-8">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="flex flex-wrap items-baseline justify-between gap-x-3"
            >
              <TextDark className="text-sm font-semibold">
                {edu.degree} · <Accent>{edu.school}</Accent>
              </TextDark>
              <TextMid className="text-xs">{edu.period}</TextMid>
            </div>
          ))}
        </div>

        <HairlineDivider className="h-px my-8" />

        {/* Location / Contact / Availability — no cards, just a clean row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <TextDark className="flex items-center gap-1.5 text-[11px] font-bold mb-1.5">
              <IconWrap>
                <PlaceIcon />
              </IconWrap>
              Location
            </TextDark>
            <TextMid className="block text-xs leading-relaxed">
              <TextDark className="font-medium">Current:</TextDark> Bangalore
              <br />
              <TextDark className="font-medium">Hometown:</TextDark> Pune
            </TextMid>
          </div>

          <div>
            <TextDark className="flex items-center gap-1.5 text-[11px] font-bold mb-1.5">
              <IconWrap>
                <LocalPostOfficeIcon />
              </IconWrap>
              Contact
            </TextDark>
            <CardLink
              href="mailto:adityapawar8909@gmail.com"
              className="text-xs break-all"
            >
              adityapawar8909@gmail.com
            </CardLink>
          </div>

          <div>
            <TextDark className="flex items-center gap-1.5 text-[11px] font-bold mb-1.5">
              <IconWrap>
                <AssessmentIcon />
              </IconWrap>
              Availability
            </TextDark>
            <TextMid className="flex items-center gap-2 text-xs">
              <StatusDot className="w-1.5 h-1.5 rounded-full" />
              Open for freelance & ERP consulting
            </TextMid>
          </div>
        </div>
      </div>
    </Bg>
  );
}



// import React from "react";
// import styled from "styled-components";
// import PlaceIcon from "@mui/icons-material/Place";
// import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import SelfPic from "./img1.jpg";

// // ── Styled Components ──────────────────────────────────────────

// const AboutContainer = styled.div`
//   width: 100%;
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: ${props => props.theme.bgPage};
//   padding: 24px 16px;
//   margin-top: 60px;
//   transition: background-color 0.3s ease, color 0.3s ease;
// `;

// const AboutContent = styled.div`
//   width: 100%;
//   max-width: 1280px;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
// `;

// const GridSection = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 32px;
//   align-items: center;
//   margin-bottom: 24px;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     gap: 24px;
//   }
// `;

// const PhotoContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const ProfileImage = styled.img`
//   border-radius: 8px;
//   object-fit: cover;
//   width: 100%;
//   max-width: 280px;
//   height: 380px;
//   box-shadow: ${props => props.theme.shadowLg};
// `;

// const TextSection = styled.div``;

// const SubLabel = styled.p`
//   font-size: 12px;
//   font-weight: 700;
//   letter-spacing: 0.1em;
//   text-transform: uppercase;
//   color: ${props => props.theme.primary};
//   margin-bottom: 8px;
// `;

// const Title = styled.h1`
//   font-size: clamp(1.6rem, 2.6vw, 2.4rem);
//   font-weight: 900;
//   line-height: 1.2;
//   color: ${props => props.theme.textDark};
//   margin-bottom: 8px;
// `;

// const HighlightSpan = styled.span`
//   color: ${props => props.theme.primary};
// `;

// const Divider = styled.div`
//   width: 40px;
//   height: 3px;
//   background-color: ${props => props.theme.primary};
//   border-radius: 2px;
//   margin: 12px 0 16px 0;
// `;

// const Description = styled.p`
//   font-size: 14px;
//   color: ${props => props.theme.textMid};
//   line-height: 1.6;
//   margin-bottom: 16px;
//   max-width: 400px;
// `;

// const FocusLabel = styled.p`
//   font-size: 12px;
//   font-weight: 700;
//   letter-spacing: 0.1em;
//   text-transform: uppercase;
//   color: ${props => props.theme.textDark};
//   margin-bottom: 12px;
// `;

// const TagsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 8px;
// `;

// const Tag = styled.span`
//   font-size: 10px;
//   font-weight: 500;
//   padding: 6px 12px;
//   border-radius: 20px;
//   border: 1px solid ${props => props.theme.primary};
//   color: ${props => props.theme.primary};
//   transition: all 0.2s ease;
//   cursor: default;
//   background-color: transparent;

//   &:hover {
//     background-color: ${props => props.theme.primary};
//     color: ${props => props.theme.textWhite};
//   }
// `;

// const DividerLine = styled.div`
//   height: 1px;
//   background-color: ${props => props.theme.borderCard};
//   margin: 24px 0;
// `;

// const InfoCardsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 16px;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const InfoCard = styled.div`
//   border-radius: 12px;
//   padding: 16px;
//   background-color: ${props => props.theme.bgCard};
//   border: 1px solid ${props => props.theme.borderCard};
//   box-shadow: ${props => props.theme.shadowSm};
//   transition: all 0.2s ease;

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: ${props => props.theme.shadowLg};
//   }
// `;

// const CardTitle = styled.h3`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-size: 12px;
//   font-weight: 700;
//   color: ${props => props.theme.textDark};
//   margin-bottom: 8px;

//   svg {
//     color: ${props => props.theme.primary};
//     font-size: 18px;
//   }
// `;

// const CardText = styled.p`
//   font-size: 12px;
//   color: ${props => props.theme.textMid};
//   line-height: 1.6;
// `;

// const CardLink = styled.a`
//   font-size: 12px;
//   color: ${props => props.theme.primary};
//   text-decoration: none;
//   word-break: break-all;
//   transition: all 0.2s ease;

//   &:hover {
//     text-decoration: underline;
//     color: ${props => props.theme.primaryHover};
//   }
// `;

// const StatusBadge = styled.p`
//   font-size: 12px;
//   color: ${props => props.theme.textMid};
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const StatusDot = styled.span`
//   width: 6px;
//   height: 6px;
//   background-color: ${props => props.theme.accentGreen};
//   border-radius: 50%;
//   animation: pulse 2s infinite;

//   @keyframes pulse {
//     0%, 100% {
//       opacity: 1;
//     }
//     50% {
//       opacity: 0.5;
//     }
//   }
// `;

// // ── Component ──────────────────────────────────────────────────

// const tags = [
//   "ERP Implementation",
//   "Functional & Technical Consulting",
//   "Accounting & Finance",
//   "Inventory & Warehouse",
//   "Manufacturing & Production",
//   "Automation & Client Scripting",
// ];

// export default function About() {
//   return (
//     <AboutContainer>
//       <AboutContent>
//         {/* Top Grid */}
//         <GridSection>
//           {/* Photo */}
//           <PhotoContainer>
//             <ProfileImage
//               src={SelfPic}
//               alt="Aditya Vilas Pawar"
//             />
//           </PhotoContainer>

//           {/* Content */}
//           <TextSection>
//             <SubLabel>About Me</SubLabel>

//             <Title>
//               ERP Consultant &{" "}
//               <HighlightSpan>Techno-Functional Expert</HighlightSpan>
//             </Title>

//             <Divider />

//             <Description>
//               Hi! I'm{" "}
//               <HighlightSpan style={{ fontWeight: 600 }}>
//                 Aditya Vilas Pawar
//               </HighlightSpan>, an ERP techno-functional consultant experienced in designing and implementing practical, scalable ERP solutions across accounting, inventory, manufacturing, procurement, and supply chain.
//             </Description>

//             <FocusLabel>Areas of Focus</FocusLabel>

//             <TagsContainer>
//               {tags.map((tag) => (
//                 <Tag key={tag}>{tag}</Tag>
//               ))}
//             </TagsContainer>
//           </TextSection>
//         </GridSection>

//         {/* Divider */}
//         <DividerLine />

//         {/* Info Cards */}
//         <InfoCardsGrid>
//           {/* Location */}
//           <InfoCard>
//             <CardTitle>
//               <PlaceIcon />
//               Location
//             </CardTitle>
//             <CardText>
//               <strong>Current:</strong> Bangalore
//             </CardText>
//             <CardText>
//               <strong>Hometown:</strong> Pune
//             </CardText>
//           </InfoCard>

//           {/* Contact */}
//           <InfoCard>
//             <CardTitle>
//               <LocalPostOfficeIcon />
//               Contact
//             </CardTitle>
//             <CardLink href="mailto:adityapawar8909@gmail.com">
//               adityapawar8909@gmail.com
//             </CardLink>
//           </InfoCard>

//           {/* Availability */}
//           <InfoCard>
//             <CardTitle>
//               <AssessmentIcon />
//               Availability
//             </CardTitle>
//             <StatusBadge>
//               <StatusDot />
//               Open for freelance & ERP consulting
//             </StatusBadge>
//           </InfoCard>
//         </InfoCardsGrid>
//       </AboutContent>
//     </AboutContainer>
//   );
// }
