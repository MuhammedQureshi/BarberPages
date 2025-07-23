import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";

interface Service {
  name: string;
  price: string;
}

interface BookingData {
  businessName: string;
  description?: string;
  services: Service[];
  contactMethod: string;
  contactValue: string;
  calendly?: string;
  stripe?: string;
}

export default async function BookingPage({ params }: { params: { slug: string } }) {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, where("slug", "==", params.slug));
  const snap = await getDocs(q);
  if (snap.empty) return notFound();
  const data = snap.docs[0].data() as BookingData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex flex-col items-center justify-between py-0 px-0">
      {/* Hero Section */}
      <section className="w-full bg-white/90 border-b border-blue-100 py-12 px-4 flex flex-col items-center">
        <div className="max-w-2xl w-full flex flex-col items-center gap-4">
          <div className="bg-blue-200 text-blue-700 rounded-full p-4 mb-2">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h1 className="text-4xl font-extrabold text-center text-gray-900 leading-tight">{data.businessName}</h1>
          {data.description && (
            <p className="text-lg text-gray-600 text-center max-w-xl">{data.description}</p>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.services && data.services.length > 0 ? (
            data.services.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-blue-100 shadow-lg p-6 flex flex-col items-start gap-2 hover:shadow-xl transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full p-2">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/></svg>
                  </span>
                  <span className="text-lg font-semibold text-gray-900">{s.name}</span>
                </div>
                <span className="text-xl font-bold text-blue-700">${s.price}</span>
                {data.calendly && (
                  <a
                    href={data.calendly}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-center w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-400 italic col-span-2 text-center">No services listed</div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full max-w-2xl mx-auto py-8 px-4 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          {data.contactMethod === "whatsapp" ? (
            <a
              href={`https://wa.me/${data.contactValue.replace(/\D/g, "")}`}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition text-lg flex-1 text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp
            </a>
          ) : (
            <a
              href={`mailto:${data.contactValue}`}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition text-lg flex-1 text-center"
            >
              Email Us
            </a>
          )}
          {data.stripe && (
            <a
              href={data.stripe}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition text-lg flex-1 text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pay via Stripe
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-white/80 py-6 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 gap-2 text-gray-500 text-sm">
          <span>&copy; {new Date().getFullYear()} {data.businessName}</span>
          <span>Powered by Booking Pages</span>
        </div>
      </footer>
    </div>
  );
} 