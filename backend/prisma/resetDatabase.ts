import { PrismaClient } from "@prisma/client"
import { deleteAll } from "./seedDataFunction"

const prisma = new PrismaClient()

deleteAll()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
