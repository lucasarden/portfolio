import prisma from "@/lib/prisma";

async function main() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    if (!user.image) {
      const name = user.name || "User";
      const image = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(name)}`;

      await prisma.user.update({
        where: { id: user.id },
        data: { image },
      });

      console.log(`Added default image for user: ${user.email}`);
    }
  }

  console.log("Backfill complete.");
}

main()
  .catch((e) => {
    console.error("Backfill error:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit();
  });
