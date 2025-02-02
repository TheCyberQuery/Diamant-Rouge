import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const data = {};

    // Fetch all products
    data.products = await prisma.product.findMany({
        include: {
            translations: true,
            variations: true,
            wishlists: true,
            orderItems: true,
        },
    });

    // Fetch all categories
    data.categories = await prisma.category.findMany({
        include: {
            translations: true,
            products: true,
        },
    });

    // Fetch all users
    data.users = await prisma.user.findMany({
        include: {
            orders: true,
            wishlists: true,
        },
    });

    // Fetch all orders
    data.orders = await prisma.order.findMany({
        include: {
            orderItems: true,
            user: true,
        },
    });

    // Fetch all wishlists
    data.wishlists = await prisma.wishlist.findMany({
        include: {
            user: true,
            product: true,
        },
    });

    console.log(JSON.stringify(data, null, 2));
}

main()
    .catch((error) => {
        console.error('❌ Error fetching data:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });