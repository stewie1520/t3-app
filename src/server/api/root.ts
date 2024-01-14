import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { universityRouter } from "./routers/university";
import { studentRouter } from "./routers/student";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  university: universityRouter,
  studentInfo: studentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
