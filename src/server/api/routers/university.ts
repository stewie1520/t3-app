import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const universityRouter = createTRPCRouter({
  getAllUniversities: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.universities.findMany();
  }),
})