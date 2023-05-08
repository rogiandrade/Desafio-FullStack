import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const Igor = await prisma.user.upsert({
        where: { id: 'userWhereUniqueInput' },
        update: {},
        create: {
            firstname: 'Igor',
            lastname: 'Andrade',
            username: 'rogiandrade',
            password: 'i28122001'
        },
    })
    const Inês = await prisma.user.upsert({
        where: { id: 'userWhereUniqueInput' },
        update: {},
        create: {
            firstname: 'Inês',
            lastname: 'Andrade',
            username: 'seniandrade',
            password: 'i12102003'
        },
    })
    console.log({ Igor, Inês })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })