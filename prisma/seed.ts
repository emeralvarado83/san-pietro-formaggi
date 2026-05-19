import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // ── Admin user ──
  const email = process.env.ADMIN_EMAIL || 'admin@sanpietroformaggi.com'
  const password = await hash(process.env.ADMIN_PASSWORD || 'admin123', 12)

  await prisma.user.upsert({
    where: { email },
    update: { password },
    create: {
      email,
      password,
      name: 'Admin',
    },
  })

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
