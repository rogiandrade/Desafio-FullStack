import { FastifyInstance } from "fastify";
import { prisma } from "./prisma";
import { z } from "zod";

export async function appRoutes(app: FastifyInstance) {

    app.post('/signup', async (request) => {

        const register = z.object({
            firstname: z.string(),
            lastname: z.string(),
            username: z.string(),
            password: z.string()
        })

        const {
            firstname,
            lastname,
            username,
            password
        } = register.parse(request.body)

        await prisma.user.create({
            data: {
                firstname,
                lastname,
                username,
                password
            }
        })

    })

}