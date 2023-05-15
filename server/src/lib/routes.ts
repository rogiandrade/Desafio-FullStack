import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt, { SignOptions } from 'jsonwebtoken';
import { prisma } from "./prisma";
import { z } from "zod";

declare module "fastify" {
  interface FastifyRequest {
    user?: { userId: string };
  }
}

interface RouteParams {
  id: string
}

type UserData = {
  username: string;
  password: string;
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

  function getUserFromToken(authHeader: string) {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  }
  
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const user = await getUserFromToken(authHeader);

    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET as string) as { userId: string };
    // Adicione o objeto decoded ao objeto de solicitação para que ele possa ser acessado em rotas subsequentes
    request['user'] = decoded;
    return;
  } catch (error: any) {
    console.error(error.message);
    reply.status(401).send({ message: 'Unauthorized' });
    throw new Error('Unauthorized');
  }
}

export async function appRoutes(app: FastifyInstance) {

  // Register routes
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

  app.get('/login', { preHandler: authenticate }, async (request, reply) => {
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

    const jwtOptions: SignOptions = {
      expiresIn: "1h",
    };

    // Se o usuário existir e a senha estiver correta, crie um token JWT e envie-o de volta para o cliente.
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || "default-secret",
      jwtOptions
    );
    reply.send({ message: 'User logged in successfully', token });
  });

  app.get('/users', async (request: FastifyRequest<{ Params: RouteParams }>, reply: FastifyReply) => {
    const { id } = request.params
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      })
      reply.send(user)
    } catch (err) {
      console.error(err)
      reply.status(500).send({ message: 'Error fetching user.' })
    }
  })

  // API routes
  const { request } = require('graphql-request')

  const query = `
  query {
    pokemons(first: 50) {
      id
      name
      image
    }
  }
`

  app.get('/pokemons', async (req, res) => {
    try {
      const data = await request('https://graphql-pokemon2.vercel.app/', query)
      res.send(data)
    } catch (error) {
      console.error(error)
      res.send(error)
    }
  })

}

function getUserFromToken(authHeader: string) {
  throw new Error("Function not implemented.");
}
