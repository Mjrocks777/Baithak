import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Get the user's identity from Clerk
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // 2. Check if we already have this user in our DB
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    // 3. If they exist, update their name/image (in case they changed it on Google)
    if (user !== null) {
      if (user.name !== identity.name || user.image !== identity.pictureUrl) {
        await ctx.db.patch(user._id, {
          name: identity.name!,
          image: identity.pictureUrl,
        });
      }
      return user._id;
    }

    // 4. If they are new, insert them into the database
    return await ctx.db.insert("users", {
      name: identity.name!,
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email!,
      image: identity.pictureUrl,
      university: "Not Set",
      stream: "Not Set",
    });
  },
});