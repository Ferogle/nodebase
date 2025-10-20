import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import {prisma} from '@/lib/db';
import { inngest } from '@/inngest/client';
import {google} from '@ai-sdk/google';
import { generateText } from 'ai';

export const appRouter = createTRPCRouter({
  testGeminiAI: protectedProcedure.mutation(
    async () => {
      await inngest.send({
        name: "execute/ai"
      })
      return {success: true, message: "Job queued!"};
    }
  ), 
  getUsers: protectedProcedure.query(({ctx}) => {
    const loggedInUser = ctx.auth.user.id;
    console.log("user id: ", ctx.auth.user.id);
      return prisma.user.findMany({
        where: {
          id: loggedInUser
        }
      });
    }),
    createWorkflow: protectedProcedure.mutation( async () => {
        await inngest.send({
          name: "test/hello.world",
          data: {
            email:"wbguser@wbg.org"
          }
        })
        return prisma.workflow.create({
          data: {
            email: "wbguser@wbg.org"
          }
        });
      }
    ),
    getWorkflows: protectedProcedure.query(
      async () => {
        return prisma.workflow.findMany();
      }
    )

});
// export type definition of API
export type AppRouter = typeof appRouter;