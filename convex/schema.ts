import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // TABLE 1: USERS (Stores login info)
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(), // This links to Clerk
    image: v.optional(v.string()),
    university: v.optional(v.string()),
    stream: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  // TABLE 2: SUBJECTS (e.g., "Data Structures")
  subjects: defineTable({
    name: v.string(),
    course: v.string(), // e.g., "CS - Year 2"
    description: v.optional(v.string()),
    enrolledCount: v.number(), 
  }).searchIndex("search_name", { searchField: "name" }),

  // TABLE 3: ENROLLMENTS (Who is studying what)
  enrollments: defineTable({
    userId: v.id("users"),
    subjectId: v.id("subjects"),
  }).index("by_user", ["userId"])
    .index("by_subject_user", ["subjectId", "userId"]),
});