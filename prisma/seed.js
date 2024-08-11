const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedChatBots() {
  const chatBots = [
    { name: 'Fitness', type: 'AI', description: 'Fitness support assistant' },
    { name: 'Inspiration', type: 'AI', description: 'Inspiration assistant' },
    { name: 'Journal', type: 'AI', description: 'Journal assistant' },
    { name: 'Mindfulness', type: 'AI', description: 'Mindfulness assistant' },
    { name: 'Mood', type: 'AI', description: 'Mood assistant' },
    { name: 'LiveSupport', type: 'LiveSupport', description: 'Live support chat' },
  ];

  for (const bot of chatBots) {
    await prisma.chatBot.upsert({
      where: { name: bot.name },
      update: {},
      create: {
        name: bot.name,
        type: bot.type,
        description: bot.description,
      },
    });
  }

  console.log('ChatBots seeded successfully');
}

seedChatBots()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
