import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { jwtVerify } from "jose";

interface DecodedPayload {
    id: string;
    role: string;
    email: string;
}

// Disable Next.js default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('--- ADMIN IMAGE UPLOAD ROUTE START ---');

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // ✅ Extract and verify admin token
    const rawCookie = req.headers.cookie || '';
    let match = rawCookie.match(/next-auth\.session-token=([^;]+)/);
    if (!match) {
        match = rawCookie.match(/__Secure-next-auth\.session-token=([^;]+)/);
        if (!match) {
            console.log('No session token found. Returning 401...');
            return res.status(401).json({ error: 'Not authorized. No token found.' });
        }
    }

    const tokenStr = decodeURIComponent(match[1]);

    try {
        const secret = process.env.NEXTAUTH_SECRET || '';
        const { payload: decoded } = await jwtVerify(tokenStr, new TextEncoder().encode(secret));
        console.log('✅ Token decoded =>', decoded);
        const payload = decoded as unknown as DecodedPayload;

        if (payload.role !== 'admin') {
            console.log('❌ User is not admin. Returning 401...');
            return res.status(401).json({ error: 'Not authorized.' });
        }
    } catch (err) {
        console.log('❌ Token verification failed:', err);
        return res.status(401).json({ error: 'Not authorized. Invalid token.' });
    }

    try {
        // ✅ Correctly initialize Formidable
        const form = formidable({
            uploadDir: path.join(process.cwd(), "public/uploads"),
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB limit
            multiples: false,
        });

        if (!fs.existsSync(form.uploadDir)) {
            fs.mkdirSync(form.uploadDir, { recursive: true });
        }

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("❌ File upload error:", err);
                return res.status(500).json({ error: "File upload failed" });
            }

            const file = files.file as formidable.File;
            if (!file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const newFilePath = path.join(form.uploadDir, file.newFilename);
            fs.renameSync(file.filepath, newFilePath);
            const fileUrl = `/uploads/${file.newFilename}`;

            console.log("✅ File uploaded successfully:", fileUrl);
            return res.status(200).json({ imageUrl: fileUrl });
        });
    } catch (error) {
        console.error("❌ Upload API Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
