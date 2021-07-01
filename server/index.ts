import * as trpc from '@trpc/server'
// import * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson'
import { alarmRouter, createRouter, createContext, prisma } from './alarmRouter'
import express from 'express'
import path from 'path'

const router = createRouter().merge('alarms.', alarmRouter)

export const appRouter = router
export type AppRouter = typeof router

const app = express()
app.use(
  '/api/trpc',
  trpc.createHttpHandler({
    router: appRouter,
    createContext,
    teardown: () => prisma.$disconnect(),
    transformer: superjson,
    onError({ error }) {
      console.error(error)
      if (error.code === 'INTERNAL_SERVER_ERROR') {
        // send to bug reporting
      }
    },
  })
)

app.use(express.static(path.resolve(__dirname, '../static')))
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static', 'index.html'))
})
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// export default trpcNext.createNextApiHandler({
//   router,
//   createContext,
//   teardown: () => prisma.$disconnect(),
//   transformer: superjson,
//   onError({ error }) {
//     if (error.code === 'INTERNAL_SERVER_ERROR') {
//       // send to bug reporting
//     }
//   },
// });
