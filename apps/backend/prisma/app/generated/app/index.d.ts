
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Storage
 * 
 */
export type Storage = $Result.DefaultSelection<Prisma.$StoragePayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model TeamMember
 * 
 */
export type TeamMember = $Result.DefaultSelection<Prisma.$TeamMemberPayload>
/**
 * Model TeamMemberPermission
 * 
 */
export type TeamMemberPermission = $Result.DefaultSelection<Prisma.$TeamMemberPermissionPayload>
/**
 * Model PublicLink
 * 
 */
export type PublicLink = $Result.DefaultSelection<Prisma.$PublicLinkPayload>
/**
 * Model List
 * 
 */
export type List = $Result.DefaultSelection<Prisma.$ListPayload>
/**
 * Model List_item
 * 
 */
export type List_item = $Result.DefaultSelection<Prisma.$List_itemPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EStorageType: {
  dropbox: 'dropbox'
};

export type EStorageType = (typeof EStorageType)[keyof typeof EStorageType]


export const EPermissions: {
  LIST_CREATE: 'LIST_CREATE',
  LIST_RENAME: 'LIST_RENAME',
  LIST_DELETE: 'LIST_DELETE',
  ITEM_CREATE: 'ITEM_CREATE',
  ITEM_UPDATE: 'ITEM_UPDATE',
  ITEM_DELETE: 'ITEM_DELETE',
  TEAM_RENAME: 'TEAM_RENAME',
  TEAM_DELETE: 'TEAM_DELETE',
  TEAM_MEMBER_CREATE: 'TEAM_MEMBER_CREATE',
  TEAM_MEMBER_DELETE: 'TEAM_MEMBER_DELETE',
  TEAM_MEMBER_RIGHTS: 'TEAM_MEMBER_RIGHTS',
  TEAM_STORAGE_ADD: 'TEAM_STORAGE_ADD',
  TEAM_STORAGE_UPDATE: 'TEAM_STORAGE_UPDATE',
  TEAM_STORAGE_DELETE: 'TEAM_STORAGE_DELETE',
  TEAM_PUBLIC_LINK_CREATE: 'TEAM_PUBLIC_LINK_CREATE',
  TEAM_PUBLIC_LINK_DELETE: 'TEAM_PUBLIC_LINK_DELETE'
};

export type EPermissions = (typeof EPermissions)[keyof typeof EPermissions]


export const EItemStatus: {
  published: 'published',
  draft: 'draft'
};

export type EItemStatus = (typeof EItemStatus)[keyof typeof EItemStatus]

}

export type EStorageType = $Enums.EStorageType

export const EStorageType: typeof $Enums.EStorageType

export type EPermissions = $Enums.EPermissions

export const EPermissions: typeof $Enums.EPermissions

export type EItemStatus = $Enums.EItemStatus

export const EItemStatus: typeof $Enums.EItemStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.storage`: Exposes CRUD operations for the **Storage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Storages
    * const storages = await prisma.storage.findMany()
    * ```
    */
  get storage(): Prisma.StorageDelegate<ExtArgs>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs>;

  /**
   * `prisma.teamMember`: Exposes CRUD operations for the **TeamMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMembers
    * const teamMembers = await prisma.teamMember.findMany()
    * ```
    */
  get teamMember(): Prisma.TeamMemberDelegate<ExtArgs>;

  /**
   * `prisma.teamMemberPermission`: Exposes CRUD operations for the **TeamMemberPermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMemberPermissions
    * const teamMemberPermissions = await prisma.teamMemberPermission.findMany()
    * ```
    */
  get teamMemberPermission(): Prisma.TeamMemberPermissionDelegate<ExtArgs>;

  /**
   * `prisma.publicLink`: Exposes CRUD operations for the **PublicLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PublicLinks
    * const publicLinks = await prisma.publicLink.findMany()
    * ```
    */
  get publicLink(): Prisma.PublicLinkDelegate<ExtArgs>;

  /**
   * `prisma.list`: Exposes CRUD operations for the **List** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lists
    * const lists = await prisma.list.findMany()
    * ```
    */
  get list(): Prisma.ListDelegate<ExtArgs>;

  /**
   * `prisma.list_item`: Exposes CRUD operations for the **List_item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more List_items
    * const list_items = await prisma.list_item.findMany()
    * ```
    */
  get list_item(): Prisma.List_itemDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Storage: 'Storage',
    Team: 'Team',
    TeamMember: 'TeamMember',
    TeamMemberPermission: 'TeamMemberPermission',
    PublicLink: 'PublicLink',
    List: 'List',
    List_item: 'List_item'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "storage" | "team" | "teamMember" | "teamMemberPermission" | "publicLink" | "list" | "list_item"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Storage: {
        payload: Prisma.$StoragePayload<ExtArgs>
        fields: Prisma.StorageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StorageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoragePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StorageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoragePayload>
          }
          findFirst: {
            args: Prisma.StorageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoragePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StorageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoragePayload>
          }
          findMany: {
            args: Prisma.StorageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoragePayload>[]
          }
          create: {
            args: Prisma.StorageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoragePayload>
          }
          createMany: {
            args: Prisma.StorageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StorageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoragePayload>[]
          }
          delete: {
            args: Prisma.StorageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoragePayload>
          }
          update: {
            args: Prisma.StorageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoragePayload>
          }
          deleteMany: {
            args: Prisma.StorageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StorageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StorageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoragePayload>
          }
          aggregate: {
            args: Prisma.StorageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStorage>
          }
          groupBy: {
            args: Prisma.StorageGroupByArgs<ExtArgs>
            result: $Utils.Optional<StorageGroupByOutputType>[]
          }
          count: {
            args: Prisma.StorageCountArgs<ExtArgs>
            result: $Utils.Optional<StorageCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      TeamMember: {
        payload: Prisma.$TeamMemberPayload<ExtArgs>
        fields: Prisma.TeamMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findFirst: {
            args: Prisma.TeamMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findMany: {
            args: Prisma.TeamMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          create: {
            args: Prisma.TeamMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          createMany: {
            args: Prisma.TeamMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          delete: {
            args: Prisma.TeamMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          update: {
            args: Prisma.TeamMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          deleteMany: {
            args: Prisma.TeamMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          aggregate: {
            args: Prisma.TeamMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMember>
          }
          groupBy: {
            args: Prisma.TeamMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMemberCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberCountAggregateOutputType> | number
          }
        }
      }
      TeamMemberPermission: {
        payload: Prisma.$TeamMemberPermissionPayload<ExtArgs>
        fields: Prisma.TeamMemberPermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMemberPermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMemberPermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPermissionPayload>
          }
          findFirst: {
            args: Prisma.TeamMemberPermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMemberPermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPermissionPayload>
          }
          findMany: {
            args: Prisma.TeamMemberPermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPermissionPayload>[]
          }
          create: {
            args: Prisma.TeamMemberPermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPermissionPayload>
          }
          createMany: {
            args: Prisma.TeamMemberPermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamMemberPermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPermissionPayload>[]
          }
          delete: {
            args: Prisma.TeamMemberPermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPermissionPayload>
          }
          update: {
            args: Prisma.TeamMemberPermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPermissionPayload>
          }
          deleteMany: {
            args: Prisma.TeamMemberPermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMemberPermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TeamMemberPermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPermissionPayload>
          }
          aggregate: {
            args: Prisma.TeamMemberPermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMemberPermission>
          }
          groupBy: {
            args: Prisma.TeamMemberPermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberPermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMemberPermissionCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberPermissionCountAggregateOutputType> | number
          }
        }
      }
      PublicLink: {
        payload: Prisma.$PublicLinkPayload<ExtArgs>
        fields: Prisma.PublicLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PublicLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PublicLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicLinkPayload>
          }
          findFirst: {
            args: Prisma.PublicLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PublicLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicLinkPayload>
          }
          findMany: {
            args: Prisma.PublicLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicLinkPayload>[]
          }
          create: {
            args: Prisma.PublicLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicLinkPayload>
          }
          createMany: {
            args: Prisma.PublicLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PublicLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicLinkPayload>[]
          }
          delete: {
            args: Prisma.PublicLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicLinkPayload>
          }
          update: {
            args: Prisma.PublicLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicLinkPayload>
          }
          deleteMany: {
            args: Prisma.PublicLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PublicLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PublicLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicLinkPayload>
          }
          aggregate: {
            args: Prisma.PublicLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublicLink>
          }
          groupBy: {
            args: Prisma.PublicLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.PublicLinkCountArgs<ExtArgs>
            result: $Utils.Optional<PublicLinkCountAggregateOutputType> | number
          }
        }
      }
      List: {
        payload: Prisma.$ListPayload<ExtArgs>
        fields: Prisma.ListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          findFirst: {
            args: Prisma.ListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          findMany: {
            args: Prisma.ListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          create: {
            args: Prisma.ListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          createMany: {
            args: Prisma.ListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          delete: {
            args: Prisma.ListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          update: {
            args: Prisma.ListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          deleteMany: {
            args: Prisma.ListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          aggregate: {
            args: Prisma.ListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateList>
          }
          groupBy: {
            args: Prisma.ListGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListCountArgs<ExtArgs>
            result: $Utils.Optional<ListCountAggregateOutputType> | number
          }
        }
      }
      List_item: {
        payload: Prisma.$List_itemPayload<ExtArgs>
        fields: Prisma.List_itemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.List_itemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$List_itemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.List_itemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$List_itemPayload>
          }
          findFirst: {
            args: Prisma.List_itemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$List_itemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.List_itemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$List_itemPayload>
          }
          findMany: {
            args: Prisma.List_itemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$List_itemPayload>[]
          }
          create: {
            args: Prisma.List_itemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$List_itemPayload>
          }
          createMany: {
            args: Prisma.List_itemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.List_itemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$List_itemPayload>[]
          }
          delete: {
            args: Prisma.List_itemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$List_itemPayload>
          }
          update: {
            args: Prisma.List_itemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$List_itemPayload>
          }
          deleteMany: {
            args: Prisma.List_itemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.List_itemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.List_itemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$List_itemPayload>
          }
          aggregate: {
            args: Prisma.List_itemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateList_item>
          }
          groupBy: {
            args: Prisma.List_itemGroupByArgs<ExtArgs>
            result: $Utils.Optional<List_itemGroupByOutputType>[]
          }
          count: {
            args: Prisma.List_itemCountArgs<ExtArgs>
            result: $Utils.Optional<List_itemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    lists: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lists?: boolean | UserCountOutputTypeCountListsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    lists: number
    members: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lists?: boolean | TeamCountOutputTypeCountListsArgs
    members?: boolean | TeamCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
  }


  /**
   * Count Type TeamMemberCountOutputType
   */

  export type TeamMemberCountOutputType = {
    permissions: number
  }

  export type TeamMemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | TeamMemberCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * TeamMemberCountOutputType without action
   */
  export type TeamMemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberCountOutputType
     */
    select?: TeamMemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamMemberCountOutputType without action
   */
  export type TeamMemberCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberPermissionWhereInput
  }


  /**
   * Count Type ListCountOutputType
   */

  export type ListCountOutputType = {
    items: number
  }

  export type ListCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | ListCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * ListCountOutputType without action
   */
  export type ListCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListCountOutputType
     */
    select?: ListCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListCountOutputType without action
   */
  export type ListCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: List_itemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    storage?: boolean | User$storageArgs<ExtArgs>
    lists?: boolean | User$listsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    storage?: boolean | User$storageArgs<ExtArgs>
    lists?: boolean | User$listsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      storage: Prisma.$StoragePayload<ExtArgs> | null
      lists: Prisma.$ListPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    storage<T extends User$storageArgs<ExtArgs> = {}>(args?: Subset<T, User$storageArgs<ExtArgs>>): Prisma__StorageClient<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    lists<T extends User$listsArgs<ExtArgs> = {}>(args?: Subset<T, User$listsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.storage
   */
  export type User$storageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    where?: StorageWhereInput
  }

  /**
   * User.lists
   */
  export type User$listsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    where?: ListWhereInput
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    cursor?: ListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Storage
   */

  export type AggregateStorage = {
    _count: StorageCountAggregateOutputType | null
    _min: StorageMinAggregateOutputType | null
    _max: StorageMaxAggregateOutputType | null
  }

  export type StorageMinAggregateOutputType = {
    id: string | null
    type: $Enums.EStorageType | null
    displayName: string | null
    storagePath: string | null
    refreshToken: string | null
    userId: string | null
    teamId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StorageMaxAggregateOutputType = {
    id: string | null
    type: $Enums.EStorageType | null
    displayName: string | null
    storagePath: string | null
    refreshToken: string | null
    userId: string | null
    teamId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StorageCountAggregateOutputType = {
    id: number
    type: number
    displayName: number
    storagePath: number
    refreshToken: number
    userId: number
    teamId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StorageMinAggregateInputType = {
    id?: true
    type?: true
    displayName?: true
    storagePath?: true
    refreshToken?: true
    userId?: true
    teamId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StorageMaxAggregateInputType = {
    id?: true
    type?: true
    displayName?: true
    storagePath?: true
    refreshToken?: true
    userId?: true
    teamId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StorageCountAggregateInputType = {
    id?: true
    type?: true
    displayName?: true
    storagePath?: true
    refreshToken?: true
    userId?: true
    teamId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StorageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Storage to aggregate.
     */
    where?: StorageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Storages to fetch.
     */
    orderBy?: StorageOrderByWithRelationInput | StorageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StorageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Storages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Storages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Storages
    **/
    _count?: true | StorageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StorageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StorageMaxAggregateInputType
  }

  export type GetStorageAggregateType<T extends StorageAggregateArgs> = {
        [P in keyof T & keyof AggregateStorage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStorage[P]>
      : GetScalarType<T[P], AggregateStorage[P]>
  }




  export type StorageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorageWhereInput
    orderBy?: StorageOrderByWithAggregationInput | StorageOrderByWithAggregationInput[]
    by: StorageScalarFieldEnum[] | StorageScalarFieldEnum
    having?: StorageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StorageCountAggregateInputType | true
    _min?: StorageMinAggregateInputType
    _max?: StorageMaxAggregateInputType
  }

  export type StorageGroupByOutputType = {
    id: string
    type: $Enums.EStorageType
    displayName: string
    storagePath: string | null
    refreshToken: string
    userId: string | null
    teamId: string | null
    createdAt: Date
    updatedAt: Date
    _count: StorageCountAggregateOutputType | null
    _min: StorageMinAggregateOutputType | null
    _max: StorageMaxAggregateOutputType | null
  }

  type GetStorageGroupByPayload<T extends StorageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StorageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StorageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StorageGroupByOutputType[P]>
            : GetScalarType<T[P], StorageGroupByOutputType[P]>
        }
      >
    >


  export type StorageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    displayName?: boolean
    storagePath?: boolean
    refreshToken?: boolean
    userId?: boolean
    teamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Storage$userArgs<ExtArgs>
    team?: boolean | Storage$teamArgs<ExtArgs>
  }, ExtArgs["result"]["storage"]>

  export type StorageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    displayName?: boolean
    storagePath?: boolean
    refreshToken?: boolean
    userId?: boolean
    teamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Storage$userArgs<ExtArgs>
    team?: boolean | Storage$teamArgs<ExtArgs>
  }, ExtArgs["result"]["storage"]>

  export type StorageSelectScalar = {
    id?: boolean
    type?: boolean
    displayName?: boolean
    storagePath?: boolean
    refreshToken?: boolean
    userId?: boolean
    teamId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StorageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Storage$userArgs<ExtArgs>
    team?: boolean | Storage$teamArgs<ExtArgs>
  }
  export type StorageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Storage$userArgs<ExtArgs>
    team?: boolean | Storage$teamArgs<ExtArgs>
  }

  export type $StoragePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Storage"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      team: Prisma.$TeamPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.EStorageType
      displayName: string
      storagePath: string | null
      refreshToken: string
      userId: string | null
      teamId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["storage"]>
    composites: {}
  }

  type StorageGetPayload<S extends boolean | null | undefined | StorageDefaultArgs> = $Result.GetResult<Prisma.$StoragePayload, S>

  type StorageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StorageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StorageCountAggregateInputType | true
    }

  export interface StorageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Storage'], meta: { name: 'Storage' } }
    /**
     * Find zero or one Storage that matches the filter.
     * @param {StorageFindUniqueArgs} args - Arguments to find a Storage
     * @example
     * // Get one Storage
     * const storage = await prisma.storage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StorageFindUniqueArgs>(args: SelectSubset<T, StorageFindUniqueArgs<ExtArgs>>): Prisma__StorageClient<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Storage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StorageFindUniqueOrThrowArgs} args - Arguments to find a Storage
     * @example
     * // Get one Storage
     * const storage = await prisma.storage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StorageFindUniqueOrThrowArgs>(args: SelectSubset<T, StorageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StorageClient<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Storage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageFindFirstArgs} args - Arguments to find a Storage
     * @example
     * // Get one Storage
     * const storage = await prisma.storage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StorageFindFirstArgs>(args?: SelectSubset<T, StorageFindFirstArgs<ExtArgs>>): Prisma__StorageClient<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Storage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageFindFirstOrThrowArgs} args - Arguments to find a Storage
     * @example
     * // Get one Storage
     * const storage = await prisma.storage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StorageFindFirstOrThrowArgs>(args?: SelectSubset<T, StorageFindFirstOrThrowArgs<ExtArgs>>): Prisma__StorageClient<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Storages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Storages
     * const storages = await prisma.storage.findMany()
     * 
     * // Get first 10 Storages
     * const storages = await prisma.storage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storageWithIdOnly = await prisma.storage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StorageFindManyArgs>(args?: SelectSubset<T, StorageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Storage.
     * @param {StorageCreateArgs} args - Arguments to create a Storage.
     * @example
     * // Create one Storage
     * const Storage = await prisma.storage.create({
     *   data: {
     *     // ... data to create a Storage
     *   }
     * })
     * 
     */
    create<T extends StorageCreateArgs>(args: SelectSubset<T, StorageCreateArgs<ExtArgs>>): Prisma__StorageClient<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Storages.
     * @param {StorageCreateManyArgs} args - Arguments to create many Storages.
     * @example
     * // Create many Storages
     * const storage = await prisma.storage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StorageCreateManyArgs>(args?: SelectSubset<T, StorageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Storages and returns the data saved in the database.
     * @param {StorageCreateManyAndReturnArgs} args - Arguments to create many Storages.
     * @example
     * // Create many Storages
     * const storage = await prisma.storage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Storages and only return the `id`
     * const storageWithIdOnly = await prisma.storage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StorageCreateManyAndReturnArgs>(args?: SelectSubset<T, StorageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Storage.
     * @param {StorageDeleteArgs} args - Arguments to delete one Storage.
     * @example
     * // Delete one Storage
     * const Storage = await prisma.storage.delete({
     *   where: {
     *     // ... filter to delete one Storage
     *   }
     * })
     * 
     */
    delete<T extends StorageDeleteArgs>(args: SelectSubset<T, StorageDeleteArgs<ExtArgs>>): Prisma__StorageClient<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Storage.
     * @param {StorageUpdateArgs} args - Arguments to update one Storage.
     * @example
     * // Update one Storage
     * const storage = await prisma.storage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StorageUpdateArgs>(args: SelectSubset<T, StorageUpdateArgs<ExtArgs>>): Prisma__StorageClient<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Storages.
     * @param {StorageDeleteManyArgs} args - Arguments to filter Storages to delete.
     * @example
     * // Delete a few Storages
     * const { count } = await prisma.storage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StorageDeleteManyArgs>(args?: SelectSubset<T, StorageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Storages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Storages
     * const storage = await prisma.storage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StorageUpdateManyArgs>(args: SelectSubset<T, StorageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Storage.
     * @param {StorageUpsertArgs} args - Arguments to update or create a Storage.
     * @example
     * // Update or create a Storage
     * const storage = await prisma.storage.upsert({
     *   create: {
     *     // ... data to create a Storage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Storage we want to update
     *   }
     * })
     */
    upsert<T extends StorageUpsertArgs>(args: SelectSubset<T, StorageUpsertArgs<ExtArgs>>): Prisma__StorageClient<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Storages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageCountArgs} args - Arguments to filter Storages to count.
     * @example
     * // Count the number of Storages
     * const count = await prisma.storage.count({
     *   where: {
     *     // ... the filter for the Storages we want to count
     *   }
     * })
    **/
    count<T extends StorageCountArgs>(
      args?: Subset<T, StorageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StorageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Storage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StorageAggregateArgs>(args: Subset<T, StorageAggregateArgs>): Prisma.PrismaPromise<GetStorageAggregateType<T>>

    /**
     * Group by Storage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StorageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StorageGroupByArgs['orderBy'] }
        : { orderBy?: StorageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StorageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStorageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Storage model
   */
  readonly fields: StorageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Storage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StorageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Storage$userArgs<ExtArgs> = {}>(args?: Subset<T, Storage$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    team<T extends Storage$teamArgs<ExtArgs> = {}>(args?: Subset<T, Storage$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Storage model
   */ 
  interface StorageFieldRefs {
    readonly id: FieldRef<"Storage", 'String'>
    readonly type: FieldRef<"Storage", 'EStorageType'>
    readonly displayName: FieldRef<"Storage", 'String'>
    readonly storagePath: FieldRef<"Storage", 'String'>
    readonly refreshToken: FieldRef<"Storage", 'String'>
    readonly userId: FieldRef<"Storage", 'String'>
    readonly teamId: FieldRef<"Storage", 'String'>
    readonly createdAt: FieldRef<"Storage", 'DateTime'>
    readonly updatedAt: FieldRef<"Storage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Storage findUnique
   */
  export type StorageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    /**
     * Filter, which Storage to fetch.
     */
    where: StorageWhereUniqueInput
  }

  /**
   * Storage findUniqueOrThrow
   */
  export type StorageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    /**
     * Filter, which Storage to fetch.
     */
    where: StorageWhereUniqueInput
  }

  /**
   * Storage findFirst
   */
  export type StorageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    /**
     * Filter, which Storage to fetch.
     */
    where?: StorageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Storages to fetch.
     */
    orderBy?: StorageOrderByWithRelationInput | StorageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Storages.
     */
    cursor?: StorageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Storages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Storages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Storages.
     */
    distinct?: StorageScalarFieldEnum | StorageScalarFieldEnum[]
  }

  /**
   * Storage findFirstOrThrow
   */
  export type StorageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    /**
     * Filter, which Storage to fetch.
     */
    where?: StorageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Storages to fetch.
     */
    orderBy?: StorageOrderByWithRelationInput | StorageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Storages.
     */
    cursor?: StorageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Storages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Storages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Storages.
     */
    distinct?: StorageScalarFieldEnum | StorageScalarFieldEnum[]
  }

  /**
   * Storage findMany
   */
  export type StorageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    /**
     * Filter, which Storages to fetch.
     */
    where?: StorageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Storages to fetch.
     */
    orderBy?: StorageOrderByWithRelationInput | StorageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Storages.
     */
    cursor?: StorageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Storages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Storages.
     */
    skip?: number
    distinct?: StorageScalarFieldEnum | StorageScalarFieldEnum[]
  }

  /**
   * Storage create
   */
  export type StorageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    /**
     * The data needed to create a Storage.
     */
    data: XOR<StorageCreateInput, StorageUncheckedCreateInput>
  }

  /**
   * Storage createMany
   */
  export type StorageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Storages.
     */
    data: StorageCreateManyInput | StorageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Storage createManyAndReturn
   */
  export type StorageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Storages.
     */
    data: StorageCreateManyInput | StorageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Storage update
   */
  export type StorageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    /**
     * The data needed to update a Storage.
     */
    data: XOR<StorageUpdateInput, StorageUncheckedUpdateInput>
    /**
     * Choose, which Storage to update.
     */
    where: StorageWhereUniqueInput
  }

  /**
   * Storage updateMany
   */
  export type StorageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Storages.
     */
    data: XOR<StorageUpdateManyMutationInput, StorageUncheckedUpdateManyInput>
    /**
     * Filter which Storages to update
     */
    where?: StorageWhereInput
  }

  /**
   * Storage upsert
   */
  export type StorageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    /**
     * The filter to search for the Storage to update in case it exists.
     */
    where: StorageWhereUniqueInput
    /**
     * In case the Storage found by the `where` argument doesn't exist, create a new Storage with this data.
     */
    create: XOR<StorageCreateInput, StorageUncheckedCreateInput>
    /**
     * In case the Storage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StorageUpdateInput, StorageUncheckedUpdateInput>
  }

  /**
   * Storage delete
   */
  export type StorageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    /**
     * Filter which Storage to delete.
     */
    where: StorageWhereUniqueInput
  }

  /**
   * Storage deleteMany
   */
  export type StorageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Storages to delete
     */
    where?: StorageWhereInput
  }

  /**
   * Storage.user
   */
  export type Storage$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Storage.team
   */
  export type Storage$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * Storage without action
   */
  export type StorageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    title: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    title: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    title: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    title?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    title?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    title?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    title: string
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    storage?: boolean | Team$storageArgs<ExtArgs>
    lists?: boolean | Team$listsArgs<ExtArgs>
    members?: boolean | Team$membersArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    title?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    storage?: boolean | Team$storageArgs<ExtArgs>
    lists?: boolean | Team$listsArgs<ExtArgs>
    members?: boolean | Team$membersArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      storage: Prisma.$StoragePayload<ExtArgs> | null
      lists: Prisma.$ListPayload<ExtArgs>[]
      members: Prisma.$TeamMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    storage<T extends Team$storageArgs<ExtArgs> = {}>(args?: Subset<T, Team$storageArgs<ExtArgs>>): Prisma__StorageClient<$Result.GetResult<Prisma.$StoragePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    lists<T extends Team$listsArgs<ExtArgs> = {}>(args?: Subset<T, Team$listsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany"> | Null>
    members<T extends Team$membersArgs<ExtArgs> = {}>(args?: Subset<T, Team$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */ 
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly title: FieldRef<"Team", 'String'>
    readonly createdBy: FieldRef<"Team", 'String'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
    readonly updatedAt: FieldRef<"Team", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
  }

  /**
   * Team.storage
   */
  export type Team$storageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Storage
     */
    select?: StorageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorageInclude<ExtArgs> | null
    where?: StorageWhereInput
  }

  /**
   * Team.lists
   */
  export type Team$listsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    where?: ListWhereInput
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    cursor?: ListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * Team.members
   */
  export type Team$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    cursor?: TeamMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model TeamMember
   */

  export type AggregateTeamMember = {
    _count: TeamMemberCountAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  export type TeamMemberMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type TeamMemberMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    userId: string | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type TeamMemberCountAggregateOutputType = {
    id: number
    teamId: number
    userId: number
    createdAt: number
    createdBy: number
    _all: number
  }


  export type TeamMemberMinAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    createdAt?: true
    createdBy?: true
  }

  export type TeamMemberMaxAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    createdAt?: true
    createdBy?: true
  }

  export type TeamMemberCountAggregateInputType = {
    id?: true
    teamId?: true
    userId?: true
    createdAt?: true
    createdBy?: true
    _all?: true
  }

  export type TeamMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMember to aggregate.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMembers
    **/
    _count?: true | TeamMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMemberMaxAggregateInputType
  }

  export type GetTeamMemberAggregateType<T extends TeamMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMember[P]>
      : GetScalarType<T[P], AggregateTeamMember[P]>
  }




  export type TeamMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithAggregationInput | TeamMemberOrderByWithAggregationInput[]
    by: TeamMemberScalarFieldEnum[] | TeamMemberScalarFieldEnum
    having?: TeamMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMemberCountAggregateInputType | true
    _min?: TeamMemberMinAggregateInputType
    _max?: TeamMemberMaxAggregateInputType
  }

  export type TeamMemberGroupByOutputType = {
    id: string
    teamId: string
    userId: string
    createdAt: Date
    createdBy: string
    _count: TeamMemberCountAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  type GetTeamMemberGroupByPayload<T extends TeamMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
        }
      >
    >


  export type TeamMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    userId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    permissions?: boolean | TeamMember$permissionsArgs<ExtArgs>
    _count?: boolean | TeamMemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMember"]>

  export type TeamMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    userId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMember"]>

  export type TeamMemberSelectScalar = {
    id?: boolean
    teamId?: boolean
    userId?: boolean
    createdAt?: boolean
    createdBy?: boolean
  }

  export type TeamMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    permissions?: boolean | TeamMember$permissionsArgs<ExtArgs>
    _count?: boolean | TeamMemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }

  export type $TeamMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMember"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      permissions: Prisma.$TeamMemberPermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamId: string
      userId: string
      createdAt: Date
      createdBy: string
    }, ExtArgs["result"]["teamMember"]>
    composites: {}
  }

  type TeamMemberGetPayload<S extends boolean | null | undefined | TeamMemberDefaultArgs> = $Result.GetResult<Prisma.$TeamMemberPayload, S>

  type TeamMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TeamMemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TeamMemberCountAggregateInputType | true
    }

  export interface TeamMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMember'], meta: { name: 'TeamMember' } }
    /**
     * Find zero or one TeamMember that matches the filter.
     * @param {TeamMemberFindUniqueArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMemberFindUniqueArgs>(args: SelectSubset<T, TeamMemberFindUniqueArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TeamMember that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TeamMemberFindUniqueOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TeamMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMemberFindFirstArgs>(args?: SelectSubset<T, TeamMemberFindFirstArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TeamMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TeamMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMembers
     * const teamMembers = await prisma.teamMember.findMany()
     * 
     * // Get first 10 TeamMembers
     * const teamMembers = await prisma.teamMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMemberFindManyArgs>(args?: SelectSubset<T, TeamMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TeamMember.
     * @param {TeamMemberCreateArgs} args - Arguments to create a TeamMember.
     * @example
     * // Create one TeamMember
     * const TeamMember = await prisma.teamMember.create({
     *   data: {
     *     // ... data to create a TeamMember
     *   }
     * })
     * 
     */
    create<T extends TeamMemberCreateArgs>(args: SelectSubset<T, TeamMemberCreateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TeamMembers.
     * @param {TeamMemberCreateManyArgs} args - Arguments to create many TeamMembers.
     * @example
     * // Create many TeamMembers
     * const teamMember = await prisma.teamMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMemberCreateManyArgs>(args?: SelectSubset<T, TeamMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TeamMembers and returns the data saved in the database.
     * @param {TeamMemberCreateManyAndReturnArgs} args - Arguments to create many TeamMembers.
     * @example
     * // Create many TeamMembers
     * const teamMember = await prisma.teamMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TeamMembers and only return the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TeamMember.
     * @param {TeamMemberDeleteArgs} args - Arguments to delete one TeamMember.
     * @example
     * // Delete one TeamMember
     * const TeamMember = await prisma.teamMember.delete({
     *   where: {
     *     // ... filter to delete one TeamMember
     *   }
     * })
     * 
     */
    delete<T extends TeamMemberDeleteArgs>(args: SelectSubset<T, TeamMemberDeleteArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TeamMember.
     * @param {TeamMemberUpdateArgs} args - Arguments to update one TeamMember.
     * @example
     * // Update one TeamMember
     * const teamMember = await prisma.teamMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMemberUpdateArgs>(args: SelectSubset<T, TeamMemberUpdateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TeamMembers.
     * @param {TeamMemberDeleteManyArgs} args - Arguments to filter TeamMembers to delete.
     * @example
     * // Delete a few TeamMembers
     * const { count } = await prisma.teamMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMemberDeleteManyArgs>(args?: SelectSubset<T, TeamMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMembers
     * const teamMember = await prisma.teamMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMemberUpdateManyArgs>(args: SelectSubset<T, TeamMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamMember.
     * @param {TeamMemberUpsertArgs} args - Arguments to update or create a TeamMember.
     * @example
     * // Update or create a TeamMember
     * const teamMember = await prisma.teamMember.upsert({
     *   create: {
     *     // ... data to create a TeamMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMember we want to update
     *   }
     * })
     */
    upsert<T extends TeamMemberUpsertArgs>(args: SelectSubset<T, TeamMemberUpsertArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberCountArgs} args - Arguments to filter TeamMembers to count.
     * @example
     * // Count the number of TeamMembers
     * const count = await prisma.teamMember.count({
     *   where: {
     *     // ... the filter for the TeamMembers we want to count
     *   }
     * })
    **/
    count<T extends TeamMemberCountArgs>(
      args?: Subset<T, TeamMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMemberAggregateArgs>(args: Subset<T, TeamMemberAggregateArgs>): Prisma.PrismaPromise<GetTeamMemberAggregateType<T>>

    /**
     * Group by TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMemberGroupByArgs['orderBy'] }
        : { orderBy?: TeamMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMember model
   */
  readonly fields: TeamMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    permissions<T extends TeamMember$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, TeamMember$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMember model
   */ 
  interface TeamMemberFieldRefs {
    readonly id: FieldRef<"TeamMember", 'String'>
    readonly teamId: FieldRef<"TeamMember", 'String'>
    readonly userId: FieldRef<"TeamMember", 'String'>
    readonly createdAt: FieldRef<"TeamMember", 'DateTime'>
    readonly createdBy: FieldRef<"TeamMember", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TeamMember findUnique
   */
  export type TeamMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findUniqueOrThrow
   */
  export type TeamMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findFirst
   */
  export type TeamMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findFirstOrThrow
   */
  export type TeamMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findMany
   */
  export type TeamMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembers to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember create
   */
  export type TeamMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamMember.
     */
    data: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
  }

  /**
   * TeamMember createMany
   */
  export type TeamMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMembers.
     */
    data: TeamMemberCreateManyInput | TeamMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMember createManyAndReturn
   */
  export type TeamMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TeamMembers.
     */
    data: TeamMemberCreateManyInput | TeamMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamMember update
   */
  export type TeamMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamMember.
     */
    data: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
    /**
     * Choose, which TeamMember to update.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember updateMany
   */
  export type TeamMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMembers.
     */
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyInput>
    /**
     * Filter which TeamMembers to update
     */
    where?: TeamMemberWhereInput
  }

  /**
   * TeamMember upsert
   */
  export type TeamMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamMember to update in case it exists.
     */
    where: TeamMemberWhereUniqueInput
    /**
     * In case the TeamMember found by the `where` argument doesn't exist, create a new TeamMember with this data.
     */
    create: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
    /**
     * In case the TeamMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
  }

  /**
   * TeamMember delete
   */
  export type TeamMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter which TeamMember to delete.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember deleteMany
   */
  export type TeamMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMembers to delete
     */
    where?: TeamMemberWhereInput
  }

  /**
   * TeamMember.permissions
   */
  export type TeamMember$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
    where?: TeamMemberPermissionWhereInput
    orderBy?: TeamMemberPermissionOrderByWithRelationInput | TeamMemberPermissionOrderByWithRelationInput[]
    cursor?: TeamMemberPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMemberPermissionScalarFieldEnum | TeamMemberPermissionScalarFieldEnum[]
  }

  /**
   * TeamMember without action
   */
  export type TeamMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
  }


  /**
   * Model TeamMemberPermission
   */

  export type AggregateTeamMemberPermission = {
    _count: TeamMemberPermissionCountAggregateOutputType | null
    _min: TeamMemberPermissionMinAggregateOutputType | null
    _max: TeamMemberPermissionMaxAggregateOutputType | null
  }

  export type TeamMemberPermissionMinAggregateOutputType = {
    teamMemberId: string | null
    permission: $Enums.EPermissions | null
  }

  export type TeamMemberPermissionMaxAggregateOutputType = {
    teamMemberId: string | null
    permission: $Enums.EPermissions | null
  }

  export type TeamMemberPermissionCountAggregateOutputType = {
    teamMemberId: number
    permission: number
    _all: number
  }


  export type TeamMemberPermissionMinAggregateInputType = {
    teamMemberId?: true
    permission?: true
  }

  export type TeamMemberPermissionMaxAggregateInputType = {
    teamMemberId?: true
    permission?: true
  }

  export type TeamMemberPermissionCountAggregateInputType = {
    teamMemberId?: true
    permission?: true
    _all?: true
  }

  export type TeamMemberPermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMemberPermission to aggregate.
     */
    where?: TeamMemberPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberPermissions to fetch.
     */
    orderBy?: TeamMemberPermissionOrderByWithRelationInput | TeamMemberPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMemberPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMemberPermissions
    **/
    _count?: true | TeamMemberPermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMemberPermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMemberPermissionMaxAggregateInputType
  }

  export type GetTeamMemberPermissionAggregateType<T extends TeamMemberPermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMemberPermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMemberPermission[P]>
      : GetScalarType<T[P], AggregateTeamMemberPermission[P]>
  }




  export type TeamMemberPermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberPermissionWhereInput
    orderBy?: TeamMemberPermissionOrderByWithAggregationInput | TeamMemberPermissionOrderByWithAggregationInput[]
    by: TeamMemberPermissionScalarFieldEnum[] | TeamMemberPermissionScalarFieldEnum
    having?: TeamMemberPermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMemberPermissionCountAggregateInputType | true
    _min?: TeamMemberPermissionMinAggregateInputType
    _max?: TeamMemberPermissionMaxAggregateInputType
  }

  export type TeamMemberPermissionGroupByOutputType = {
    teamMemberId: string
    permission: $Enums.EPermissions
    _count: TeamMemberPermissionCountAggregateOutputType | null
    _min: TeamMemberPermissionMinAggregateOutputType | null
    _max: TeamMemberPermissionMaxAggregateOutputType | null
  }

  type GetTeamMemberPermissionGroupByPayload<T extends TeamMemberPermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMemberPermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMemberPermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMemberPermissionGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMemberPermissionGroupByOutputType[P]>
        }
      >
    >


  export type TeamMemberPermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    teamMemberId?: boolean
    permission?: boolean
    teamMember?: boolean | TeamMemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMemberPermission"]>

  export type TeamMemberPermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    teamMemberId?: boolean
    permission?: boolean
    teamMember?: boolean | TeamMemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMemberPermission"]>

  export type TeamMemberPermissionSelectScalar = {
    teamMemberId?: boolean
    permission?: boolean
  }

  export type TeamMemberPermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamMember?: boolean | TeamMemberDefaultArgs<ExtArgs>
  }
  export type TeamMemberPermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamMember?: boolean | TeamMemberDefaultArgs<ExtArgs>
  }

  export type $TeamMemberPermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMemberPermission"
    objects: {
      teamMember: Prisma.$TeamMemberPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      teamMemberId: string
      permission: $Enums.EPermissions
    }, ExtArgs["result"]["teamMemberPermission"]>
    composites: {}
  }

  type TeamMemberPermissionGetPayload<S extends boolean | null | undefined | TeamMemberPermissionDefaultArgs> = $Result.GetResult<Prisma.$TeamMemberPermissionPayload, S>

  type TeamMemberPermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TeamMemberPermissionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TeamMemberPermissionCountAggregateInputType | true
    }

  export interface TeamMemberPermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMemberPermission'], meta: { name: 'TeamMemberPermission' } }
    /**
     * Find zero or one TeamMemberPermission that matches the filter.
     * @param {TeamMemberPermissionFindUniqueArgs} args - Arguments to find a TeamMemberPermission
     * @example
     * // Get one TeamMemberPermission
     * const teamMemberPermission = await prisma.teamMemberPermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMemberPermissionFindUniqueArgs>(args: SelectSubset<T, TeamMemberPermissionFindUniqueArgs<ExtArgs>>): Prisma__TeamMemberPermissionClient<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TeamMemberPermission that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TeamMemberPermissionFindUniqueOrThrowArgs} args - Arguments to find a TeamMemberPermission
     * @example
     * // Get one TeamMemberPermission
     * const teamMemberPermission = await prisma.teamMemberPermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMemberPermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMemberPermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMemberPermissionClient<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TeamMemberPermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberPermissionFindFirstArgs} args - Arguments to find a TeamMemberPermission
     * @example
     * // Get one TeamMemberPermission
     * const teamMemberPermission = await prisma.teamMemberPermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMemberPermissionFindFirstArgs>(args?: SelectSubset<T, TeamMemberPermissionFindFirstArgs<ExtArgs>>): Prisma__TeamMemberPermissionClient<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TeamMemberPermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberPermissionFindFirstOrThrowArgs} args - Arguments to find a TeamMemberPermission
     * @example
     * // Get one TeamMemberPermission
     * const teamMemberPermission = await prisma.teamMemberPermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMemberPermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMemberPermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMemberPermissionClient<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TeamMemberPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberPermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMemberPermissions
     * const teamMemberPermissions = await prisma.teamMemberPermission.findMany()
     * 
     * // Get first 10 TeamMemberPermissions
     * const teamMemberPermissions = await prisma.teamMemberPermission.findMany({ take: 10 })
     * 
     * // Only select the `teamMemberId`
     * const teamMemberPermissionWithTeamMemberIdOnly = await prisma.teamMemberPermission.findMany({ select: { teamMemberId: true } })
     * 
     */
    findMany<T extends TeamMemberPermissionFindManyArgs>(args?: SelectSubset<T, TeamMemberPermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TeamMemberPermission.
     * @param {TeamMemberPermissionCreateArgs} args - Arguments to create a TeamMemberPermission.
     * @example
     * // Create one TeamMemberPermission
     * const TeamMemberPermission = await prisma.teamMemberPermission.create({
     *   data: {
     *     // ... data to create a TeamMemberPermission
     *   }
     * })
     * 
     */
    create<T extends TeamMemberPermissionCreateArgs>(args: SelectSubset<T, TeamMemberPermissionCreateArgs<ExtArgs>>): Prisma__TeamMemberPermissionClient<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TeamMemberPermissions.
     * @param {TeamMemberPermissionCreateManyArgs} args - Arguments to create many TeamMemberPermissions.
     * @example
     * // Create many TeamMemberPermissions
     * const teamMemberPermission = await prisma.teamMemberPermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMemberPermissionCreateManyArgs>(args?: SelectSubset<T, TeamMemberPermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TeamMemberPermissions and returns the data saved in the database.
     * @param {TeamMemberPermissionCreateManyAndReturnArgs} args - Arguments to create many TeamMemberPermissions.
     * @example
     * // Create many TeamMemberPermissions
     * const teamMemberPermission = await prisma.teamMemberPermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TeamMemberPermissions and only return the `teamMemberId`
     * const teamMemberPermissionWithTeamMemberIdOnly = await prisma.teamMemberPermission.createManyAndReturn({ 
     *   select: { teamMemberId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamMemberPermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamMemberPermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TeamMemberPermission.
     * @param {TeamMemberPermissionDeleteArgs} args - Arguments to delete one TeamMemberPermission.
     * @example
     * // Delete one TeamMemberPermission
     * const TeamMemberPermission = await prisma.teamMemberPermission.delete({
     *   where: {
     *     // ... filter to delete one TeamMemberPermission
     *   }
     * })
     * 
     */
    delete<T extends TeamMemberPermissionDeleteArgs>(args: SelectSubset<T, TeamMemberPermissionDeleteArgs<ExtArgs>>): Prisma__TeamMemberPermissionClient<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TeamMemberPermission.
     * @param {TeamMemberPermissionUpdateArgs} args - Arguments to update one TeamMemberPermission.
     * @example
     * // Update one TeamMemberPermission
     * const teamMemberPermission = await prisma.teamMemberPermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMemberPermissionUpdateArgs>(args: SelectSubset<T, TeamMemberPermissionUpdateArgs<ExtArgs>>): Prisma__TeamMemberPermissionClient<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TeamMemberPermissions.
     * @param {TeamMemberPermissionDeleteManyArgs} args - Arguments to filter TeamMemberPermissions to delete.
     * @example
     * // Delete a few TeamMemberPermissions
     * const { count } = await prisma.teamMemberPermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMemberPermissionDeleteManyArgs>(args?: SelectSubset<T, TeamMemberPermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMemberPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberPermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMemberPermissions
     * const teamMemberPermission = await prisma.teamMemberPermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMemberPermissionUpdateManyArgs>(args: SelectSubset<T, TeamMemberPermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TeamMemberPermission.
     * @param {TeamMemberPermissionUpsertArgs} args - Arguments to update or create a TeamMemberPermission.
     * @example
     * // Update or create a TeamMemberPermission
     * const teamMemberPermission = await prisma.teamMemberPermission.upsert({
     *   create: {
     *     // ... data to create a TeamMemberPermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMemberPermission we want to update
     *   }
     * })
     */
    upsert<T extends TeamMemberPermissionUpsertArgs>(args: SelectSubset<T, TeamMemberPermissionUpsertArgs<ExtArgs>>): Prisma__TeamMemberPermissionClient<$Result.GetResult<Prisma.$TeamMemberPermissionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TeamMemberPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberPermissionCountArgs} args - Arguments to filter TeamMemberPermissions to count.
     * @example
     * // Count the number of TeamMemberPermissions
     * const count = await prisma.teamMemberPermission.count({
     *   where: {
     *     // ... the filter for the TeamMemberPermissions we want to count
     *   }
     * })
    **/
    count<T extends TeamMemberPermissionCountArgs>(
      args?: Subset<T, TeamMemberPermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMemberPermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMemberPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberPermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMemberPermissionAggregateArgs>(args: Subset<T, TeamMemberPermissionAggregateArgs>): Prisma.PrismaPromise<GetTeamMemberPermissionAggregateType<T>>

    /**
     * Group by TeamMemberPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberPermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMemberPermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMemberPermissionGroupByArgs['orderBy'] }
        : { orderBy?: TeamMemberPermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMemberPermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMemberPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMemberPermission model
   */
  readonly fields: TeamMemberPermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMemberPermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMemberPermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teamMember<T extends TeamMemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamMemberDefaultArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMemberPermission model
   */ 
  interface TeamMemberPermissionFieldRefs {
    readonly teamMemberId: FieldRef<"TeamMemberPermission", 'String'>
    readonly permission: FieldRef<"TeamMemberPermission", 'EPermissions'>
  }
    

  // Custom InputTypes
  /**
   * TeamMemberPermission findUnique
   */
  export type TeamMemberPermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
    /**
     * Filter, which TeamMemberPermission to fetch.
     */
    where: TeamMemberPermissionWhereUniqueInput
  }

  /**
   * TeamMemberPermission findUniqueOrThrow
   */
  export type TeamMemberPermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
    /**
     * Filter, which TeamMemberPermission to fetch.
     */
    where: TeamMemberPermissionWhereUniqueInput
  }

  /**
   * TeamMemberPermission findFirst
   */
  export type TeamMemberPermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
    /**
     * Filter, which TeamMemberPermission to fetch.
     */
    where?: TeamMemberPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberPermissions to fetch.
     */
    orderBy?: TeamMemberPermissionOrderByWithRelationInput | TeamMemberPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMemberPermissions.
     */
    cursor?: TeamMemberPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMemberPermissions.
     */
    distinct?: TeamMemberPermissionScalarFieldEnum | TeamMemberPermissionScalarFieldEnum[]
  }

  /**
   * TeamMemberPermission findFirstOrThrow
   */
  export type TeamMemberPermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
    /**
     * Filter, which TeamMemberPermission to fetch.
     */
    where?: TeamMemberPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberPermissions to fetch.
     */
    orderBy?: TeamMemberPermissionOrderByWithRelationInput | TeamMemberPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMemberPermissions.
     */
    cursor?: TeamMemberPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMemberPermissions.
     */
    distinct?: TeamMemberPermissionScalarFieldEnum | TeamMemberPermissionScalarFieldEnum[]
  }

  /**
   * TeamMemberPermission findMany
   */
  export type TeamMemberPermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
    /**
     * Filter, which TeamMemberPermissions to fetch.
     */
    where?: TeamMemberPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMemberPermissions to fetch.
     */
    orderBy?: TeamMemberPermissionOrderByWithRelationInput | TeamMemberPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMemberPermissions.
     */
    cursor?: TeamMemberPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMemberPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMemberPermissions.
     */
    skip?: number
    distinct?: TeamMemberPermissionScalarFieldEnum | TeamMemberPermissionScalarFieldEnum[]
  }

  /**
   * TeamMemberPermission create
   */
  export type TeamMemberPermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamMemberPermission.
     */
    data: XOR<TeamMemberPermissionCreateInput, TeamMemberPermissionUncheckedCreateInput>
  }

  /**
   * TeamMemberPermission createMany
   */
  export type TeamMemberPermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMemberPermissions.
     */
    data: TeamMemberPermissionCreateManyInput | TeamMemberPermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMemberPermission createManyAndReturn
   */
  export type TeamMemberPermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TeamMemberPermissions.
     */
    data: TeamMemberPermissionCreateManyInput | TeamMemberPermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamMemberPermission update
   */
  export type TeamMemberPermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamMemberPermission.
     */
    data: XOR<TeamMemberPermissionUpdateInput, TeamMemberPermissionUncheckedUpdateInput>
    /**
     * Choose, which TeamMemberPermission to update.
     */
    where: TeamMemberPermissionWhereUniqueInput
  }

  /**
   * TeamMemberPermission updateMany
   */
  export type TeamMemberPermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMemberPermissions.
     */
    data: XOR<TeamMemberPermissionUpdateManyMutationInput, TeamMemberPermissionUncheckedUpdateManyInput>
    /**
     * Filter which TeamMemberPermissions to update
     */
    where?: TeamMemberPermissionWhereInput
  }

  /**
   * TeamMemberPermission upsert
   */
  export type TeamMemberPermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamMemberPermission to update in case it exists.
     */
    where: TeamMemberPermissionWhereUniqueInput
    /**
     * In case the TeamMemberPermission found by the `where` argument doesn't exist, create a new TeamMemberPermission with this data.
     */
    create: XOR<TeamMemberPermissionCreateInput, TeamMemberPermissionUncheckedCreateInput>
    /**
     * In case the TeamMemberPermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMemberPermissionUpdateInput, TeamMemberPermissionUncheckedUpdateInput>
  }

  /**
   * TeamMemberPermission delete
   */
  export type TeamMemberPermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
    /**
     * Filter which TeamMemberPermission to delete.
     */
    where: TeamMemberPermissionWhereUniqueInput
  }

  /**
   * TeamMemberPermission deleteMany
   */
  export type TeamMemberPermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMemberPermissions to delete
     */
    where?: TeamMemberPermissionWhereInput
  }

  /**
   * TeamMemberPermission without action
   */
  export type TeamMemberPermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMemberPermission
     */
    select?: TeamMemberPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberPermissionInclude<ExtArgs> | null
  }


  /**
   * Model PublicLink
   */

  export type AggregatePublicLink = {
    _count: PublicLinkCountAggregateOutputType | null
    _min: PublicLinkMinAggregateOutputType | null
    _max: PublicLinkMaxAggregateOutputType | null
  }

  export type PublicLinkMinAggregateOutputType = {
    id: string | null
    listId: string | null
    token: string | null
    passwordHash: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
  }

  export type PublicLinkMaxAggregateOutputType = {
    id: string | null
    listId: string | null
    token: string | null
    passwordHash: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
  }

  export type PublicLinkCountAggregateOutputType = {
    id: number
    listId: number
    token: number
    passwordHash: number
    createdAt: number
    createdBy: number
    updatedAt: number
    _all: number
  }


  export type PublicLinkMinAggregateInputType = {
    id?: true
    listId?: true
    token?: true
    passwordHash?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
  }

  export type PublicLinkMaxAggregateInputType = {
    id?: true
    listId?: true
    token?: true
    passwordHash?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
  }

  export type PublicLinkCountAggregateInputType = {
    id?: true
    listId?: true
    token?: true
    passwordHash?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    _all?: true
  }

  export type PublicLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicLink to aggregate.
     */
    where?: PublicLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicLinks to fetch.
     */
    orderBy?: PublicLinkOrderByWithRelationInput | PublicLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PublicLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PublicLinks
    **/
    _count?: true | PublicLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicLinkMaxAggregateInputType
  }

  export type GetPublicLinkAggregateType<T extends PublicLinkAggregateArgs> = {
        [P in keyof T & keyof AggregatePublicLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublicLink[P]>
      : GetScalarType<T[P], AggregatePublicLink[P]>
  }




  export type PublicLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicLinkWhereInput
    orderBy?: PublicLinkOrderByWithAggregationInput | PublicLinkOrderByWithAggregationInput[]
    by: PublicLinkScalarFieldEnum[] | PublicLinkScalarFieldEnum
    having?: PublicLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicLinkCountAggregateInputType | true
    _min?: PublicLinkMinAggregateInputType
    _max?: PublicLinkMaxAggregateInputType
  }

  export type PublicLinkGroupByOutputType = {
    id: string
    listId: string
    token: string
    passwordHash: string | null
    createdAt: Date
    createdBy: string
    updatedAt: Date
    _count: PublicLinkCountAggregateOutputType | null
    _min: PublicLinkMinAggregateOutputType | null
    _max: PublicLinkMaxAggregateOutputType | null
  }

  type GetPublicLinkGroupByPayload<T extends PublicLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicLinkGroupByOutputType[P]>
            : GetScalarType<T[P], PublicLinkGroupByOutputType[P]>
        }
      >
    >


  export type PublicLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listId?: boolean
    token?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publicLink"]>

  export type PublicLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listId?: boolean
    token?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publicLink"]>

  export type PublicLinkSelectScalar = {
    id?: boolean
    listId?: boolean
    token?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
  }

  export type PublicLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    list?: boolean | ListDefaultArgs<ExtArgs>
  }
  export type PublicLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    list?: boolean | ListDefaultArgs<ExtArgs>
  }

  export type $PublicLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PublicLink"
    objects: {
      list: Prisma.$ListPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      listId: string
      token: string
      passwordHash: string | null
      createdAt: Date
      createdBy: string
      updatedAt: Date
    }, ExtArgs["result"]["publicLink"]>
    composites: {}
  }

  type PublicLinkGetPayload<S extends boolean | null | undefined | PublicLinkDefaultArgs> = $Result.GetResult<Prisma.$PublicLinkPayload, S>

  type PublicLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PublicLinkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PublicLinkCountAggregateInputType | true
    }

  export interface PublicLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PublicLink'], meta: { name: 'PublicLink' } }
    /**
     * Find zero or one PublicLink that matches the filter.
     * @param {PublicLinkFindUniqueArgs} args - Arguments to find a PublicLink
     * @example
     * // Get one PublicLink
     * const publicLink = await prisma.publicLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PublicLinkFindUniqueArgs>(args: SelectSubset<T, PublicLinkFindUniqueArgs<ExtArgs>>): Prisma__PublicLinkClient<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PublicLink that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PublicLinkFindUniqueOrThrowArgs} args - Arguments to find a PublicLink
     * @example
     * // Get one PublicLink
     * const publicLink = await prisma.publicLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PublicLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, PublicLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PublicLinkClient<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PublicLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicLinkFindFirstArgs} args - Arguments to find a PublicLink
     * @example
     * // Get one PublicLink
     * const publicLink = await prisma.publicLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PublicLinkFindFirstArgs>(args?: SelectSubset<T, PublicLinkFindFirstArgs<ExtArgs>>): Prisma__PublicLinkClient<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PublicLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicLinkFindFirstOrThrowArgs} args - Arguments to find a PublicLink
     * @example
     * // Get one PublicLink
     * const publicLink = await prisma.publicLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PublicLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, PublicLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__PublicLinkClient<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PublicLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PublicLinks
     * const publicLinks = await prisma.publicLink.findMany()
     * 
     * // Get first 10 PublicLinks
     * const publicLinks = await prisma.publicLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicLinkWithIdOnly = await prisma.publicLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PublicLinkFindManyArgs>(args?: SelectSubset<T, PublicLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PublicLink.
     * @param {PublicLinkCreateArgs} args - Arguments to create a PublicLink.
     * @example
     * // Create one PublicLink
     * const PublicLink = await prisma.publicLink.create({
     *   data: {
     *     // ... data to create a PublicLink
     *   }
     * })
     * 
     */
    create<T extends PublicLinkCreateArgs>(args: SelectSubset<T, PublicLinkCreateArgs<ExtArgs>>): Prisma__PublicLinkClient<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PublicLinks.
     * @param {PublicLinkCreateManyArgs} args - Arguments to create many PublicLinks.
     * @example
     * // Create many PublicLinks
     * const publicLink = await prisma.publicLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PublicLinkCreateManyArgs>(args?: SelectSubset<T, PublicLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PublicLinks and returns the data saved in the database.
     * @param {PublicLinkCreateManyAndReturnArgs} args - Arguments to create many PublicLinks.
     * @example
     * // Create many PublicLinks
     * const publicLink = await prisma.publicLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PublicLinks and only return the `id`
     * const publicLinkWithIdOnly = await prisma.publicLink.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PublicLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, PublicLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PublicLink.
     * @param {PublicLinkDeleteArgs} args - Arguments to delete one PublicLink.
     * @example
     * // Delete one PublicLink
     * const PublicLink = await prisma.publicLink.delete({
     *   where: {
     *     // ... filter to delete one PublicLink
     *   }
     * })
     * 
     */
    delete<T extends PublicLinkDeleteArgs>(args: SelectSubset<T, PublicLinkDeleteArgs<ExtArgs>>): Prisma__PublicLinkClient<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PublicLink.
     * @param {PublicLinkUpdateArgs} args - Arguments to update one PublicLink.
     * @example
     * // Update one PublicLink
     * const publicLink = await prisma.publicLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PublicLinkUpdateArgs>(args: SelectSubset<T, PublicLinkUpdateArgs<ExtArgs>>): Prisma__PublicLinkClient<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PublicLinks.
     * @param {PublicLinkDeleteManyArgs} args - Arguments to filter PublicLinks to delete.
     * @example
     * // Delete a few PublicLinks
     * const { count } = await prisma.publicLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PublicLinkDeleteManyArgs>(args?: SelectSubset<T, PublicLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PublicLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PublicLinks
     * const publicLink = await prisma.publicLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PublicLinkUpdateManyArgs>(args: SelectSubset<T, PublicLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PublicLink.
     * @param {PublicLinkUpsertArgs} args - Arguments to update or create a PublicLink.
     * @example
     * // Update or create a PublicLink
     * const publicLink = await prisma.publicLink.upsert({
     *   create: {
     *     // ... data to create a PublicLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PublicLink we want to update
     *   }
     * })
     */
    upsert<T extends PublicLinkUpsertArgs>(args: SelectSubset<T, PublicLinkUpsertArgs<ExtArgs>>): Prisma__PublicLinkClient<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PublicLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicLinkCountArgs} args - Arguments to filter PublicLinks to count.
     * @example
     * // Count the number of PublicLinks
     * const count = await prisma.publicLink.count({
     *   where: {
     *     // ... the filter for the PublicLinks we want to count
     *   }
     * })
    **/
    count<T extends PublicLinkCountArgs>(
      args?: Subset<T, PublicLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PublicLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PublicLinkAggregateArgs>(args: Subset<T, PublicLinkAggregateArgs>): Prisma.PrismaPromise<GetPublicLinkAggregateType<T>>

    /**
     * Group by PublicLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PublicLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PublicLinkGroupByArgs['orderBy'] }
        : { orderBy?: PublicLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PublicLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PublicLink model
   */
  readonly fields: PublicLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PublicLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PublicLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    list<T extends ListDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListDefaultArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PublicLink model
   */ 
  interface PublicLinkFieldRefs {
    readonly id: FieldRef<"PublicLink", 'String'>
    readonly listId: FieldRef<"PublicLink", 'String'>
    readonly token: FieldRef<"PublicLink", 'String'>
    readonly passwordHash: FieldRef<"PublicLink", 'String'>
    readonly createdAt: FieldRef<"PublicLink", 'DateTime'>
    readonly createdBy: FieldRef<"PublicLink", 'String'>
    readonly updatedAt: FieldRef<"PublicLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PublicLink findUnique
   */
  export type PublicLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
    /**
     * Filter, which PublicLink to fetch.
     */
    where: PublicLinkWhereUniqueInput
  }

  /**
   * PublicLink findUniqueOrThrow
   */
  export type PublicLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
    /**
     * Filter, which PublicLink to fetch.
     */
    where: PublicLinkWhereUniqueInput
  }

  /**
   * PublicLink findFirst
   */
  export type PublicLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
    /**
     * Filter, which PublicLink to fetch.
     */
    where?: PublicLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicLinks to fetch.
     */
    orderBy?: PublicLinkOrderByWithRelationInput | PublicLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicLinks.
     */
    cursor?: PublicLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicLinks.
     */
    distinct?: PublicLinkScalarFieldEnum | PublicLinkScalarFieldEnum[]
  }

  /**
   * PublicLink findFirstOrThrow
   */
  export type PublicLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
    /**
     * Filter, which PublicLink to fetch.
     */
    where?: PublicLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicLinks to fetch.
     */
    orderBy?: PublicLinkOrderByWithRelationInput | PublicLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicLinks.
     */
    cursor?: PublicLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicLinks.
     */
    distinct?: PublicLinkScalarFieldEnum | PublicLinkScalarFieldEnum[]
  }

  /**
   * PublicLink findMany
   */
  export type PublicLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
    /**
     * Filter, which PublicLinks to fetch.
     */
    where?: PublicLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicLinks to fetch.
     */
    orderBy?: PublicLinkOrderByWithRelationInput | PublicLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PublicLinks.
     */
    cursor?: PublicLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicLinks.
     */
    skip?: number
    distinct?: PublicLinkScalarFieldEnum | PublicLinkScalarFieldEnum[]
  }

  /**
   * PublicLink create
   */
  export type PublicLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a PublicLink.
     */
    data: XOR<PublicLinkCreateInput, PublicLinkUncheckedCreateInput>
  }

  /**
   * PublicLink createMany
   */
  export type PublicLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PublicLinks.
     */
    data: PublicLinkCreateManyInput | PublicLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PublicLink createManyAndReturn
   */
  export type PublicLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PublicLinks.
     */
    data: PublicLinkCreateManyInput | PublicLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PublicLink update
   */
  export type PublicLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a PublicLink.
     */
    data: XOR<PublicLinkUpdateInput, PublicLinkUncheckedUpdateInput>
    /**
     * Choose, which PublicLink to update.
     */
    where: PublicLinkWhereUniqueInput
  }

  /**
   * PublicLink updateMany
   */
  export type PublicLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PublicLinks.
     */
    data: XOR<PublicLinkUpdateManyMutationInput, PublicLinkUncheckedUpdateManyInput>
    /**
     * Filter which PublicLinks to update
     */
    where?: PublicLinkWhereInput
  }

  /**
   * PublicLink upsert
   */
  export type PublicLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the PublicLink to update in case it exists.
     */
    where: PublicLinkWhereUniqueInput
    /**
     * In case the PublicLink found by the `where` argument doesn't exist, create a new PublicLink with this data.
     */
    create: XOR<PublicLinkCreateInput, PublicLinkUncheckedCreateInput>
    /**
     * In case the PublicLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PublicLinkUpdateInput, PublicLinkUncheckedUpdateInput>
  }

  /**
   * PublicLink delete
   */
  export type PublicLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
    /**
     * Filter which PublicLink to delete.
     */
    where: PublicLinkWhereUniqueInput
  }

  /**
   * PublicLink deleteMany
   */
  export type PublicLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicLinks to delete
     */
    where?: PublicLinkWhereInput
  }

  /**
   * PublicLink without action
   */
  export type PublicLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
  }


  /**
   * Model List
   */

  export type AggregateList = {
    _count: ListCountAggregateOutputType | null
    _min: ListMinAggregateOutputType | null
    _max: ListMaxAggregateOutputType | null
  }

  export type ListMinAggregateOutputType = {
    id: string | null
    title: string | null
    userId: string | null
    teamId: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
  }

  export type ListMaxAggregateOutputType = {
    id: string | null
    title: string | null
    userId: string | null
    teamId: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
  }

  export type ListCountAggregateOutputType = {
    id: number
    title: number
    userId: number
    teamId: number
    createdAt: number
    createdBy: number
    updatedAt: number
    _all: number
  }


  export type ListMinAggregateInputType = {
    id?: true
    title?: true
    userId?: true
    teamId?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
  }

  export type ListMaxAggregateInputType = {
    id?: true
    title?: true
    userId?: true
    teamId?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
  }

  export type ListCountAggregateInputType = {
    id?: true
    title?: true
    userId?: true
    teamId?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    _all?: true
  }

  export type ListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which List to aggregate.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lists
    **/
    _count?: true | ListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListMaxAggregateInputType
  }

  export type GetListAggregateType<T extends ListAggregateArgs> = {
        [P in keyof T & keyof AggregateList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateList[P]>
      : GetScalarType<T[P], AggregateList[P]>
  }




  export type ListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
    orderBy?: ListOrderByWithAggregationInput | ListOrderByWithAggregationInput[]
    by: ListScalarFieldEnum[] | ListScalarFieldEnum
    having?: ListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListCountAggregateInputType | true
    _min?: ListMinAggregateInputType
    _max?: ListMaxAggregateInputType
  }

  export type ListGroupByOutputType = {
    id: string
    title: string
    userId: string | null
    teamId: string | null
    createdAt: Date
    createdBy: string
    updatedAt: Date
    _count: ListCountAggregateOutputType | null
    _min: ListMinAggregateOutputType | null
    _max: ListMaxAggregateOutputType | null
  }

  type GetListGroupByPayload<T extends ListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListGroupByOutputType[P]>
            : GetScalarType<T[P], ListGroupByOutputType[P]>
        }
      >
    >


  export type ListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    userId?: boolean
    teamId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    user?: boolean | List$userArgs<ExtArgs>
    team?: boolean | List$teamArgs<ExtArgs>
    items?: boolean | List$itemsArgs<ExtArgs>
    publicLink?: boolean | List$publicLinkArgs<ExtArgs>
    _count?: boolean | ListCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    userId?: boolean
    teamId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    user?: boolean | List$userArgs<ExtArgs>
    team?: boolean | List$teamArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectScalar = {
    id?: boolean
    title?: boolean
    userId?: boolean
    teamId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
  }

  export type ListInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | List$userArgs<ExtArgs>
    team?: boolean | List$teamArgs<ExtArgs>
    items?: boolean | List$itemsArgs<ExtArgs>
    publicLink?: boolean | List$publicLinkArgs<ExtArgs>
    _count?: boolean | ListCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ListIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | List$userArgs<ExtArgs>
    team?: boolean | List$teamArgs<ExtArgs>
  }

  export type $ListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "List"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      team: Prisma.$TeamPayload<ExtArgs> | null
      items: Prisma.$List_itemPayload<ExtArgs>[]
      publicLink: Prisma.$PublicLinkPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      userId: string | null
      teamId: string | null
      createdAt: Date
      createdBy: string
      updatedAt: Date
    }, ExtArgs["result"]["list"]>
    composites: {}
  }

  type ListGetPayload<S extends boolean | null | undefined | ListDefaultArgs> = $Result.GetResult<Prisma.$ListPayload, S>

  type ListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ListFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ListCountAggregateInputType | true
    }

  export interface ListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['List'], meta: { name: 'List' } }
    /**
     * Find zero or one List that matches the filter.
     * @param {ListFindUniqueArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListFindUniqueArgs>(args: SelectSubset<T, ListFindUniqueArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one List that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ListFindUniqueOrThrowArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListFindUniqueOrThrowArgs>(args: SelectSubset<T, ListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first List that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindFirstArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListFindFirstArgs>(args?: SelectSubset<T, ListFindFirstArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first List that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindFirstOrThrowArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListFindFirstOrThrowArgs>(args?: SelectSubset<T, ListFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Lists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lists
     * const lists = await prisma.list.findMany()
     * 
     * // Get first 10 Lists
     * const lists = await prisma.list.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listWithIdOnly = await prisma.list.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListFindManyArgs>(args?: SelectSubset<T, ListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a List.
     * @param {ListCreateArgs} args - Arguments to create a List.
     * @example
     * // Create one List
     * const List = await prisma.list.create({
     *   data: {
     *     // ... data to create a List
     *   }
     * })
     * 
     */
    create<T extends ListCreateArgs>(args: SelectSubset<T, ListCreateArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Lists.
     * @param {ListCreateManyArgs} args - Arguments to create many Lists.
     * @example
     * // Create many Lists
     * const list = await prisma.list.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListCreateManyArgs>(args?: SelectSubset<T, ListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lists and returns the data saved in the database.
     * @param {ListCreateManyAndReturnArgs} args - Arguments to create many Lists.
     * @example
     * // Create many Lists
     * const list = await prisma.list.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lists and only return the `id`
     * const listWithIdOnly = await prisma.list.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListCreateManyAndReturnArgs>(args?: SelectSubset<T, ListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a List.
     * @param {ListDeleteArgs} args - Arguments to delete one List.
     * @example
     * // Delete one List
     * const List = await prisma.list.delete({
     *   where: {
     *     // ... filter to delete one List
     *   }
     * })
     * 
     */
    delete<T extends ListDeleteArgs>(args: SelectSubset<T, ListDeleteArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one List.
     * @param {ListUpdateArgs} args - Arguments to update one List.
     * @example
     * // Update one List
     * const list = await prisma.list.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListUpdateArgs>(args: SelectSubset<T, ListUpdateArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Lists.
     * @param {ListDeleteManyArgs} args - Arguments to filter Lists to delete.
     * @example
     * // Delete a few Lists
     * const { count } = await prisma.list.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListDeleteManyArgs>(args?: SelectSubset<T, ListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lists
     * const list = await prisma.list.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListUpdateManyArgs>(args: SelectSubset<T, ListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one List.
     * @param {ListUpsertArgs} args - Arguments to update or create a List.
     * @example
     * // Update or create a List
     * const list = await prisma.list.upsert({
     *   create: {
     *     // ... data to create a List
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the List we want to update
     *   }
     * })
     */
    upsert<T extends ListUpsertArgs>(args: SelectSubset<T, ListUpsertArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListCountArgs} args - Arguments to filter Lists to count.
     * @example
     * // Count the number of Lists
     * const count = await prisma.list.count({
     *   where: {
     *     // ... the filter for the Lists we want to count
     *   }
     * })
    **/
    count<T extends ListCountArgs>(
      args?: Subset<T, ListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a List.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListAggregateArgs>(args: Subset<T, ListAggregateArgs>): Prisma.PrismaPromise<GetListAggregateType<T>>

    /**
     * Group by List.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListGroupByArgs['orderBy'] }
        : { orderBy?: ListGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the List model
   */
  readonly fields: ListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for List.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends List$userArgs<ExtArgs> = {}>(args?: Subset<T, List$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    team<T extends List$teamArgs<ExtArgs> = {}>(args?: Subset<T, List$teamArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    items<T extends List$itemsArgs<ExtArgs> = {}>(args?: Subset<T, List$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "findMany"> | Null>
    publicLink<T extends List$publicLinkArgs<ExtArgs> = {}>(args?: Subset<T, List$publicLinkArgs<ExtArgs>>): Prisma__PublicLinkClient<$Result.GetResult<Prisma.$PublicLinkPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the List model
   */ 
  interface ListFieldRefs {
    readonly id: FieldRef<"List", 'String'>
    readonly title: FieldRef<"List", 'String'>
    readonly userId: FieldRef<"List", 'String'>
    readonly teamId: FieldRef<"List", 'String'>
    readonly createdAt: FieldRef<"List", 'DateTime'>
    readonly createdBy: FieldRef<"List", 'String'>
    readonly updatedAt: FieldRef<"List", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * List findUnique
   */
  export type ListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List findUniqueOrThrow
   */
  export type ListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List findFirst
   */
  export type ListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lists.
     */
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List findFirstOrThrow
   */
  export type ListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lists.
     */
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List findMany
   */
  export type ListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which Lists to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List create
   */
  export type ListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The data needed to create a List.
     */
    data: XOR<ListCreateInput, ListUncheckedCreateInput>
  }

  /**
   * List createMany
   */
  export type ListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lists.
     */
    data: ListCreateManyInput | ListCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * List createManyAndReturn
   */
  export type ListCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Lists.
     */
    data: ListCreateManyInput | ListCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * List update
   */
  export type ListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The data needed to update a List.
     */
    data: XOR<ListUpdateInput, ListUncheckedUpdateInput>
    /**
     * Choose, which List to update.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List updateMany
   */
  export type ListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lists.
     */
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyInput>
    /**
     * Filter which Lists to update
     */
    where?: ListWhereInput
  }

  /**
   * List upsert
   */
  export type ListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The filter to search for the List to update in case it exists.
     */
    where: ListWhereUniqueInput
    /**
     * In case the List found by the `where` argument doesn't exist, create a new List with this data.
     */
    create: XOR<ListCreateInput, ListUncheckedCreateInput>
    /**
     * In case the List was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListUpdateInput, ListUncheckedUpdateInput>
  }

  /**
   * List delete
   */
  export type ListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter which List to delete.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List deleteMany
   */
  export type ListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lists to delete
     */
    where?: ListWhereInput
  }

  /**
   * List.user
   */
  export type List$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * List.team
   */
  export type List$teamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * List.items
   */
  export type List$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
    where?: List_itemWhereInput
    orderBy?: List_itemOrderByWithRelationInput | List_itemOrderByWithRelationInput[]
    cursor?: List_itemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: List_itemScalarFieldEnum | List_itemScalarFieldEnum[]
  }

  /**
   * List.publicLink
   */
  export type List$publicLinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicLink
     */
    select?: PublicLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicLinkInclude<ExtArgs> | null
    where?: PublicLinkWhereInput
  }

  /**
   * List without action
   */
  export type ListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
  }


  /**
   * Model List_item
   */

  export type AggregateList_item = {
    _count: List_itemCountAggregateOutputType | null
    _avg: List_itemAvgAggregateOutputType | null
    _sum: List_itemSumAggregateOutputType | null
    _min: List_itemMinAggregateOutputType | null
    _max: List_itemMaxAggregateOutputType | null
  }

  export type List_itemAvgAggregateOutputType = {
    itemnumber: number | null
  }

  export type List_itemSumAggregateOutputType = {
    itemnumber: number | null
  }

  export type List_itemMinAggregateOutputType = {
    id: string | null
    itemnumber: number | null
    listId: string | null
    description: string | null
    comment: string | null
    status: $Enums.EItemStatus | null
    delivered: boolean | null
    deadline: Date | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
  }

  export type List_itemMaxAggregateOutputType = {
    id: string | null
    itemnumber: number | null
    listId: string | null
    description: string | null
    comment: string | null
    status: $Enums.EItemStatus | null
    delivered: boolean | null
    deadline: Date | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
  }

  export type List_itemCountAggregateOutputType = {
    id: number
    itemnumber: number
    listId: number
    description: number
    uploadedFiles: number
    comment: number
    status: number
    delivered: number
    deadline: number
    createdAt: number
    createdBy: number
    updatedAt: number
    _all: number
  }


  export type List_itemAvgAggregateInputType = {
    itemnumber?: true
  }

  export type List_itemSumAggregateInputType = {
    itemnumber?: true
  }

  export type List_itemMinAggregateInputType = {
    id?: true
    itemnumber?: true
    listId?: true
    description?: true
    comment?: true
    status?: true
    delivered?: true
    deadline?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
  }

  export type List_itemMaxAggregateInputType = {
    id?: true
    itemnumber?: true
    listId?: true
    description?: true
    comment?: true
    status?: true
    delivered?: true
    deadline?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
  }

  export type List_itemCountAggregateInputType = {
    id?: true
    itemnumber?: true
    listId?: true
    description?: true
    uploadedFiles?: true
    comment?: true
    status?: true
    delivered?: true
    deadline?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    _all?: true
  }

  export type List_itemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which List_item to aggregate.
     */
    where?: List_itemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of List_items to fetch.
     */
    orderBy?: List_itemOrderByWithRelationInput | List_itemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: List_itemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` List_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` List_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned List_items
    **/
    _count?: true | List_itemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: List_itemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: List_itemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: List_itemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: List_itemMaxAggregateInputType
  }

  export type GetList_itemAggregateType<T extends List_itemAggregateArgs> = {
        [P in keyof T & keyof AggregateList_item]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateList_item[P]>
      : GetScalarType<T[P], AggregateList_item[P]>
  }




  export type List_itemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: List_itemWhereInput
    orderBy?: List_itemOrderByWithAggregationInput | List_itemOrderByWithAggregationInput[]
    by: List_itemScalarFieldEnum[] | List_itemScalarFieldEnum
    having?: List_itemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: List_itemCountAggregateInputType | true
    _avg?: List_itemAvgAggregateInputType
    _sum?: List_itemSumAggregateInputType
    _min?: List_itemMinAggregateInputType
    _max?: List_itemMaxAggregateInputType
  }

  export type List_itemGroupByOutputType = {
    id: string
    itemnumber: number
    listId: string
    description: string
    uploadedFiles: string[]
    comment: string | null
    status: $Enums.EItemStatus
    delivered: boolean
    deadline: Date
    createdAt: Date
    createdBy: string
    updatedAt: Date
    _count: List_itemCountAggregateOutputType | null
    _avg: List_itemAvgAggregateOutputType | null
    _sum: List_itemSumAggregateOutputType | null
    _min: List_itemMinAggregateOutputType | null
    _max: List_itemMaxAggregateOutputType | null
  }

  type GetList_itemGroupByPayload<T extends List_itemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<List_itemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof List_itemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], List_itemGroupByOutputType[P]>
            : GetScalarType<T[P], List_itemGroupByOutputType[P]>
        }
      >
    >


  export type List_itemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemnumber?: boolean
    listId?: boolean
    description?: boolean
    uploadedFiles?: boolean
    comment?: boolean
    status?: boolean
    delivered?: boolean
    deadline?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list_item"]>

  export type List_itemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemnumber?: boolean
    listId?: boolean
    description?: boolean
    uploadedFiles?: boolean
    comment?: boolean
    status?: boolean
    delivered?: boolean
    deadline?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list_item"]>

  export type List_itemSelectScalar = {
    id?: boolean
    itemnumber?: boolean
    listId?: boolean
    description?: boolean
    uploadedFiles?: boolean
    comment?: boolean
    status?: boolean
    delivered?: boolean
    deadline?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
  }

  export type List_itemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    list?: boolean | ListDefaultArgs<ExtArgs>
  }
  export type List_itemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    list?: boolean | ListDefaultArgs<ExtArgs>
  }

  export type $List_itemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "List_item"
    objects: {
      list: Prisma.$ListPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      itemnumber: number
      listId: string
      description: string
      uploadedFiles: string[]
      comment: string | null
      status: $Enums.EItemStatus
      delivered: boolean
      deadline: Date
      createdAt: Date
      createdBy: string
      updatedAt: Date
    }, ExtArgs["result"]["list_item"]>
    composites: {}
  }

  type List_itemGetPayload<S extends boolean | null | undefined | List_itemDefaultArgs> = $Result.GetResult<Prisma.$List_itemPayload, S>

  type List_itemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<List_itemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: List_itemCountAggregateInputType | true
    }

  export interface List_itemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['List_item'], meta: { name: 'List_item' } }
    /**
     * Find zero or one List_item that matches the filter.
     * @param {List_itemFindUniqueArgs} args - Arguments to find a List_item
     * @example
     * // Get one List_item
     * const list_item = await prisma.list_item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends List_itemFindUniqueArgs>(args: SelectSubset<T, List_itemFindUniqueArgs<ExtArgs>>): Prisma__List_itemClient<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one List_item that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {List_itemFindUniqueOrThrowArgs} args - Arguments to find a List_item
     * @example
     * // Get one List_item
     * const list_item = await prisma.list_item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends List_itemFindUniqueOrThrowArgs>(args: SelectSubset<T, List_itemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__List_itemClient<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first List_item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_itemFindFirstArgs} args - Arguments to find a List_item
     * @example
     * // Get one List_item
     * const list_item = await prisma.list_item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends List_itemFindFirstArgs>(args?: SelectSubset<T, List_itemFindFirstArgs<ExtArgs>>): Prisma__List_itemClient<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first List_item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_itemFindFirstOrThrowArgs} args - Arguments to find a List_item
     * @example
     * // Get one List_item
     * const list_item = await prisma.list_item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends List_itemFindFirstOrThrowArgs>(args?: SelectSubset<T, List_itemFindFirstOrThrowArgs<ExtArgs>>): Prisma__List_itemClient<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more List_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_itemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all List_items
     * const list_items = await prisma.list_item.findMany()
     * 
     * // Get first 10 List_items
     * const list_items = await prisma.list_item.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const list_itemWithIdOnly = await prisma.list_item.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends List_itemFindManyArgs>(args?: SelectSubset<T, List_itemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a List_item.
     * @param {List_itemCreateArgs} args - Arguments to create a List_item.
     * @example
     * // Create one List_item
     * const List_item = await prisma.list_item.create({
     *   data: {
     *     // ... data to create a List_item
     *   }
     * })
     * 
     */
    create<T extends List_itemCreateArgs>(args: SelectSubset<T, List_itemCreateArgs<ExtArgs>>): Prisma__List_itemClient<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many List_items.
     * @param {List_itemCreateManyArgs} args - Arguments to create many List_items.
     * @example
     * // Create many List_items
     * const list_item = await prisma.list_item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends List_itemCreateManyArgs>(args?: SelectSubset<T, List_itemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many List_items and returns the data saved in the database.
     * @param {List_itemCreateManyAndReturnArgs} args - Arguments to create many List_items.
     * @example
     * // Create many List_items
     * const list_item = await prisma.list_item.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many List_items and only return the `id`
     * const list_itemWithIdOnly = await prisma.list_item.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends List_itemCreateManyAndReturnArgs>(args?: SelectSubset<T, List_itemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a List_item.
     * @param {List_itemDeleteArgs} args - Arguments to delete one List_item.
     * @example
     * // Delete one List_item
     * const List_item = await prisma.list_item.delete({
     *   where: {
     *     // ... filter to delete one List_item
     *   }
     * })
     * 
     */
    delete<T extends List_itemDeleteArgs>(args: SelectSubset<T, List_itemDeleteArgs<ExtArgs>>): Prisma__List_itemClient<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one List_item.
     * @param {List_itemUpdateArgs} args - Arguments to update one List_item.
     * @example
     * // Update one List_item
     * const list_item = await prisma.list_item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends List_itemUpdateArgs>(args: SelectSubset<T, List_itemUpdateArgs<ExtArgs>>): Prisma__List_itemClient<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more List_items.
     * @param {List_itemDeleteManyArgs} args - Arguments to filter List_items to delete.
     * @example
     * // Delete a few List_items
     * const { count } = await prisma.list_item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends List_itemDeleteManyArgs>(args?: SelectSubset<T, List_itemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more List_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_itemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many List_items
     * const list_item = await prisma.list_item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends List_itemUpdateManyArgs>(args: SelectSubset<T, List_itemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one List_item.
     * @param {List_itemUpsertArgs} args - Arguments to update or create a List_item.
     * @example
     * // Update or create a List_item
     * const list_item = await prisma.list_item.upsert({
     *   create: {
     *     // ... data to create a List_item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the List_item we want to update
     *   }
     * })
     */
    upsert<T extends List_itemUpsertArgs>(args: SelectSubset<T, List_itemUpsertArgs<ExtArgs>>): Prisma__List_itemClient<$Result.GetResult<Prisma.$List_itemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of List_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_itemCountArgs} args - Arguments to filter List_items to count.
     * @example
     * // Count the number of List_items
     * const count = await prisma.list_item.count({
     *   where: {
     *     // ... the filter for the List_items we want to count
     *   }
     * })
    **/
    count<T extends List_itemCountArgs>(
      args?: Subset<T, List_itemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], List_itemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a List_item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_itemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends List_itemAggregateArgs>(args: Subset<T, List_itemAggregateArgs>): Prisma.PrismaPromise<GetList_itemAggregateType<T>>

    /**
     * Group by List_item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_itemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends List_itemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: List_itemGroupByArgs['orderBy'] }
        : { orderBy?: List_itemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, List_itemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetList_itemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the List_item model
   */
  readonly fields: List_itemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for List_item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__List_itemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    list<T extends ListDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListDefaultArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the List_item model
   */ 
  interface List_itemFieldRefs {
    readonly id: FieldRef<"List_item", 'String'>
    readonly itemnumber: FieldRef<"List_item", 'Int'>
    readonly listId: FieldRef<"List_item", 'String'>
    readonly description: FieldRef<"List_item", 'String'>
    readonly uploadedFiles: FieldRef<"List_item", 'String[]'>
    readonly comment: FieldRef<"List_item", 'String'>
    readonly status: FieldRef<"List_item", 'EItemStatus'>
    readonly delivered: FieldRef<"List_item", 'Boolean'>
    readonly deadline: FieldRef<"List_item", 'DateTime'>
    readonly createdAt: FieldRef<"List_item", 'DateTime'>
    readonly createdBy: FieldRef<"List_item", 'String'>
    readonly updatedAt: FieldRef<"List_item", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * List_item findUnique
   */
  export type List_itemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
    /**
     * Filter, which List_item to fetch.
     */
    where: List_itemWhereUniqueInput
  }

  /**
   * List_item findUniqueOrThrow
   */
  export type List_itemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
    /**
     * Filter, which List_item to fetch.
     */
    where: List_itemWhereUniqueInput
  }

  /**
   * List_item findFirst
   */
  export type List_itemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
    /**
     * Filter, which List_item to fetch.
     */
    where?: List_itemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of List_items to fetch.
     */
    orderBy?: List_itemOrderByWithRelationInput | List_itemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for List_items.
     */
    cursor?: List_itemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` List_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` List_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of List_items.
     */
    distinct?: List_itemScalarFieldEnum | List_itemScalarFieldEnum[]
  }

  /**
   * List_item findFirstOrThrow
   */
  export type List_itemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
    /**
     * Filter, which List_item to fetch.
     */
    where?: List_itemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of List_items to fetch.
     */
    orderBy?: List_itemOrderByWithRelationInput | List_itemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for List_items.
     */
    cursor?: List_itemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` List_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` List_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of List_items.
     */
    distinct?: List_itemScalarFieldEnum | List_itemScalarFieldEnum[]
  }

  /**
   * List_item findMany
   */
  export type List_itemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
    /**
     * Filter, which List_items to fetch.
     */
    where?: List_itemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of List_items to fetch.
     */
    orderBy?: List_itemOrderByWithRelationInput | List_itemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing List_items.
     */
    cursor?: List_itemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` List_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` List_items.
     */
    skip?: number
    distinct?: List_itemScalarFieldEnum | List_itemScalarFieldEnum[]
  }

  /**
   * List_item create
   */
  export type List_itemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
    /**
     * The data needed to create a List_item.
     */
    data: XOR<List_itemCreateInput, List_itemUncheckedCreateInput>
  }

  /**
   * List_item createMany
   */
  export type List_itemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many List_items.
     */
    data: List_itemCreateManyInput | List_itemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * List_item createManyAndReturn
   */
  export type List_itemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many List_items.
     */
    data: List_itemCreateManyInput | List_itemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * List_item update
   */
  export type List_itemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
    /**
     * The data needed to update a List_item.
     */
    data: XOR<List_itemUpdateInput, List_itemUncheckedUpdateInput>
    /**
     * Choose, which List_item to update.
     */
    where: List_itemWhereUniqueInput
  }

  /**
   * List_item updateMany
   */
  export type List_itemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update List_items.
     */
    data: XOR<List_itemUpdateManyMutationInput, List_itemUncheckedUpdateManyInput>
    /**
     * Filter which List_items to update
     */
    where?: List_itemWhereInput
  }

  /**
   * List_item upsert
   */
  export type List_itemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
    /**
     * The filter to search for the List_item to update in case it exists.
     */
    where: List_itemWhereUniqueInput
    /**
     * In case the List_item found by the `where` argument doesn't exist, create a new List_item with this data.
     */
    create: XOR<List_itemCreateInput, List_itemUncheckedCreateInput>
    /**
     * In case the List_item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<List_itemUpdateInput, List_itemUncheckedUpdateInput>
  }

  /**
   * List_item delete
   */
  export type List_itemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
    /**
     * Filter which List_item to delete.
     */
    where: List_itemWhereUniqueInput
  }

  /**
   * List_item deleteMany
   */
  export type List_itemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which List_items to delete
     */
    where?: List_itemWhereInput
  }

  /**
   * List_item without action
   */
  export type List_itemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_item
     */
    select?: List_itemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: List_itemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StorageScalarFieldEnum: {
    id: 'id',
    type: 'type',
    displayName: 'displayName',
    storagePath: 'storagePath',
    refreshToken: 'refreshToken',
    userId: 'userId',
    teamId: 'teamId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StorageScalarFieldEnum = (typeof StorageScalarFieldEnum)[keyof typeof StorageScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    title: 'title',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const TeamMemberScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    userId: 'userId',
    createdAt: 'createdAt',
    createdBy: 'createdBy'
  };

  export type TeamMemberScalarFieldEnum = (typeof TeamMemberScalarFieldEnum)[keyof typeof TeamMemberScalarFieldEnum]


  export const TeamMemberPermissionScalarFieldEnum: {
    teamMemberId: 'teamMemberId',
    permission: 'permission'
  };

  export type TeamMemberPermissionScalarFieldEnum = (typeof TeamMemberPermissionScalarFieldEnum)[keyof typeof TeamMemberPermissionScalarFieldEnum]


  export const PublicLinkScalarFieldEnum: {
    id: 'id',
    listId: 'listId',
    token: 'token',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt'
  };

  export type PublicLinkScalarFieldEnum = (typeof PublicLinkScalarFieldEnum)[keyof typeof PublicLinkScalarFieldEnum]


  export const ListScalarFieldEnum: {
    id: 'id',
    title: 'title',
    userId: 'userId',
    teamId: 'teamId',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt'
  };

  export type ListScalarFieldEnum = (typeof ListScalarFieldEnum)[keyof typeof ListScalarFieldEnum]


  export const List_itemScalarFieldEnum: {
    id: 'id',
    itemnumber: 'itemnumber',
    listId: 'listId',
    description: 'description',
    uploadedFiles: 'uploadedFiles',
    comment: 'comment',
    status: 'status',
    delivered: 'delivered',
    deadline: 'deadline',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt'
  };

  export type List_itemScalarFieldEnum = (typeof List_itemScalarFieldEnum)[keyof typeof List_itemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'EStorageType'
   */
  export type EnumEStorageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EStorageType'>
    


  /**
   * Reference to a field of type 'EStorageType[]'
   */
  export type ListEnumEStorageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EStorageType[]'>
    


  /**
   * Reference to a field of type 'EPermissions'
   */
  export type EnumEPermissionsFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EPermissions'>
    


  /**
   * Reference to a field of type 'EPermissions[]'
   */
  export type ListEnumEPermissionsFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EPermissions[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'EItemStatus'
   */
  export type EnumEItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EItemStatus'>
    


  /**
   * Reference to a field of type 'EItemStatus[]'
   */
  export type ListEnumEItemStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EItemStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    storage?: XOR<StorageNullableRelationFilter, StorageWhereInput> | null
    lists?: ListListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    storage?: StorageOrderByWithRelationInput
    lists?: ListOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    storage?: XOR<StorageNullableRelationFilter, StorageWhereInput> | null
    lists?: ListListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StorageWhereInput = {
    AND?: StorageWhereInput | StorageWhereInput[]
    OR?: StorageWhereInput[]
    NOT?: StorageWhereInput | StorageWhereInput[]
    id?: StringFilter<"Storage"> | string
    type?: EnumEStorageTypeFilter<"Storage"> | $Enums.EStorageType
    displayName?: StringFilter<"Storage"> | string
    storagePath?: StringNullableFilter<"Storage"> | string | null
    refreshToken?: StringFilter<"Storage"> | string
    userId?: StringNullableFilter<"Storage"> | string | null
    teamId?: StringNullableFilter<"Storage"> | string | null
    createdAt?: DateTimeFilter<"Storage"> | Date | string
    updatedAt?: DateTimeFilter<"Storage"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    team?: XOR<TeamNullableRelationFilter, TeamWhereInput> | null
  }

  export type StorageOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    displayName?: SortOrder
    storagePath?: SortOrderInput | SortOrder
    refreshToken?: SortOrder
    userId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
  }

  export type StorageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    teamId?: string
    AND?: StorageWhereInput | StorageWhereInput[]
    OR?: StorageWhereInput[]
    NOT?: StorageWhereInput | StorageWhereInput[]
    type?: EnumEStorageTypeFilter<"Storage"> | $Enums.EStorageType
    displayName?: StringFilter<"Storage"> | string
    storagePath?: StringNullableFilter<"Storage"> | string | null
    refreshToken?: StringFilter<"Storage"> | string
    createdAt?: DateTimeFilter<"Storage"> | Date | string
    updatedAt?: DateTimeFilter<"Storage"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    team?: XOR<TeamNullableRelationFilter, TeamWhereInput> | null
  }, "id" | "userId" | "teamId">

  export type StorageOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    displayName?: SortOrder
    storagePath?: SortOrderInput | SortOrder
    refreshToken?: SortOrder
    userId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StorageCountOrderByAggregateInput
    _max?: StorageMaxOrderByAggregateInput
    _min?: StorageMinOrderByAggregateInput
  }

  export type StorageScalarWhereWithAggregatesInput = {
    AND?: StorageScalarWhereWithAggregatesInput | StorageScalarWhereWithAggregatesInput[]
    OR?: StorageScalarWhereWithAggregatesInput[]
    NOT?: StorageScalarWhereWithAggregatesInput | StorageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Storage"> | string
    type?: EnumEStorageTypeWithAggregatesFilter<"Storage"> | $Enums.EStorageType
    displayName?: StringWithAggregatesFilter<"Storage"> | string
    storagePath?: StringNullableWithAggregatesFilter<"Storage"> | string | null
    refreshToken?: StringWithAggregatesFilter<"Storage"> | string
    userId?: StringNullableWithAggregatesFilter<"Storage"> | string | null
    teamId?: StringNullableWithAggregatesFilter<"Storage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Storage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Storage"> | Date | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: StringFilter<"Team"> | string
    title?: StringFilter<"Team"> | string
    createdBy?: StringFilter<"Team"> | string
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    storage?: XOR<StorageNullableRelationFilter, StorageWhereInput> | null
    lists?: ListListRelationFilter
    members?: TeamMemberListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    storage?: StorageOrderByWithRelationInput
    lists?: ListOrderByRelationAggregateInput
    members?: TeamMemberOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    title?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    createdBy?: StringFilter<"Team"> | string
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    storage?: XOR<StorageNullableRelationFilter, StorageWhereInput> | null
    lists?: ListListRelationFilter
    members?: TeamMemberListRelationFilter
  }, "id" | "title">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Team"> | string
    title?: StringWithAggregatesFilter<"Team"> | string
    createdBy?: StringWithAggregatesFilter<"Team"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
  }

  export type TeamMemberWhereInput = {
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    id?: StringFilter<"TeamMember"> | string
    teamId?: StringFilter<"TeamMember"> | string
    userId?: StringFilter<"TeamMember"> | string
    createdAt?: DateTimeFilter<"TeamMember"> | Date | string
    createdBy?: StringFilter<"TeamMember"> | string
    team?: XOR<TeamRelationFilter, TeamWhereInput>
    permissions?: TeamMemberPermissionListRelationFilter
  }

  export type TeamMemberOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    team?: TeamOrderByWithRelationInput
    permissions?: TeamMemberPermissionOrderByRelationAggregateInput
  }

  export type TeamMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    teamId_userId?: TeamMemberTeamIdUserIdCompoundUniqueInput
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    teamId?: StringFilter<"TeamMember"> | string
    userId?: StringFilter<"TeamMember"> | string
    createdAt?: DateTimeFilter<"TeamMember"> | Date | string
    createdBy?: StringFilter<"TeamMember"> | string
    team?: XOR<TeamRelationFilter, TeamWhereInput>
    permissions?: TeamMemberPermissionListRelationFilter
  }, "id" | "teamId_userId">

  export type TeamMemberOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    _count?: TeamMemberCountOrderByAggregateInput
    _max?: TeamMemberMaxOrderByAggregateInput
    _min?: TeamMemberMinOrderByAggregateInput
  }

  export type TeamMemberScalarWhereWithAggregatesInput = {
    AND?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    OR?: TeamMemberScalarWhereWithAggregatesInput[]
    NOT?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamMember"> | string
    teamId?: StringWithAggregatesFilter<"TeamMember"> | string
    userId?: StringWithAggregatesFilter<"TeamMember"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
    createdBy?: StringWithAggregatesFilter<"TeamMember"> | string
  }

  export type TeamMemberPermissionWhereInput = {
    AND?: TeamMemberPermissionWhereInput | TeamMemberPermissionWhereInput[]
    OR?: TeamMemberPermissionWhereInput[]
    NOT?: TeamMemberPermissionWhereInput | TeamMemberPermissionWhereInput[]
    teamMemberId?: StringFilter<"TeamMemberPermission"> | string
    permission?: EnumEPermissionsFilter<"TeamMemberPermission"> | $Enums.EPermissions
    teamMember?: XOR<TeamMemberRelationFilter, TeamMemberWhereInput>
  }

  export type TeamMemberPermissionOrderByWithRelationInput = {
    teamMemberId?: SortOrder
    permission?: SortOrder
    teamMember?: TeamMemberOrderByWithRelationInput
  }

  export type TeamMemberPermissionWhereUniqueInput = Prisma.AtLeast<{
    teamMemberId_permission?: TeamMemberPermissionTeamMemberIdPermissionCompoundUniqueInput
    AND?: TeamMemberPermissionWhereInput | TeamMemberPermissionWhereInput[]
    OR?: TeamMemberPermissionWhereInput[]
    NOT?: TeamMemberPermissionWhereInput | TeamMemberPermissionWhereInput[]
    teamMemberId?: StringFilter<"TeamMemberPermission"> | string
    permission?: EnumEPermissionsFilter<"TeamMemberPermission"> | $Enums.EPermissions
    teamMember?: XOR<TeamMemberRelationFilter, TeamMemberWhereInput>
  }, "teamMemberId_permission">

  export type TeamMemberPermissionOrderByWithAggregationInput = {
    teamMemberId?: SortOrder
    permission?: SortOrder
    _count?: TeamMemberPermissionCountOrderByAggregateInput
    _max?: TeamMemberPermissionMaxOrderByAggregateInput
    _min?: TeamMemberPermissionMinOrderByAggregateInput
  }

  export type TeamMemberPermissionScalarWhereWithAggregatesInput = {
    AND?: TeamMemberPermissionScalarWhereWithAggregatesInput | TeamMemberPermissionScalarWhereWithAggregatesInput[]
    OR?: TeamMemberPermissionScalarWhereWithAggregatesInput[]
    NOT?: TeamMemberPermissionScalarWhereWithAggregatesInput | TeamMemberPermissionScalarWhereWithAggregatesInput[]
    teamMemberId?: StringWithAggregatesFilter<"TeamMemberPermission"> | string
    permission?: EnumEPermissionsWithAggregatesFilter<"TeamMemberPermission"> | $Enums.EPermissions
  }

  export type PublicLinkWhereInput = {
    AND?: PublicLinkWhereInput | PublicLinkWhereInput[]
    OR?: PublicLinkWhereInput[]
    NOT?: PublicLinkWhereInput | PublicLinkWhereInput[]
    id?: StringFilter<"PublicLink"> | string
    listId?: StringFilter<"PublicLink"> | string
    token?: StringFilter<"PublicLink"> | string
    passwordHash?: StringNullableFilter<"PublicLink"> | string | null
    createdAt?: DateTimeFilter<"PublicLink"> | Date | string
    createdBy?: StringFilter<"PublicLink"> | string
    updatedAt?: DateTimeFilter<"PublicLink"> | Date | string
    list?: XOR<ListRelationFilter, ListWhereInput>
  }

  export type PublicLinkOrderByWithRelationInput = {
    id?: SortOrder
    listId?: SortOrder
    token?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    list?: ListOrderByWithRelationInput
  }

  export type PublicLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    listId?: string
    token?: string
    AND?: PublicLinkWhereInput | PublicLinkWhereInput[]
    OR?: PublicLinkWhereInput[]
    NOT?: PublicLinkWhereInput | PublicLinkWhereInput[]
    passwordHash?: StringNullableFilter<"PublicLink"> | string | null
    createdAt?: DateTimeFilter<"PublicLink"> | Date | string
    createdBy?: StringFilter<"PublicLink"> | string
    updatedAt?: DateTimeFilter<"PublicLink"> | Date | string
    list?: XOR<ListRelationFilter, ListWhereInput>
  }, "id" | "listId" | "token">

  export type PublicLinkOrderByWithAggregationInput = {
    id?: SortOrder
    listId?: SortOrder
    token?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    _count?: PublicLinkCountOrderByAggregateInput
    _max?: PublicLinkMaxOrderByAggregateInput
    _min?: PublicLinkMinOrderByAggregateInput
  }

  export type PublicLinkScalarWhereWithAggregatesInput = {
    AND?: PublicLinkScalarWhereWithAggregatesInput | PublicLinkScalarWhereWithAggregatesInput[]
    OR?: PublicLinkScalarWhereWithAggregatesInput[]
    NOT?: PublicLinkScalarWhereWithAggregatesInput | PublicLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PublicLink"> | string
    listId?: StringWithAggregatesFilter<"PublicLink"> | string
    token?: StringWithAggregatesFilter<"PublicLink"> | string
    passwordHash?: StringNullableWithAggregatesFilter<"PublicLink"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PublicLink"> | Date | string
    createdBy?: StringWithAggregatesFilter<"PublicLink"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"PublicLink"> | Date | string
  }

  export type ListWhereInput = {
    AND?: ListWhereInput | ListWhereInput[]
    OR?: ListWhereInput[]
    NOT?: ListWhereInput | ListWhereInput[]
    id?: StringFilter<"List"> | string
    title?: StringFilter<"List"> | string
    userId?: StringNullableFilter<"List"> | string | null
    teamId?: StringNullableFilter<"List"> | string | null
    createdAt?: DateTimeFilter<"List"> | Date | string
    createdBy?: StringFilter<"List"> | string
    updatedAt?: DateTimeFilter<"List"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    team?: XOR<TeamNullableRelationFilter, TeamWhereInput> | null
    items?: List_itemListRelationFilter
    publicLink?: XOR<PublicLinkNullableRelationFilter, PublicLinkWhereInput> | null
  }

  export type ListOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    userId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
    items?: List_itemOrderByRelationAggregateInput
    publicLink?: PublicLinkOrderByWithRelationInput
  }

  export type ListWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    title?: string
    AND?: ListWhereInput | ListWhereInput[]
    OR?: ListWhereInput[]
    NOT?: ListWhereInput | ListWhereInput[]
    userId?: StringNullableFilter<"List"> | string | null
    teamId?: StringNullableFilter<"List"> | string | null
    createdAt?: DateTimeFilter<"List"> | Date | string
    createdBy?: StringFilter<"List"> | string
    updatedAt?: DateTimeFilter<"List"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    team?: XOR<TeamNullableRelationFilter, TeamWhereInput> | null
    items?: List_itemListRelationFilter
    publicLink?: XOR<PublicLinkNullableRelationFilter, PublicLinkWhereInput> | null
  }, "id" | "title">

  export type ListOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    userId?: SortOrderInput | SortOrder
    teamId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    _count?: ListCountOrderByAggregateInput
    _max?: ListMaxOrderByAggregateInput
    _min?: ListMinOrderByAggregateInput
  }

  export type ListScalarWhereWithAggregatesInput = {
    AND?: ListScalarWhereWithAggregatesInput | ListScalarWhereWithAggregatesInput[]
    OR?: ListScalarWhereWithAggregatesInput[]
    NOT?: ListScalarWhereWithAggregatesInput | ListScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"List"> | string
    title?: StringWithAggregatesFilter<"List"> | string
    userId?: StringNullableWithAggregatesFilter<"List"> | string | null
    teamId?: StringNullableWithAggregatesFilter<"List"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"List"> | Date | string
    createdBy?: StringWithAggregatesFilter<"List"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"List"> | Date | string
  }

  export type List_itemWhereInput = {
    AND?: List_itemWhereInput | List_itemWhereInput[]
    OR?: List_itemWhereInput[]
    NOT?: List_itemWhereInput | List_itemWhereInput[]
    id?: StringFilter<"List_item"> | string
    itemnumber?: IntFilter<"List_item"> | number
    listId?: StringFilter<"List_item"> | string
    description?: StringFilter<"List_item"> | string
    uploadedFiles?: StringNullableListFilter<"List_item">
    comment?: StringNullableFilter<"List_item"> | string | null
    status?: EnumEItemStatusFilter<"List_item"> | $Enums.EItemStatus
    delivered?: BoolFilter<"List_item"> | boolean
    deadline?: DateTimeFilter<"List_item"> | Date | string
    createdAt?: DateTimeFilter<"List_item"> | Date | string
    createdBy?: StringFilter<"List_item"> | string
    updatedAt?: DateTimeFilter<"List_item"> | Date | string
    list?: XOR<ListRelationFilter, ListWhereInput>
  }

  export type List_itemOrderByWithRelationInput = {
    id?: SortOrder
    itemnumber?: SortOrder
    listId?: SortOrder
    description?: SortOrder
    uploadedFiles?: SortOrder
    comment?: SortOrderInput | SortOrder
    status?: SortOrder
    delivered?: SortOrder
    deadline?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    list?: ListOrderByWithRelationInput
  }

  export type List_itemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    listId_itemnumber?: List_itemListIdItemnumberCompoundUniqueInput
    AND?: List_itemWhereInput | List_itemWhereInput[]
    OR?: List_itemWhereInput[]
    NOT?: List_itemWhereInput | List_itemWhereInput[]
    itemnumber?: IntFilter<"List_item"> | number
    listId?: StringFilter<"List_item"> | string
    description?: StringFilter<"List_item"> | string
    uploadedFiles?: StringNullableListFilter<"List_item">
    comment?: StringNullableFilter<"List_item"> | string | null
    status?: EnumEItemStatusFilter<"List_item"> | $Enums.EItemStatus
    delivered?: BoolFilter<"List_item"> | boolean
    deadline?: DateTimeFilter<"List_item"> | Date | string
    createdAt?: DateTimeFilter<"List_item"> | Date | string
    createdBy?: StringFilter<"List_item"> | string
    updatedAt?: DateTimeFilter<"List_item"> | Date | string
    list?: XOR<ListRelationFilter, ListWhereInput>
  }, "id" | "listId_itemnumber">

  export type List_itemOrderByWithAggregationInput = {
    id?: SortOrder
    itemnumber?: SortOrder
    listId?: SortOrder
    description?: SortOrder
    uploadedFiles?: SortOrder
    comment?: SortOrderInput | SortOrder
    status?: SortOrder
    delivered?: SortOrder
    deadline?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    _count?: List_itemCountOrderByAggregateInput
    _avg?: List_itemAvgOrderByAggregateInput
    _max?: List_itemMaxOrderByAggregateInput
    _min?: List_itemMinOrderByAggregateInput
    _sum?: List_itemSumOrderByAggregateInput
  }

  export type List_itemScalarWhereWithAggregatesInput = {
    AND?: List_itemScalarWhereWithAggregatesInput | List_itemScalarWhereWithAggregatesInput[]
    OR?: List_itemScalarWhereWithAggregatesInput[]
    NOT?: List_itemScalarWhereWithAggregatesInput | List_itemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"List_item"> | string
    itemnumber?: IntWithAggregatesFilter<"List_item"> | number
    listId?: StringWithAggregatesFilter<"List_item"> | string
    description?: StringWithAggregatesFilter<"List_item"> | string
    uploadedFiles?: StringNullableListFilter<"List_item">
    comment?: StringNullableWithAggregatesFilter<"List_item"> | string | null
    status?: EnumEItemStatusWithAggregatesFilter<"List_item"> | $Enums.EItemStatus
    delivered?: BoolWithAggregatesFilter<"List_item"> | boolean
    deadline?: DateTimeWithAggregatesFilter<"List_item"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"List_item"> | Date | string
    createdBy?: StringWithAggregatesFilter<"List_item"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"List_item"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storage?: StorageCreateNestedOneWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storage?: StorageUncheckedCreateNestedOneWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storage?: StorageUpdateOneWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storage?: StorageUncheckedUpdateOneWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorageCreateInput = {
    id?: string
    type: $Enums.EStorageType
    displayName: string
    storagePath?: string | null
    refreshToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutStorageInput
    team?: TeamCreateNestedOneWithoutStorageInput
  }

  export type StorageUncheckedCreateInput = {
    id?: string
    type: $Enums.EStorageType
    displayName: string
    storagePath?: string | null
    refreshToken: string
    userId?: string | null
    teamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StorageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEStorageTypeFieldUpdateOperationsInput | $Enums.EStorageType
    displayName?: StringFieldUpdateOperationsInput | string
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutStorageNestedInput
    team?: TeamUpdateOneWithoutStorageNestedInput
  }

  export type StorageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEStorageTypeFieldUpdateOperationsInput | $Enums.EStorageType
    displayName?: StringFieldUpdateOperationsInput | string
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorageCreateManyInput = {
    id?: string
    type: $Enums.EStorageType
    displayName: string
    storagePath?: string | null
    refreshToken: string
    userId?: string | null
    teamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StorageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEStorageTypeFieldUpdateOperationsInput | $Enums.EStorageType
    displayName?: StringFieldUpdateOperationsInput | string
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEStorageTypeFieldUpdateOperationsInput | $Enums.EStorageType
    displayName?: StringFieldUpdateOperationsInput | string
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamCreateInput = {
    id?: string
    title: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storage?: StorageCreateNestedOneWithoutTeamInput
    lists?: ListCreateNestedManyWithoutTeamInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    title: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storage?: StorageUncheckedCreateNestedOneWithoutTeamInput
    lists?: ListUncheckedCreateNestedManyWithoutTeamInput
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storage?: StorageUpdateOneWithoutTeamNestedInput
    lists?: ListUpdateManyWithoutTeamNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storage?: StorageUncheckedUpdateOneWithoutTeamNestedInput
    lists?: ListUncheckedUpdateManyWithoutTeamNestedInput
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    title: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    createdBy: string
    team: TeamCreateNestedOneWithoutMembersInput
    permissions?: TeamMemberPermissionCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUncheckedCreateInput = {
    id?: string
    teamId: string
    userId: string
    createdAt?: Date | string
    createdBy: string
    permissions?: TeamMemberPermissionUncheckedCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    team?: TeamUpdateOneRequiredWithoutMembersNestedInput
    permissions?: TeamMemberPermissionUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    permissions?: TeamMemberPermissionUncheckedUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberCreateManyInput = {
    id?: string
    teamId: string
    userId: string
    createdAt?: Date | string
    createdBy: string
  }

  export type TeamMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type TeamMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type TeamMemberPermissionCreateInput = {
    permission: $Enums.EPermissions
    teamMember: TeamMemberCreateNestedOneWithoutPermissionsInput
  }

  export type TeamMemberPermissionUncheckedCreateInput = {
    teamMemberId: string
    permission: $Enums.EPermissions
  }

  export type TeamMemberPermissionUpdateInput = {
    permission?: EnumEPermissionsFieldUpdateOperationsInput | $Enums.EPermissions
    teamMember?: TeamMemberUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type TeamMemberPermissionUncheckedUpdateInput = {
    teamMemberId?: StringFieldUpdateOperationsInput | string
    permission?: EnumEPermissionsFieldUpdateOperationsInput | $Enums.EPermissions
  }

  export type TeamMemberPermissionCreateManyInput = {
    teamMemberId: string
    permission: $Enums.EPermissions
  }

  export type TeamMemberPermissionUpdateManyMutationInput = {
    permission?: EnumEPermissionsFieldUpdateOperationsInput | $Enums.EPermissions
  }

  export type TeamMemberPermissionUncheckedUpdateManyInput = {
    teamMemberId?: StringFieldUpdateOperationsInput | string
    permission?: EnumEPermissionsFieldUpdateOperationsInput | $Enums.EPermissions
  }

  export type PublicLinkCreateInput = {
    id?: string
    token: string
    passwordHash?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    list: ListCreateNestedOneWithoutPublicLinkInput
  }

  export type PublicLinkUncheckedCreateInput = {
    id?: string
    listId: string
    token: string
    passwordHash?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type PublicLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    list?: ListUpdateOneRequiredWithoutPublicLinkNestedInput
  }

  export type PublicLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicLinkCreateManyInput = {
    id?: string
    listId: string
    token: string
    passwordHash?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type PublicLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    listId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListCreateInput = {
    id?: string
    title: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutListsInput
    team?: TeamCreateNestedOneWithoutListsInput
    items?: List_itemCreateNestedManyWithoutListInput
    publicLink?: PublicLinkCreateNestedOneWithoutListInput
  }

  export type ListUncheckedCreateInput = {
    id?: string
    title: string
    userId?: string | null
    teamId?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    items?: List_itemUncheckedCreateNestedManyWithoutListInput
    publicLink?: PublicLinkUncheckedCreateNestedOneWithoutListInput
  }

  export type ListUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutListsNestedInput
    team?: TeamUpdateOneWithoutListsNestedInput
    items?: List_itemUpdateManyWithoutListNestedInput
    publicLink?: PublicLinkUpdateOneWithoutListNestedInput
  }

  export type ListUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: List_itemUncheckedUpdateManyWithoutListNestedInput
    publicLink?: PublicLinkUncheckedUpdateOneWithoutListNestedInput
  }

  export type ListCreateManyInput = {
    id?: string
    title: string
    userId?: string | null
    teamId?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type ListUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type List_itemCreateInput = {
    id?: string
    itemnumber: number
    description: string
    uploadedFiles?: List_itemCreateuploadedFilesInput | string[]
    comment?: string | null
    status?: $Enums.EItemStatus
    delivered?: boolean
    deadline?: Date | string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    list: ListCreateNestedOneWithoutItemsInput
  }

  export type List_itemUncheckedCreateInput = {
    id?: string
    itemnumber: number
    listId: string
    description: string
    uploadedFiles?: List_itemCreateuploadedFilesInput | string[]
    comment?: string | null
    status?: $Enums.EItemStatus
    delivered?: boolean
    deadline?: Date | string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type List_itemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemnumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: List_itemUpdateuploadedFilesInput | string[]
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEItemStatusFieldUpdateOperationsInput | $Enums.EItemStatus
    delivered?: BoolFieldUpdateOperationsInput | boolean
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    list?: ListUpdateOneRequiredWithoutItemsNestedInput
  }

  export type List_itemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemnumber?: IntFieldUpdateOperationsInput | number
    listId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: List_itemUpdateuploadedFilesInput | string[]
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEItemStatusFieldUpdateOperationsInput | $Enums.EItemStatus
    delivered?: BoolFieldUpdateOperationsInput | boolean
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type List_itemCreateManyInput = {
    id?: string
    itemnumber: number
    listId: string
    description: string
    uploadedFiles?: List_itemCreateuploadedFilesInput | string[]
    comment?: string | null
    status?: $Enums.EItemStatus
    delivered?: boolean
    deadline?: Date | string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type List_itemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemnumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: List_itemUpdateuploadedFilesInput | string[]
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEItemStatusFieldUpdateOperationsInput | $Enums.EItemStatus
    delivered?: BoolFieldUpdateOperationsInput | boolean
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type List_itemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemnumber?: IntFieldUpdateOperationsInput | number
    listId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: List_itemUpdateuploadedFilesInput | string[]
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEItemStatusFieldUpdateOperationsInput | $Enums.EItemStatus
    delivered?: BoolFieldUpdateOperationsInput | boolean
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StorageNullableRelationFilter = {
    is?: StorageWhereInput | null
    isNot?: StorageWhereInput | null
  }

  export type ListListRelationFilter = {
    every?: ListWhereInput
    some?: ListWhereInput
    none?: ListWhereInput
  }

  export type ListOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumEStorageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EStorageType | EnumEStorageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EStorageType[] | ListEnumEStorageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EStorageType[] | ListEnumEStorageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEStorageTypeFilter<$PrismaModel> | $Enums.EStorageType
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TeamNullableRelationFilter = {
    is?: TeamWhereInput | null
    isNot?: TeamWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StorageCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    displayName?: SortOrder
    storagePath?: SortOrder
    refreshToken?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StorageMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    displayName?: SortOrder
    storagePath?: SortOrder
    refreshToken?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StorageMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    displayName?: SortOrder
    storagePath?: SortOrder
    refreshToken?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumEStorageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EStorageType | EnumEStorageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EStorageType[] | ListEnumEStorageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EStorageType[] | ListEnumEStorageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEStorageTypeWithAggregatesFilter<$PrismaModel> | $Enums.EStorageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEStorageTypeFilter<$PrismaModel>
    _max?: NestedEnumEStorageTypeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TeamMemberListRelationFilter = {
    every?: TeamMemberWhereInput
    some?: TeamMemberWhereInput
    none?: TeamMemberWhereInput
  }

  export type TeamMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type TeamMemberPermissionListRelationFilter = {
    every?: TeamMemberPermissionWhereInput
    some?: TeamMemberPermissionWhereInput
    none?: TeamMemberPermissionWhereInput
  }

  export type TeamMemberPermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamMemberTeamIdUserIdCompoundUniqueInput = {
    teamId: string
    userId: string
  }

  export type TeamMemberCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type TeamMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type TeamMemberMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type EnumEPermissionsFilter<$PrismaModel = never> = {
    equals?: $Enums.EPermissions | EnumEPermissionsFieldRefInput<$PrismaModel>
    in?: $Enums.EPermissions[] | ListEnumEPermissionsFieldRefInput<$PrismaModel>
    notIn?: $Enums.EPermissions[] | ListEnumEPermissionsFieldRefInput<$PrismaModel>
    not?: NestedEnumEPermissionsFilter<$PrismaModel> | $Enums.EPermissions
  }

  export type TeamMemberRelationFilter = {
    is?: TeamMemberWhereInput
    isNot?: TeamMemberWhereInput
  }

  export type TeamMemberPermissionTeamMemberIdPermissionCompoundUniqueInput = {
    teamMemberId: string
    permission: $Enums.EPermissions
  }

  export type TeamMemberPermissionCountOrderByAggregateInput = {
    teamMemberId?: SortOrder
    permission?: SortOrder
  }

  export type TeamMemberPermissionMaxOrderByAggregateInput = {
    teamMemberId?: SortOrder
    permission?: SortOrder
  }

  export type TeamMemberPermissionMinOrderByAggregateInput = {
    teamMemberId?: SortOrder
    permission?: SortOrder
  }

  export type EnumEPermissionsWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EPermissions | EnumEPermissionsFieldRefInput<$PrismaModel>
    in?: $Enums.EPermissions[] | ListEnumEPermissionsFieldRefInput<$PrismaModel>
    notIn?: $Enums.EPermissions[] | ListEnumEPermissionsFieldRefInput<$PrismaModel>
    not?: NestedEnumEPermissionsWithAggregatesFilter<$PrismaModel> | $Enums.EPermissions
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEPermissionsFilter<$PrismaModel>
    _max?: NestedEnumEPermissionsFilter<$PrismaModel>
  }

  export type ListRelationFilter = {
    is?: ListWhereInput
    isNot?: ListWhereInput
  }

  export type PublicLinkCountOrderByAggregateInput = {
    id?: SortOrder
    listId?: SortOrder
    token?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    listId?: SortOrder
    token?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicLinkMinOrderByAggregateInput = {
    id?: SortOrder
    listId?: SortOrder
    token?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type List_itemListRelationFilter = {
    every?: List_itemWhereInput
    some?: List_itemWhereInput
    none?: List_itemWhereInput
  }

  export type PublicLinkNullableRelationFilter = {
    is?: PublicLinkWhereInput | null
    isNot?: PublicLinkWhereInput | null
  }

  export type List_itemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumEItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EItemStatus | EnumEItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EItemStatus[] | ListEnumEItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EItemStatus[] | ListEnumEItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEItemStatusFilter<$PrismaModel> | $Enums.EItemStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type List_itemListIdItemnumberCompoundUniqueInput = {
    listId: string
    itemnumber: number
  }

  export type List_itemCountOrderByAggregateInput = {
    id?: SortOrder
    itemnumber?: SortOrder
    listId?: SortOrder
    description?: SortOrder
    uploadedFiles?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    delivered?: SortOrder
    deadline?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type List_itemAvgOrderByAggregateInput = {
    itemnumber?: SortOrder
  }

  export type List_itemMaxOrderByAggregateInput = {
    id?: SortOrder
    itemnumber?: SortOrder
    listId?: SortOrder
    description?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    delivered?: SortOrder
    deadline?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type List_itemMinOrderByAggregateInput = {
    id?: SortOrder
    itemnumber?: SortOrder
    listId?: SortOrder
    description?: SortOrder
    comment?: SortOrder
    status?: SortOrder
    delivered?: SortOrder
    deadline?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type List_itemSumOrderByAggregateInput = {
    itemnumber?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumEItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EItemStatus | EnumEItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EItemStatus[] | ListEnumEItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EItemStatus[] | ListEnumEItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.EItemStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEItemStatusFilter<$PrismaModel>
    _max?: NestedEnumEItemStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StorageCreateNestedOneWithoutUserInput = {
    create?: XOR<StorageCreateWithoutUserInput, StorageUncheckedCreateWithoutUserInput>
    connectOrCreate?: StorageCreateOrConnectWithoutUserInput
    connect?: StorageWhereUniqueInput
  }

  export type ListCreateNestedManyWithoutUserInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type StorageUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StorageCreateWithoutUserInput, StorageUncheckedCreateWithoutUserInput>
    connectOrCreate?: StorageCreateOrConnectWithoutUserInput
    connect?: StorageWhereUniqueInput
  }

  export type ListUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StorageUpdateOneWithoutUserNestedInput = {
    create?: XOR<StorageCreateWithoutUserInput, StorageUncheckedCreateWithoutUserInput>
    connectOrCreate?: StorageCreateOrConnectWithoutUserInput
    upsert?: StorageUpsertWithoutUserInput
    disconnect?: StorageWhereInput | boolean
    delete?: StorageWhereInput | boolean
    connect?: StorageWhereUniqueInput
    update?: XOR<XOR<StorageUpdateToOneWithWhereWithoutUserInput, StorageUpdateWithoutUserInput>, StorageUncheckedUpdateWithoutUserInput>
  }

  export type ListUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutUserInput | ListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutUserInput | ListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListUpdateManyWithWhereWithoutUserInput | ListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type StorageUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StorageCreateWithoutUserInput, StorageUncheckedCreateWithoutUserInput>
    connectOrCreate?: StorageCreateOrConnectWithoutUserInput
    upsert?: StorageUpsertWithoutUserInput
    disconnect?: StorageWhereInput | boolean
    delete?: StorageWhereInput | boolean
    connect?: StorageWhereUniqueInput
    update?: XOR<XOR<StorageUpdateToOneWithWhereWithoutUserInput, StorageUpdateWithoutUserInput>, StorageUncheckedUpdateWithoutUserInput>
  }

  export type ListUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutUserInput | ListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutUserInput | ListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListUpdateManyWithWhereWithoutUserInput | ListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStorageInput = {
    create?: XOR<UserCreateWithoutStorageInput, UserUncheckedCreateWithoutStorageInput>
    connectOrCreate?: UserCreateOrConnectWithoutStorageInput
    connect?: UserWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutStorageInput = {
    create?: XOR<TeamCreateWithoutStorageInput, TeamUncheckedCreateWithoutStorageInput>
    connectOrCreate?: TeamCreateOrConnectWithoutStorageInput
    connect?: TeamWhereUniqueInput
  }

  export type EnumEStorageTypeFieldUpdateOperationsInput = {
    set?: $Enums.EStorageType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneWithoutStorageNestedInput = {
    create?: XOR<UserCreateWithoutStorageInput, UserUncheckedCreateWithoutStorageInput>
    connectOrCreate?: UserCreateOrConnectWithoutStorageInput
    upsert?: UserUpsertWithoutStorageInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStorageInput, UserUpdateWithoutStorageInput>, UserUncheckedUpdateWithoutStorageInput>
  }

  export type TeamUpdateOneWithoutStorageNestedInput = {
    create?: XOR<TeamCreateWithoutStorageInput, TeamUncheckedCreateWithoutStorageInput>
    connectOrCreate?: TeamCreateOrConnectWithoutStorageInput
    upsert?: TeamUpsertWithoutStorageInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutStorageInput, TeamUpdateWithoutStorageInput>, TeamUncheckedUpdateWithoutStorageInput>
  }

  export type StorageCreateNestedOneWithoutTeamInput = {
    create?: XOR<StorageCreateWithoutTeamInput, StorageUncheckedCreateWithoutTeamInput>
    connectOrCreate?: StorageCreateOrConnectWithoutTeamInput
    connect?: StorageWhereUniqueInput
  }

  export type ListCreateNestedManyWithoutTeamInput = {
    create?: XOR<ListCreateWithoutTeamInput, ListUncheckedCreateWithoutTeamInput> | ListCreateWithoutTeamInput[] | ListUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ListCreateOrConnectWithoutTeamInput | ListCreateOrConnectWithoutTeamInput[]
    createMany?: ListCreateManyTeamInputEnvelope
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type TeamMemberCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type StorageUncheckedCreateNestedOneWithoutTeamInput = {
    create?: XOR<StorageCreateWithoutTeamInput, StorageUncheckedCreateWithoutTeamInput>
    connectOrCreate?: StorageCreateOrConnectWithoutTeamInput
    connect?: StorageWhereUniqueInput
  }

  export type ListUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<ListCreateWithoutTeamInput, ListUncheckedCreateWithoutTeamInput> | ListCreateWithoutTeamInput[] | ListUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ListCreateOrConnectWithoutTeamInput | ListCreateOrConnectWithoutTeamInput[]
    createMany?: ListCreateManyTeamInputEnvelope
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type TeamMemberUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type StorageUpdateOneWithoutTeamNestedInput = {
    create?: XOR<StorageCreateWithoutTeamInput, StorageUncheckedCreateWithoutTeamInput>
    connectOrCreate?: StorageCreateOrConnectWithoutTeamInput
    upsert?: StorageUpsertWithoutTeamInput
    disconnect?: StorageWhereInput | boolean
    delete?: StorageWhereInput | boolean
    connect?: StorageWhereUniqueInput
    update?: XOR<XOR<StorageUpdateToOneWithWhereWithoutTeamInput, StorageUpdateWithoutTeamInput>, StorageUncheckedUpdateWithoutTeamInput>
  }

  export type ListUpdateManyWithoutTeamNestedInput = {
    create?: XOR<ListCreateWithoutTeamInput, ListUncheckedCreateWithoutTeamInput> | ListCreateWithoutTeamInput[] | ListUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ListCreateOrConnectWithoutTeamInput | ListCreateOrConnectWithoutTeamInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutTeamInput | ListUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: ListCreateManyTeamInputEnvelope
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutTeamInput | ListUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: ListUpdateManyWithWhereWithoutTeamInput | ListUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type TeamMemberUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutTeamInput | TeamMemberUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutTeamInput | TeamMemberUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutTeamInput | TeamMemberUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type StorageUncheckedUpdateOneWithoutTeamNestedInput = {
    create?: XOR<StorageCreateWithoutTeamInput, StorageUncheckedCreateWithoutTeamInput>
    connectOrCreate?: StorageCreateOrConnectWithoutTeamInput
    upsert?: StorageUpsertWithoutTeamInput
    disconnect?: StorageWhereInput | boolean
    delete?: StorageWhereInput | boolean
    connect?: StorageWhereUniqueInput
    update?: XOR<XOR<StorageUpdateToOneWithWhereWithoutTeamInput, StorageUpdateWithoutTeamInput>, StorageUncheckedUpdateWithoutTeamInput>
  }

  export type ListUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<ListCreateWithoutTeamInput, ListUncheckedCreateWithoutTeamInput> | ListCreateWithoutTeamInput[] | ListUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: ListCreateOrConnectWithoutTeamInput | ListCreateOrConnectWithoutTeamInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutTeamInput | ListUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: ListCreateManyTeamInputEnvelope
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutTeamInput | ListUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: ListUpdateManyWithWhereWithoutTeamInput | ListUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type TeamMemberUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutTeamInput | TeamMemberUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutTeamInput | TeamMemberUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutTeamInput | TeamMemberUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type TeamCreateNestedOneWithoutMembersInput = {
    create?: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMembersInput
    connect?: TeamWhereUniqueInput
  }

  export type TeamMemberPermissionCreateNestedManyWithoutTeamMemberInput = {
    create?: XOR<TeamMemberPermissionCreateWithoutTeamMemberInput, TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput> | TeamMemberPermissionCreateWithoutTeamMemberInput[] | TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: TeamMemberPermissionCreateOrConnectWithoutTeamMemberInput | TeamMemberPermissionCreateOrConnectWithoutTeamMemberInput[]
    createMany?: TeamMemberPermissionCreateManyTeamMemberInputEnvelope
    connect?: TeamMemberPermissionWhereUniqueInput | TeamMemberPermissionWhereUniqueInput[]
  }

  export type TeamMemberPermissionUncheckedCreateNestedManyWithoutTeamMemberInput = {
    create?: XOR<TeamMemberPermissionCreateWithoutTeamMemberInput, TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput> | TeamMemberPermissionCreateWithoutTeamMemberInput[] | TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: TeamMemberPermissionCreateOrConnectWithoutTeamMemberInput | TeamMemberPermissionCreateOrConnectWithoutTeamMemberInput[]
    createMany?: TeamMemberPermissionCreateManyTeamMemberInputEnvelope
    connect?: TeamMemberPermissionWhereUniqueInput | TeamMemberPermissionWhereUniqueInput[]
  }

  export type TeamUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMembersInput
    upsert?: TeamUpsertWithoutMembersInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutMembersInput, TeamUpdateWithoutMembersInput>, TeamUncheckedUpdateWithoutMembersInput>
  }

  export type TeamMemberPermissionUpdateManyWithoutTeamMemberNestedInput = {
    create?: XOR<TeamMemberPermissionCreateWithoutTeamMemberInput, TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput> | TeamMemberPermissionCreateWithoutTeamMemberInput[] | TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: TeamMemberPermissionCreateOrConnectWithoutTeamMemberInput | TeamMemberPermissionCreateOrConnectWithoutTeamMemberInput[]
    upsert?: TeamMemberPermissionUpsertWithWhereUniqueWithoutTeamMemberInput | TeamMemberPermissionUpsertWithWhereUniqueWithoutTeamMemberInput[]
    createMany?: TeamMemberPermissionCreateManyTeamMemberInputEnvelope
    set?: TeamMemberPermissionWhereUniqueInput | TeamMemberPermissionWhereUniqueInput[]
    disconnect?: TeamMemberPermissionWhereUniqueInput | TeamMemberPermissionWhereUniqueInput[]
    delete?: TeamMemberPermissionWhereUniqueInput | TeamMemberPermissionWhereUniqueInput[]
    connect?: TeamMemberPermissionWhereUniqueInput | TeamMemberPermissionWhereUniqueInput[]
    update?: TeamMemberPermissionUpdateWithWhereUniqueWithoutTeamMemberInput | TeamMemberPermissionUpdateWithWhereUniqueWithoutTeamMemberInput[]
    updateMany?: TeamMemberPermissionUpdateManyWithWhereWithoutTeamMemberInput | TeamMemberPermissionUpdateManyWithWhereWithoutTeamMemberInput[]
    deleteMany?: TeamMemberPermissionScalarWhereInput | TeamMemberPermissionScalarWhereInput[]
  }

  export type TeamMemberPermissionUncheckedUpdateManyWithoutTeamMemberNestedInput = {
    create?: XOR<TeamMemberPermissionCreateWithoutTeamMemberInput, TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput> | TeamMemberPermissionCreateWithoutTeamMemberInput[] | TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput[]
    connectOrCreate?: TeamMemberPermissionCreateOrConnectWithoutTeamMemberInput | TeamMemberPermissionCreateOrConnectWithoutTeamMemberInput[]
    upsert?: TeamMemberPermissionUpsertWithWhereUniqueWithoutTeamMemberInput | TeamMemberPermissionUpsertWithWhereUniqueWithoutTeamMemberInput[]
    createMany?: TeamMemberPermissionCreateManyTeamMemberInputEnvelope
    set?: TeamMemberPermissionWhereUniqueInput | TeamMemberPermissionWhereUniqueInput[]
    disconnect?: TeamMemberPermissionWhereUniqueInput | TeamMemberPermissionWhereUniqueInput[]
    delete?: TeamMemberPermissionWhereUniqueInput | TeamMemberPermissionWhereUniqueInput[]
    connect?: TeamMemberPermissionWhereUniqueInput | TeamMemberPermissionWhereUniqueInput[]
    update?: TeamMemberPermissionUpdateWithWhereUniqueWithoutTeamMemberInput | TeamMemberPermissionUpdateWithWhereUniqueWithoutTeamMemberInput[]
    updateMany?: TeamMemberPermissionUpdateManyWithWhereWithoutTeamMemberInput | TeamMemberPermissionUpdateManyWithWhereWithoutTeamMemberInput[]
    deleteMany?: TeamMemberPermissionScalarWhereInput | TeamMemberPermissionScalarWhereInput[]
  }

  export type TeamMemberCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<TeamMemberCreateWithoutPermissionsInput, TeamMemberUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutPermissionsInput
    connect?: TeamMemberWhereUniqueInput
  }

  export type EnumEPermissionsFieldUpdateOperationsInput = {
    set?: $Enums.EPermissions
  }

  export type TeamMemberUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<TeamMemberCreateWithoutPermissionsInput, TeamMemberUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: TeamMemberCreateOrConnectWithoutPermissionsInput
    upsert?: TeamMemberUpsertWithoutPermissionsInput
    connect?: TeamMemberWhereUniqueInput
    update?: XOR<XOR<TeamMemberUpdateToOneWithWhereWithoutPermissionsInput, TeamMemberUpdateWithoutPermissionsInput>, TeamMemberUncheckedUpdateWithoutPermissionsInput>
  }

  export type ListCreateNestedOneWithoutPublicLinkInput = {
    create?: XOR<ListCreateWithoutPublicLinkInput, ListUncheckedCreateWithoutPublicLinkInput>
    connectOrCreate?: ListCreateOrConnectWithoutPublicLinkInput
    connect?: ListWhereUniqueInput
  }

  export type ListUpdateOneRequiredWithoutPublicLinkNestedInput = {
    create?: XOR<ListCreateWithoutPublicLinkInput, ListUncheckedCreateWithoutPublicLinkInput>
    connectOrCreate?: ListCreateOrConnectWithoutPublicLinkInput
    upsert?: ListUpsertWithoutPublicLinkInput
    connect?: ListWhereUniqueInput
    update?: XOR<XOR<ListUpdateToOneWithWhereWithoutPublicLinkInput, ListUpdateWithoutPublicLinkInput>, ListUncheckedUpdateWithoutPublicLinkInput>
  }

  export type UserCreateNestedOneWithoutListsInput = {
    create?: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListsInput
    connect?: UserWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutListsInput = {
    create?: XOR<TeamCreateWithoutListsInput, TeamUncheckedCreateWithoutListsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutListsInput
    connect?: TeamWhereUniqueInput
  }

  export type List_itemCreateNestedManyWithoutListInput = {
    create?: XOR<List_itemCreateWithoutListInput, List_itemUncheckedCreateWithoutListInput> | List_itemCreateWithoutListInput[] | List_itemUncheckedCreateWithoutListInput[]
    connectOrCreate?: List_itemCreateOrConnectWithoutListInput | List_itemCreateOrConnectWithoutListInput[]
    createMany?: List_itemCreateManyListInputEnvelope
    connect?: List_itemWhereUniqueInput | List_itemWhereUniqueInput[]
  }

  export type PublicLinkCreateNestedOneWithoutListInput = {
    create?: XOR<PublicLinkCreateWithoutListInput, PublicLinkUncheckedCreateWithoutListInput>
    connectOrCreate?: PublicLinkCreateOrConnectWithoutListInput
    connect?: PublicLinkWhereUniqueInput
  }

  export type List_itemUncheckedCreateNestedManyWithoutListInput = {
    create?: XOR<List_itemCreateWithoutListInput, List_itemUncheckedCreateWithoutListInput> | List_itemCreateWithoutListInput[] | List_itemUncheckedCreateWithoutListInput[]
    connectOrCreate?: List_itemCreateOrConnectWithoutListInput | List_itemCreateOrConnectWithoutListInput[]
    createMany?: List_itemCreateManyListInputEnvelope
    connect?: List_itemWhereUniqueInput | List_itemWhereUniqueInput[]
  }

  export type PublicLinkUncheckedCreateNestedOneWithoutListInput = {
    create?: XOR<PublicLinkCreateWithoutListInput, PublicLinkUncheckedCreateWithoutListInput>
    connectOrCreate?: PublicLinkCreateOrConnectWithoutListInput
    connect?: PublicLinkWhereUniqueInput
  }

  export type UserUpdateOneWithoutListsNestedInput = {
    create?: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListsInput
    upsert?: UserUpsertWithoutListsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutListsInput, UserUpdateWithoutListsInput>, UserUncheckedUpdateWithoutListsInput>
  }

  export type TeamUpdateOneWithoutListsNestedInput = {
    create?: XOR<TeamCreateWithoutListsInput, TeamUncheckedCreateWithoutListsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutListsInput
    upsert?: TeamUpsertWithoutListsInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutListsInput, TeamUpdateWithoutListsInput>, TeamUncheckedUpdateWithoutListsInput>
  }

  export type List_itemUpdateManyWithoutListNestedInput = {
    create?: XOR<List_itemCreateWithoutListInput, List_itemUncheckedCreateWithoutListInput> | List_itemCreateWithoutListInput[] | List_itemUncheckedCreateWithoutListInput[]
    connectOrCreate?: List_itemCreateOrConnectWithoutListInput | List_itemCreateOrConnectWithoutListInput[]
    upsert?: List_itemUpsertWithWhereUniqueWithoutListInput | List_itemUpsertWithWhereUniqueWithoutListInput[]
    createMany?: List_itemCreateManyListInputEnvelope
    set?: List_itemWhereUniqueInput | List_itemWhereUniqueInput[]
    disconnect?: List_itemWhereUniqueInput | List_itemWhereUniqueInput[]
    delete?: List_itemWhereUniqueInput | List_itemWhereUniqueInput[]
    connect?: List_itemWhereUniqueInput | List_itemWhereUniqueInput[]
    update?: List_itemUpdateWithWhereUniqueWithoutListInput | List_itemUpdateWithWhereUniqueWithoutListInput[]
    updateMany?: List_itemUpdateManyWithWhereWithoutListInput | List_itemUpdateManyWithWhereWithoutListInput[]
    deleteMany?: List_itemScalarWhereInput | List_itemScalarWhereInput[]
  }

  export type PublicLinkUpdateOneWithoutListNestedInput = {
    create?: XOR<PublicLinkCreateWithoutListInput, PublicLinkUncheckedCreateWithoutListInput>
    connectOrCreate?: PublicLinkCreateOrConnectWithoutListInput
    upsert?: PublicLinkUpsertWithoutListInput
    disconnect?: PublicLinkWhereInput | boolean
    delete?: PublicLinkWhereInput | boolean
    connect?: PublicLinkWhereUniqueInput
    update?: XOR<XOR<PublicLinkUpdateToOneWithWhereWithoutListInput, PublicLinkUpdateWithoutListInput>, PublicLinkUncheckedUpdateWithoutListInput>
  }

  export type List_itemUncheckedUpdateManyWithoutListNestedInput = {
    create?: XOR<List_itemCreateWithoutListInput, List_itemUncheckedCreateWithoutListInput> | List_itemCreateWithoutListInput[] | List_itemUncheckedCreateWithoutListInput[]
    connectOrCreate?: List_itemCreateOrConnectWithoutListInput | List_itemCreateOrConnectWithoutListInput[]
    upsert?: List_itemUpsertWithWhereUniqueWithoutListInput | List_itemUpsertWithWhereUniqueWithoutListInput[]
    createMany?: List_itemCreateManyListInputEnvelope
    set?: List_itemWhereUniqueInput | List_itemWhereUniqueInput[]
    disconnect?: List_itemWhereUniqueInput | List_itemWhereUniqueInput[]
    delete?: List_itemWhereUniqueInput | List_itemWhereUniqueInput[]
    connect?: List_itemWhereUniqueInput | List_itemWhereUniqueInput[]
    update?: List_itemUpdateWithWhereUniqueWithoutListInput | List_itemUpdateWithWhereUniqueWithoutListInput[]
    updateMany?: List_itemUpdateManyWithWhereWithoutListInput | List_itemUpdateManyWithWhereWithoutListInput[]
    deleteMany?: List_itemScalarWhereInput | List_itemScalarWhereInput[]
  }

  export type PublicLinkUncheckedUpdateOneWithoutListNestedInput = {
    create?: XOR<PublicLinkCreateWithoutListInput, PublicLinkUncheckedCreateWithoutListInput>
    connectOrCreate?: PublicLinkCreateOrConnectWithoutListInput
    upsert?: PublicLinkUpsertWithoutListInput
    disconnect?: PublicLinkWhereInput | boolean
    delete?: PublicLinkWhereInput | boolean
    connect?: PublicLinkWhereUniqueInput
    update?: XOR<XOR<PublicLinkUpdateToOneWithWhereWithoutListInput, PublicLinkUpdateWithoutListInput>, PublicLinkUncheckedUpdateWithoutListInput>
  }

  export type List_itemCreateuploadedFilesInput = {
    set: string[]
  }

  export type ListCreateNestedOneWithoutItemsInput = {
    create?: XOR<ListCreateWithoutItemsInput, ListUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ListCreateOrConnectWithoutItemsInput
    connect?: ListWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type List_itemUpdateuploadedFilesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumEItemStatusFieldUpdateOperationsInput = {
    set?: $Enums.EItemStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ListUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<ListCreateWithoutItemsInput, ListUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ListCreateOrConnectWithoutItemsInput
    upsert?: ListUpsertWithoutItemsInput
    connect?: ListWhereUniqueInput
    update?: XOR<XOR<ListUpdateToOneWithWhereWithoutItemsInput, ListUpdateWithoutItemsInput>, ListUncheckedUpdateWithoutItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumEStorageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EStorageType | EnumEStorageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EStorageType[] | ListEnumEStorageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EStorageType[] | ListEnumEStorageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEStorageTypeFilter<$PrismaModel> | $Enums.EStorageType
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumEStorageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EStorageType | EnumEStorageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EStorageType[] | ListEnumEStorageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EStorageType[] | ListEnumEStorageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEStorageTypeWithAggregatesFilter<$PrismaModel> | $Enums.EStorageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEStorageTypeFilter<$PrismaModel>
    _max?: NestedEnumEStorageTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumEPermissionsFilter<$PrismaModel = never> = {
    equals?: $Enums.EPermissions | EnumEPermissionsFieldRefInput<$PrismaModel>
    in?: $Enums.EPermissions[] | ListEnumEPermissionsFieldRefInput<$PrismaModel>
    notIn?: $Enums.EPermissions[] | ListEnumEPermissionsFieldRefInput<$PrismaModel>
    not?: NestedEnumEPermissionsFilter<$PrismaModel> | $Enums.EPermissions
  }

  export type NestedEnumEPermissionsWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EPermissions | EnumEPermissionsFieldRefInput<$PrismaModel>
    in?: $Enums.EPermissions[] | ListEnumEPermissionsFieldRefInput<$PrismaModel>
    notIn?: $Enums.EPermissions[] | ListEnumEPermissionsFieldRefInput<$PrismaModel>
    not?: NestedEnumEPermissionsWithAggregatesFilter<$PrismaModel> | $Enums.EPermissions
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEPermissionsFilter<$PrismaModel>
    _max?: NestedEnumEPermissionsFilter<$PrismaModel>
  }

  export type NestedEnumEItemStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EItemStatus | EnumEItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EItemStatus[] | ListEnumEItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EItemStatus[] | ListEnumEItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEItemStatusFilter<$PrismaModel> | $Enums.EItemStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumEItemStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EItemStatus | EnumEItemStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EItemStatus[] | ListEnumEItemStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EItemStatus[] | ListEnumEItemStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEItemStatusWithAggregatesFilter<$PrismaModel> | $Enums.EItemStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEItemStatusFilter<$PrismaModel>
    _max?: NestedEnumEItemStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StorageCreateWithoutUserInput = {
    id?: string
    type: $Enums.EStorageType
    displayName: string
    storagePath?: string | null
    refreshToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    team?: TeamCreateNestedOneWithoutStorageInput
  }

  export type StorageUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.EStorageType
    displayName: string
    storagePath?: string | null
    refreshToken: string
    teamId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StorageCreateOrConnectWithoutUserInput = {
    where: StorageWhereUniqueInput
    create: XOR<StorageCreateWithoutUserInput, StorageUncheckedCreateWithoutUserInput>
  }

  export type ListCreateWithoutUserInput = {
    id?: string
    title: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    team?: TeamCreateNestedOneWithoutListsInput
    items?: List_itemCreateNestedManyWithoutListInput
    publicLink?: PublicLinkCreateNestedOneWithoutListInput
  }

  export type ListUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    teamId?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    items?: List_itemUncheckedCreateNestedManyWithoutListInput
    publicLink?: PublicLinkUncheckedCreateNestedOneWithoutListInput
  }

  export type ListCreateOrConnectWithoutUserInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput>
  }

  export type ListCreateManyUserInputEnvelope = {
    data: ListCreateManyUserInput | ListCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StorageUpsertWithoutUserInput = {
    update: XOR<StorageUpdateWithoutUserInput, StorageUncheckedUpdateWithoutUserInput>
    create: XOR<StorageCreateWithoutUserInput, StorageUncheckedCreateWithoutUserInput>
    where?: StorageWhereInput
  }

  export type StorageUpdateToOneWithWhereWithoutUserInput = {
    where?: StorageWhereInput
    data: XOR<StorageUpdateWithoutUserInput, StorageUncheckedUpdateWithoutUserInput>
  }

  export type StorageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEStorageTypeFieldUpdateOperationsInput | $Enums.EStorageType
    displayName?: StringFieldUpdateOperationsInput | string
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneWithoutStorageNestedInput
  }

  export type StorageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEStorageTypeFieldUpdateOperationsInput | $Enums.EStorageType
    displayName?: StringFieldUpdateOperationsInput | string
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListUpsertWithWhereUniqueWithoutUserInput = {
    where: ListWhereUniqueInput
    update: XOR<ListUpdateWithoutUserInput, ListUncheckedUpdateWithoutUserInput>
    create: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput>
  }

  export type ListUpdateWithWhereUniqueWithoutUserInput = {
    where: ListWhereUniqueInput
    data: XOR<ListUpdateWithoutUserInput, ListUncheckedUpdateWithoutUserInput>
  }

  export type ListUpdateManyWithWhereWithoutUserInput = {
    where: ListScalarWhereInput
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyWithoutUserInput>
  }

  export type ListScalarWhereInput = {
    AND?: ListScalarWhereInput | ListScalarWhereInput[]
    OR?: ListScalarWhereInput[]
    NOT?: ListScalarWhereInput | ListScalarWhereInput[]
    id?: StringFilter<"List"> | string
    title?: StringFilter<"List"> | string
    userId?: StringNullableFilter<"List"> | string | null
    teamId?: StringNullableFilter<"List"> | string | null
    createdAt?: DateTimeFilter<"List"> | Date | string
    createdBy?: StringFilter<"List"> | string
    updatedAt?: DateTimeFilter<"List"> | Date | string
  }

  export type UserCreateWithoutStorageInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lists?: ListCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStorageInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStorageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStorageInput, UserUncheckedCreateWithoutStorageInput>
  }

  export type TeamCreateWithoutStorageInput = {
    id?: string
    title: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lists?: ListCreateNestedManyWithoutTeamInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutStorageInput = {
    id?: string
    title: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lists?: ListUncheckedCreateNestedManyWithoutTeamInput
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutStorageInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutStorageInput, TeamUncheckedCreateWithoutStorageInput>
  }

  export type UserUpsertWithoutStorageInput = {
    update: XOR<UserUpdateWithoutStorageInput, UserUncheckedUpdateWithoutStorageInput>
    create: XOR<UserCreateWithoutStorageInput, UserUncheckedCreateWithoutStorageInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStorageInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStorageInput, UserUncheckedUpdateWithoutStorageInput>
  }

  export type UserUpdateWithoutStorageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lists?: ListUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStorageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TeamUpsertWithoutStorageInput = {
    update: XOR<TeamUpdateWithoutStorageInput, TeamUncheckedUpdateWithoutStorageInput>
    create: XOR<TeamCreateWithoutStorageInput, TeamUncheckedCreateWithoutStorageInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutStorageInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutStorageInput, TeamUncheckedUpdateWithoutStorageInput>
  }

  export type TeamUpdateWithoutStorageInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lists?: ListUpdateManyWithoutTeamNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutStorageInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lists?: ListUncheckedUpdateManyWithoutTeamNestedInput
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type StorageCreateWithoutTeamInput = {
    id?: string
    type: $Enums.EStorageType
    displayName: string
    storagePath?: string | null
    refreshToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutStorageInput
  }

  export type StorageUncheckedCreateWithoutTeamInput = {
    id?: string
    type: $Enums.EStorageType
    displayName: string
    storagePath?: string | null
    refreshToken: string
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StorageCreateOrConnectWithoutTeamInput = {
    where: StorageWhereUniqueInput
    create: XOR<StorageCreateWithoutTeamInput, StorageUncheckedCreateWithoutTeamInput>
  }

  export type ListCreateWithoutTeamInput = {
    id?: string
    title: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutListsInput
    items?: List_itemCreateNestedManyWithoutListInput
    publicLink?: PublicLinkCreateNestedOneWithoutListInput
  }

  export type ListUncheckedCreateWithoutTeamInput = {
    id?: string
    title: string
    userId?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    items?: List_itemUncheckedCreateNestedManyWithoutListInput
    publicLink?: PublicLinkUncheckedCreateNestedOneWithoutListInput
  }

  export type ListCreateOrConnectWithoutTeamInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutTeamInput, ListUncheckedCreateWithoutTeamInput>
  }

  export type ListCreateManyTeamInputEnvelope = {
    data: ListCreateManyTeamInput | ListCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type TeamMemberCreateWithoutTeamInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    createdBy: string
    permissions?: TeamMemberPermissionCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberUncheckedCreateWithoutTeamInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    createdBy: string
    permissions?: TeamMemberPermissionUncheckedCreateNestedManyWithoutTeamMemberInput
  }

  export type TeamMemberCreateOrConnectWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput>
  }

  export type TeamMemberCreateManyTeamInputEnvelope = {
    data: TeamMemberCreateManyTeamInput | TeamMemberCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type StorageUpsertWithoutTeamInput = {
    update: XOR<StorageUpdateWithoutTeamInput, StorageUncheckedUpdateWithoutTeamInput>
    create: XOR<StorageCreateWithoutTeamInput, StorageUncheckedCreateWithoutTeamInput>
    where?: StorageWhereInput
  }

  export type StorageUpdateToOneWithWhereWithoutTeamInput = {
    where?: StorageWhereInput
    data: XOR<StorageUpdateWithoutTeamInput, StorageUncheckedUpdateWithoutTeamInput>
  }

  export type StorageUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEStorageTypeFieldUpdateOperationsInput | $Enums.EStorageType
    displayName?: StringFieldUpdateOperationsInput | string
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutStorageNestedInput
  }

  export type StorageUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEStorageTypeFieldUpdateOperationsInput | $Enums.EStorageType
    displayName?: StringFieldUpdateOperationsInput | string
    storagePath?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListUpsertWithWhereUniqueWithoutTeamInput = {
    where: ListWhereUniqueInput
    update: XOR<ListUpdateWithoutTeamInput, ListUncheckedUpdateWithoutTeamInput>
    create: XOR<ListCreateWithoutTeamInput, ListUncheckedCreateWithoutTeamInput>
  }

  export type ListUpdateWithWhereUniqueWithoutTeamInput = {
    where: ListWhereUniqueInput
    data: XOR<ListUpdateWithoutTeamInput, ListUncheckedUpdateWithoutTeamInput>
  }

  export type ListUpdateManyWithWhereWithoutTeamInput = {
    where: ListScalarWhereInput
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyWithoutTeamInput>
  }

  export type TeamMemberUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    update: XOR<TeamMemberUpdateWithoutTeamInput, TeamMemberUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput>
  }

  export type TeamMemberUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    data: XOR<TeamMemberUpdateWithoutTeamInput, TeamMemberUncheckedUpdateWithoutTeamInput>
  }

  export type TeamMemberUpdateManyWithWhereWithoutTeamInput = {
    where: TeamMemberScalarWhereInput
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyWithoutTeamInput>
  }

  export type TeamMemberScalarWhereInput = {
    AND?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
    OR?: TeamMemberScalarWhereInput[]
    NOT?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
    id?: StringFilter<"TeamMember"> | string
    teamId?: StringFilter<"TeamMember"> | string
    userId?: StringFilter<"TeamMember"> | string
    createdAt?: DateTimeFilter<"TeamMember"> | Date | string
    createdBy?: StringFilter<"TeamMember"> | string
  }

  export type TeamCreateWithoutMembersInput = {
    id?: string
    title: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storage?: StorageCreateNestedOneWithoutTeamInput
    lists?: ListCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutMembersInput = {
    id?: string
    title: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storage?: StorageUncheckedCreateNestedOneWithoutTeamInput
    lists?: ListUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutMembersInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
  }

  export type TeamMemberPermissionCreateWithoutTeamMemberInput = {
    permission: $Enums.EPermissions
  }

  export type TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput = {
    permission: $Enums.EPermissions
  }

  export type TeamMemberPermissionCreateOrConnectWithoutTeamMemberInput = {
    where: TeamMemberPermissionWhereUniqueInput
    create: XOR<TeamMemberPermissionCreateWithoutTeamMemberInput, TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput>
  }

  export type TeamMemberPermissionCreateManyTeamMemberInputEnvelope = {
    data: TeamMemberPermissionCreateManyTeamMemberInput | TeamMemberPermissionCreateManyTeamMemberInput[]
    skipDuplicates?: boolean
  }

  export type TeamUpsertWithoutMembersInput = {
    update: XOR<TeamUpdateWithoutMembersInput, TeamUncheckedUpdateWithoutMembersInput>
    create: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutMembersInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutMembersInput, TeamUncheckedUpdateWithoutMembersInput>
  }

  export type TeamUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storage?: StorageUpdateOneWithoutTeamNestedInput
    lists?: ListUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storage?: StorageUncheckedUpdateOneWithoutTeamNestedInput
    lists?: ListUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamMemberPermissionUpsertWithWhereUniqueWithoutTeamMemberInput = {
    where: TeamMemberPermissionWhereUniqueInput
    update: XOR<TeamMemberPermissionUpdateWithoutTeamMemberInput, TeamMemberPermissionUncheckedUpdateWithoutTeamMemberInput>
    create: XOR<TeamMemberPermissionCreateWithoutTeamMemberInput, TeamMemberPermissionUncheckedCreateWithoutTeamMemberInput>
  }

  export type TeamMemberPermissionUpdateWithWhereUniqueWithoutTeamMemberInput = {
    where: TeamMemberPermissionWhereUniqueInput
    data: XOR<TeamMemberPermissionUpdateWithoutTeamMemberInput, TeamMemberPermissionUncheckedUpdateWithoutTeamMemberInput>
  }

  export type TeamMemberPermissionUpdateManyWithWhereWithoutTeamMemberInput = {
    where: TeamMemberPermissionScalarWhereInput
    data: XOR<TeamMemberPermissionUpdateManyMutationInput, TeamMemberPermissionUncheckedUpdateManyWithoutTeamMemberInput>
  }

  export type TeamMemberPermissionScalarWhereInput = {
    AND?: TeamMemberPermissionScalarWhereInput | TeamMemberPermissionScalarWhereInput[]
    OR?: TeamMemberPermissionScalarWhereInput[]
    NOT?: TeamMemberPermissionScalarWhereInput | TeamMemberPermissionScalarWhereInput[]
    teamMemberId?: StringFilter<"TeamMemberPermission"> | string
    permission?: EnumEPermissionsFilter<"TeamMemberPermission"> | $Enums.EPermissions
  }

  export type TeamMemberCreateWithoutPermissionsInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    createdBy: string
    team: TeamCreateNestedOneWithoutMembersInput
  }

  export type TeamMemberUncheckedCreateWithoutPermissionsInput = {
    id?: string
    teamId: string
    userId: string
    createdAt?: Date | string
    createdBy: string
  }

  export type TeamMemberCreateOrConnectWithoutPermissionsInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutPermissionsInput, TeamMemberUncheckedCreateWithoutPermissionsInput>
  }

  export type TeamMemberUpsertWithoutPermissionsInput = {
    update: XOR<TeamMemberUpdateWithoutPermissionsInput, TeamMemberUncheckedUpdateWithoutPermissionsInput>
    create: XOR<TeamMemberCreateWithoutPermissionsInput, TeamMemberUncheckedCreateWithoutPermissionsInput>
    where?: TeamMemberWhereInput
  }

  export type TeamMemberUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: TeamMemberWhereInput
    data: XOR<TeamMemberUpdateWithoutPermissionsInput, TeamMemberUncheckedUpdateWithoutPermissionsInput>
  }

  export type TeamMemberUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    team?: TeamUpdateOneRequiredWithoutMembersNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type ListCreateWithoutPublicLinkInput = {
    id?: string
    title: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutListsInput
    team?: TeamCreateNestedOneWithoutListsInput
    items?: List_itemCreateNestedManyWithoutListInput
  }

  export type ListUncheckedCreateWithoutPublicLinkInput = {
    id?: string
    title: string
    userId?: string | null
    teamId?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    items?: List_itemUncheckedCreateNestedManyWithoutListInput
  }

  export type ListCreateOrConnectWithoutPublicLinkInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutPublicLinkInput, ListUncheckedCreateWithoutPublicLinkInput>
  }

  export type ListUpsertWithoutPublicLinkInput = {
    update: XOR<ListUpdateWithoutPublicLinkInput, ListUncheckedUpdateWithoutPublicLinkInput>
    create: XOR<ListCreateWithoutPublicLinkInput, ListUncheckedCreateWithoutPublicLinkInput>
    where?: ListWhereInput
  }

  export type ListUpdateToOneWithWhereWithoutPublicLinkInput = {
    where?: ListWhereInput
    data: XOR<ListUpdateWithoutPublicLinkInput, ListUncheckedUpdateWithoutPublicLinkInput>
  }

  export type ListUpdateWithoutPublicLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutListsNestedInput
    team?: TeamUpdateOneWithoutListsNestedInput
    items?: List_itemUpdateManyWithoutListNestedInput
  }

  export type ListUncheckedUpdateWithoutPublicLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: List_itemUncheckedUpdateManyWithoutListNestedInput
  }

  export type UserCreateWithoutListsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storage?: StorageCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutListsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storage?: StorageUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutListsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
  }

  export type TeamCreateWithoutListsInput = {
    id?: string
    title: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storage?: StorageCreateNestedOneWithoutTeamInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutListsInput = {
    id?: string
    title: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    storage?: StorageUncheckedCreateNestedOneWithoutTeamInput
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutListsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutListsInput, TeamUncheckedCreateWithoutListsInput>
  }

  export type List_itemCreateWithoutListInput = {
    id?: string
    itemnumber: number
    description: string
    uploadedFiles?: List_itemCreateuploadedFilesInput | string[]
    comment?: string | null
    status?: $Enums.EItemStatus
    delivered?: boolean
    deadline?: Date | string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type List_itemUncheckedCreateWithoutListInput = {
    id?: string
    itemnumber: number
    description: string
    uploadedFiles?: List_itemCreateuploadedFilesInput | string[]
    comment?: string | null
    status?: $Enums.EItemStatus
    delivered?: boolean
    deadline?: Date | string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type List_itemCreateOrConnectWithoutListInput = {
    where: List_itemWhereUniqueInput
    create: XOR<List_itemCreateWithoutListInput, List_itemUncheckedCreateWithoutListInput>
  }

  export type List_itemCreateManyListInputEnvelope = {
    data: List_itemCreateManyListInput | List_itemCreateManyListInput[]
    skipDuplicates?: boolean
  }

  export type PublicLinkCreateWithoutListInput = {
    id?: string
    token: string
    passwordHash?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type PublicLinkUncheckedCreateWithoutListInput = {
    id?: string
    token: string
    passwordHash?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type PublicLinkCreateOrConnectWithoutListInput = {
    where: PublicLinkWhereUniqueInput
    create: XOR<PublicLinkCreateWithoutListInput, PublicLinkUncheckedCreateWithoutListInput>
  }

  export type UserUpsertWithoutListsInput = {
    update: XOR<UserUpdateWithoutListsInput, UserUncheckedUpdateWithoutListsInput>
    create: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutListsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutListsInput, UserUncheckedUpdateWithoutListsInput>
  }

  export type UserUpdateWithoutListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storage?: StorageUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storage?: StorageUncheckedUpdateOneWithoutUserNestedInput
  }

  export type TeamUpsertWithoutListsInput = {
    update: XOR<TeamUpdateWithoutListsInput, TeamUncheckedUpdateWithoutListsInput>
    create: XOR<TeamCreateWithoutListsInput, TeamUncheckedCreateWithoutListsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutListsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutListsInput, TeamUncheckedUpdateWithoutListsInput>
  }

  export type TeamUpdateWithoutListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storage?: StorageUpdateOneWithoutTeamNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storage?: StorageUncheckedUpdateOneWithoutTeamNestedInput
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type List_itemUpsertWithWhereUniqueWithoutListInput = {
    where: List_itemWhereUniqueInput
    update: XOR<List_itemUpdateWithoutListInput, List_itemUncheckedUpdateWithoutListInput>
    create: XOR<List_itemCreateWithoutListInput, List_itemUncheckedCreateWithoutListInput>
  }

  export type List_itemUpdateWithWhereUniqueWithoutListInput = {
    where: List_itemWhereUniqueInput
    data: XOR<List_itemUpdateWithoutListInput, List_itemUncheckedUpdateWithoutListInput>
  }

  export type List_itemUpdateManyWithWhereWithoutListInput = {
    where: List_itemScalarWhereInput
    data: XOR<List_itemUpdateManyMutationInput, List_itemUncheckedUpdateManyWithoutListInput>
  }

  export type List_itemScalarWhereInput = {
    AND?: List_itemScalarWhereInput | List_itemScalarWhereInput[]
    OR?: List_itemScalarWhereInput[]
    NOT?: List_itemScalarWhereInput | List_itemScalarWhereInput[]
    id?: StringFilter<"List_item"> | string
    itemnumber?: IntFilter<"List_item"> | number
    listId?: StringFilter<"List_item"> | string
    description?: StringFilter<"List_item"> | string
    uploadedFiles?: StringNullableListFilter<"List_item">
    comment?: StringNullableFilter<"List_item"> | string | null
    status?: EnumEItemStatusFilter<"List_item"> | $Enums.EItemStatus
    delivered?: BoolFilter<"List_item"> | boolean
    deadline?: DateTimeFilter<"List_item"> | Date | string
    createdAt?: DateTimeFilter<"List_item"> | Date | string
    createdBy?: StringFilter<"List_item"> | string
    updatedAt?: DateTimeFilter<"List_item"> | Date | string
  }

  export type PublicLinkUpsertWithoutListInput = {
    update: XOR<PublicLinkUpdateWithoutListInput, PublicLinkUncheckedUpdateWithoutListInput>
    create: XOR<PublicLinkCreateWithoutListInput, PublicLinkUncheckedCreateWithoutListInput>
    where?: PublicLinkWhereInput
  }

  export type PublicLinkUpdateToOneWithWhereWithoutListInput = {
    where?: PublicLinkWhereInput
    data: XOR<PublicLinkUpdateWithoutListInput, PublicLinkUncheckedUpdateWithoutListInput>
  }

  export type PublicLinkUpdateWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicLinkUncheckedUpdateWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListCreateWithoutItemsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutListsInput
    team?: TeamCreateNestedOneWithoutListsInput
    publicLink?: PublicLinkCreateNestedOneWithoutListInput
  }

  export type ListUncheckedCreateWithoutItemsInput = {
    id?: string
    title: string
    userId?: string | null
    teamId?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    publicLink?: PublicLinkUncheckedCreateNestedOneWithoutListInput
  }

  export type ListCreateOrConnectWithoutItemsInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutItemsInput, ListUncheckedCreateWithoutItemsInput>
  }

  export type ListUpsertWithoutItemsInput = {
    update: XOR<ListUpdateWithoutItemsInput, ListUncheckedUpdateWithoutItemsInput>
    create: XOR<ListCreateWithoutItemsInput, ListUncheckedCreateWithoutItemsInput>
    where?: ListWhereInput
  }

  export type ListUpdateToOneWithWhereWithoutItemsInput = {
    where?: ListWhereInput
    data: XOR<ListUpdateWithoutItemsInput, ListUncheckedUpdateWithoutItemsInput>
  }

  export type ListUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutListsNestedInput
    team?: TeamUpdateOneWithoutListsNestedInput
    publicLink?: PublicLinkUpdateOneWithoutListNestedInput
  }

  export type ListUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publicLink?: PublicLinkUncheckedUpdateOneWithoutListNestedInput
  }

  export type ListCreateManyUserInput = {
    id?: string
    title: string
    teamId?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type ListUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneWithoutListsNestedInput
    items?: List_itemUpdateManyWithoutListNestedInput
    publicLink?: PublicLinkUpdateOneWithoutListNestedInput
  }

  export type ListUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: List_itemUncheckedUpdateManyWithoutListNestedInput
    publicLink?: PublicLinkUncheckedUpdateOneWithoutListNestedInput
  }

  export type ListUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    teamId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListCreateManyTeamInput = {
    id?: string
    title: string
    userId?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type TeamMemberCreateManyTeamInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    createdBy: string
  }

  export type ListUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutListsNestedInput
    items?: List_itemUpdateManyWithoutListNestedInput
    publicLink?: PublicLinkUpdateOneWithoutListNestedInput
  }

  export type ListUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: List_itemUncheckedUpdateManyWithoutListNestedInput
    publicLink?: PublicLinkUncheckedUpdateOneWithoutListNestedInput
  }

  export type ListUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    permissions?: TeamMemberPermissionUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    permissions?: TeamMemberPermissionUncheckedUpdateManyWithoutTeamMemberNestedInput
  }

  export type TeamMemberUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type TeamMemberPermissionCreateManyTeamMemberInput = {
    permission: $Enums.EPermissions
  }

  export type TeamMemberPermissionUpdateWithoutTeamMemberInput = {
    permission?: EnumEPermissionsFieldUpdateOperationsInput | $Enums.EPermissions
  }

  export type TeamMemberPermissionUncheckedUpdateWithoutTeamMemberInput = {
    permission?: EnumEPermissionsFieldUpdateOperationsInput | $Enums.EPermissions
  }

  export type TeamMemberPermissionUncheckedUpdateManyWithoutTeamMemberInput = {
    permission?: EnumEPermissionsFieldUpdateOperationsInput | $Enums.EPermissions
  }

  export type List_itemCreateManyListInput = {
    id?: string
    itemnumber: number
    description: string
    uploadedFiles?: List_itemCreateuploadedFilesInput | string[]
    comment?: string | null
    status?: $Enums.EItemStatus
    delivered?: boolean
    deadline?: Date | string
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
  }

  export type List_itemUpdateWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemnumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: List_itemUpdateuploadedFilesInput | string[]
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEItemStatusFieldUpdateOperationsInput | $Enums.EItemStatus
    delivered?: BoolFieldUpdateOperationsInput | boolean
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type List_itemUncheckedUpdateWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemnumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: List_itemUpdateuploadedFilesInput | string[]
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEItemStatusFieldUpdateOperationsInput | $Enums.EItemStatus
    delivered?: BoolFieldUpdateOperationsInput | boolean
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type List_itemUncheckedUpdateManyWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemnumber?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    uploadedFiles?: List_itemUpdateuploadedFilesInput | string[]
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEItemStatusFieldUpdateOperationsInput | $Enums.EItemStatus
    delivered?: BoolFieldUpdateOperationsInput | boolean
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeamCountOutputTypeDefaultArgs instead
     */
    export type TeamCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeamCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeamMemberCountOutputTypeDefaultArgs instead
     */
    export type TeamMemberCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeamMemberCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ListCountOutputTypeDefaultArgs instead
     */
    export type ListCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ListCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StorageDefaultArgs instead
     */
    export type StorageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StorageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeamDefaultArgs instead
     */
    export type TeamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeamDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeamMemberDefaultArgs instead
     */
    export type TeamMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeamMemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TeamMemberPermissionDefaultArgs instead
     */
    export type TeamMemberPermissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TeamMemberPermissionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PublicLinkDefaultArgs instead
     */
    export type PublicLinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PublicLinkDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ListDefaultArgs instead
     */
    export type ListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ListDefaultArgs<ExtArgs>
    /**
     * @deprecated Use List_itemDefaultArgs instead
     */
    export type List_itemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = List_itemDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}