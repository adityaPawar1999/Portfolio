# Project Structure Documentation

## Overview
This portfolio project is organized following a scalable React structure with clear separation of concerns.

## Folder Structure

```
src/
├── components/              # Reusable UI components
│   ├── API/                # API-related components
│   │   └── VisitorCount.jsx
│   ├── Layout/             # Layout wrapper components
│   │   └── Layout.jsx
│   ├── Navbar/             # Navigation components
│   │   ├── Navbar.jsx
│   │   └── index.js
│
├── pages/                  # Page components (route-specific)
│   ├── Home.jsx           # Landing page
│   ├── About.jsx          # About page
│   ├── NotFound.jsx       # 404 page
│   └── Main.jsx
│
├── modules/               # Feature modules (complex features)
│   ├── Accounting/        # Accounting module
│   │   ├── pages/
│   │   │   └── Account.jsx
│   │   ├── data/
│   │   │   └── accountingData.js
│   │   └── index.js
│   └── CRM/              # CRM module (future)
│
├── hooks/                # Custom React hooks
│   └── useScrollEffect.js
│
├── services/             # API and external services
│   └── visitorApi.js
│
├── utils/               # Utility functions
│   └── colorUtils.js
│
├── constants/           # Global constants and config
│   └── navigation.js
│
├── types/              # TypeScript types (future)
│
├── App.jsx            # Root component
├── main.jsx           # Entry point
├── index.css          # Global styles
├── App.css            # App-specific styles
└── visit.js           # Visitor tracking
```

## Key Features

### 1. **Components** (`src/components/`)
- Reusable, self-contained UI components
- Each component handles its own presentation logic
- Shared across multiple pages/features

### 2. **Pages** (`src/pages/`)
- Route-specific page components
- Each page represents a unique route
- Combines multiple components to create complete pages

### 3. **Modules** (`src/modules/`)
- Self-contained feature modules
- Each module has its own structure (pages, data, logic)
- Scalable for adding new features (CRM, Sales, Stock, etc.)

### 4. **Hooks** (`src/hooks/`)
- Custom React hooks for reusable logic
- Examples: `useScrollEffect` for scroll detection

### 5. **Services** (`src/services/`)
- API calls and external service integrations
- Centralized data fetching logic
- Examples: `visitorApi.js` for visitor tracking

### 6. **Utils** (`src/utils/`)
- Helper functions and utilities
- Non-component business logic
- Examples: `colorUtils.js` for color logic

### 7. **Constants** (`src/constants/`)
- Global constants and configuration
- Navigation links, routes, configuration values
- Examples: `navigation.js` for nav links and social links

## Import Patterns

### Bad (Avoid)
```javascript
import data from '../../Modules/Accounting/accounting_data';
import { getHoverColor } from './utils';
```

### Good (Use)
```javascript
import data from '../data/accountingData';
import { getHoverColor } from '../../utils/colorUtils';
import { NAV_LINKS } from '../../constants/navigation';
```

## Adding New Features

### Add a New Module
1. Create folder: `src/modules/NewFeature/`
2. Structure:
   ```
   NewFeature/
   ├── pages/
   │   └── NewFeaturePage.jsx
   ├── data/
   │   └── newFeatureData.js
   └── index.js
   ```
3. Export from index.js for easy imports

### Add a New Custom Hook
1. Create file: `src/hooks/useNewHook.js`
2. Export the hook with JSDoc comments
3. Import and use in components

### Add New Constants
1. Create/update file in `src/constants/`
2. Export named constants
3. Import where needed

## Naming Conventions

- **Files**: camelCase or PascalCase for components
- **Folders**: lowercase with hyphens (e.g., `user-profile`)
- **Components**: PascalCase (e.g., `UserProfile.jsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useScrollEffect.js`)
- **Utilities**: camelCase (e.g., `colorUtils.js`)
- **Constants**: UPPER_CASE (e.g., `NAV_LINKS`)

## Best Practices

1. **Keep components small and focused** - One responsibility per component
2. **Use index.js for exports** - Makes imports cleaner
3. **Centralize API calls** - Use services folder
4. **Store configuration in constants** - Easy to maintain and update
5. **Extract logic into hooks** - Reuse across components
6. **Use utilities for pure functions** - Keep components clean
7. **Organize by feature** - Group related files in modules

## Migration Notes

- Old `Modules/Accounting/` → New `modules/Accounting/`
- Old `accounting_data.js` → New `modules/Accounting/data/accountingData.js`
- Navigation data moved to `constants/navigation.js`
- Color utilities moved to `utils/colorUtils.js`
- API logic moved to `services/visitorApi.js`
- Scroll logic moved to `hooks/useScrollEffect.js`
