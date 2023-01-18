import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comment = {
  author: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
};

export type CommentObject = {
  __typename?: 'CommentObject';
  author: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
};

export type LocationObject = {
  __typename?: 'LocationObject';
  date: Scalars['DateTime'];
  description: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  avatar: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  refreshToken: Scalars['String'];
  status: Scalars['String'];
};

/** The Messages Model */
export type Messages = {
  __typename?: 'Messages';
  author?: Maybe<Users>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  mainPicture?: Maybe<Scalars['String']>;
};

export type MessagesInput = {
  author?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ID']>;
  mainPicture?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLikes: Scalars['String'];
  createMessages: Messages;
  createNews: News;
  createNotes: Notes;
  createPosts: Posts;
  createThemes: ThemeCreatedResponse;
  createUsers: RegisterResponse;
  deleteMessages: Messages;
  deleteNews: Scalars['String'];
  deleteNotes: Scalars['String'];
  deletePosts: Posts;
  deleteUsers: Scalars['String'];
  loginUsers: LoginResponse;
  /** user connecting to chat */
  newUserConnected: Users;
  /** user disconnecting from chat */
  newUserDisconnected: Users;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  updateNotes: Notes;
  updatePost: Posts;
  updateTrip: Trip;
  userUpdate: Users;
  userUpdatePassword: Users;
};


export type MutationAddLikesArgs = {
  id: Scalars['String'];
};


export type MutationCreateMessagesArgs = {
  newMessagesInput: MessagesInput;
};


export type MutationCreateNewsArgs = {
  newNewsInput: NewsInput;
};


export type MutationCreateNotesArgs = {
  newNotesInput: NotesInput;
};


export type MutationCreatePostsArgs = {
  newPostsInput: PostsInput;
};


export type MutationCreateThemesArgs = {
  newThemesInput: ThemesInput;
};


export type MutationCreateUsersArgs = {
  newUsersInput: UsersInput;
};


export type MutationDeleteMessagesArgs = {
  messageId: Scalars['String'];
};


export type MutationDeleteNewsArgs = {
  id: Scalars['String'];
};


export type MutationDeleteNotesArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostsArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUsersArgs = {
  id: Scalars['String'];
};


export type MutationLoginUsersArgs = {
  UsersLoginInput: UsersInput;
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['String'];
};


export type MutationUpdateNotesArgs = {
  editNotesInput: NotesInput;
};


export type MutationUpdatePostArgs = {
  newPostsInput: PostsInput;
};


export type MutationUserUpdateArgs = {
  UsersUpdateInput: UsersInput;
};


export type MutationUserUpdatePasswordArgs = {
  UsersUpdateInput: UsersInput;
};

/** The News Model */
export type News = {
  __typename?: 'News';
  author: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  intro?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  mainPicture?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type NewsInput = {
  author: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ID']>;
  intro?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  mainPicture?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

/** The Notes Model */
export type Notes = {
  __typename?: 'Notes';
  backgroundColor?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isArchived?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type NotesInput = {
  backgroundColor?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  isArchived?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

/** The Partners Model */
export type Partners = {
  __typename?: 'Partners';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  content: ContentObject;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  intro: IntroObject;
  latitude: Scalars['Float'];
  logo?: Maybe<Scalars['String']>;
  longitude: Scalars['Float'];
  main_picture?: Maybe<Scalars['String']>;
  name: NameObject;
  website?: Maybe<Scalars['String']>;
};

/** The Posts Model */
export type Posts = {
  __typename?: 'Posts';
  author: Users;
  comments: Array<CommentObject>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  intro: Scalars['String'];
  likes?: Maybe<Scalars['Float']>;
  mainPicture?: Maybe<Scalars['String']>;
  submitted?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  validated?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

export type PostsInput = {
  author: Scalars['String'];
  comments?: InputMaybe<Array<Comment>>;
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ID']>;
  intro: Scalars['String'];
  likes?: InputMaybe<Scalars['Float']>;
  mainPicture?: InputMaybe<Scalars['String']>;
  submitted?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  validated?: InputMaybe<Scalars['String']>;
  video?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get List of All Draft Posts By User */
  AllDraftPostsByUserList: Array<Posts>;
  /** Get List of All Posts By User */
  AllPostsByUserList: Array<Posts>;
  /** Get List of All Submitted Posts By User */
  AllSubmittedPostsByUserList: Array<Posts>;
  /** Get List of Messages */
  MessagesList: Array<Messages>;
  News: News;
  /** Get List of News */
  NewsList: Array<News>;
  Partner: Partners;
  /** Get List of Partners */
  PartnersList: Array<Partners>;
  Posts: Posts;
  /** Get List of Posts By User */
  PostsByUserList: Array<Posts>;
  /** Get List of Posts */
  PostsList: Array<Posts>;
  Trip: Trip;
  /** Get List of Validated Posts */
  ValidatedPostsList: Array<Posts>;
  notes: Notes;
  /** Get List of Notes */
  notesList: Array<Notes>;
  user: Users;
  userEmail: Users;
  /** Get List of Users */
  usersList: Array<Users>;
};


export type QueryNewsArgs = {
  id: Scalars['String'];
};


export type QueryPartnerArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  id: Scalars['String'];
};


export type QueryPostsByUserListArgs = {
  id: Scalars['String'];
};


export type QueryTripArgs = {
  id: Scalars['String'];
};


export type QueryNotesArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserEmailArgs = {
  email: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  accessToken: Scalars['String'];
  avatar: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  refreshToken: Scalars['String'];
  status: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageDeleted: Messages;
  messageSent: Messages;
  newUserConnected: Users;
  newUserDisconnected: Users;
};

export type ThemeCreatedResponse = {
  __typename?: 'ThemeCreatedResponse';
  desc: Scalars['String'];
  id: Scalars['String'];
  intro: Scalars['String'];
  name: Scalars['String'];
};

export type ThemesInput = {
  desc?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  intro?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** The Trips Model */
export type Trip = {
  __typename?: 'Trip';
  id: Scalars['ID'];
  locations: Array<LocationObject>;
  start_date?: Maybe<Scalars['DateTime']>;
};

/** The Users Model */
export type Users = {
  __typename?: 'Users';
  active?: Maybe<Scalars['Boolean']>;
  app_lang?: Maybe<Scalars['String']>;
  audio?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  desc?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  isOnChat: Scalars['Boolean'];
  isOnline: Scalars['Boolean'];
  lang: Array<Scalars['String']>;
  lastLogin: Scalars['DateTime'];
  lastName: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  tokenVersion: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type UsersInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  appLang?: InputMaybe<Scalars['String']>;
  audio?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  desc?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isOnChat?: InputMaybe<Scalars['Boolean']>;
  isOnline?: InputMaybe<Scalars['Boolean']>;
  lang?: InputMaybe<Array<Scalars['String']>>;
  lastLogin?: InputMaybe<Scalars['DateTime']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ContentObject = {
  __typename?: 'contentObject';
  AR: Scalars['String'];
  EN: Scalars['String'];
  ES: Scalars['String'];
  FR: Scalars['String'];
  IT: Scalars['String'];
};

export type IntroObject = {
  __typename?: 'introObject';
  AR: Scalars['String'];
  EN: Scalars['String'];
  ES: Scalars['String'];
  FR: Scalars['String'];
  IT: Scalars['String'];
};

export type NameObject = {
  __typename?: 'nameObject';
  AR: Scalars['String'];
  EN: Scalars['String'];
  ES: Scalars['String'];
  FR: Scalars['String'];
  IT: Scalars['String'];
};

export type AddLikesMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AddLikesMutation = { __typename?: 'Mutation', addLikes: string };

export type CreateMessagesMutationVariables = Exact<{
  newMessagesInput: MessagesInput;
}>;


export type CreateMessagesMutation = { __typename?: 'Mutation', createMessages: { __typename?: 'Messages', id?: string | null, content?: string | null } };

export type CreateNewPostMutationVariables = Exact<{
  newPostsInput: PostsInput;
}>;


export type CreateNewPostMutation = { __typename?: 'Mutation', createPosts: { __typename?: 'Posts', title: string, intro: string, content?: string | null, mainPicture?: string | null, likes?: number | null, submitted?: boolean | null, validated?: string | null, video?: string | null } };

export type DeleteMessagesMutationVariables = Exact<{
  messageId: Scalars['String'];
}>;


export type DeleteMessagesMutation = { __typename?: 'Mutation', deleteMessages: { __typename?: 'Messages', id?: string | null } };

export type DeletePostsMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostsMutation = { __typename?: 'Mutation', deletePosts: { __typename?: 'Posts', id: string } };

export type GetAllDraftPostsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDraftPostsByUserQuery = { __typename?: 'Query', AllDraftPostsByUserList: Array<{ __typename?: 'Posts', id: string, title: string, mainPicture?: string | null, createdAt: any, intro: string, video?: string | null, validated?: string | null, content?: string | null, submitted?: boolean | null, likes?: number | null, comments: Array<{ __typename?: 'CommentObject', author: string, content: string, date: any }> }> };

export type GetAllMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMessagesQuery = { __typename?: 'Query', MessagesList: Array<{ __typename?: 'Messages', id?: string | null, content?: string | null, mainPicture?: string | null, author?: { __typename?: 'Users', avatar?: string | null, firstName: string, id: string, status?: string | null, email?: string | null } | null }> };

export type GetAllNewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllNewsQuery = { __typename?: 'Query', NewsList: Array<{ __typename?: 'News', id: string, title: string, author: string, content?: string | null, mainPicture?: string | null, createdAt: any, isActive?: boolean | null, intro?: string | null }> };

export type GetAllPartnersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPartnersQuery = { __typename?: 'Query', PartnersList: Array<{ __typename?: 'Partners', id: string, latitude: number, logo?: string | null, city?: string | null, country?: string | null, main_picture?: string | null, longitude: number, name: { __typename?: 'nameObject', FR: string } }> };

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', PostsList: Array<{ __typename?: 'Posts', id: string, title: string, content?: string | null, mainPicture?: string | null, createdAt: any, validated?: string | null, likes?: number | null, intro: string, comments: Array<{ __typename?: 'CommentObject', author: string, content: string, date: any }> }> };

export type GetAllPostsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsByUserQuery = { __typename?: 'Query', AllPostsByUserList: Array<{ __typename?: 'Posts', id: string, title: string, mainPicture?: string | null, createdAt: any, intro: string, likes?: number | null, validated?: string | null, submitted?: boolean | null, video?: string | null, author: { __typename?: 'Users', email?: string | null }, comments: Array<{ __typename?: 'CommentObject', author: string, content: string, date: any }> }> };

export type GetAllSubmittedPostsByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSubmittedPostsByUserQuery = { __typename?: 'Query', AllSubmittedPostsByUserList: Array<{ __typename?: 'Posts', id: string, title: string, mainPicture?: string | null, createdAt: any, intro: string, validated?: string | null, video?: string | null, submitted?: boolean | null, likes?: number | null, comments: Array<{ __typename?: 'CommentObject', author: string, content: string, date: any }> }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', usersList: Array<{ __typename?: 'Users', id: string, email?: string | null, firstName: string, lastName: string, status?: string | null, avatar?: string | null, city?: string | null, country?: string | null, lang: Array<string>, desc?: string | null }> };

export type ConnectToChatMutationVariables = Exact<{ [key: string]: never; }>;


export type ConnectToChatMutation = { __typename?: 'Mutation', newUserConnected: { __typename?: 'Users', id: string } };

export type DisconnectFromChatMutationVariables = Exact<{ [key: string]: never; }>;


export type DisconnectFromChatMutation = { __typename?: 'Mutation', newUserDisconnected: { __typename?: 'Users', id: string } };

export type GetNewsByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetNewsByIdQuery = { __typename?: 'Query', News: { __typename?: 'News', id: string, title: string, author: string, content?: string | null, mainPicture?: string | null, createdAt: any, isActive?: boolean | null, intro?: string | null } };

export type GetPartnerByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPartnerByIdQuery = { __typename?: 'Query', Partner: { __typename?: 'Partners', id: string, main_picture?: string | null, name: { __typename?: 'nameObject', FR: string }, content: { __typename?: 'contentObject', FR: string } } };

export type GetPostsByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostsByIdQuery = { __typename?: 'Query', Posts: { __typename?: 'Posts', id: string, title: string, content?: string | null, mainPicture?: string | null, submitted?: boolean | null, video?: string | null, createdAt: any, intro: string, validated?: string | null, likes?: number | null, author: { __typename?: 'Users', avatar?: string | null, firstName: string, id: string, status?: string | null, email?: string | null }, comments: Array<{ __typename?: 'CommentObject', author: string, content: string, date: any }> } };

export type GetPostsByUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostsByUserQuery = { __typename?: 'Query', PostsByUserList: Array<{ __typename?: 'Posts', id: string, title: string, mainPicture?: string | null, createdAt: any, video?: string | null, intro: string, likes?: number | null, comments: Array<{ __typename?: 'CommentObject', author: string, content: string, date: any }> }> };

export type GetTripByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTripByIdQuery = { __typename?: 'Query', Trip: { __typename?: 'Trip', id: string, start_date?: any | null, locations: Array<{ __typename?: 'LocationObject', name: string, latitude: number, longitude: number, date: any }> } };

export type GetUsersByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUsersByEmailQuery = { __typename?: 'Query', userEmail: { __typename?: 'Users', firstName: string, lastName: string, email?: string | null, avatar?: string | null, audio?: string | null, bio?: string | null, lang: Array<string>, status?: string | null, country?: string | null, createdAt: any, lastLogin: any, city?: string | null } };

export type GetUsersByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUsersByIdQuery = { __typename?: 'Query', user: { __typename?: 'Users', id: string, firstName: string, lastName: string, email?: string | null, avatar?: string | null, audio?: string | null, bio?: string | null, lang: Array<string>, status?: string | null, country?: string | null, createdAt: any, lastLogin: any, city?: string | null } };

export type GetValidatedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetValidatedPostsQuery = { __typename?: 'Query', ValidatedPostsList: Array<{ __typename?: 'Posts', id: string, title: string, content?: string | null, mainPicture?: string | null, video?: string | null, createdAt: any, validated?: string | null, likes?: number | null, intro: string, comments: Array<{ __typename?: 'CommentObject', author: string, content: string, date: any }> }> };

export type LoginMutationVariables = Exact<{
  UsersLoginInput: UsersInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUsers: { __typename?: 'LoginResponse', accessToken: string, refreshToken: string, firstName: string, lastName: string, avatar: string, status: string, email: string } };

export type OnMessageAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessageAddedSubscription = { __typename?: 'Subscription', messageSent: { __typename?: 'Messages', id?: string | null, content?: string | null, createdAt?: any | null, mainPicture?: string | null, author?: { __typename?: 'Users', firstName: string, avatar?: string | null, email?: string | null, status?: string | null } | null } };

export type OnMessageDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMessageDeletedSubscription = { __typename?: 'Subscription', messageDeleted: { __typename?: 'Messages', id?: string | null } };

export type NewUserConnectedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewUserConnectedSubscription = { __typename?: 'Subscription', newUserConnected: { __typename?: 'Users', id: string, firstName: string, avatar?: string | null, email?: string | null, status?: string | null } };

export type NewUserDisconnectedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewUserDisconnectedSubscription = { __typename?: 'Subscription', newUserDisconnected: { __typename?: 'Users', id: string } };

export type RegisterMutationVariables = Exact<{
  newUsersInput: UsersInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUsers: { __typename?: 'RegisterResponse', accessToken: string, refreshToken: string, firstName: string, lastName: string, avatar: string, status: string, email: string } };

export type UpdateTripMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateTripMutation = { __typename?: 'Mutation', updateTrip: { __typename?: 'Trip', locations: Array<{ __typename?: 'LocationObject', name: string, latitude: number, longitude: number, date: any, description: string }> } };

export type UpdatePostMutationVariables = Exact<{
  newPostsInput: PostsInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Posts', id: string } };

export type UpdateUserDataMutationVariables = Exact<{
  UsersUpdateInput: UsersInput;
}>;


export type UpdateUserDataMutation = { __typename?: 'Mutation', userUpdate: { __typename?: 'Users', firstName: string, lastName: string, avatar?: string | null, password?: string | null, bio?: string | null, city?: string | null, country?: string | null } };

export type UpdateUserPasswordMutationVariables = Exact<{
  UsersUpdateInput: UsersInput;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', userUpdatePassword: { __typename?: 'Users', firstName: string, lastName: string, avatar?: string | null, password?: string | null } };


export const AddLikesDocument = gql`
    mutation addLikes($id: String!) {
  addLikes(id: $id)
}
    `;
export type AddLikesMutationFn = Apollo.MutationFunction<AddLikesMutation, AddLikesMutationVariables>;

/**
 * __useAddLikesMutation__
 *
 * To run a mutation, you first call `useAddLikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLikesMutation, { data, loading, error }] = useAddLikesMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddLikesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddLikesMutation, AddLikesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddLikesMutation, AddLikesMutationVariables>(AddLikesDocument, options);
      }
export type AddLikesMutationHookResult = ReturnType<typeof useAddLikesMutation>;
export type AddLikesMutationResult = Apollo.MutationResult<AddLikesMutation>;
export type AddLikesMutationOptions = Apollo.BaseMutationOptions<AddLikesMutation, AddLikesMutationVariables>;
export const CreateMessagesDocument = gql`
    mutation createMessages($newMessagesInput: MessagesInput!) {
  createMessages(newMessagesInput: $newMessagesInput) {
    id
    content
  }
}
    `;
export type CreateMessagesMutationFn = Apollo.MutationFunction<CreateMessagesMutation, CreateMessagesMutationVariables>;

/**
 * __useCreateMessagesMutation__
 *
 * To run a mutation, you first call `useCreateMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessagesMutation, { data, loading, error }] = useCreateMessagesMutation({
 *   variables: {
 *      newMessagesInput: // value for 'newMessagesInput'
 *   },
 * });
 */
export function useCreateMessagesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMessagesMutation, CreateMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateMessagesMutation, CreateMessagesMutationVariables>(CreateMessagesDocument, options);
      }
export type CreateMessagesMutationHookResult = ReturnType<typeof useCreateMessagesMutation>;
export type CreateMessagesMutationResult = Apollo.MutationResult<CreateMessagesMutation>;
export type CreateMessagesMutationOptions = Apollo.BaseMutationOptions<CreateMessagesMutation, CreateMessagesMutationVariables>;
export const CreateNewPostDocument = gql`
    mutation createNewPost($newPostsInput: PostsInput!) {
  createPosts(newPostsInput: $newPostsInput) {
    title
    intro
    content
    mainPicture
    likes
    submitted
    validated
    video
  }
}
    `;
export type CreateNewPostMutationFn = Apollo.MutationFunction<CreateNewPostMutation, CreateNewPostMutationVariables>;

/**
 * __useCreateNewPostMutation__
 *
 * To run a mutation, you first call `useCreateNewPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewPostMutation, { data, loading, error }] = useCreateNewPostMutation({
 *   variables: {
 *      newPostsInput: // value for 'newPostsInput'
 *   },
 * });
 */
export function useCreateNewPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateNewPostMutation, CreateNewPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateNewPostMutation, CreateNewPostMutationVariables>(CreateNewPostDocument, options);
      }
export type CreateNewPostMutationHookResult = ReturnType<typeof useCreateNewPostMutation>;
export type CreateNewPostMutationResult = Apollo.MutationResult<CreateNewPostMutation>;
export type CreateNewPostMutationOptions = Apollo.BaseMutationOptions<CreateNewPostMutation, CreateNewPostMutationVariables>;
export const DeleteMessagesDocument = gql`
    mutation deleteMessages($messageId: String!) {
  deleteMessages(messageId: $messageId) {
    id
  }
}
    `;
export type DeleteMessagesMutationFn = Apollo.MutationFunction<DeleteMessagesMutation, DeleteMessagesMutationVariables>;

/**
 * __useDeleteMessagesMutation__
 *
 * To run a mutation, you first call `useDeleteMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessagesMutation, { data, loading, error }] = useDeleteMessagesMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessagesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMessagesMutation, DeleteMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteMessagesMutation, DeleteMessagesMutationVariables>(DeleteMessagesDocument, options);
      }
export type DeleteMessagesMutationHookResult = ReturnType<typeof useDeleteMessagesMutation>;
export type DeleteMessagesMutationResult = Apollo.MutationResult<DeleteMessagesMutation>;
export type DeleteMessagesMutationOptions = Apollo.BaseMutationOptions<DeleteMessagesMutation, DeleteMessagesMutationVariables>;
export const DeletePostsDocument = gql`
    mutation deletePosts($id: String!) {
  deletePosts(id: $id) {
    id
  }
}
    `;
export type DeletePostsMutationFn = Apollo.MutationFunction<DeletePostsMutation, DeletePostsMutationVariables>;

/**
 * __useDeletePostsMutation__
 *
 * To run a mutation, you first call `useDeletePostsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostsMutation, { data, loading, error }] = useDeletePostsMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostsMutation, DeletePostsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeletePostsMutation, DeletePostsMutationVariables>(DeletePostsDocument, options);
      }
export type DeletePostsMutationHookResult = ReturnType<typeof useDeletePostsMutation>;
export type DeletePostsMutationResult = Apollo.MutationResult<DeletePostsMutation>;
export type DeletePostsMutationOptions = Apollo.BaseMutationOptions<DeletePostsMutation, DeletePostsMutationVariables>;
export const GetAllDraftPostsByUserDocument = gql`
    query getAllDraftPostsByUser {
  AllDraftPostsByUserList {
    id
    title
    mainPicture
    createdAt
    intro
    video
    validated
    content
    submitted
    likes
    comments {
      author
      content
      date
    }
  }
}
    `;

/**
 * __useGetAllDraftPostsByUserQuery__
 *
 * To run a query within a React component, call `useGetAllDraftPostsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDraftPostsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDraftPostsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDraftPostsByUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllDraftPostsByUserQuery, GetAllDraftPostsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllDraftPostsByUserQuery, GetAllDraftPostsByUserQueryVariables>(GetAllDraftPostsByUserDocument, options);
      }
export function useGetAllDraftPostsByUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllDraftPostsByUserQuery, GetAllDraftPostsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllDraftPostsByUserQuery, GetAllDraftPostsByUserQueryVariables>(GetAllDraftPostsByUserDocument, options);
        }
export type GetAllDraftPostsByUserQueryHookResult = ReturnType<typeof useGetAllDraftPostsByUserQuery>;
export type GetAllDraftPostsByUserLazyQueryHookResult = ReturnType<typeof useGetAllDraftPostsByUserLazyQuery>;
export type GetAllDraftPostsByUserQueryResult = Apollo.QueryResult<GetAllDraftPostsByUserQuery, GetAllDraftPostsByUserQueryVariables>;
export const GetAllMessagesDocument = gql`
    query getAllMessages {
  MessagesList {
    id
    content
    mainPicture
    author {
      avatar
      firstName
      id
      status
      email
    }
  }
}
    `;

/**
 * __useGetAllMessagesQuery__
 *
 * To run a query within a React component, call `useGetAllMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllMessagesQuery, GetAllMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllMessagesQuery, GetAllMessagesQueryVariables>(GetAllMessagesDocument, options);
      }
export function useGetAllMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllMessagesQuery, GetAllMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllMessagesQuery, GetAllMessagesQueryVariables>(GetAllMessagesDocument, options);
        }
export type GetAllMessagesQueryHookResult = ReturnType<typeof useGetAllMessagesQuery>;
export type GetAllMessagesLazyQueryHookResult = ReturnType<typeof useGetAllMessagesLazyQuery>;
export type GetAllMessagesQueryResult = Apollo.QueryResult<GetAllMessagesQuery, GetAllMessagesQueryVariables>;
export const GetAllNewsDocument = gql`
    query getAllNews {
  NewsList {
    id
    title
    author
    content
    mainPicture
    createdAt
    isActive
    intro
  }
}
    `;

/**
 * __useGetAllNewsQuery__
 *
 * To run a query within a React component, call `useGetAllNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllNewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllNewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllNewsQuery, GetAllNewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllNewsQuery, GetAllNewsQueryVariables>(GetAllNewsDocument, options);
      }
export function useGetAllNewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllNewsQuery, GetAllNewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllNewsQuery, GetAllNewsQueryVariables>(GetAllNewsDocument, options);
        }
export type GetAllNewsQueryHookResult = ReturnType<typeof useGetAllNewsQuery>;
export type GetAllNewsLazyQueryHookResult = ReturnType<typeof useGetAllNewsLazyQuery>;
export type GetAllNewsQueryResult = Apollo.QueryResult<GetAllNewsQuery, GetAllNewsQueryVariables>;
export const GetAllPartnersDocument = gql`
    query getAllPartners {
  PartnersList {
    id
    latitude
    logo
    city
    country
    main_picture
    longitude
    name {
      FR
    }
  }
}
    `;

/**
 * __useGetAllPartnersQuery__
 *
 * To run a query within a React component, call `useGetAllPartnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPartnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPartnersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPartnersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllPartnersQuery, GetAllPartnersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllPartnersQuery, GetAllPartnersQueryVariables>(GetAllPartnersDocument, options);
      }
export function useGetAllPartnersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllPartnersQuery, GetAllPartnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllPartnersQuery, GetAllPartnersQueryVariables>(GetAllPartnersDocument, options);
        }
export type GetAllPartnersQueryHookResult = ReturnType<typeof useGetAllPartnersQuery>;
export type GetAllPartnersLazyQueryHookResult = ReturnType<typeof useGetAllPartnersLazyQuery>;
export type GetAllPartnersQueryResult = Apollo.QueryResult<GetAllPartnersQuery, GetAllPartnersQueryVariables>;
export const GetAllPostsDocument = gql`
    query getAllPosts {
  PostsList {
    id
    title
    content
    mainPicture
    createdAt
    validated
    likes
    intro
    comments {
      author
      content
      date
    }
  }
}
    `;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetAllPostsByUserDocument = gql`
    query getAllPostsByUser {
  AllPostsByUserList {
    id
    title
    mainPicture
    createdAt
    intro
    likes
    validated
    submitted
    video
    author {
      email
    }
    comments {
      author
      content
      date
    }
  }
}
    `;

/**
 * __useGetAllPostsByUserQuery__
 *
 * To run a query within a React component, call `useGetAllPostsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostsByUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllPostsByUserQuery, GetAllPostsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllPostsByUserQuery, GetAllPostsByUserQueryVariables>(GetAllPostsByUserDocument, options);
      }
export function useGetAllPostsByUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllPostsByUserQuery, GetAllPostsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllPostsByUserQuery, GetAllPostsByUserQueryVariables>(GetAllPostsByUserDocument, options);
        }
export type GetAllPostsByUserQueryHookResult = ReturnType<typeof useGetAllPostsByUserQuery>;
export type GetAllPostsByUserLazyQueryHookResult = ReturnType<typeof useGetAllPostsByUserLazyQuery>;
export type GetAllPostsByUserQueryResult = Apollo.QueryResult<GetAllPostsByUserQuery, GetAllPostsByUserQueryVariables>;
export const GetAllSubmittedPostsByUserDocument = gql`
    query getAllSubmittedPostsByUser {
  AllSubmittedPostsByUserList {
    id
    title
    mainPicture
    createdAt
    intro
    validated
    video
    submitted
    likes
    comments {
      author
      content
      date
    }
  }
}
    `;

/**
 * __useGetAllSubmittedPostsByUserQuery__
 *
 * To run a query within a React component, call `useGetAllSubmittedPostsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSubmittedPostsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSubmittedPostsByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSubmittedPostsByUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllSubmittedPostsByUserQuery, GetAllSubmittedPostsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllSubmittedPostsByUserQuery, GetAllSubmittedPostsByUserQueryVariables>(GetAllSubmittedPostsByUserDocument, options);
      }
export function useGetAllSubmittedPostsByUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllSubmittedPostsByUserQuery, GetAllSubmittedPostsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllSubmittedPostsByUserQuery, GetAllSubmittedPostsByUserQueryVariables>(GetAllSubmittedPostsByUserDocument, options);
        }
export type GetAllSubmittedPostsByUserQueryHookResult = ReturnType<typeof useGetAllSubmittedPostsByUserQuery>;
export type GetAllSubmittedPostsByUserLazyQueryHookResult = ReturnType<typeof useGetAllSubmittedPostsByUserLazyQuery>;
export type GetAllSubmittedPostsByUserQueryResult = Apollo.QueryResult<GetAllSubmittedPostsByUserQuery, GetAllSubmittedPostsByUserQueryVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
  usersList {
    id
    email
    firstName
    lastName
    status
    avatar
    city
    country
    lang
    desc
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const ConnectToChatDocument = gql`
    mutation connectToChat {
  newUserConnected {
    id
  }
}
    `;
export type ConnectToChatMutationFn = Apollo.MutationFunction<ConnectToChatMutation, ConnectToChatMutationVariables>;

/**
 * __useConnectToChatMutation__
 *
 * To run a mutation, you first call `useConnectToChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectToChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectToChatMutation, { data, loading, error }] = useConnectToChatMutation({
 *   variables: {
 *   },
 * });
 */
export function useConnectToChatMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ConnectToChatMutation, ConnectToChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ConnectToChatMutation, ConnectToChatMutationVariables>(ConnectToChatDocument, options);
      }
export type ConnectToChatMutationHookResult = ReturnType<typeof useConnectToChatMutation>;
export type ConnectToChatMutationResult = Apollo.MutationResult<ConnectToChatMutation>;
export type ConnectToChatMutationOptions = Apollo.BaseMutationOptions<ConnectToChatMutation, ConnectToChatMutationVariables>;
export const DisconnectFromChatDocument = gql`
    mutation disconnectFromChat {
  newUserDisconnected {
    id
  }
}
    `;
export type DisconnectFromChatMutationFn = Apollo.MutationFunction<DisconnectFromChatMutation, DisconnectFromChatMutationVariables>;

/**
 * __useDisconnectFromChatMutation__
 *
 * To run a mutation, you first call `useDisconnectFromChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisconnectFromChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disconnectFromChatMutation, { data, loading, error }] = useDisconnectFromChatMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisconnectFromChatMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DisconnectFromChatMutation, DisconnectFromChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DisconnectFromChatMutation, DisconnectFromChatMutationVariables>(DisconnectFromChatDocument, options);
      }
export type DisconnectFromChatMutationHookResult = ReturnType<typeof useDisconnectFromChatMutation>;
export type DisconnectFromChatMutationResult = Apollo.MutationResult<DisconnectFromChatMutation>;
export type DisconnectFromChatMutationOptions = Apollo.BaseMutationOptions<DisconnectFromChatMutation, DisconnectFromChatMutationVariables>;
export const GetNewsByIdDocument = gql`
    query getNewsById($id: String!) {
  News(id: $id) {
    id
    title
    author
    content
    mainPicture
    createdAt
    isActive
    intro
  }
}
    `;

/**
 * __useGetNewsByIdQuery__
 *
 * To run a query within a React component, call `useGetNewsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewsByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNewsByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetNewsByIdQuery, GetNewsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetNewsByIdQuery, GetNewsByIdQueryVariables>(GetNewsByIdDocument, options);
      }
export function useGetNewsByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetNewsByIdQuery, GetNewsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetNewsByIdQuery, GetNewsByIdQueryVariables>(GetNewsByIdDocument, options);
        }
export type GetNewsByIdQueryHookResult = ReturnType<typeof useGetNewsByIdQuery>;
export type GetNewsByIdLazyQueryHookResult = ReturnType<typeof useGetNewsByIdLazyQuery>;
export type GetNewsByIdQueryResult = Apollo.QueryResult<GetNewsByIdQuery, GetNewsByIdQueryVariables>;
export const GetPartnerByIdDocument = gql`
    query getPartnerById($id: String!) {
  Partner(id: $id) {
    id
    name {
      FR
    }
    content {
      FR
    }
    main_picture
  }
}
    `;

/**
 * __useGetPartnerByIdQuery__
 *
 * To run a query within a React component, call `useGetPartnerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPartnerByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>(GetPartnerByIdDocument, options);
      }
export function useGetPartnerByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>(GetPartnerByIdDocument, options);
        }
export type GetPartnerByIdQueryHookResult = ReturnType<typeof useGetPartnerByIdQuery>;
export type GetPartnerByIdLazyQueryHookResult = ReturnType<typeof useGetPartnerByIdLazyQuery>;
export type GetPartnerByIdQueryResult = Apollo.QueryResult<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>;
export const GetPostsByIdDocument = gql`
    query getPostsById($id: String!) {
  Posts(id: $id) {
    id
    title
    content
    mainPicture
    submitted
    video
    createdAt
    author {
      avatar
      firstName
      id
      status
      email
    }
    intro
    validated
    likes
    comments {
      author
      content
      date
    }
  }
}
    `;

/**
 * __useGetPostsByIdQuery__
 *
 * To run a query within a React component, call `useGetPostsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostsByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPostsByIdQuery, GetPostsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPostsByIdQuery, GetPostsByIdQueryVariables>(GetPostsByIdDocument, options);
      }
export function useGetPostsByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostsByIdQuery, GetPostsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPostsByIdQuery, GetPostsByIdQueryVariables>(GetPostsByIdDocument, options);
        }
export type GetPostsByIdQueryHookResult = ReturnType<typeof useGetPostsByIdQuery>;
export type GetPostsByIdLazyQueryHookResult = ReturnType<typeof useGetPostsByIdLazyQuery>;
export type GetPostsByIdQueryResult = Apollo.QueryResult<GetPostsByIdQuery, GetPostsByIdQueryVariables>;
export const GetPostsByUserDocument = gql`
    query getPostsByUser($id: String!) {
  PostsByUserList(id: $id) {
    id
    title
    mainPicture
    createdAt
    video
    intro
    likes
    comments {
      author
      content
      date
    }
  }
}
    `;

/**
 * __useGetPostsByUserQuery__
 *
 * To run a query within a React component, call `useGetPostsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostsByUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(GetPostsByUserDocument, options);
      }
export function useGetPostsByUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostsByUserQuery, GetPostsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPostsByUserQuery, GetPostsByUserQueryVariables>(GetPostsByUserDocument, options);
        }
export type GetPostsByUserQueryHookResult = ReturnType<typeof useGetPostsByUserQuery>;
export type GetPostsByUserLazyQueryHookResult = ReturnType<typeof useGetPostsByUserLazyQuery>;
export type GetPostsByUserQueryResult = Apollo.QueryResult<GetPostsByUserQuery, GetPostsByUserQueryVariables>;
export const GetTripByIdDocument = gql`
    query getTripById($id: String!) {
  Trip(id: $id) {
    id
    start_date
    locations {
      name
      latitude
      longitude
      date
    }
  }
}
    `;

/**
 * __useGetTripByIdQuery__
 *
 * To run a query within a React component, call `useGetTripByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTripByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTripByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTripByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetTripByIdQuery, GetTripByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetTripByIdQuery, GetTripByIdQueryVariables>(GetTripByIdDocument, options);
      }
export function useGetTripByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTripByIdQuery, GetTripByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetTripByIdQuery, GetTripByIdQueryVariables>(GetTripByIdDocument, options);
        }
export type GetTripByIdQueryHookResult = ReturnType<typeof useGetTripByIdQuery>;
export type GetTripByIdLazyQueryHookResult = ReturnType<typeof useGetTripByIdLazyQuery>;
export type GetTripByIdQueryResult = Apollo.QueryResult<GetTripByIdQuery, GetTripByIdQueryVariables>;
export const GetUsersByEmailDocument = gql`
    query getUsersByEmail($email: String!) {
  userEmail(email: $email) {
    firstName
    lastName
    email
    avatar
    audio
    bio
    lang
    status
    country
    createdAt
    lastLogin
    city
  }
}
    `;

/**
 * __useGetUsersByEmailQuery__
 *
 * To run a query within a React component, call `useGetUsersByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUsersByEmailQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>(GetUsersByEmailDocument, options);
      }
export function useGetUsersByEmailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>(GetUsersByEmailDocument, options);
        }
export type GetUsersByEmailQueryHookResult = ReturnType<typeof useGetUsersByEmailQuery>;
export type GetUsersByEmailLazyQueryHookResult = ReturnType<typeof useGetUsersByEmailLazyQuery>;
export type GetUsersByEmailQueryResult = Apollo.QueryResult<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>;
export const GetUsersByIdDocument = gql`
    query getUsersById($id: String!) {
  user(id: $id) {
    id
    firstName
    lastName
    email
    avatar
    audio
    bio
    lang
    status
    country
    createdAt
    lastLogin
    city
  }
}
    `;

/**
 * __useGetUsersByIdQuery__
 *
 * To run a query within a React component, call `useGetUsersByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUsersByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUsersByIdQuery, GetUsersByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUsersByIdQuery, GetUsersByIdQueryVariables>(GetUsersByIdDocument, options);
      }
export function useGetUsersByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersByIdQuery, GetUsersByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUsersByIdQuery, GetUsersByIdQueryVariables>(GetUsersByIdDocument, options);
        }
export type GetUsersByIdQueryHookResult = ReturnType<typeof useGetUsersByIdQuery>;
export type GetUsersByIdLazyQueryHookResult = ReturnType<typeof useGetUsersByIdLazyQuery>;
export type GetUsersByIdQueryResult = Apollo.QueryResult<GetUsersByIdQuery, GetUsersByIdQueryVariables>;
export const GetValidatedPostsDocument = gql`
    query getValidatedPosts {
  ValidatedPostsList {
    id
    title
    content
    mainPicture
    video
    createdAt
    validated
    likes
    intro
    comments {
      author
      content
      date
    }
  }
}
    `;

/**
 * __useGetValidatedPostsQuery__
 *
 * To run a query within a React component, call `useGetValidatedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetValidatedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetValidatedPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetValidatedPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetValidatedPostsQuery, GetValidatedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetValidatedPostsQuery, GetValidatedPostsQueryVariables>(GetValidatedPostsDocument, options);
      }
export function useGetValidatedPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetValidatedPostsQuery, GetValidatedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetValidatedPostsQuery, GetValidatedPostsQueryVariables>(GetValidatedPostsDocument, options);
        }
export type GetValidatedPostsQueryHookResult = ReturnType<typeof useGetValidatedPostsQuery>;
export type GetValidatedPostsLazyQueryHookResult = ReturnType<typeof useGetValidatedPostsLazyQuery>;
export type GetValidatedPostsQueryResult = Apollo.QueryResult<GetValidatedPostsQuery, GetValidatedPostsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($UsersLoginInput: UsersInput!) {
  loginUsers(UsersLoginInput: $UsersLoginInput) {
    accessToken
    refreshToken
    firstName
    lastName
    avatar
    status
    email
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      UsersLoginInput: // value for 'UsersLoginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const OnMessageAddedDocument = gql`
    subscription onMessageAdded {
  messageSent {
    id
    content
    createdAt
    mainPicture
    author {
      firstName
      avatar
      email
      status
    }
  }
}
    `;

/**
 * __useOnMessageAddedSubscription__
 *
 * To run a query within a React component, call `useOnMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnMessageAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnMessageAddedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnMessageAddedSubscription, OnMessageAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<OnMessageAddedSubscription, OnMessageAddedSubscriptionVariables>(OnMessageAddedDocument, options);
      }
export type OnMessageAddedSubscriptionHookResult = ReturnType<typeof useOnMessageAddedSubscription>;
export type OnMessageAddedSubscriptionResult = Apollo.SubscriptionResult<OnMessageAddedSubscription>;
export const OnMessageDeletedDocument = gql`
    subscription onMessageDeleted {
  messageDeleted {
    id
  }
}
    `;

/**
 * __useOnMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useOnMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnMessageDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnMessageDeletedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnMessageDeletedSubscription, OnMessageDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<OnMessageDeletedSubscription, OnMessageDeletedSubscriptionVariables>(OnMessageDeletedDocument, options);
      }
export type OnMessageDeletedSubscriptionHookResult = ReturnType<typeof useOnMessageDeletedSubscription>;
export type OnMessageDeletedSubscriptionResult = Apollo.SubscriptionResult<OnMessageDeletedSubscription>;
export const NewUserConnectedDocument = gql`
    subscription newUserConnected {
  newUserConnected {
    id
    firstName
    avatar
    email
    status
  }
}
    `;

/**
 * __useNewUserConnectedSubscription__
 *
 * To run a query within a React component, call `useNewUserConnectedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewUserConnectedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewUserConnectedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewUserConnectedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewUserConnectedSubscription, NewUserConnectedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NewUserConnectedSubscription, NewUserConnectedSubscriptionVariables>(NewUserConnectedDocument, options);
      }
export type NewUserConnectedSubscriptionHookResult = ReturnType<typeof useNewUserConnectedSubscription>;
export type NewUserConnectedSubscriptionResult = Apollo.SubscriptionResult<NewUserConnectedSubscription>;
export const NewUserDisconnectedDocument = gql`
    subscription newUserDisconnected {
  newUserDisconnected {
    id
  }
}
    `;

/**
 * __useNewUserDisconnectedSubscription__
 *
 * To run a query within a React component, call `useNewUserDisconnectedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewUserDisconnectedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewUserDisconnectedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewUserDisconnectedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewUserDisconnectedSubscription, NewUserDisconnectedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<NewUserDisconnectedSubscription, NewUserDisconnectedSubscriptionVariables>(NewUserDisconnectedDocument, options);
      }
export type NewUserDisconnectedSubscriptionHookResult = ReturnType<typeof useNewUserDisconnectedSubscription>;
export type NewUserDisconnectedSubscriptionResult = Apollo.SubscriptionResult<NewUserDisconnectedSubscription>;
export const RegisterDocument = gql`
    mutation Register($newUsersInput: UsersInput!) {
  createUsers(newUsersInput: $newUsersInput) {
    accessToken
    refreshToken
    firstName
    lastName
    avatar
    status
    email
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      newUsersInput: // value for 'newUsersInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateTripDocument = gql`
    mutation updateTrip {
  updateTrip {
    locations {
      name
      latitude
      longitude
      date
      description
    }
  }
}
    `;
export type UpdateTripMutationFn = Apollo.MutationFunction<UpdateTripMutation, UpdateTripMutationVariables>;

/**
 * __useUpdateTripMutation__
 *
 * To run a mutation, you first call `useUpdateTripMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTripMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTripMutation, { data, loading, error }] = useUpdateTripMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateTripMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTripMutation, UpdateTripMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateTripMutation, UpdateTripMutationVariables>(UpdateTripDocument, options);
      }
export type UpdateTripMutationHookResult = ReturnType<typeof useUpdateTripMutation>;
export type UpdateTripMutationResult = Apollo.MutationResult<UpdateTripMutation>;
export type UpdateTripMutationOptions = Apollo.BaseMutationOptions<UpdateTripMutation, UpdateTripMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($newPostsInput: PostsInput!) {
  updatePost(newPostsInput: $newPostsInput) {
    id
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      newPostsInput: // value for 'newPostsInput'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateUserDataDocument = gql`
    mutation updateUserData($UsersUpdateInput: UsersInput!) {
  userUpdate(UsersUpdateInput: $UsersUpdateInput) {
    firstName
    lastName
    avatar
    password
    bio
    city
    country
  }
}
    `;
export type UpdateUserDataMutationFn = Apollo.MutationFunction<UpdateUserDataMutation, UpdateUserDataMutationVariables>;

/**
 * __useUpdateUserDataMutation__
 *
 * To run a mutation, you first call `useUpdateUserDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDataMutation, { data, loading, error }] = useUpdateUserDataMutation({
 *   variables: {
 *      UsersUpdateInput: // value for 'UsersUpdateInput'
 *   },
 * });
 */
export function useUpdateUserDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserDataMutation, UpdateUserDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserDataMutation, UpdateUserDataMutationVariables>(UpdateUserDataDocument, options);
      }
export type UpdateUserDataMutationHookResult = ReturnType<typeof useUpdateUserDataMutation>;
export type UpdateUserDataMutationResult = Apollo.MutationResult<UpdateUserDataMutation>;
export type UpdateUserDataMutationOptions = Apollo.BaseMutationOptions<UpdateUserDataMutation, UpdateUserDataMutationVariables>;
export const UpdateUserPasswordDocument = gql`
    mutation updateUserPassword($UsersUpdateInput: UsersInput!) {
  userUpdatePassword(UsersUpdateInput: $UsersUpdateInput) {
    firstName
    lastName
    avatar
    password
  }
}
    `;
export type UpdateUserPasswordMutationFn = Apollo.MutationFunction<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;

/**
 * __useUpdateUserPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPasswordMutation, { data, loading, error }] = useUpdateUserPasswordMutation({
 *   variables: {
 *      UsersUpdateInput: // value for 'UsersUpdateInput'
 *   },
 * });
 */
export function useUpdateUserPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument, options);
      }
export type UpdateUserPasswordMutationHookResult = ReturnType<typeof useUpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationResult = Apollo.MutationResult<UpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;