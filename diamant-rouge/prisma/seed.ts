// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // ✅ Create Categories
    console.log('🔹 Creating categories...');
    const ringsCategory = await prisma.category.upsert({
        where: { slug: 'rings' },
        update: {},
        create: {
            slug: 'rings',
            translations: {
                create: [
                    {
                        language: 'en',
                        name: 'Luxury Rings',
                        description: 'Exquisite rings crafted with precision, symbolizing love and heritage.',
                    },
                    {
                        language: 'fr',
                        name: 'Bagues de Luxe',
                        description: 'Bagues exquises conçues avec précision, symbolisant l’amour et l’héritage.',
                    },
                    {
                        language: 'ar',
                        name: 'خواتم فاخرة',
                        description: 'خواتم رائعة مصممة بدقة ترمز إلى الحب والتراث.',
                    },
                ],
            },
        },
    });

    const braceletsCategory = await prisma.category.upsert({
        where: { slug: 'bracelets' },
        update: {},
        create: {
            slug: 'bracelets',
            translations: {
                create: [
                    {
                        language: 'en',
                        name: 'Elegant Bracelets',
                        description: 'Timeless bracelets adorned with the finest diamonds and gold.',
                    },
                    {
                        language: 'fr',
                        name: 'Bracelets Élégants',
                        description: 'Bracelets intemporels ornés des plus beaux diamants et de l’or.',
                    },
                    {
                        language: 'ar',
                        name: 'أساور أنيقة',
                        description: 'أساور خالدة مزينة بأجود الألماس والذهب.',
                    },
                ],
            },
        },
    });

    // ✅ Create Products
    console.log('🔹 Creating products...');
    const rougePassionRing = await prisma.product.upsert({
        where: { sku: 'ROUGE-PASSION-001' },
        update: {},
        create: {
            sku: 'ROUGE-PASSION-001',
            basePrice: 4999.99,
            categoryId: ringsCategory.id,
            translations: {
                create: [
                    {
                        language: 'en',
                        name: 'Rouge Passion Diamond Ring',
                        description: 'A symbol of eternal love, set with a rare crimson diamond.',
                    },
                    {
                        language: 'fr',
                        name: 'Bague Diamant Rouge Passion',
                        description: "Un symbole d'amour éternel, serti d'un diamant rouge rare.",
                    },
                    {
                        language: 'ar',
                        name: 'خاتم الألماس روج باشون',
                        description: 'رمز الحب الأبدي، مرصع بألماس قرمزي نادر.',
                    },
                ],
            },
        },
    });

    const imperialBracelet = await prisma.product.upsert({
        where: { sku: 'IMPERIAL-BRACELET-001' },
        update: {},
        create: {
            sku: 'IMPERIAL-BRACELET-001',
            basePrice: 2999.99,
            categoryId: braceletsCategory.id,
            translations: {
                create: [
                    {
                        language: 'en',
                        name: 'Imperial Gold Bracelet',
                        description: 'A royal statement of elegance, crafted from 24k pure gold.',
                    },
                    {
                        language: 'fr',
                        name: 'Bracelet Impérial en Or',
                        description: 'Une déclaration royale d’élégance, fabriquée en or pur 24 carats.',
                    },
                    {
                        language: 'ar',
                        name: 'سوار الإمبراطورية الذهبي',
                        description: 'تصريح ملكي بالأناقة، مصنوع من الذهب الخالص عيار 24.',
                    },
                ],
            },
        },
    });

    // ✅ Create Product Variations
    console.log('🔹 Adding product variations...');
    await prisma.productVariation.createMany({
        data: [
            {
                productId: rougePassionRing.id,
                variationType: 'Size',
                variationValue: '6',
                additionalPrice: 0,
                inventory: 10,
            },
            {
                productId: rougePassionRing.id,
                variationType: 'Size',
                variationValue: '7',
                additionalPrice: 0,
                inventory: 8,
            },
            {
                productId: imperialBracelet.id,
                variationType: 'Length',
                variationValue: '18cm',
                additionalPrice: 0,
                inventory: 15,
            },
        ],
    });

    // ✅ Create Users
    console.log('🔹 Creating users...');
    const hashedPasswordUser = await bcrypt.hash('0m3g4xxz', 10);
    const hashedPasswordAdmin = await bcrypt.hash('0m3g4xxz', 10);

    await prisma.user.upsert({
        where: { email: 'customer@diamant-rouge.com' },
        update: {},
        create: {
            email: 'customer@diamant-rouge.com',
            password: hashedPasswordUser,
            name: 'Luxury Client',
            role: 'customer',
        },
    });

    await prisma.user.upsert({
        where: { email: 'admin@diamant-rouge.com' },
        update: {},
        create: {
            email: 'admin@diamant-rouge.com',
            password: hashedPasswordAdmin,
            name: 'Diamant Rouge Admin',
            role: 'admin',
        },
    });

    console.log('✅ Users created.');

    // ✅ Create Sample Order
    console.log('🔹 Creating a sample order...');
    await prisma.order.create({
        data: {
            userId: 1,
            totalAmount: 4999.99,
            status: 'PENDING',
            paymentMethod: 'COD',
            shippingAddress: '123 Luxury Street, Casablanca',
            city: 'Casablanca',
            postalCode: '20000',
            country: 'Morocco',
            orderItems: {
                create: [
                    {
                        productId: rougePassionRing.id,
                        quantity: 1,
                        price: 4999.99,
                    },
                ],
            },
        },
    });

    console.log('✅ Sample order created.');
    console.log('🎉 Database seeding completed!');
}

main()
    .catch((error) => {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
