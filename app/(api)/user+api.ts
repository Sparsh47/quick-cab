import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.EXPO_PUBLIC_SQL_DB_URI}`);
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json({
        data: { error: "Missing required parameters" },
        init: { status: 400 },
      });
    }

    const response = await sql`
            INSERT INTO users (name,
                               email,
                               clerk_id)
            VALUES (${name},
                    ${email},
                    ${clerkId})
        `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
