# Full Stack Open - Exercises

This repository contains my solutions and progress for the **Full Stack Open** course by the University of Helsinki.

## Course progress

- **Part 0–2:** React fundamentals, component state, forms, and data fetching
- **Part 3:** Backend with Node.js, Express, MongoDB, and deployment
- **Part 4:** Backend testing, user authentication, and authorization
- **Part 5:** Frontend testing, login/token handling, and end-to-end testing
- **Part 6:** State management with Context API, Zustand, and React Query
- **Part 7:** React Router, custom hooks, and rebuild BlogList in three ways with Context API, TanStack Query, and Zustand
- **Part 8:** Skipped for now
- **Part 9:** In progress

## Certificates

Certificates live in [certificates/](certificates/), one file per part (or part range) as they're earned, named `partN.png` (e.g. `part9.png`) or `partN-M.png` for a range.

- **Part 0-7:** [certificates/part0-7.png](certificates/part0-7.png) ([verify](https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/4a3d90cf70d70c1773bb77951361a7b0))

## Technologies & Concepts

### Frontend

- React (components, state, props, forms, conditional rendering)
- Custom hooks (reusable stateful logic, e.g. `useField`, `useNotify`)
- Error boundaries (class components, `getDerivedStateFromError`)
- Axios (HTTP client)
- React Router (client-side routing, `useMatch`, `useNavigate`)
- MUI (Material UI) & Emotion (component library and styling)

### State Management

- Context API & `useState` (shared state without prop drilling)
- Zustand (lightweight global state store)
- TanStack React Query (server-state caching, mutations, and query invalidation)
- json-server (mock REST backend for local development)

### Backend

- Node.js
- Express.js (REST API, routing, middleware)
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

### Testing

- Supertest (HTTP integration testing)
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

### HTTP & API

- REST principles (GET, POST, PUT, DELETE)
- CRUD operations
- HTTP status codes
- Error handling with middleware

### Tooling & Other Concepts

- Web application fundamentals (HTTP request/response cycle, traditional web apps vs. single-page apps)
- cross-env (cross-platform environment variable support)
- ESLint (code linting)
- Git & GitHub (version control)
- npm (package management)
- Postman & REST Client (manual API testing)
- Deployment with Render

## Notes

This repository is updated continuously as I progress through the course.
