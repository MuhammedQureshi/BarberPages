import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col">
      {/* Hero Section */}
      <header className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="flex flex-col items-center gap-6">
          <Image src="/next.svg" alt="Logo" width={80} height={80} className="mb-2 dark:invert" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center leading-tight">
            Instantly Create a <span className="text-blue-600">Booking Page</span> for Your Local Business
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 text-center max-w-2xl">
            A beautiful, mobile-friendly SaaS to help barbers, tutors, and local pros get booked online. Share your services, let customers contact you, and accept payments—all in minutes.
          </p>
          <Link href="/create" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition text-lg">
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-4xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="bg-blue-100 text-blue-600 rounded-full p-3 mb-3">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <h3 className="font-bold text-lg mb-1">Fast Setup</h3>
          <p className="text-gray-500 text-center">Create your page in under 2 minutes. No coding, no hassle.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="bg-green-100 text-green-600 rounded-full p-3 mb-3">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <h3 className="font-bold text-lg mb-1">All-in-One</h3>
          <p className="text-gray-500 text-center">Showcase services, accept bookings, and get paid—all in one place.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="bg-indigo-100 text-indigo-600 rounded-full p-3 mb-3">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <h3 className="font-bold text-lg mb-1">Mobile-First</h3>
          <p className="text-gray-500 text-center">Looks great on any device. Your customers can book from anywhere.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h4 className="font-semibold mb-1">1. Fill Out Your Info</h4>
            <p className="text-gray-500 text-center text-sm">Tell us about your business and services.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-100 text-green-600 rounded-full p-3 mb-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h4 className="font-semibold mb-1">2. Get Your Link</h4>
            <p className="text-gray-500 text-center text-sm">We generate a unique booking page for you instantly.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-indigo-100 text-indigo-600 rounded-full p-3 mb-2">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h4 className="font-semibold mb-1">3. Share & Get Booked</h4>
            <p className="text-gray-500 text-center text-sm">Share your link and start accepting bookings right away.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-white/80 py-6 mt-auto flex justify-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 gap-2 text-gray-500 text-sm">
          <span>&copy; {new Date().getFullYear()} Booking Pages</span>
        </div>
      </footer>
    </div>
  );
}
