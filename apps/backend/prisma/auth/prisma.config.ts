// Prisma 7.1.0 Configuration
// In Prisma 7, the datasource URL is configured in prisma.config.ts
// and passed via environment variable for migrations

module.exports = {
  datasources: {
    db: {
      url: { fromEnvVar: "AUTH_DATABASE_URL" },
    },
  },
};
