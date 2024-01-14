import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { studentInfo, universities, users } from "@/server/db/schema";
import { UserRole } from "@/server/enums/user-role.enum";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const studentRouter = createTRPCRouter({
  updateUserAsStudent: protectedProcedure.input(
    z.object({
      name: z.string().min(1),
      universityId: z.string().uuid(),
    })
  ).mutation(async ({ ctx, input }) => {
    const { universityId, name } = input;
    const db = ctx.db;

    const university = await db.select()
      .from(universities)
      .where(eq(universities.id, universityId))
      .execute().then((res) => res[0]);

    if (!university) {
      throw new Error("Invalid university id");
    }

    await db.update(users)
      .set({ role: UserRole.STUDENT, name })
      .where(eq(users.id, ctx.session.user.id))
      .execute();

    const existedStudentInfo = await db.query.studentInfo.findFirst({
      where: eq(studentInfo.userId, ctx.session.user.id),
    }).execute()

    if (existedStudentInfo) {
      await db.update(studentInfo)
        .set({ universityId })
        .where(eq(studentInfo.id, existedStudentInfo.id))
        .execute();

      return;
    }

    await db.insert(studentInfo).values({
      id: crypto.randomUUID(),
      userId: ctx.session.user.id,
      universityId,
    }).execute();
  }),
})