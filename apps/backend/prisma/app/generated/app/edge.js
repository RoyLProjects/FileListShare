Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
} = require("./runtime/edge.js");

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
};

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.NotFoundError = NotFoundError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable",
});

exports.Prisma.UserScalarFieldEnum = {
  id: "id",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.StorageScalarFieldEnum = {
  id: "id",
  type: "type",
  displayName: "displayName",
  storagePath: "storagePath",
  refreshToken: "refreshToken",
  userId: "userId",
  teamId: "teamId",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.TeamScalarFieldEnum = {
  id: "id",
  title: "title",
  createdBy: "createdBy",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.TeamMemberScalarFieldEnum = {
  id: "id",
  teamId: "teamId",
  userId: "userId",
  createdAt: "createdAt",
  createdBy: "createdBy",
};

exports.Prisma.TeamMemberPermissionScalarFieldEnum = {
  teamMemberId: "teamMemberId",
  permission: "permission",
};

exports.Prisma.PublicLinkScalarFieldEnum = {
  id: "id",
  listId: "listId",
  token: "token",
  passwordHash: "passwordHash",
  createdAt: "createdAt",
  createdBy: "createdBy",
  updatedAt: "updatedAt",
};

exports.Prisma.ListScalarFieldEnum = {
  id: "id",
  title: "title",
  userId: "userId",
  teamId: "teamId",
  createdAt: "createdAt",
  createdBy: "createdBy",
  updatedAt: "updatedAt",
};

exports.Prisma.List_itemScalarFieldEnum = {
  id: "id",
  itemnumber: "itemnumber",
  listId: "listId",
  description: "description",
  uploadedFiles: "uploadedFiles",
  comment: "comment",
  status: "status",
  delivered: "delivered",
  deadline: "deadline",
  createdAt: "createdAt",
  createdBy: "createdBy",
  updatedAt: "updatedAt",
};

exports.Prisma.SortOrder = {
  asc: "asc",
  desc: "desc",
};

exports.Prisma.QueryMode = {
  default: "default",
  insensitive: "insensitive",
};

exports.Prisma.NullsOrder = {
  first: "first",
  last: "last",
};
exports.EStorageType = exports.$Enums.EStorageType = {
  dropbox: "dropbox",
};

exports.EPermissions = exports.$Enums.EPermissions = {
  LIST_CREATE: "LIST_CREATE",
  LIST_RENAME: "LIST_RENAME",
  LIST_DELETE: "LIST_DELETE",
  ITEM_CREATE: "ITEM_CREATE",
  ITEM_UPDATE: "ITEM_UPDATE",
  ITEM_DELETE: "ITEM_DELETE",
  TEAM_RENAME: "TEAM_RENAME",
  TEAM_DELETE: "TEAM_DELETE",
  TEAM_MEMBER_CREATE: "TEAM_MEMBER_CREATE",
  TEAM_MEMBER_DELETE: "TEAM_MEMBER_DELETE",
  TEAM_MEMBER_RIGHTS: "TEAM_MEMBER_RIGHTS",
  TEAM_STORAGE_ADD: "TEAM_STORAGE_ADD",
  TEAM_STORAGE_UPDATE: "TEAM_STORAGE_UPDATE",
  TEAM_STORAGE_DELETE: "TEAM_STORAGE_DELETE",
  TEAM_PUBLIC_LINK_CREATE: "TEAM_PUBLIC_LINK_CREATE",
  TEAM_PUBLIC_LINK_DELETE: "TEAM_PUBLIC_LINK_DELETE",
};

exports.EItemStatus = exports.$Enums.EItemStatus = {
  published: "published",
  draft: "draft",
};

exports.Prisma.ModelName = {
  User: "User",
  Storage: "Storage",
  Team: "Team",
  TeamMember: "TeamMember",
  TeamMemberPermission: "TeamMemberPermission",
  PublicLink: "PublicLink",
  List: "List",
  List_item: "List_item",
};
/**
 * Create the Client
 */
const config = {
  generator: {
    name: "client",
    provider: {
      fromEnvVar: null,
      value: "prisma-client-js",
    },
    output: {
      value:
        "C:\\Users\\gebruiker\\source\\repos\\FileListShare\\apps\\backend\\prisma\\app\\generated\\app",
      fromEnvVar: null,
    },
    config: {
      engineType: "library",
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: "windows",
        native: true,
      },
      {
        fromEnvVar: null,
        value: "linux-musl-openssl-3.0.x",
      },
    ],
    previewFeatures: [],
    sourceFilePath:
      "C:\\Users\\gebruiker\\source\\repos\\FileListShare\\apps\\backend\\prisma\\app\\schema.prisma",
    isCustomOutput: true,
  },
  relativeEnvPaths: {
    rootEnvPath: null,
    schemaEnvPath: "../../../../.env",
  },
  relativePath: "../..",
  clientVersion: "5.22.0",
  engineVersion: "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  datasourceNames: ["db"],
  activeProvider: "postgresql",
  postinstall: false,
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: "DATABASE_URL",
        value: null,
      },
    },
  },
  inlineSchema:
    '// prisma/schema.prisma (SQLite of Postgres werkt allebei)\n\ngenerator client {\n  provider      = "prisma-client-js"\n  output        = "./generated/app"\n  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nenum EStorageType {\n  dropbox\n}\n\nenum EItemStatus {\n  published\n  draft\n}\n\nenum EPermissions {\n  LIST_CREATE\n  LIST_RENAME\n  LIST_DELETE\n  ITEM_CREATE\n  ITEM_UPDATE\n  ITEM_DELETE\n  TEAM_RENAME\n  TEAM_DELETE\n  TEAM_MEMBER_CREATE\n  TEAM_MEMBER_DELETE\n  TEAM_MEMBER_RIGHTS\n  TEAM_STORAGE_ADD\n  TEAM_STORAGE_UPDATE\n  TEAM_STORAGE_DELETE\n  TEAM_PUBLIC_LINK_CREATE\n  TEAM_PUBLIC_LINK_DELETE\n}\n\nmodel User {\n  id        String   @id\n  storage   Storage?\n  lists     List[]\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Storage {\n  id           String       @id @default(uuid())\n  type         EStorageType\n  displayName  String\n  storagePath  String?\n  refreshToken String\n  userId       String?      @unique\n  user         User?        @relation(fields: [userId], references: [id], onDelete: Cascade)\n  teamId       String?      @unique\n  team         Team?        @relation(fields: [teamId], references: [id], onDelete: Cascade)\n  createdAt    DateTime     @default(now())\n  updatedAt    DateTime     @default(now()) @updatedAt\n}\n\nmodel Team {\n  id        String       @id @default(uuid())\n  title     String       @unique\n  createdBy String\n  storage   Storage?\n  lists     List[]\n  members   TeamMember[]\n  createdAt DateTime     @default(now())\n  updatedAt DateTime     @updatedAt\n}\n\nmodel TeamMember {\n  id          String                 @id @default(uuid())\n  teamId      String\n  userId      String\n  createdAt   DateTime               @default(now())\n  createdBy   String\n  team        Team                   @relation(fields: [teamId], references: [id], onDelete: Cascade)\n  permissions TeamMemberPermission[]\n\n  @@unique([teamId, userId])\n}\n\nmodel TeamMemberPermission {\n  teamMemberId String\n  permission   EPermissions\n\n  teamMember TeamMember @relation(fields: [teamMemberId], references: [id], onDelete: Cascade)\n\n  // één record per (member, permission)\n  @@id([teamMemberId, permission])\n  @@index([permission])\n}\n\nmodel PublicLink {\n  id           String   @id @default(uuid())\n  listId       String   @unique\n  list         List     @relation("ListPublicLink", fields: [listId], references: [id], onDelete: Cascade)\n  token        String   @unique\n  passwordHash String?\n  createdAt    DateTime @default(now())\n  createdBy    String\n  updatedAt    DateTime @updatedAt\n}\n\nmodel List {\n  id        String   @id @default(uuid())\n  title     String   @unique\n  userId    String?\n  teamId    String?\n  createdAt DateTime @default(now())\n  createdBy String\n  updatedAt DateTime @updatedAt\n\n  user User? @relation(fields: [userId], references: [id], onDelete: Cascade)\n  team Team? @relation(fields: [teamId], references: [id], onDelete: Cascade)\n\n  items      List_item[]\n  publicLink PublicLink? @relation("ListPublicLink")\n}\n\nmodel List_item {\n  id            String      @id @default(uuid())\n  itemnumber    Int\n  listId        String\n  description   String\n  uploadedFiles String[]    @default([])\n  comment       String?\n  status        EItemStatus @default(draft)\n  delivered     Boolean     @default(false)\n  deadline      DateTime    @default(now())\n  createdAt     DateTime    @default(now())\n  createdBy     String\n  updatedAt     DateTime    @updatedAt\n  list          List        @relation(fields: [listId], references: [id], onDelete: Cascade)\n\n  @@unique([listId, itemnumber])\n}\n',
  inlineSchemaHash:
    "fb0d936104188d1cfd6f27206a5fe8713381c3d5a6b91ac5e60417cf0999b7cf",
  copyEngine: true,
};
config.dirname = "/";

config.runtimeDataModel = JSON.parse(
  '{"models":{"User":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"storage","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Storage","relationName":"StorageToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"lists","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"List","relationName":"ListToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Storage":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid(4)","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"EStorageType","isGenerated":false,"isUpdatedAt":false},{"name":"displayName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"storagePath","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"refreshToken","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"StorageToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"teamId","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"team","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Team","relationName":"StorageToTeam","relationFromFields":["teamId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Team":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid(4)","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdBy","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"storage","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Storage","relationName":"StorageToTeam","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"lists","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"List","relationName":"ListToTeam","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"members","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"TeamMember","relationName":"TeamToTeamMember","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"TeamMember":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid(4)","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"teamId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"createdBy","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"team","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Team","relationName":"TeamToTeamMember","relationFromFields":["teamId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"permissions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"TeamMemberPermission","relationName":"TeamMemberToTeamMemberPermission","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["teamId","userId"]],"uniqueIndexes":[{"name":null,"fields":["teamId","userId"]}],"isGenerated":false},"TeamMemberPermission":{"dbName":null,"fields":[{"name":"teamMemberId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"permission","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"EPermissions","isGenerated":false,"isUpdatedAt":false},{"name":"teamMember","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"TeamMember","relationName":"TeamMemberToTeamMemberPermission","relationFromFields":["teamMemberId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":{"name":null,"fields":["teamMemberId","permission"]},"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"PublicLink":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid(4)","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"listId","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"list","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"List","relationName":"ListPublicLink","relationFromFields":["listId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"token","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"passwordHash","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"createdBy","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"List":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid(4)","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"teamId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"createdBy","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","relationName":"ListToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"team","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Team","relationName":"ListToTeam","relationFromFields":["teamId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"items","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"List_item","relationName":"ListToList_item","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"publicLink","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"PublicLink","relationName":"ListPublicLink","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"List_item":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"uuid(4)","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"itemnumber","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"listId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"uploadedFiles","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"comment","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"EItemStatus","default":"draft","isGenerated":false,"isUpdatedAt":false},{"name":"delivered","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"deadline","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"createdBy","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"list","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"List","relationName":"ListToList_item","relationFromFields":["listId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["listId","itemnumber"]],"uniqueIndexes":[{"name":null,"fields":["listId","itemnumber"]}],"isGenerated":false}},"enums":{"EStorageType":{"values":[{"name":"dropbox","dbName":null}],"dbName":null},"EItemStatus":{"values":[{"name":"published","dbName":null},{"name":"draft","dbName":null}],"dbName":null},"EPermissions":{"values":[{"name":"LIST_CREATE","dbName":null},{"name":"LIST_RENAME","dbName":null},{"name":"LIST_DELETE","dbName":null},{"name":"ITEM_CREATE","dbName":null},{"name":"ITEM_UPDATE","dbName":null},{"name":"ITEM_DELETE","dbName":null},{"name":"TEAM_RENAME","dbName":null},{"name":"TEAM_DELETE","dbName":null},{"name":"TEAM_MEMBER_CREATE","dbName":null},{"name":"TEAM_MEMBER_DELETE","dbName":null},{"name":"TEAM_MEMBER_RIGHTS","dbName":null},{"name":"TEAM_STORAGE_ADD","dbName":null},{"name":"TEAM_STORAGE_UPDATE","dbName":null},{"name":"TEAM_STORAGE_DELETE","dbName":null},{"name":"TEAM_PUBLIC_LINK_CREATE","dbName":null},{"name":"TEAM_PUBLIC_LINK_DELETE","dbName":null}],"dbName":null}},"types":{}}',
);
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.engineWasm = undefined;

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL:
      (typeof globalThis !== "undefined" && globalThis["DATABASE_URL"]) ||
      (typeof process !== "undefined" &&
        process.env &&
        process.env.DATABASE_URL) ||
      undefined,
  },
});

if (
  (typeof globalThis !== "undefined" && globalThis["DEBUG"]) ||
  (typeof process !== "undefined" && process.env && process.env.DEBUG) ||
  undefined
) {
  Debug.enable(
    (typeof globalThis !== "undefined" && globalThis["DEBUG"]) ||
      (typeof process !== "undefined" && process.env && process.env.DEBUG) ||
      undefined,
  );
}

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
