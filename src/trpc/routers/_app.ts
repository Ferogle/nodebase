import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import {prisma} from '@/lib/db';

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ctx}) => {
    const loggedInUser = ctx.auth.user.id;
    console.log("user id: ", ctx.auth.user.id);
      return prisma.user.findMany({
        where: {
          id: loggedInUser
        }
      });
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;