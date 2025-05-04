import { Hono } from "hono";
import { handle } from "hono/vercel";
import user from "./user";
import job from "./job";
import freelancer from "./freelancer";
import proposal from "./proposal";
import  file  from "./file";


// export const runtime = 'edge'

const app = new Hono().basePath('/api')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
    .route("/user", user)
    .route("/job", job)
    .route("/freelancer", freelancer)
    .route("/proposal", proposal)
    .route("/file", file)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes