import { FastifyInstance } from "fastify";
import { prisma } from "./prisma";
import { z } from "zod";

export async function appRoutes(app: FastifyInstance) {

    app.get('/status', (req, res) => {
        res.status(200).send({ message: 'API is up and running' });
    });

    app.post('/signup', async (request, reply) => {

        const register = z.object({
            firstname: z.string(),
            lastname: z.string(),
            username: z.string(),
            password: z.string()
        })

        let userData;

        try {
            userData = register.parse(request.body);
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'message' in error) {
                reply.code(400).send(error.message);
            } else {
                reply.code(500).send('Internal Server Error');
            }
            return;
        }

        const { firstname, lastname, username, password } = userData;

        try {
            await prisma.user.create({
                data: {
                    firstname,
                    lastname,
                    username,
                    password
                }
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            reply.code(400).send(errorMessage);
            return;
        }


        reply.send({ message: "User created successfully" });
    });

    const login = z.object({
        username: z.string(),
        password: z.string()
    })

    app.get('/login', async (request, reply) => {

        let userData;

        try {
            userData = login.parse(request.query);
        } catch (error: unknown) {
            reply.code(400).send((error as Error).message);
            return;
        }

        const { username, password } = userData;

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if (!user || user.password !== password) {
            reply.code(401).send({ message: "Invalid username or password" });
            return;
        }

        reply.send({ message: "User logged in successfully" });
    });

    app.listen(2812, () => {
        console.log('Server is running on port 2812');
    });

}
