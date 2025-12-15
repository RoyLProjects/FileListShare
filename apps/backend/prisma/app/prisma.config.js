// Prisma 7.1.0 Configuration
// In Prisma 7, the datasource URL is configured in prisma.config.js
// and passed via environment variable for migrations

module.exports = {
  schema: "schema.prisma",
  datasources: {
    db: {
      url: { fromEnvVar: "DATABASE_URL" },
    },
  },
};
