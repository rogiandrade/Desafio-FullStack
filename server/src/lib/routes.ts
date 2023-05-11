import { FastifyInstance } from "fastify";
import { prisma } from "./prisma";
import { z } from "zod";

type UserData = {
  username: string;
  password: string;
}

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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(errorMessage);
      reply.code(400).send(errorMessage);
      return;
    }

    const { firstname, lastname, username, password } = userData;

    if (!firstname || !lastname || !username || !password) {
      const errorMessage = 'Missing required fields';
      console.error(errorMessage);
      reply.code(400).send(errorMessage);
      return;
    }

    console.log(firstname, lastname, username, password);

    await prisma.user.create({
      data: {
        firstname,
        lastname,
        username,
        password
      }
    });

    reply.send({ message: "User created successfully" });
  });

  app.get('/login', async (request, reply) => {

    let userData: UserData;

    try {
      userData = request.query as UserData;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(errorMessage);
      reply.code(400).send(errorMessage);
      return;
    }

    const { username, password } = userData;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user || user.password !== password) {
      const errorMessage = 'Invalid username or password';
      console.error(errorMessage);
      reply.code(401).send({ message: errorMessage });
      return;
    }

    reply.send({ message: "User logged in successfully" });
  });
}