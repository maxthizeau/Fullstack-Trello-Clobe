import { seedData } from "./seedDataFunction"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

seedData(prisma)
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
