import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from 'src/graphql/prismaContext';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /**
   * A string representing a duration conforming to the ISO8601 standard,
   * such as: P1W1DT13H23M34S
   * P is the duration designator (for period) placed at the start of the duration representation.
   * Y is the year designator that follows the value for the number of years.
   * M is the month designator that follows the value for the number of months.
   * W is the week designator that follows the value for the number of weeks.
   * D is the day designator that follows the value for the number of days.
   * T is the time designator that precedes the time components of the representation.
   * H is the hour designator that follows the value for the number of hours.
   * M is the minute designator that follows the value for the number of minutes.
   * S is the second designator that follows the value for the number of seconds.
   *
   * Note the time designator, T, that precedes the time value.
   *
   * Matches moment.js, Luxon and DateFns implementations
   * ,/. is valid for decimal places and +/- is a valid prefix
   */
  Duration: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: any;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: any;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: any;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: any;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: any;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: any;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: any;
  /**
   * A string representing a duration conforming to the ISO8601 standard,
   * such as: P1W1DT13H23M34S
   * P is the duration designator (for period) placed at the start of the duration representation.
   * Y is the year designator that follows the value for the number of years.
   * M is the month designator that follows the value for the number of months.
   * W is the week designator that follows the value for the number of weeks.
   * D is the day designator that follows the value for the number of days.
   * T is the time designator that precedes the time components of the representation.
   * H is the hour designator that follows the value for the number of hours.
   * M is the minute designator that follows the value for the number of minutes.
   * S is the second designator that follows the value for the number of seconds.
   *
   * Note the time designator, T, that precedes the time value.
   *
   * Matches moment.js, Luxon and DateFns implementations
   * ,/. is valid for decimal places and +/- is a valid prefix
   */
  ISO8601Duration: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: any;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: any;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: any;
  /** Floats that will have a value less than 0. */
  NegativeFloat: any;
  /** Integers that will have a value less than 0. */
  NegativeInt: any;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: any;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: any;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
  /** Represents NULL values */
  Void: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Board = {
  __typename?: 'Board';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  taskGroups?: Maybe<Array<Maybe<TaskGroup>>>;
  team?: Maybe<Team>;
};


export type BoardTaskGroupsArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<Maybe<SortTaskGroupBy>>>;
  where?: Maybe<WhereTaskGroupInput>;
};

export type CreateBoardInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner?: Maybe<RelateToOneUserInput>;
  taskGroups?: Maybe<RelateToManyTaskGroupInput>;
  team?: Maybe<RelateToOneTeamInput>;
};

export type CreateTaskGroupInput = {
  board?: Maybe<RelateToOneBoardInput>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  tasks?: Maybe<RelateToManyTaskInput>;
};

export type CreateTaskInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  taskGroup?: Maybe<RelateToOneTaskGroupInput>;
};

export type CreateTeamInput = {
  boards?: Maybe<RelateToManyBoardInput>;
  members?: Maybe<RelateToManyUserOnTeamInput>;
  name: Scalars['String'];
};

export type CreateUserInput = {
  boards?: Maybe<RelateToManyBoardInput>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  teams?: Maybe<RelateToManyUserOnTeamInput>;
};

export type CreateUserOnTeamInput = {
  isAdmin?: Maybe<Scalars['Boolean']>;
  team?: Maybe<RelateToOneTeamInput>;
  user?: Maybe<RelateToOneUserInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeTaskGroupsOrder?: Maybe<Board>;
  checkTask: Task;
  createBoard: Board;
  createTask: Task;
  createTaskGroup: TaskGroup;
  createTeam: Team;
  createUser: User;
  createUserOnTeam: UserOnTeam;
  deleteBoard?: Maybe<Board>;
  deleteTask?: Maybe<Task>;
  deleteTaskGroup?: Maybe<TaskGroup>;
  deleteTeam?: Maybe<Team>;
  deleteUser?: Maybe<User>;
  deleteUserOnTeam?: Maybe<UserOnTeam>;
  login?: Maybe<AuthPayload>;
  root: Scalars['String'];
  signup?: Maybe<AuthPayload>;
  updateBoard: Board;
  updateTask: Task;
  updateTaskGroup: TaskGroup;
  updateTeam: Team;
  updateUser: User;
  updateUserOnTeam: UserOnTeam;
};


export type MutationChangeTaskGroupsOrderArgs = {
  boardId: Scalars['Int'];
  taskGroupIds: Array<Maybe<Scalars['Int']>>;
};


export type MutationCheckTaskArgs = {
  id: Scalars['Int'];
};


export type MutationCreateBoardArgs = {
  data: CreateBoardInput;
};


export type MutationCreateTaskArgs = {
  data: CreateTaskInput;
};


export type MutationCreateTaskGroupArgs = {
  data: CreateTaskGroupInput;
};


export type MutationCreateTeamArgs = {
  data: CreateTeamInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateUserOnTeamArgs = {
  data: CreateUserOnTeamInput;
};


export type MutationDeleteBoardArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTaskGroupArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserOnTeamArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateBoardArgs = {
  data: UpdateBoardInput;
  id: Scalars['Int'];
};


export type MutationUpdateTaskArgs = {
  data: UpdateTaskInput;
  id: Scalars['Int'];
};


export type MutationUpdateTaskGroupArgs = {
  data: UpdateTaskGroupInput;
  id: Scalars['Int'];
};


export type MutationUpdateTeamArgs = {
  data: UpdateTeamInput;
  id: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['Int'];
};


export type MutationUpdateUserOnTeamArgs = {
  data: UpdateUserOnTeamInput;
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  allBoards?: Maybe<Array<Maybe<Board>>>;
  allTaskGroups?: Maybe<Array<Maybe<TaskGroup>>>;
  allTasks?: Maybe<Array<Maybe<Task>>>;
  allTeams?: Maybe<Array<Maybe<Team>>>;
  allUserOnTeams?: Maybe<Array<Maybe<UserOnTeam>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  authenticatedUser?: Maybe<User>;
  board?: Maybe<Board>;
  root: Scalars['String'];
  task?: Maybe<Task>;
  taskGroup?: Maybe<TaskGroup>;
  team?: Maybe<Team>;
  user?: Maybe<User>;
  userOnTeam?: Maybe<UserOnTeam>;
};


export type QueryAllBoardsArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<SortBoardBy>>;
  where?: Maybe<WhereBoardInput>;
};


export type QueryAllTaskGroupsArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<SortTaskGroupBy>>;
  where?: Maybe<WhereTaskGroupInput>;
};


export type QueryAllTasksArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<SortTaskBy>>;
  where?: Maybe<WhereTaskInput>;
};


export type QueryAllTeamsArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<SortTeamBy>>;
  where?: Maybe<WhereTeamInput>;
};


export type QueryAllUserOnTeamsArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<SortUserOnTeamBy>>;
  where?: Maybe<WhereUserOnTeamInput>;
};


export type QueryAllUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<SortUserBy>>;
  where?: Maybe<WhereUserInput>;
};


export type QueryBoardArgs = {
  where: WhereUniqueBoardInput;
};


export type QueryTaskArgs = {
  where: WhereUniqueTaskInput;
};


export type QueryTaskGroupArgs = {
  where: WhereUniqueTaskGroupInput;
};


export type QueryTeamArgs = {
  where: WhereUniqueTeamInput;
};


export type QueryUserArgs = {
  where: WhereUniqueUserInput;
};


export type QueryUserOnTeamArgs = {
  where: WhereUniqueUserOnTeamInput;
};

export type RelateToManyBoardInput = {
  connect?: Maybe<Array<Maybe<WhereUniqueBoardInput>>>;
  create?: Maybe<Array<Maybe<CreateBoardInput>>>;
  disconnect?: Maybe<Array<Maybe<WhereUniqueBoardInput>>>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToManyTaskGroupInput = {
  connect?: Maybe<Array<Maybe<WhereUniqueTaskGroupInput>>>;
  create?: Maybe<Array<Maybe<CreateTaskGroupInput>>>;
  disconnect?: Maybe<Array<Maybe<WhereUniqueTaskGroupInput>>>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToManyTaskInput = {
  connect?: Maybe<Array<Maybe<WhereUniqueTaskInput>>>;
  create?: Maybe<Array<Maybe<CreateTaskInput>>>;
  disconnect?: Maybe<Array<Maybe<WhereUniqueTaskInput>>>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToManyTeamInput = {
  connect?: Maybe<Array<Maybe<WhereUniqueTeamInput>>>;
  create?: Maybe<Array<Maybe<CreateTeamInput>>>;
  disconnect?: Maybe<Array<Maybe<WhereUniqueTeamInput>>>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToManyUserInput = {
  connect?: Maybe<Array<Maybe<WhereUniqueUserInput>>>;
  create?: Maybe<Array<Maybe<CreateUserInput>>>;
  disconnect?: Maybe<Array<Maybe<WhereUniqueUserInput>>>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToManyUserOnTeamInput = {
  connect?: Maybe<Array<Maybe<WhereUniqueUserOnTeamInput>>>;
  create?: Maybe<Array<Maybe<CreateUserOnTeamInput>>>;
  disconnect?: Maybe<Array<Maybe<WhereUniqueUserOnTeamInput>>>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToOneBoardInput = {
  connect?: Maybe<WhereUniqueBoardInput>;
  create?: Maybe<CreateBoardInput>;
  disconnect?: Maybe<WhereUniqueBoardInput>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToOneTaskGroupInput = {
  connect?: Maybe<WhereUniqueTaskGroupInput>;
  create?: Maybe<CreateTaskGroupInput>;
  disconnect?: Maybe<WhereUniqueTaskGroupInput>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToOneTaskInput = {
  connect?: Maybe<WhereUniqueTaskInput>;
  create?: Maybe<CreateTaskInput>;
  disconnect?: Maybe<WhereUniqueTaskInput>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToOneTeamInput = {
  connect?: Maybe<WhereUniqueTeamInput>;
  create?: Maybe<CreateTeamInput>;
  disconnect?: Maybe<WhereUniqueTeamInput>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToOneUserInput = {
  connect?: Maybe<WhereUniqueUserInput>;
  create?: Maybe<CreateUserInput>;
  disconnect?: Maybe<WhereUniqueUserInput>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export type RelateToOneUserOnTeamInput = {
  connect?: Maybe<WhereUniqueUserOnTeamInput>;
  create?: Maybe<CreateUserOnTeamInput>;
  disconnect?: Maybe<WhereUniqueUserOnTeamInput>;
  disconnectAll?: Maybe<Scalars['Boolean']>;
};

export enum SortBoardBy {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  OwnerAsc = 'owner_ASC',
  OwnerDesc = 'owner_DESC',
  TaskGroupsAsc = 'taskGroups_ASC',
  TaskGroupsDesc = 'taskGroups_DESC',
  TeamAsc = 'team_ASC',
  TeamDesc = 'team_DESC'
}

export enum SortTaskBy {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  TaskGroupAsc = 'taskGroup_ASC',
  TaskGroupDesc = 'taskGroup_DESC'
}

export enum SortTaskGroupBy {
  BoardAsc = 'board_ASC',
  BoardDesc = 'board_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  OrderAsc = 'order_ASC',
  OrderDesc = 'order_DESC',
  TasksAsc = 'tasks_ASC',
  TasksDesc = 'tasks_DESC'
}

export enum SortTeamBy {
  BoardsAsc = 'boards_ASC',
  BoardsDesc = 'boards_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MembersAsc = 'members_ASC',
  MembersDesc = 'members_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublicIdAsc = 'publicId_ASC',
  PublicIdDesc = 'publicId_DESC'
}

export enum SortUserBy {
  BoardsAsc = 'boards_ASC',
  BoardsDesc = 'boards_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PasswordAsc = 'password_ASC',
  PasswordDesc = 'password_DESC',
  PublicIdAsc = 'publicId_ASC',
  PublicIdDesc = 'publicId_DESC',
  RegisteredAtAsc = 'registeredAt_ASC',
  RegisteredAtDesc = 'registeredAt_DESC',
  TeamsAsc = 'teams_ASC',
  TeamsDesc = 'teams_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export enum SortUserOnTeamBy {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsAdminAsc = 'isAdmin_ASC',
  IsAdminDesc = 'isAdmin_DESC',
  TeamAsc = 'team_ASC',
  TeamDesc = 'team_DESC',
  UserAsc = 'user_ASC',
  UserDesc = 'user_DESC'
}

export type Task = {
  __typename?: 'Task';
  checked?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  taskGroup?: Maybe<TaskGroup>;
};

export type TaskGroup = {
  __typename?: 'TaskGroup';
  board?: Maybe<Board>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  tasks?: Maybe<Array<Maybe<Task>>>;
};


export type TaskGroupTasksArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<Maybe<SortTaskBy>>>;
  where?: Maybe<WhereTaskInput>;
};

export type Team = {
  __typename?: 'Team';
  boards?: Maybe<Array<Maybe<Board>>>;
  id: Scalars['Int'];
  members?: Maybe<Array<Maybe<UserOnTeam>>>;
  name?: Maybe<Scalars['String']>;
};


export type TeamBoardsArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<Maybe<SortBoardBy>>>;
  where?: Maybe<WhereBoardInput>;
};


export type TeamMembersArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<Maybe<SortUserOnTeamBy>>>;
  where?: Maybe<WhereUserOnTeamInput>;
};

export type UpdateBoardInput = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<RelateToOneUserInput>;
  taskGroups?: Maybe<RelateToManyTaskGroupInput>;
  team?: Maybe<RelateToOneTeamInput>;
};

export type UpdateTaskGroupInput = {
  board?: Maybe<RelateToOneBoardInput>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tasks?: Maybe<RelateToManyTaskInput>;
};

export type UpdateTaskInput = {
  checked?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  taskGroup?: Maybe<RelateToOneTaskGroupInput>;
};

export type UpdateTeamInput = {
  boards?: Maybe<RelateToManyBoardInput>;
  members?: Maybe<RelateToManyUserOnTeamInput>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  boards?: Maybe<RelateToManyBoardInput>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  teams?: Maybe<RelateToManyUserOnTeamInput>;
};

export type UpdateUserOnTeamInput = {
  isAdmin?: Maybe<Scalars['Boolean']>;
  team?: Maybe<RelateToOneTeamInput>;
  user?: Maybe<RelateToOneUserInput>;
};

export type User = {
  __typename?: 'User';
  boards?: Maybe<Array<Maybe<Board>>>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  publicId?: Maybe<Scalars['String']>;
  registeredAt?: Maybe<Scalars['DateTime']>;
  teams?: Maybe<Array<Maybe<UserOnTeam>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UserBoardsArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<Maybe<SortBoardBy>>>;
  where?: Maybe<WhereBoardInput>;
};


export type UserTeamsArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Array<Maybe<SortUserOnTeamBy>>>;
  where?: Maybe<WhereUserOnTeamInput>;
};

export type UserOnTeam = {
  __typename?: 'UserOnTeam';
  id: Scalars['Int'];
  isAdmin?: Maybe<Scalars['Boolean']>;
  team?: Maybe<Team>;
  user?: Maybe<User>;
};

export type WhereBoardInput = {
  AND?: Maybe<Array<Maybe<WhereBoardInput>>>;
  OR?: Maybe<Array<Maybe<WhereBoardInput>>>;
  description_gt?: Maybe<Scalars['String']>;
  description_gte?: Maybe<Scalars['String']>;
  description_is?: Maybe<Scalars['String']>;
  description_lt?: Maybe<Scalars['String']>;
  description_lte?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  id_gt?: Maybe<Scalars['Int']>;
  id_gte?: Maybe<Scalars['Int']>;
  id_is?: Maybe<Scalars['Int']>;
  id_lt?: Maybe<Scalars['Int']>;
  id_lte?: Maybe<Scalars['Int']>;
  id_not?: Maybe<Scalars['Int']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_is?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  owner?: Maybe<WhereUserInput>;
  owner_is_null?: Maybe<Scalars['Boolean']>;
  taskGroups?: Maybe<WhereTaskGroupInput>;
  taskGroups_is_null?: Maybe<Scalars['Boolean']>;
  team?: Maybe<WhereTeamInput>;
  team_is_null?: Maybe<Scalars['Boolean']>;
};

export type WhereTaskGroupInput = {
  AND?: Maybe<Array<Maybe<WhereTaskGroupInput>>>;
  OR?: Maybe<Array<Maybe<WhereTaskGroupInput>>>;
  board?: Maybe<WhereBoardInput>;
  board_is_null?: Maybe<Scalars['Boolean']>;
  description_gt?: Maybe<Scalars['String']>;
  description_gte?: Maybe<Scalars['String']>;
  description_is?: Maybe<Scalars['String']>;
  description_lt?: Maybe<Scalars['String']>;
  description_lte?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  id_gt?: Maybe<Scalars['Int']>;
  id_gte?: Maybe<Scalars['Int']>;
  id_is?: Maybe<Scalars['Int']>;
  id_lt?: Maybe<Scalars['Int']>;
  id_lte?: Maybe<Scalars['Int']>;
  id_not?: Maybe<Scalars['Int']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_is?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  order_gt?: Maybe<Scalars['String']>;
  order_gte?: Maybe<Scalars['String']>;
  order_is?: Maybe<Scalars['String']>;
  order_lt?: Maybe<Scalars['String']>;
  order_lte?: Maybe<Scalars['String']>;
  order_not?: Maybe<Scalars['String']>;
  tasks?: Maybe<WhereTaskInput>;
  tasks_is_null?: Maybe<Scalars['Boolean']>;
};

export type WhereTaskInput = {
  AND?: Maybe<Array<Maybe<WhereTaskInput>>>;
  OR?: Maybe<Array<Maybe<WhereTaskInput>>>;
  checked_is?: Maybe<Scalars['Boolean']>;
  description_gt?: Maybe<Scalars['String']>;
  description_gte?: Maybe<Scalars['String']>;
  description_is?: Maybe<Scalars['String']>;
  description_lt?: Maybe<Scalars['String']>;
  description_lte?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  id_gt?: Maybe<Scalars['Int']>;
  id_gte?: Maybe<Scalars['Int']>;
  id_is?: Maybe<Scalars['Int']>;
  id_lt?: Maybe<Scalars['Int']>;
  id_lte?: Maybe<Scalars['Int']>;
  id_not?: Maybe<Scalars['Int']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_is?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  taskGroup?: Maybe<WhereTaskGroupInput>;
  taskGroup_is_null?: Maybe<Scalars['Boolean']>;
};

export type WhereTeamInput = {
  AND?: Maybe<Array<Maybe<WhereTeamInput>>>;
  OR?: Maybe<Array<Maybe<WhereTeamInput>>>;
  boards?: Maybe<WhereBoardInput>;
  boards_is_null?: Maybe<Scalars['Boolean']>;
  id_gt?: Maybe<Scalars['Int']>;
  id_gte?: Maybe<Scalars['Int']>;
  id_is?: Maybe<Scalars['Int']>;
  id_lt?: Maybe<Scalars['Int']>;
  id_lte?: Maybe<Scalars['Int']>;
  id_not?: Maybe<Scalars['Int']>;
  members?: Maybe<WhereUserOnTeamInput>;
  members_is_null?: Maybe<Scalars['Boolean']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_is?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  publicId_gt?: Maybe<Scalars['String']>;
  publicId_gte?: Maybe<Scalars['String']>;
  publicId_is?: Maybe<Scalars['String']>;
  publicId_lt?: Maybe<Scalars['String']>;
  publicId_lte?: Maybe<Scalars['String']>;
  publicId_not?: Maybe<Scalars['String']>;
};

export type WhereUniqueBoardInput = {
  id: Scalars['Int'];
};

export type WhereUniqueTaskGroupInput = {
  id: Scalars['Int'];
};

export type WhereUniqueTaskInput = {
  id: Scalars['Int'];
};

export type WhereUniqueTeamInput = {
  id: Scalars['Int'];
};

export type WhereUniqueUserInput = {
  id: Scalars['Int'];
};

export type WhereUniqueUserOnTeamInput = {
  id: Scalars['Int'];
};

export type WhereUserInput = {
  AND?: Maybe<Array<Maybe<WhereUserInput>>>;
  OR?: Maybe<Array<Maybe<WhereUserInput>>>;
  boards?: Maybe<WhereBoardInput>;
  boards_is_null?: Maybe<Scalars['Boolean']>;
  email_gt?: Maybe<Scalars['String']>;
  email_gte?: Maybe<Scalars['String']>;
  email_is?: Maybe<Scalars['String']>;
  email_lt?: Maybe<Scalars['String']>;
  email_lte?: Maybe<Scalars['String']>;
  email_not?: Maybe<Scalars['String']>;
  id_gt?: Maybe<Scalars['Int']>;
  id_gte?: Maybe<Scalars['Int']>;
  id_is?: Maybe<Scalars['Int']>;
  id_lt?: Maybe<Scalars['Int']>;
  id_lte?: Maybe<Scalars['Int']>;
  id_not?: Maybe<Scalars['Int']>;
  name_gt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_is?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  password_gt?: Maybe<Scalars['String']>;
  password_gte?: Maybe<Scalars['String']>;
  password_is?: Maybe<Scalars['String']>;
  password_lt?: Maybe<Scalars['String']>;
  password_lte?: Maybe<Scalars['String']>;
  password_not?: Maybe<Scalars['String']>;
  publicId_gt?: Maybe<Scalars['String']>;
  publicId_gte?: Maybe<Scalars['String']>;
  publicId_is?: Maybe<Scalars['String']>;
  publicId_lt?: Maybe<Scalars['String']>;
  publicId_lte?: Maybe<Scalars['String']>;
  publicId_not?: Maybe<Scalars['String']>;
  registeredAt_gt?: Maybe<Scalars['DateTime']>;
  registeredAt_gte?: Maybe<Scalars['DateTime']>;
  registeredAt_is?: Maybe<Scalars['DateTime']>;
  registeredAt_lt?: Maybe<Scalars['DateTime']>;
  registeredAt_lte?: Maybe<Scalars['DateTime']>;
  registeredAt_not?: Maybe<Scalars['DateTime']>;
  teams?: Maybe<WhereUserOnTeamInput>;
  teams_is_null?: Maybe<Scalars['Boolean']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_is?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
};

export type WhereUserOnTeamInput = {
  AND?: Maybe<Array<Maybe<WhereUserOnTeamInput>>>;
  OR?: Maybe<Array<Maybe<WhereUserOnTeamInput>>>;
  id_gt?: Maybe<Scalars['Int']>;
  id_gte?: Maybe<Scalars['Int']>;
  id_is?: Maybe<Scalars['Int']>;
  id_lt?: Maybe<Scalars['Int']>;
  id_lte?: Maybe<Scalars['Int']>;
  id_not?: Maybe<Scalars['Int']>;
  isAdmin_gt?: Maybe<Scalars['Boolean']>;
  isAdmin_gte?: Maybe<Scalars['Boolean']>;
  isAdmin_is?: Maybe<Scalars['Boolean']>;
  isAdmin_lt?: Maybe<Scalars['Boolean']>;
  isAdmin_lte?: Maybe<Scalars['Boolean']>;
  isAdmin_not?: Maybe<Scalars['Boolean']>;
  team?: Maybe<WhereTeamInput>;
  team_is_null?: Maybe<Scalars['Boolean']>;
  user?: Maybe<WhereUserInput>;
  user_is_null?: Maybe<Scalars['Boolean']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Board: ResolverTypeWrapper<Board>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  CreateBoardInput: CreateBoardInput;
  CreateTaskGroupInput: CreateTaskGroupInput;
  CreateTaskInput: CreateTaskInput;
  CreateTeamInput: CreateTeamInput;
  CreateUserInput: CreateUserInput;
  CreateUserOnTeamInput: CreateUserOnTeamInput;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  GUID: ResolverTypeWrapper<Scalars['GUID']>;
  HSL: ResolverTypeWrapper<Scalars['HSL']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']>;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']>;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Port: ResolverTypeWrapper<Scalars['Port']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars['RGB']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']>;
  RelateToManyBoardInput: RelateToManyBoardInput;
  RelateToManyTaskGroupInput: RelateToManyTaskGroupInput;
  RelateToManyTaskInput: RelateToManyTaskInput;
  RelateToManyTeamInput: RelateToManyTeamInput;
  RelateToManyUserInput: RelateToManyUserInput;
  RelateToManyUserOnTeamInput: RelateToManyUserOnTeamInput;
  RelateToOneBoardInput: RelateToOneBoardInput;
  RelateToOneTaskGroupInput: RelateToOneTaskGroupInput;
  RelateToOneTaskInput: RelateToOneTaskInput;
  RelateToOneTeamInput: RelateToOneTeamInput;
  RelateToOneUserInput: RelateToOneUserInput;
  RelateToOneUserOnTeamInput: RelateToOneUserOnTeamInput;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
  SortBoardBy: SortBoardBy;
  SortTaskBy: SortTaskBy;
  SortTaskGroupBy: SortTaskGroupBy;
  SortTeamBy: SortTeamBy;
  SortUserBy: SortUserBy;
  SortUserOnTeamBy: SortUserOnTeamBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Task: ResolverTypeWrapper<Task>;
  TaskGroup: ResolverTypeWrapper<TaskGroup>;
  Team: ResolverTypeWrapper<Team>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  UpdateBoardInput: UpdateBoardInput;
  UpdateTaskGroupInput: UpdateTaskGroupInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTeamInput: UpdateTeamInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserOnTeamInput: UpdateUserOnTeamInput;
  User: ResolverTypeWrapper<User>;
  UserOnTeam: ResolverTypeWrapper<UserOnTeam>;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
  WhereBoardInput: WhereBoardInput;
  WhereTaskGroupInput: WhereTaskGroupInput;
  WhereTaskInput: WhereTaskInput;
  WhereTeamInput: WhereTeamInput;
  WhereUniqueBoardInput: WhereUniqueBoardInput;
  WhereUniqueTaskGroupInput: WhereUniqueTaskGroupInput;
  WhereUniqueTaskInput: WhereUniqueTaskInput;
  WhereUniqueTeamInput: WhereUniqueTeamInput;
  WhereUniqueUserInput: WhereUniqueUserInput;
  WhereUniqueUserOnTeamInput: WhereUniqueUserOnTeamInput;
  WhereUserInput: WhereUserInput;
  WhereUserOnTeamInput: WhereUserOnTeamInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: AuthPayload;
  BigInt: Scalars['BigInt'];
  Board: Board;
  Boolean: Scalars['Boolean'];
  Byte: Scalars['Byte'];
  CreateBoardInput: CreateBoardInput;
  CreateTaskGroupInput: CreateTaskGroupInput;
  CreateTaskInput: CreateTaskInput;
  CreateTeamInput: CreateTeamInput;
  CreateUserInput: CreateUserInput;
  CreateUserOnTeamInput: CreateUserOnTeamInput;
  Currency: Scalars['Currency'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  Duration: Scalars['Duration'];
  EmailAddress: Scalars['EmailAddress'];
  GUID: Scalars['GUID'];
  HSL: Scalars['HSL'];
  HSLA: Scalars['HSLA'];
  HexColorCode: Scalars['HexColorCode'];
  Hexadecimal: Scalars['Hexadecimal'];
  IBAN: Scalars['IBAN'];
  IPv4: Scalars['IPv4'];
  IPv6: Scalars['IPv6'];
  ISBN: Scalars['ISBN'];
  ISO8601Duration: Scalars['ISO8601Duration'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JWT: Scalars['JWT'];
  Latitude: Scalars['Latitude'];
  LocalDate: Scalars['LocalDate'];
  LocalEndTime: Scalars['LocalEndTime'];
  LocalTime: Scalars['LocalTime'];
  Long: Scalars['Long'];
  Longitude: Scalars['Longitude'];
  MAC: Scalars['MAC'];
  Mutation: {};
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  NonEmptyString: Scalars['NonEmptyString'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  ObjectID: Scalars['ObjectID'];
  PhoneNumber: Scalars['PhoneNumber'];
  Port: Scalars['Port'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  PostalCode: Scalars['PostalCode'];
  Query: {};
  RGB: Scalars['RGB'];
  RGBA: Scalars['RGBA'];
  RelateToManyBoardInput: RelateToManyBoardInput;
  RelateToManyTaskGroupInput: RelateToManyTaskGroupInput;
  RelateToManyTaskInput: RelateToManyTaskInput;
  RelateToManyTeamInput: RelateToManyTeamInput;
  RelateToManyUserInput: RelateToManyUserInput;
  RelateToManyUserOnTeamInput: RelateToManyUserOnTeamInput;
  RelateToOneBoardInput: RelateToOneBoardInput;
  RelateToOneTaskGroupInput: RelateToOneTaskGroupInput;
  RelateToOneTaskInput: RelateToOneTaskInput;
  RelateToOneTeamInput: RelateToOneTeamInput;
  RelateToOneUserInput: RelateToOneUserInput;
  RelateToOneUserOnTeamInput: RelateToOneUserOnTeamInput;
  SafeInt: Scalars['SafeInt'];
  String: Scalars['String'];
  Task: Task;
  TaskGroup: TaskGroup;
  Team: Team;
  Time: Scalars['Time'];
  Timestamp: Scalars['Timestamp'];
  URL: Scalars['URL'];
  USCurrency: Scalars['USCurrency'];
  UUID: Scalars['UUID'];
  UnsignedFloat: Scalars['UnsignedFloat'];
  UnsignedInt: Scalars['UnsignedInt'];
  UpdateBoardInput: UpdateBoardInput;
  UpdateTaskGroupInput: UpdateTaskGroupInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTeamInput: UpdateTeamInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserOnTeamInput: UpdateUserOnTeamInput;
  User: User;
  UserOnTeam: UserOnTeam;
  UtcOffset: Scalars['UtcOffset'];
  Void: Scalars['Void'];
  WhereBoardInput: WhereBoardInput;
  WhereTaskGroupInput: WhereTaskGroupInput;
  WhereTaskInput: WhereTaskInput;
  WhereTeamInput: WhereTeamInput;
  WhereUniqueBoardInput: WhereUniqueBoardInput;
  WhereUniqueTaskGroupInput: WhereUniqueTaskGroupInput;
  WhereUniqueTaskInput: WhereUniqueTaskInput;
  WhereUniqueTeamInput: WhereUniqueTeamInput;
  WhereUniqueUserInput: WhereUniqueUserInput;
  WhereUniqueUserOnTeamInput: WhereUniqueUserOnTeamInput;
  WhereUserInput: WhereUserInput;
  WhereUserOnTeamInput: WhereUserOnTeamInput;
}>;

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BoardResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  taskGroups?: Resolver<Maybe<Array<Maybe<ResolversTypes['TaskGroup']>>>, ParentType, ContextType, RequireFields<BoardTaskGroupsArgs, never>>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  changeTaskGroupsOrder?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<MutationChangeTaskGroupsOrderArgs, 'boardId' | 'taskGroupIds'>>;
  checkTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCheckTaskArgs, 'id'>>;
  createBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'data'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'data'>>;
  createTaskGroup?: Resolver<ResolversTypes['TaskGroup'], ParentType, ContextType, RequireFields<MutationCreateTaskGroupArgs, 'data'>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'data'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  createUserOnTeam?: Resolver<ResolversTypes['UserOnTeam'], ParentType, ContextType, RequireFields<MutationCreateUserOnTeamArgs, 'data'>>;
  deleteBoard?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, 'id'>>;
  deleteTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  deleteTaskGroup?: Resolver<Maybe<ResolversTypes['TaskGroup']>, ParentType, ContextType, RequireFields<MutationDeleteTaskGroupArgs, 'id'>>;
  deleteTeam?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<MutationDeleteTeamArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  deleteUserOnTeam?: Resolver<Maybe<ResolversTypes['UserOnTeam']>, ParentType, ContextType, RequireFields<MutationDeleteUserOnTeamArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  root?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signup?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'name' | 'password'>>;
  updateBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, 'data' | 'id'>>;
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'data' | 'id'>>;
  updateTaskGroup?: Resolver<ResolversTypes['TaskGroup'], ParentType, ContextType, RequireFields<MutationUpdateTaskGroupArgs, 'data' | 'id'>>;
  updateTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationUpdateTeamArgs, 'data' | 'id'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data' | 'id'>>;
  updateUserOnTeam?: Resolver<ResolversTypes['UserOnTeam'], ParentType, ContextType, RequireFields<MutationUpdateUserOnTeamArgs, 'data' | 'id'>>;
}>;

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  allBoards?: Resolver<Maybe<Array<Maybe<ResolversTypes['Board']>>>, ParentType, ContextType, RequireFields<QueryAllBoardsArgs, never>>;
  allTaskGroups?: Resolver<Maybe<Array<Maybe<ResolversTypes['TaskGroup']>>>, ParentType, ContextType, RequireFields<QueryAllTaskGroupsArgs, never>>;
  allTasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType, RequireFields<QueryAllTasksArgs, never>>;
  allTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<QueryAllTeamsArgs, never>>;
  allUserOnTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserOnTeam']>>>, ParentType, ContextType, RequireFields<QueryAllUserOnTeamsArgs, never>>;
  allUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryAllUsersArgs, never>>;
  authenticatedUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  board?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<QueryBoardArgs, 'where'>>;
  root?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'where'>>;
  taskGroup?: Resolver<Maybe<ResolversTypes['TaskGroup']>, ParentType, ContextType, RequireFields<QueryTaskGroupArgs, 'where'>>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType, RequireFields<QueryTeamArgs, 'where'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'where'>>;
  userOnTeam?: Resolver<Maybe<ResolversTypes['UserOnTeam']>, ParentType, ContextType, RequireFields<QueryUserOnTeamArgs, 'where'>>;
}>;

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export type TaskResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  checked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taskGroup?: Resolver<Maybe<ResolversTypes['TaskGroup']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TaskGroupResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TaskGroup'] = ResolversParentTypes['TaskGroup']> = ResolversObject<{
  board?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType, RequireFields<TaskGroupTasksArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TeamResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = ResolversObject<{
  boards?: Resolver<Maybe<Array<Maybe<ResolversTypes['Board']>>>, ParentType, ContextType, RequireFields<TeamBoardsArgs, never>>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserOnTeam']>>>, ParentType, ContextType, RequireFields<TeamMembersArgs, never>>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  boards?: Resolver<Maybe<Array<Maybe<ResolversTypes['Board']>>>, ParentType, ContextType, RequireFields<UserBoardsArgs, never>>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registeredAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserOnTeam']>>>, ParentType, ContextType, RequireFields<UserTeamsArgs, never>>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserOnTeamResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserOnTeam'] = ResolversParentTypes['UserOnTeam']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Board?: BoardResolvers<ContextType>;
  Byte?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  GUID?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  Task?: TaskResolvers<ContextType>;
  TaskGroup?: TaskGroupResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  Time?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserOnTeam?: UserOnTeamResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
}>;

