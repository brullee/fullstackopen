# Full Stack Open - Exercises

My solutions for the **Full Stack Open** course by the University of Helsinki.

## Course progress

- **Part 0-2:** React fundamentals
- **Part 3:** Node.js, Express, and MongoDB
- **Part 4:** Backend testing and authentication
- **Part 5:** Frontend and end-to-end testing
- **Part 6:** State management
- **Part 7:** React Router and custom hooks
- **Part 8:** GraphQL (skipped)
- **Part 9:** TypeScript (in progress)
- **Part 10:** React Native (skipped)
- **Part 11:** CI/CD
- **Part 12:** Containers (in progress)
- **Part 13-14:** Not started

## Deployed applications

- **Notes app (Part 11, exercises 10-12):** [fullstackopen-part3-notes-backend-uzes.onrender.com](https://fullstackopen-part3-notes-backend-uzes.onrender.com/). Code from Part 3, deployed via [`part3-deploy.yaml`](.github/workflows/part3-deploy.yaml).
- **Pokedex (Part 11, exercises 2-9 & 13-20):** [fullstackopen-hhdt.onrender.com](https://fullstackopen-hhdt.onrender.com), deployed via [`part11-pipeline.yaml`](.github/workflows/part11-pipeline.yaml).
- **BlogList (Part 11, exercises 21 & 22):** [fullstackopen-1g80.onrender.com](https://fullstackopen-1g80.onrender.com). Pipeline lives in its own repo: [brullee/fso-bloglist-cicd](https://github.com/brullee/fso-bloglist-cicd).

## Certificates

- **Part 0-7:** [certificates/part0-7.png](certificates/part0-7.png) ([verify](https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/4a3d90cf70d70c1773bb77951361a7b0))
- **Part 11:** [certificates/part11.png](certificates/part11.png) ([verify](https://courses.mooc.fi/certificates/validate/isd3ryue2e3upku))

## Technologies & Concepts

### Fundamentals

- Web application fundamentals (HTTP request/response cycle, traditional web apps vs. single-page apps)
- REST principles (GET, POST, PUT, DELETE)
- CRUD operations
- HTTP status codes

### Frontend

- React (components, state, props, forms, conditional rendering)
- Custom hooks (reusable stateful logic, e.g. `useField`, `useNotify`)
- Error boundaries (class components, `getDerivedStateFromError`)
- React Router (client-side routing, `useMatch`, `useNavigate`)
- Axios (HTTP client)
- MUI (Material UI) & Emotion (component library and styling)

### State Management

- Context API & `useState` (shared state without prop drilling)
- Zustand (lightweight global state store)
- TanStack React Query (server-state caching, mutations, and query invalidation)
- json-server (mock REST backend for local development)

### Backend

- Node.js
- Express.js (REST API, routing, middleware)
- Error handling with middleware
- MongoDB & Mongoose (schemas, models, validation)
- Schema relations with `ref` and `.populate()` (e.g. User ↔ Note references)
- dotenv (environment variables)
- CORS (cross-origin resource sharing)

### Authentication & Security

- JSON Web Tokens (JWT)
- Password hashing with bcrypt
- Token-based authorization for protected routes
- Middleware-based authentication handling
- Client-side token persistence with `localStorage` and attaching tokens to requests

### TypeScript

- TypeScript fundamentals (types, interfaces, generics, utility types)
- Type narrowing & exhaustive type checking (discriminated unions, `never`)
- Typing React props, state, and event handlers
- Express + TypeScript backends (`ts-node`, `tsconfig.json`)
- Runtime schema validation with Zod, layered on top of static types
- Full-stack TS project (Patientor: typed backend API + React frontend)

### Testing

- Automated backend tests
  - HTTP requests with Supertest
  - API endpoints
  - Authentication and authorization
  - Database state changes
- Frontend unit/integration testing
  - Vitest & React Testing Library
  - jsdom (simulated browser environment)
  - user-event (simulating user interactions)
  - Test coverage reporting with @vitest/coverage-v8
- End-to-end testing
  - Playwright
  - Testing full user flows against a running app (login, CRUD, notifications)

### CI/CD

- GitHub Actions workflows (jobs, steps, triggers on `push`/`pull_request`)
- Automated pipeline: install → lint (ESLint) → unit tests → build → Playwright e2e tests
- Path-filtered workflow triggers (only run a pipeline when relevant files change)
- Branch protection (required PR review and passing status checks before merging to `main`)
- Continuous deployment via a Render deploy hook triggered from a workflow
- Skipping deploys with a `#skip` commit message and gating jobs with `needs`/`if`
- Automatic version tagging on merge (github-tag-action)
- Discord notifications for successful deploys and broken builds
- Scheduled health checks of the deployed app (`cron`)
- Serving a built React frontend from Express, with an SPA fallback for client-side routes

### Tooling

- Git & GitHub (version control)
- npm (package management)
- ESLint (code linting)
- cross-env (cross-platform environment variable support)
- Postman & REST Client (manual API testing)
- Deployment with Render
