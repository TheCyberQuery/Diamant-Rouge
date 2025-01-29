// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // 1. Create a Category
    const ringsCategory = await prisma.category.upsert({
        where: { slug: 'rings' },
        update: {},
        create: {
            slug: 'rings',
            translations: {
                create: [
                    {
                        language: 'en',
                        name: 'Rings',
                        description: 'Elegantly crafted rings that symbolize love and heritage.',
                    },
                    {
                        language: 'fr',
                        name: 'Bagues',
                        description: 'Bagues élégamment façonnées symbolisant l’amour et l’héritage.',
                    },
                    {
                        language: 'ar',
                        name: 'خواتم',
                        description: 'خواتم مصممة بأناقة ترمز إلى الحب والتراث.',
                    },
                ],
            },
        },
    });

    // 2. Create a Product referencing that category
    const rougePassion = await prisma.product.upsert({
        where: { sku: 'ROUGE-PASSION-001' },
        update: { categoryId: ringsCategory.id },
        create: {
            sku: 'ROUGE-PASSION-001',
            basePrice: 999.99,
            categoryId: ringsCategory.id,
            translations: {
                create: [
                    {
                        language: 'en',
                        name: 'Rouge Passion Diamond Ring',
                        description:
                            'A tribute to eternal love. Meticulously cut diamond revealing an unparalleled inner fire.',
                    },
                    {
                        language: 'fr',
                        name: 'Bague Rouge Passion',
                        description:
                            "Un hommage à l'amour éternel. Un diamant taillé avec précision révélant un feu intérieur inégalé.",
                    },
                    {
                        language: 'ar',
                        name: 'خاتم روج باشون',
                        description:
                            'تكريم للحب الأبدي. يكشف الماس المصقول بدقة عن بريق داخلي لا مثيل له.',
                    },
                ],
            },
        },
    });

    // 3. Create some Product Variations (sizes, for example)
    await prisma.productVariation.createMany({
        data: [
            {
                productId: rougePassion.id,
                variationType: 'Size',
                variationValue: '5',
                additionalPrice: 0,
            },
            {
                productId: rougePassion.id,
                variationType: 'Size',
                variationValue: '6',
                additionalPrice: 0,
            },
            {
                productId: rougePassion.id,
                variationType: 'Size',
                variationValue: '7',
                additionalPrice: 0,
            },
        ],
    });

    // 4. Create a User with hashed password
    const hashedPassword = await bcrypt.hash('0m3g4xxz', 10); // Replace with your chosen password

    await prisma.user.upsert({
        where: { email: 'user@test.com' },
        update: {},
        create: {
            email: 'user@test.com', // Replace with your chosen email
            password: hashedPassword,
            name: 'Jane Doe', // Replace with the desired name or make it nullable
        },
    });

    const existingAdmin = await prisma.user.findUnique({
        where: { email: 'admin@diamant-rouge.com' },
    });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await prisma.user.create({
            data: {
                email: 'admin@diamant-rouge.com',
                password: hashedPassword,
                role: 'admin',
                name: 'Diamant Admin',
            },
        });
        console.log('Admin user created => admin@diamant-rouge.com / admin123');
    } else {
        console.log('Admin user already exists. Skipping...');
    }


    console.log('Seed completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });