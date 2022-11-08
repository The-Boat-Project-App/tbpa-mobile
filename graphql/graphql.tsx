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

export type Mutation = {
  __typename?: 'Mutation';
  addLikes: Scalars['String'];
  createNews: News;
  createNotes: Notes;
  createPosts: Posts;
  createThemes: ThemeCreatedResponse;
  createUsers: RegisterResponse;
  deleteNews: Scalars['String'];
  deleteNotes: Scalars['String'];
  deletePosts: Scalars['String'];
  deleteUsers: Scalars['String'];
  loginUsers: LoginResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  updateNotes: Notes;
  updatePosts: Posts;
  updateTrip: Trip;
};


export type MutationAddLikesArgs = {
  id: Scalars['String'];
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


export type MutationUpdatePostsArgs = {
  editPostsInput: PostsInput;
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
};

export type Query = {
  __typename?: 'Query';
  News: News;
  /** Get List of News */
  NewsList: Array<News>;
  Posts: Posts;
  /** Get List of Posts By User */
  PostsByUserList: Array<Posts>;
  /** Get List of Posts */
  PostsList: Array<Posts>;
  Trip: Trip;
  notes: Notes;
  /** Get List of Notes */
  notesList: Array<Notes>;
  user: Users;
  /** Get List of Users */
  usersList: Array<Users>;
};


export type QueryNewsArgs = {
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
  likeAdded: Posts;
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
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
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
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  lang?: InputMaybe<Array<Scalars['String']>>;
  lastLogin?: InputMaybe<Scalars['DateTime']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AddLikesMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AddLikesMutation = { __typename?: 'Mutation', addLikes: string };

export type CreateNewPostMutationVariables = Exact<{
  newPostsInput: PostsInput;
}>;


export type CreateNewPostMutation = { __typename?: 'Mutation', createPosts: { __typename?: 'Posts', title: string, intro: string, content?: string | null, mainPicture?: string | null, likes?: number | null, submitted?: boolean | null, validated?: string | null } };

export type GetAllNewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllNewsQuery = { __typename?: 'Query', NewsList: Array<{ __typename?: 'News', id: string, title: string, author: string, content?: string | null, mainPicture?: string | null, createdAt: any, isActive?: boolean | null, intro?: string | null }> };

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', PostsList: Array<{ __typename?: 'Posts', id: string, title: string, content?: string | null, mainPicture?: string | null, createdAt: any, validated?: string | null, likes?: number | null, intro: string, comments: Array<{ __typename?: 'CommentObject', author: string, content: string, date: any }> }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', usersList: Array<{ __typename?: 'Users', id: string, email?: string | null, firstName: string, lastName: string, status?: string | null, avatar?: string | null }> };

export type GetNewsByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetNewsByIdQuery = { __typename?: 'Query', News: { __typename?: 'News', id: string, title: string, content?: string | null, mainPicture?: string | null, createdAt: any, intro?: string | null } };

export type GetPostsByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostsByIdQuery = { __typename?: 'Query', Posts: { __typename?: 'Posts', id: string, title: string, content?: string | null, mainPicture?: string | null, createdAt: any, intro: string, validated?: string | null, likes?: number | null, author: { __typename?: 'Users', avatar?: string | null, firstName: string, id: string, status?: string | null }, comments: Array<{ __typename?: 'CommentObject', author: string, content: string, date: any }> } };

export type GetPostsByUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostsByUserQuery = { __typename?: 'Query', PostsByUserList: Array<{ __typename?: 'Posts', id: string, title: string, mainPicture?: string | null, createdAt: any, intro: string, likes?: number | null, comments: Array<{ __typename?: 'CommentObject', author: string, content: string, date: any }> }> };

export type GetTripByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTripByIdQuery = { __typename?: 'Query', Trip: { __typename?: 'Trip', id: string, locations: Array<{ __typename?: 'LocationObject', name: string, latitude: number, longitude: number, date: any }> } };

export type GetUsersByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUsersByIdQuery = { __typename?: 'Query', user: { __typename?: 'Users', id: string, firstName: string, lastName: string, email?: string | null, avatar?: string | null, audio?: string | null, bio?: string | null, lang: Array<string>, status?: string | null, country?: string | null, createdAt: any, lastLogin: any, city?: string | null } };

export type LoginMutationVariables = Exact<{
  UsersLoginInput: UsersInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUsers: { __typename?: 'LoginResponse', accessToken: string, refreshToken: string, firstName: string, lastName: string, avatar: string, status: string, email: string } };

export type RegisterMutationVariables = Exact<{
  newUsersInput: UsersInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUsers: { __typename?: 'RegisterResponse', accessToken: string, refreshToken: string, firstName: string, lastName: string, avatar: string, status: string, email: string } };

export type UpdateTripMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateTripMutation = { __typename?: 'Mutation', updateTrip: { __typename?: 'Trip', locations: Array<{ __typename?: 'LocationObject', name: string, latitude: number, longitude: number, date: any, description: string }> } };


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
export const GetAllUsersDocument = gql`
    query getAllUsers {
  usersList {
    id
    email
    firstName
    lastName
    status
    avatar
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
export const GetNewsByIdDocument = gql`
    query getNewsById($id: String!) {
  News(id: $id) {
    id
    title
    content
    mainPicture
    createdAt
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
export const GetPostsByIdDocument = gql`
    query getPostsById($id: String!) {
  Posts(id: $id) {
    id
    title
    content
    mainPicture
    createdAt
    author {
      avatar
      firstName
      id
      status
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