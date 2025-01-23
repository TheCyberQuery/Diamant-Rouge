// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Create a sample product
    const product = await prisma.product.create({
        data: {
            sku: 'ROUGE-PASSION-001',
            basePrice: 999.99,
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
    console.log('Created product: ', product);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
