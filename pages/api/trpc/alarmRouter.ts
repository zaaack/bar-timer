import { resolve } from 'node:path';
import * as z from 'zod';
import { createRouter } from './[trpc]';

const alarmCreateSchema = z.object({
  type: z.enum(['once', 'repeat']),
  ahead: z.number(),
  title: z.string(),
  notify: z.boolean(),
  alert: z.boolean(),
  duration: z.number(),
  disabled: z.boolean(),
  timeout: z.number().optional(),
  done: z.boolean().optional(),
  sort: z.number().optional(),
  uid: z.string().optional()
})

const alarmEditSchema = alarmCreateSchema.merge(z.object({
  id: z.string()
}))

export const alarmRouter = createRouter()
  .query('all', {
    input: z.string().optional(),
    async resolve({ ctx, input }) {
      return ctx.alarm.findMany({
        where: {
          uid: input
        },
        orderBy: {
          sort: 'asc'
        }
      });
    },
  })
  .mutation('sortAll', {
    input: z.array(z.string().uuid()),
    async resolve({ ctx, input }) {
      await Promise.all(input.map(async (id, i) => {
        await ctx.alarm.update({
          where: { id },
          data: {
            sort: i,
          }
        })
      }))
      return ctx.alarm.findMany();
    }
  })
  .mutation('add', {
    input: alarmCreateSchema,
    async resolve({ ctx, input }) {
      const todo = await ctx.alarm.create({
        data: input,
      });
      return todo;
    },
  })
  .mutation('edit', {
    input: alarmEditSchema,
    async resolve({ ctx, input }) {
      const todo = await ctx.alarm.update({
        where: { id: input.id },
        data: input,
      });
      return todo;
    },
  })
  .mutation('delete', {
    input: z.string().uuid(),
    async resolve({ input: id, ctx }) {
      await ctx.alarm.delete({ where: { id } });
      return id;
    },
  })
