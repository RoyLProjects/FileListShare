## Multi-stage Dockerfile for the backend (pnpm + monorepo aware)

# --- Build stage -----------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /workspace

# Enable corepack & prepare pnpm (Node 20 includes corepack)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy root lockfiles and workspace manifest to leverage layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy backend package manifest and TS configs to allow installing deps only for backend
COPY apps/backend/package.json apps/backend/tsconfig.json apps/backend/tsconfig.build.json ./apps/backend/

# Install dependencies (will install workspace deps as needed)
# Use shamefully-hoist so binaries like `tsc` are available where scripts expect them
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Ensure backend package gets its own binaries available where scripts expect them
RUN pnpm --filter backend install --shamefully-hoist || true

# Copy the full repo (small projects may prefer copying only needed folders)
COPY . .

# Ensure OpenSSL is available during generation so Prisma can detect the correct
# binary target when generating the client on alpine build images.
RUN apk add --no-cache openssl || true

# Generate Prisma clients and other generated code for backend (if present)
RUN pnpm --filter backend run generate:all || true

# Build the backend (TypeScript compilation)
# Ensure `tsc` is available in the build image (some pnpm workspace layouts don't expose it at package/node_modules)
RUN npm install -g typescript
# Invoke the TypeScript compiler directly to avoid pnpm's package-scoped wrapper resolving a missing local
# `node_modules/typescript` path inside the backend package during image build.
RUN pnpm -w exec tsc -p apps/backend/tsconfig.build.json


# --- Runtime stage ---------------------------------------------------------
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

# Enable corepack & pnpm in runtime image
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install postgres client so pg_isready works in entrypoint.sh
# Also install OpenSSL so Prisma can detect libssl at runtime and avoid warnings.
RUN apk add --no-cache postgresql-client openssl

# Copy lockfiles so pnpm can install production dependencies deterministically
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy backend package manifest to identify the package to install
COPY apps/backend/package.json ./apps/backend/package.json

# Install only production dependencies for the backend package
RUN pnpm install --frozen-lockfile --prod --filter backend

# Copy built output and runtime assets from build stage
# Place the built `dist` inside the backend package path so package scripts
# executed by pnpm from `/app/apps/backend` can find `dist/index.js`.
COPY --from=build /workspace/apps/backend/dist ./apps/backend/dist
# Copy prisma schema and generated client into the backend package path so
# package scripts that reference `prisma/schema.prisma` find it at
# `/app/apps/backend/prisma` inside the container.
COPY --from=build /workspace/apps/backend/prisma ./apps/backend/prisma
# Copy runtime scripts (migrations, helpers) so package scripts that reference
# ./scripts/* are available in the runtime image (fixes MODULE_NOT_FOUND).
COPY --from=build /workspace/apps/backend/scripts ./apps/backend/scripts

# Copy workspace node_modules (so all deps are available)
COPY --from=build /workspace/node_modules ./node_modules

# Ensure dist is treated as an ESM package (if you’re using ESM)
RUN mkdir -p ./apps/backend/dist && printf '{"type":"module"}\n' > ./apps/backend/dist/package.json

# Copy entrypoint script (path is relative to the build context root)
COPY apps/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]

