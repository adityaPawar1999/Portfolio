import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, GlobalStyles } from "./themes";
import { ThemeContext } from "./themes/ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ChatbotUI from "./pages/ChatbotUI/ChatbotUI";
import Blog from "./pages/Blogs/Blog";
import SingleBlog from "./pages/Blogs/SingleBlog/SingleBlog";

import NotFound from "./pages/NotFound";
import Account from "./Modules/Accounting/Account";

function AppContent() {
  const { theme } = React.useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="ChatbotUI" element={<ChatbotUI />} />

            {/* Other Pages */}
            <Route path="about" element={<About />} />
            <Route path="account" element={<Account />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="/blog/:id" element={<SingleBlog />} />

            <Route path="crm" element={<NotFound />} />
            <Route path="sales" element={<NotFound />} />
            <Route path="stock" element={<NotFound />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
