# Climate-Dry

A modern, production-ready React application with built-in authentication, responsive UI, and optimized for performance.

## Features

- 🔒 Complete authentication system (login, register, password reset)
- 📱 Responsive design with TailwindCSS
- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript for type safety
- 🧭 React Router for navigation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Clone the Repository

```bash
git clone git@github.com:dmmdcreative/climate-dry.git
cd climate-dry
```

### Installation

Install the dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost/api // API base URL
VITE_SITE_ID=1 // Site ID for the application
VITE_SECRET="cd-secret" // Secret key 
```

This environment variable is required for API connections.

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Project Structure

```
├── app/                  # Main application code
│   ├── assets/           # Static assets and icons
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React contexts (auth, etc.)
│   ├── routes/            # Page components and routes
│   ├── services/         # API and service integrations
│   └── utils/            # Utility functions
├── public/               # Public static files
├── Dockerfile            # Docker configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

To deploy the application:

```bash
# Build the application
npm run build

# Deploy the build folder to your hosting provider
```

The build output will contain:
```
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
