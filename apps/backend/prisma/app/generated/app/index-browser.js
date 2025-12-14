Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip,
} = require("./runtime/index-browser.js");

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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message;
        const runtime = getRuntime();
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message =
            "PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `" +
            runtime.prettyName +
            "`).";
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`;

        throw new Error(message);
      },
    });
  }
}

exports.PrismaClient = PrismaClient;

Object.assign(exports, Prisma);
