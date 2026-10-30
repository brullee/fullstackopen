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
- **Part 9:** TypeScript
- **Part 10:** React Native (skipped)
- **Part 11:** CI/CD
- **Part 12:** Containers
- **Part 13:** Relational databases (In-progress)
- **Part 14:** Next.js (Not started)

## Deployed applications

- **Notes app (Part 11, exercises 10-12):** [fullstackopen-part3-notes-backend-uzes.onrender.com](https://fullstackopen-part3-notes-backend-uzes.onrender.com/). Code from Part 3, deployed via [`part3-deploy.yaml`](.github/workflows/part3-deploy.yaml).
- **Pokedex (Part 11, exercises 2-9 & 13-20):** [fullstackopen-hhdt.onrender.com](https://fullstackopen-hhdt.onrender.com), deployed via [`part11-pipeline.yaml`](.github/workflows/part11-pipeline.yaml).
- **BlogList (Part 11, exercises 21 & 22):** [fullstackopen-1g80.onrender.com](https://fullstackopen-1g80.onrender.com). Pipeline lives in its own repo: [brullee/fso-bloglist-cicd](https://github.com/brullee/fso-bloglist-cicd).

## Containerized applications

- **Patientor (Part 12, exercises 22 & 23):** [`part9/patientor`](part9/patientor). Development: `docker compose -f docker-compose.dev.yml up`. Production: `docker compose up --build`. Both run on [localhost:8080](http://localhost:8080).

## Certificates

- **Part 0-7:** [certificates/part0-7.png](certificates/part0-7.png) ([verify](https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/4a3d90cf70d70c1773bb77951361a7b0))
- **Part 9:** [certificates/part9.png](certificates/part9.png) ([verify](https://courses.mooc.fi/certificates/validate/iydfimtzz9byvcd))
- **Part 11:** [certificates/part11.png](certificates/part11.png) ([verify](https://courses.mooc.fi/certificates/validate/isd3ryue2e3upku))
- **Part 12:** [certificates/part12.png](certificates/part12.png) ([verify](https://courses.mooc.fi/certificates/validate/7yxi3asw66wr43p))

## Technologies & Concepts Learned

### Fundamentals

- How the web works: the HTTP request/response cycle
- Traditional web apps vs. single-page apps (SPAs)
- REST APIs: GET, POST, PUT and DELETE
- CRUD operations (create, read, update, delete)
- HTTP status codes

### Frontend

- React: components, props, state, forms, and conditional rendering
- Custom hooks to reuse stateful logic (e.g. `useField`, `useNotify`)
- Error boundaries with class components and `getDerivedStateFromError`, so one crashing component doesn't break the whole page
- Client-side routing with React Router (`useMatch`, `useNavigate`)
- Axios as the HTTP client
- MUI (Material UI) and Emotion for components and styling

### State Management

- Context API and `useState` for sharing state without prop drilling
- Zustand for a lightweight global store
- TanStack React Query for server state: caching, mutations, and query invalidation
- json-server as a mock REST backend during development

### Backend

- Node.js and Express.js: REST APIs with routing and middleware
- Error handling with middleware
- MongoDB and Mongoose: schemas, models, and validation
- Relations between collections with `ref` and `.populate()` (e.g. which user wrote which note)
- Environment variables with dotenv
- CORS (cross-origin resource sharing), so the frontend can call the backend

### Authentication & Security

- JSON Web Tokens (JWT)
- Password hashing with bcrypt
- Token-based authorization for protected routes
- Authentication handled in middleware
- Keeping the token in `localStorage` and attaching it to requests

### TypeScript

- Types, interfaces, union types, generics, and utility types (`Omit`, `Pick`)
- Typing React props, state, and event handlers
- Typing an Express backend: request bodies, URL params, and responses (`Request<Params, ResBody, ReqBody>`)
- Running TypeScript directly with Node.js, configuring `tsconfig.json`, type checking with `tsc`, and linting with typescript-eslint
- Runtime validation with Zod, and generating types from the schemas with `z.infer` so they're defined only once
- Discriminated unions, type narrowing, and exhaustive type checking with `never` (`assertNever`)
- Why static types don't check data at runtime, and when a type assertion (`as`) is safe
- Showing Zod validation errors from the backend as readable messages in the frontend
- Forms that prevent bad input: date inputs, MUI selects, and multi-selects
- Full-stack project: Patientor, a medical records app with a typed Express backend and React frontend
- API and end-to-end tests with Playwright, running in GitHub Actions

### Testing

- **Automated backend tests:** Node's built-in test runner (`node --test`) with Supertest for HTTP requests, testing API endpoints, authentication and authorization, and database state changes
- **Frontend unit/integration testing:** Vitest and React Testing Library, with jsdom as a simulated browser, user-event for user interactions, and coverage reports with @vitest/coverage-v8
- **End-to-end testing:** Playwright, testing full user flows against the running app (login, CRUD, notifications)

### CI/CD

- GitHub Actions workflows: jobs, steps, and triggers on `push`/`pull_request`
- A pipeline that installs dependencies, lints with ESLint, runs unit tests, builds the app, and then runs Playwright e2e tests
- Path-filtered triggers, so a workflow only runs when relevant files change
- Branch protection: merging to `main` needs a reviewed pull request and passing status checks
- Continuous deployment with a Render deploy hook triggered from a workflow
- Skipping deploys with `#skip` in the commit message, and controlling jobs with `needs`/`if`
- Automatic version tagging on merge (github-tag-action)
- Discord notifications for successful deploys and broken builds
- Scheduled health checks of the deployed app with `cron`
- Serving the built React frontend from Express, with an SPA fallback for client-side routes

### Containers

- Docker basics: containers vs. virtual machines, images vs. containers, image names, tags and layers, Docker Hub
- Docker CLI: `run`, `exec`, `logs`, `cp`, `commit`, interactive `-it` sessions, and port publishing
- Dockerfile best practices: `npm ci --omit=dev`, `.dockerignore`, and running as a non-root user
- Docker Compose: services, `up`/`down`, `--build`, multiple compose files with `-f`, and `depends_on`
- MongoDB and Redis in containers, with named volumes and bind mounts for data and init scripts
- Development containers with hot reload (bind-mounted source, anonymous `node_modules` volume, Vite `allowedHosts`)
- Multi-stage builds (build with Node, serve with nginx), running tests as a build stage, and build-time env vars for Vite
- Nginx as a reverse proxy (container networking, `proxy_pass` path handling) and SPA fallback with `try_files`
- Debugging containers (BusyBox, `mongosh`, `redis-cli`) and running e2e tests against a Compose stack in GitHub Actions

---

**Note:** After I completed them, parts 6 and 7 were moved to the MOOC platform and now have separate certificates. My Part 0-7 certificate is from before that change.
