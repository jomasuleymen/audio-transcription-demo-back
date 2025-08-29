import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTranscriptionJobResponse = {
  __typename?: 'CreateTranscriptionJobResponse';
  job: TranscriptionJob;
  uploadUrl: Scalars['String']['output'];
};

export enum JobStatus {
  Completed = 'COMPLETED',
  Processing = 'PROCESSING',
  Waiting = 'WAITING'
}

export type Mutation = {
  __typename?: 'Mutation';
  confirmFileUpload: TranscriptionJob;
  createTranscriptionJob: CreateTranscriptionJobResponse;
};


export type MutationConfirmFileUploadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateTranscriptionJobArgs = {
  contentType: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  job?: Maybe<TranscriptionJob>;
  jobs: Array<TranscriptionJob>;
};


export type QueryJobArgs = {
  id: Scalars['ID']['input'];
};

export type TranscriptionJob = {
  __typename?: 'TranscriptionJob';
  id: Scalars['ID']['output'];
  s3Url: Scalars['String']['output'];
  status: JobStatus;
  transcriptionText?: Maybe<Scalars['String']['output']>;
};



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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateTranscriptionJobResponse: ResolverTypeWrapper<CreateTranscriptionJobResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  JobStatus: JobStatus;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TranscriptionJob: ResolverTypeWrapper<TranscriptionJob>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateTranscriptionJobResponse: CreateTranscriptionJobResponse;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  TranscriptionJob: TranscriptionJob;
};

export type CreateTranscriptionJobResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTranscriptionJobResponse'] = ResolversParentTypes['CreateTranscriptionJobResponse']> = {
  job?: Resolver<ResolversTypes['TranscriptionJob'], ParentType, ContextType>;
  uploadUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  confirmFileUpload?: Resolver<ResolversTypes['TranscriptionJob'], ParentType, ContextType, RequireFields<MutationConfirmFileUploadArgs, 'id'>>;
  createTranscriptionJob?: Resolver<ResolversTypes['CreateTranscriptionJobResponse'], ParentType, ContextType, RequireFields<MutationCreateTranscriptionJobArgs, 'contentType' | 'fileName'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  job?: Resolver<Maybe<ResolversTypes['TranscriptionJob']>, ParentType, ContextType, RequireFields<QueryJobArgs, 'id'>>;
  jobs?: Resolver<Array<ResolversTypes['TranscriptionJob']>, ParentType, ContextType>;
};

export type TranscriptionJobResolvers<ContextType = any, ParentType extends ResolversParentTypes['TranscriptionJob'] = ResolversParentTypes['TranscriptionJob']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  s3Url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['JobStatus'], ParentType, ContextType>;
  transcriptionText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CreateTranscriptionJobResponse?: CreateTranscriptionJobResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TranscriptionJob?: TranscriptionJobResolvers<ContextType>;
};

