import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { businessName, services, contactMethod, contactValue, calendly, stripe, email } = data;
    if (!businessName || !services || !Array.isArray(services) || services.length === 0 || !contactMethod || !contactValue || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Generate a unique slug
    const bookingsRef = collection(db, "bookings");
    let baseSlug = slugify(businessName);
    let slug = baseSlug;
    let i = 1;
    let slugExists = false;
    do {
      const slugQuery = query(bookingsRef, where("slug", "==", slug));
      const slugSnap = await getDocs(slugQuery);
      slugExists = !slugSnap.empty;
      if (slugExists) {
        slug = `${baseSlug}-${i++}`;
      }
    } while (slugExists);

    // Store in Firestore
    await addDoc(bookingsRef, {
      businessName,
      services, // now an array of {name, price}
      contactMethod,
      contactValue,
      calendly,
      stripe,
      email,
      slug,
      created: Date.now(),
    });

    // TODO: Send email with link
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("API Error in /api/create-booking:", error);
    const errMsg = (error instanceof Error) ? error.message : String(error);
    return NextResponse.json({ error: errMsg || "Internal server error" }, { status: 500 });
  }
} 