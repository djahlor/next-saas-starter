# Project Overview

An AI-powered email marketing platform that enables e-commerce businesses to generate brand-aligned email content through a sophisticated template system and AI content generation. The platform analyzes brand websites to create comprehensive brand profiles, generates on-brand email content across multiple languages, and integrates directly with design tools for seamless implementation.

Key Differentiators:
- Automated brand voice analysis and profile creation
- Multi-language content generation with brand consistency
- Sophisticated template system with visual previews
- Direct integration with design tools (Figma/Canva)
- Version control and content approval workflow

# Core Functionalities

## 1. Brand Management
- **Website Analysis**: Automated extraction and analysis of brand content
- **Brand Profile Creation**: AI-generated brand voice, tone, and target audience profiles
- **Multi-language Support**: Content generation across multiple languages
- **Profile Customization**: Manual refinement of AI-generated profiles

## 2. Template System
- **Hierarchical Organization**:
  - Email Flows (e.g., Welcome Series)
  - Flow Variations (e.g., Minimal Welcome)
  - Visual Templates with live previews
- **Variable Configuration**: Customizable template variables
- **Visual Preview**: Live template visualization
- **Template Categories**: Organized by purpose and style

## 3. AI Content Generation
- **Brand-Aligned Content**: Generation based on brand profile
- **Multi-Language Support**: Content in multiple languages
- **Section-Based Generation**: Regenerate specific sections
- **Version Control**: Track content versions and changes
- **Smart Suggestions**: AI-powered content improvements

## 4. Content Management
- **Approval Workflow**: Structured content review process
- **Version History**: Track changes and iterations
- **Language Variants**: Manage translations
- **Edit Capabilities**: Manual refinement of generated content
- **Content Organization**: Categorized by flows and types

## 5. Design Integration
- **Design Tool Links**: Direct integration with Figma/Canva
- **Visual Templates**: Pre-designed email layouts
- **Preview System**: Live content visualization
- **Design Export**: Export content to design tools

## 6. Analytics & Tracking
- **Generation Metrics**: Track content generation success
- **Usage Analytics**: Monitor template and feature usage
- **Performance Insights**: Content effectiveness metrics
- **User Behavior**: Track user interaction patterns

## 7. Collaboration Features
- **Team Roles**: Different access levels
- **Content Review**: Collaborative review process
- **Feedback System**: Comment and suggest changes
- **Shared Resources**: Team-wide brand assets

## 8. Security & Compliance
- **Role-Based Access**: Granular permission control
- **Content Validation**: Ensure brand compliance
- **Audit Trail**: Track all content changes
- **Data Protection**: Secure storage and handling

# Doc
XXXX

# Desired file structure
```
app/
├── (login)/                     # Existing auth routes from starter
│   ├── sign-in/
│   ├── sign-up/
│   └── auth-callback/
├── (dashboard)/                 # Protected dashboard routes
│   ├── layout.tsx              # Dashboard layout (from starter)
│   ├── page.tsx                # Dashboard home
│   ├── brands/                 # Brand management
│   │   ├── page.tsx           # Brands list (server)
│   │   ├── new/               # New brand flow
│   │   │   └── page.tsx       # Brand creation (server)
│   │   └── [brandId]/         # Brand details
│   │       └── page.tsx       # Brand management (server)
│   ├── templates/             # Template management
│   │   ├── page.tsx          # Template list (server)
│   │   └── [templateId]/     # Template config
│   │       └── page.tsx      # Generation (server)
│   └── history/              # Generation history
│       └── page.tsx         # History list (server)
├── api/                      # API routes
│   ├── brands/
│   │   ├── route.ts         # Brands CRUD
│   │   ├── analyze/         # Website analysis
│   │   │   └── route.ts
│   │   └── [brandId]/
│   │       ├── route.ts     # Brand details
│   │       └── products/    # Products management
│   │           └── route.ts
│   ├── generations/
│   │   ├── route.ts         # Create generation
│   │   └── [id]/
│   │       ├── route.ts     # Get/update generation
│   │       ├── approve/     # Approve generation
│   │       │   └── route.ts
│   │       └── versions/    # Version management
│   │           └── route.ts
│   └── stripe/              # Keep existing Stripe routes
├── layout.tsx               # Root layout (from starter)
└── page.tsx                # Landing page (from starter)

components/
├── brands/                  # Brand components
│   ├── brand-creator.tsx   # Brand creation wizard ('use client')
│   ├── brand-card.tsx      # Brand list item
│   └── website-analyzer.tsx # Analysis UI ('use client')
├── templates/              # Template components
│   ├── template-flow.tsx   # Template selection ('use client')
│   ├── template-card.tsx   # Template list item
│   └── content-editor.tsx  # Content editing ('use client')
└── ui/                     # Keep existing shadcn components

lib/
├── auth/                   # Keep existing auth
├── db/                     # Database (from starter)
│   ├── migrations/        # SQL migrations
│   ├── schema.ts         # Drizzle schema
│   └── queries.ts        # Database queries
├── ai/                    # AI functionality
│   ├── analyze.ts        # Website analysis
│   └── generate.ts       # Content generation
└── templates/            # Template definitions
    ├── flows.ts         # Email flows
    ├── variations.ts    # Template variations
    └── prompts/         # Generation prompts
        ├── base.ts     
        └── templates/   # Template-specific prompts

types/
├── brand.ts              # Brand types
├── generation.ts         # Generation types
├── product.ts           # Product types
└── template.ts          # Template types
```

# Additional requirements
XXXX




1. Project setup

- All new components should go in /components at the root (not in the app folder) and be named Like example-component. tx unless otherwise specified
- All new pages go in /app
- Use the Next.js 15 app router
- All data fetching should be done in a server component and pass the data down as props
- Client components (useState, hooks, etc) require that 'use client' is set at the top of the file

2. Server-Side API Calls:
- All interactions with external APIs (e.g., Reddit, OpenAI) should be performed server-side.
- Create dedicated API routes in the 'pages/api' directory for each external API interaction.
- Client-side components should fetch data through these API routes, not directly from external APIs.

3. Environment Variables:
- Store all sensitive information (API keys, credentials) in environment variables.
- Use a '.env' file for local development and ensure it's listed in '.gitignore'.
- For production, set environment variables in the deployment platform (e.g., Vercel).
- Access environment variables only in server-side code or API routes.

4. Error Handling and Logging:
- Implement comprehensive error handling in both client-side components and server-side API routes.
- Log errors on the server-side for debugging purposes.
- Display user-friendly error messages on the client-side.


5. Type Safety:
- Use TypeScript interfaces for all data structures, especially API responses.
- Avoid using 'any type' instead, define proper types for all variables and function parameters.

6. API Client Initialization:
- Initialize API clients (e.g., firecrawl scraping, OpenAl) in server-side code only.
- Implement checks to ensure API clients are properly initialized before use.

7. Data Fetching in Components:
- Use React hooks (e.g., useEffect) for data fetching in client-side components.
- Implement loading states and error handling for all data fetching operations..

8. Next.js Configuration:
- Utilize nyxt. config mjs for environment-specific configurations.
- Use the env property in next. config.mjs to make environment variables available to the application.

9. CORS and API Routes:
- Use Next.js API routes to avoid CORS issues when interacting with external APis.
- Implement proper request validation in API routes.

10. Component Structure:
- Separate concerns between client and server components.
- Use server components for initial data fetching and pass data as props to client components.

11. Security: 
- Never expose API keys or sensitive credentials on the client-side.
- Implement proper authentication and authorization for API routes if needed.