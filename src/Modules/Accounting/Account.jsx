import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../themes/ThemeContext';
import data from './accounting_data';
import Navbar from "../../components/Navbar/Navbar"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// ── Styled Components ──────────────────────────────────────────

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.bgPage} 0%, ${props => props.theme.bgSecondary} 100%);
  transition: background 0.3s ease, color 0.3s ease;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.bgCard};
  box-shadow: 0 2px 8px ${props => props.theme.borderCard}40;
  z-index: 20;
  border-bottom: 1px solid ${props => props.theme.borderCard};
  margin-top: 56px;
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 16px;
  position: relative;

  @media (max-width: 640px) {
    padding: 12px 16px;
  }
`;

const SearchBarWrapper = styled.div`
  position: relative;
  display: none;

  @media (max-width: 640px) {
    display: none;
  }

  @media (min-width: 640px) {
    display: block;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding-left: 40px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  border: 1px solid ${props => props.theme.borderCard};
  border-radius: 8px;
  background-color: ${props => props.theme.bgPage};
  color: ${props => props.theme.textDark};
  font-size: 14px;
  transition: all 0.2s ease;
  font-family: inherit;

  &::placeholder {
    color: ${props => props.theme.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primaryLight};
  }
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: ${props => props.theme.textMuted};
  stroke: currentColor;
`;

const SuggestionsContainer = styled.ul`
  position: absolute;
  width: 100%;
  background-color: ${props => props.theme.bgPage};
  border: 1px solid ${props => props.theme.borderCard};
  border-radius: 8px;
  margin-top: 8px;
  box-shadow: ${props => props.theme.shadowLg};
  overflow: hidden;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 12px 16px;
  color: ${props => props.theme.textDark};
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${props => props.theme.borderCard};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${props => props.theme.bgCard};
    color: ${props => props.theme.primary};
  }
`;

const ContentWrapper = styled.div`
  padding-top: 140px;
  padding-bottom: 32px;
  padding-left: 16px;
  padding-right: 16px;

  @media (max-width: 640px) {
    padding-top: 160px;
  }
`;

const MaxWidthContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.textDark};
  margin-bottom: 16px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: ${props => props.theme.primary};
  }

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
`;

const ItemCard = styled.div`
  background-color: ${props => props.theme.bgCard};
  box-shadow: ${props => props.theme.shadowSm};
  border: 1px solid ${props => props.theme.borderCard};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadowLg};
  }
`;

const ItemHeader = styled.div`
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  background-color: ${props => props.expanded ? props.theme.bgHover : 'transparent'};

  &:hover {
    background-color: ${props => props.theme.bgHover};
  }
`;

const ItemTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.textDark};
  margin: 0;
`;

const ExpandIcon = styled.span`
  color: ${props => props.theme.textMuted};
  font-size: 20px;
  font-weight: 300;
`;

const ItemContent = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContentSection = styled.div``;

const ContentLabel = styled.span`
  font-weight: 600;
  color: ${props => props.theme.textDark};
`;

const ContentText = styled.p`
  color: ${props => props.theme.textMid};
  margin-top: 4px;
  margin: 0;
  line-height: 1.6;
`;

const NoResultsContainer = styled.div`
  text-align: center;
  padding: 48px 16px;
`;

const NoResultsText = styled.p`
  color: ${props => props.theme.textMuted};
  font-size: 18px;
`;

// ── Component ──────────────────────────────────────────────────

export default function AccountingGlossary() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const suggestions = search ? filtered.slice(0, 5) : [];

  return (
    <PageContainer>
      <Navbar />
      
      {/* Fixed Header */}
      <FixedHeader>
        <HeaderContent>
          <SearchBarWrapper>
            <SearchInput
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Search terms..."
            />
            <SearchIcon
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </SearchIcon>

            {/* Suggestions */}
            {suggestions.length > 0 && showSuggestions && (
              <SuggestionsContainer>
                {suggestions.map((item, index) => (
                  <SuggestionItem
                    key={index}
                    onClick={() => {
                      setSearch(item.title);
                      setSelected(item.title);
                      setShowSuggestions(false);
                    }}
                  >
                    {item.title}
                  </SuggestionItem>
                ))}
              </SuggestionsContainer>
            )}
          </SearchBarWrapper>
        </HeaderContent>
      </FixedHeader>

      {/* Content */}
      <ContentWrapper>
        <MaxWidthContainer>
          <PageTitle>
            <AccountBalanceIcon fontSize="large" />
            ACCOUNTING CONCEPT
          </PageTitle>

          <ItemsGrid>
            {filtered.map((item, index) => (
              <ItemCard key={index}>
                <ItemHeader
                  expanded={selected === item.title}
                  onClick={() =>
                    setSelected(selected === item.title ? null : item.title)
                  }
                >
                  <ItemTitle>{item.title}</ItemTitle>
                  <ExpandIcon>
                    {selected === item.title ? "−" : "+"}
                  </ExpandIcon>
                </ItemHeader>

                {selected === item.title && (
                  <ItemContent>
                    <ContentSection>
                      <ContentLabel>Definition:</ContentLabel>
                      <ContentText>
                        {item.one_line_definition}
                      </ContentText>
                    </ContentSection>
                    <ContentSection>
                      <ContentLabel>Description:</ContentLabel>
                      <ContentText>{item.description}</ContentText>
                    </ContentSection>
                    <ContentSection>
                      <ContentLabel>Example:</ContentLabel>
                      <ContentText>{item.example}</ContentText>
                    </ContentSection>
                  </ItemContent>
                )}
              </ItemCard>
            ))}
          </ItemsGrid>

          {/* No Results */}
          {filtered.length === 0 && (
            <NoResultsContainer>
              <NoResultsText>No results found</NoResultsText>
            </NoResultsContainer>
          )}
        </MaxWidthContainer>
      </ContentWrapper>
    </PageContainer>
  );
}
