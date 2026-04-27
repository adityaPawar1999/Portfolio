import React from "react";
import styled from "styled-components";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SelfPic from "./img1.jpg";

// ── Styled Components ──────────────────────────────────────────

const AboutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.bgPage};
  padding: 24px 16px;
  margin-top: 60px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const AboutContent = styled.div`
  width: 100%;
  max-width: 1280px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileImage = styled.img`
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  max-width: 280px;
  height: 380px;
  box-shadow: ${props => props.theme.shadowLg};
`;

const TextSection = styled.div``;

const SubLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.theme.primary};
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: clamp(1.6rem, 2.6vw, 2.4rem);
  font-weight: 900;
  line-height: 1.2;
  color: ${props => props.theme.textDark};
  margin-bottom: 8px;
`;

const HighlightSpan = styled.span`
  color: ${props => props.theme.primary};
`;

const Divider = styled.div`
  width: 40px;
  height: 3px;
  background-color: ${props => props.theme.primary};
  border-radius: 2px;
  margin: 12px 0 16px 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${props => props.theme.textMid};
  line-height: 1.6;
  margin-bottom: 16px;
  max-width: 400px;
`;

const FocusLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${props => props.theme.textDark};
  margin-bottom: 12px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 10px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  transition: all 0.2s ease;
  cursor: default;
  background-color: transparent;

  &:hover {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.textWhite};
  }
`;

const DividerLine = styled.div`
  height: 1px;
  background-color: ${props => props.theme.borderCard};
  margin: 24px 0;
`;

const InfoCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  border-radius: 12px;
  padding: 16px;
  background-color: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.borderCard};
  box-shadow: ${props => props.theme.shadowSm};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadowLg};
  }
`;

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.textDark};
  margin-bottom: 8px;

  svg {
    color: ${props => props.theme.primary};
    font-size: 18px;
  }
`;

const CardText = styled.p`
  font-size: 12px;
  color: ${props => props.theme.textMid};
  line-height: 1.6;
`;

const CardLink = styled.a`
  font-size: 12px;
  color: ${props => props.theme.primary};
  text-decoration: none;
  word-break: break-all;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.primaryHover};
  }
`;

const StatusBadge = styled.p`
  font-size: 12px;
  color: ${props => props.theme.textMid};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  background-color: ${props => props.theme.accentGreen};
  border-radius: 50%;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

// ── Component ──────────────────────────────────────────────────

const tags = [
  "ERP Implementation",
  "Functional & Technical Consulting",
  "Accounting & Finance",
  "Inventory & Warehouse",
  "Manufacturing & Production",
  "Automation & Client Scripting",
];

export default function About() {
  return (
    <AboutContainer>
      <AboutContent>
        {/* Top Grid */}
        <GridSection>
          {/* Photo */}
          <PhotoContainer>
            <ProfileImage
              src={SelfPic}
              alt="Aditya Vilas Pawar"
            />
          </PhotoContainer>

          {/* Content */}
          <TextSection>
            <SubLabel>About Me</SubLabel>

            <Title>
              ERP Consultant &{" "}
              <HighlightSpan>Techno-Functional Expert</HighlightSpan>
            </Title>

            <Divider />

            <Description>
              Hi! I'm{" "}
              <HighlightSpan style={{ fontWeight: 600 }}>
                Aditya Vilas Pawar
              </HighlightSpan>, an ERP techno-functional consultant experienced in designing and implementing practical, scalable ERP solutions across accounting, inventory, manufacturing, procurement, and supply chain.
            </Description>

            <FocusLabel>Areas of Focus</FocusLabel>

            <TagsContainer>
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagsContainer>
          </TextSection>
        </GridSection>

        {/* Divider */}
        <DividerLine />

        {/* Info Cards */}
        <InfoCardsGrid>
          {/* Location */}
          <InfoCard>
            <CardTitle>
              <PlaceIcon />
              Location
            </CardTitle>
            <CardText>
              <strong>Current:</strong> Bangalore
            </CardText>
            <CardText>
              <strong>Hometown:</strong> Pune
            </CardText>
          </InfoCard>

          {/* Contact */}
          <InfoCard>
            <CardTitle>
              <LocalPostOfficeIcon />
              Contact
            </CardTitle>
            <CardLink href="mailto:adityapawar8909@gmail.com">
              adityapawar8909@gmail.com
            </CardLink>
          </InfoCard>

          {/* Availability */}
          <InfoCard>
            <CardTitle>
              <AssessmentIcon />
              Availability
            </CardTitle>
            <StatusBadge>
              <StatusDot />
              Open for freelance & ERP consulting
            </StatusBadge>
          </InfoCard>
        </InfoCardsGrid>
      </AboutContent>
    </AboutContainer>
  );
}