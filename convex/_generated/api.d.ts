/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as messages from "../messages.js";
import type * as modules from "../modules.js";
import type * as resources from "../resources.js";
import type * as studyRooms from "../studyRooms.js";
import type * as subjects from "../subjects.js";
import type * as tasks from "../tasks.js";
import type * as threads from "../threads.js";
import type * as users from "../users.js";
import type * as whiteboards from "../whiteboards.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  messages: typeof messages;
  modules: typeof modules;
  resources: typeof resources;
  studyRooms: typeof studyRooms;
  subjects: typeof subjects;
  tasks: typeof tasks;
  threads: typeof threads;
  users: typeof users;
  whiteboards: typeof whiteboards;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
