import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { jwtVerify } from "jose";
import { sendOrderUpdateEmail } from "../../../../lib/email";

interface DecodedPayload {
    id: string;
    role: string;
    email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("🔹 ADMIN ORDER UPDATE ROUTE INITIATED");

    // 🔐 Extract session token manually
    const rawCookie = req.headers.cookie || "";
    let match = rawCookie.match(/next-auth\.session-token=([^;]+)/);
    if (!match) {
        match = rawCookie.match(/__Secure-next-auth\.session-token=([^;]+)/);
        if (!match) {
            console.log("❌ No session token in cookies.");
            return res.status(401).json({ error: "Unauthorized: No session token found." });
        }
    }

    const tokenStr = decodeURIComponent(match[1]);

    // 🔐 Decode JWT token manually
    let payload: DecodedPayload;
    try {
        const secret = process.env.NEXTAUTH_SECRET || "";
        const { payload: decoded } = await jwtVerify(
            tokenStr,
            new TextEncoder().encode(secret)
        );
        console.log("🔹 Decoded JWT Payload:", decoded);
        payload = decoded as unknown as DecodedPayload;
    } catch (err) {
        console.log("❌ JWT Decode Error:", err);
        return res.status(401).json({ error: "Unauthorized: Invalid token." });
    }

    // 🔐 Ensure the user is an admin
    if (payload.role !== "admin") {
        console.log("❌ User is not an admin.");
        return res.status(403).json({ error: "Forbidden: Admin access required." });
    }

    const { id } = req.query;

    if (req.method === "PUT") {
        const { status } = req.body;
        try {
            // ✅ Update the order in the database
            const updatedOrder = await prisma.order.update({
                where: { id: Number(id) },
                data: { status },
                include: { user: true },
            });

            // ✅ Send Email Notification if user email exists
            if (updatedOrder.user?.email) {
                await sendOrderUpdateEmail(updatedOrder.user.email, updatedOrder.id, status);
            }

            console.log(`✅ Order #${id} updated to status: ${status}`);
            return res.status(200).json(updatedOrder);
        } catch (error: any) {
            console.error("❌ Order update error:", error);
            return res.status(500).json({ error: "Failed to update order." });
        }
    }

    return res.status(405).json({ error: "Method not allowed." });
}
