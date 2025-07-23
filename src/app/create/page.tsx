"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Service { name: string; price: string; description?: string; }
interface Testimonial { name: string; text: string; }
interface Social { type: string; url: string; }
interface FormState {
  businessName: string;
  logo: string;
  tagline: string;
  about: string;
  services: Service[];
  contactMethod: string;
  contactValue: string;
  calendly: string;
  stripe: string;
  testimonials: Testimonial[];
  gallery: string[];
  socials: Social[];
  location: string;
  email: string;
}

function BookingPreview({
  businessName,
  logo,
  tagline,
  about,
  services,
  contactMethod,
  contactValue,
  calendly,
  stripe,
  testimonials,
  gallery,
  socials,
  location,
}: {
  businessName: string;
  logo?: string;
  tagline?: string;
  about?: string;
  services: { name: string; price: string; description?: string }[];
  contactMethod: string;
  contactValue: string;
  calendly?: string;
  stripe?: string;
  testimonials: { name: string; text: string }[];
  gallery: string[];
  socials: { type: string; url: string }[];
  location?: string;
}) {
  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-8 border border-gray-200">
      {/* Hero */}
      <div className="flex flex-col items-center gap-2 mb-2">
        {logo ? (
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 mb-2" />
        ) : (
          <div className="bg-blue-200 text-blue-700 rounded-full p-4 mb-2 text-3xl font-bold w-20 h-20 flex items-center justify-center">
            {businessName ? businessName[0] : "B"}
          </div>
        )}
        <h1 className="text-2xl font-extrabold text-center text-gray-900">{businessName || "Business Name"}</h1>
        {tagline && <div className="text-blue-700 text-center text-lg font-semibold">{tagline}</div>}
        {about && <div className="text-gray-600 text-center text-base mt-1">{about}</div>}
      </div>
      {/* Services */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Services</h2>
        <div className="grid grid-cols-1 gap-3">
          {services.length === 0 ? (
            <div className="text-gray-400 italic">No services added yet</div>
          ) : (
            services.map((s, i) => (
              <div key={i} className="flex flex-col bg-white rounded-lg border border-blue-100 px-4 py-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 flex items-center gap-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/></svg>
                    {s.name || <span className="text-gray-400">Service name</span>}
                  </span>
                  <span className="font-semibold text-blue-700">{s.price ? `$${s.price}` : <span className="text-gray-400">Price"</span>}</span>
                </div>
                {s.description && <div className="text-gray-500 text-sm mt-1">{s.description}</div>}
                {calendly && (
                  <a
                    href={calendly}
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded font-semibold hover:bg-blue-700 transition text-center w-fit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {/* Gallery */}
      {gallery.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Gallery</h2>
          <div className="grid grid-cols-2 gap-2">
            {gallery.map((url, i) => (
              <img key={i} src={url} alt="Gallery" className="rounded-lg object-cover w-full h-28" />
            ))}
          </div>
        </div>
      )}
      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Testimonials</h2>
          <div className="flex flex-col gap-3">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="text-gray-800 font-semibold">{t.text}</div>
                <div className="text-blue-700 text-sm mt-1">- {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Contact & Socials */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex flex-col sm:flex-row gap-2">
          {contactMethod === "whatsapp" && contactValue ? (
            <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-center">WhatsApp: {contactValue}</span>
          ) : contactMethod === "email" && contactValue ? (
            <span className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-center">Email: {contactValue}</span>
          ) : null}
          {calendly && (
            <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-center">Book via Calendly</span>
          )}
          {stripe && (
            <span className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold text-center">Pay via Stripe</span>
          )}
        </div>
        {location && (
          <div className="text-gray-700 text-center mt-2">Location: {location}</div>
        )}
        {socials.length > 0 && (
          <div className="flex gap-3 justify-center mt-2">
            {socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-semibold">
                {s.type}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CreateBookingPage() {
  const [form, setForm] = useState<FormState>({
    businessName: "",
    logo: "",
    tagline: "",
    about: "",
    services: [{ name: "", price: "", description: "" }],
    contactMethod: "",
    contactValue: "",
    calendly: "",
    stripe: "",
    testimonials: [],
    gallery: [],
    socials: [],
    location: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Scroll preview into view on mobile after form submit
  useEffect(() => {
    if (createdSlug && window.innerWidth < 768 && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [createdSlug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("service-")) {
      const [_, idx, field] = name.split("-");
      if (field === "name" || field === "price" || field === "description") {
        setForm((prev) => {
          const newServices = prev.services.map((service, i) =>
            i === Number(idx)
              ? { ...service, [field]: value }
              : service
          );
          return { ...prev, services: newServices };
        });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addService = () => {
    setForm((prev) => ({ ...prev, services: [...prev.services, { name: "", price: "", description: "" }] }));
  };

  const removeService = (idx: number) => {
    setForm((prev) => ({ ...prev, services: prev.services.filter((_, i) => i !== idx) }));
  };

  // Add remove handlers for testimonials and socials
  const removeTestimonial = (idx: number) => {
    setForm((prev) => ({ ...prev, testimonials: (prev.testimonials as Testimonial[]).filter((_, i) => i !== idx) }));
  };
  const removeSocial = (idx: number) => {
    setForm((prev) => ({ ...prev, socials: (prev.socials as Social[]).filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);
    setCreatedSlug(null);
    try {
      const res = await fetch("/api/create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services: form.services.filter(s => s.name) }),
      });
      if (res.ok) {
        const data = await res.json();
        setSuccess(true);
        setCreatedSlug(data.slug);
        setForm({
          businessName: "",
          logo: "",
          tagline: "",
          about: "",
          services: [{ name: "", price: "", description: "" }],
          contactMethod: "",
          contactValue: "",
          calendly: "",
          stripe: "",
          testimonials: [],
          gallery: [],
          socials: [],
          location: "",
          email: "",
        });
      } else {
        const data = await res.json();
        setError(data.error || "Submission failed");
      }
    } catch (err) {
      setError("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-10 items-start justify-center">
        {/* Form */}
        <div className="flex-1 w-full max-w-xl mx-auto">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {/* Business Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center gap-2 text-xl">
                  <span>🏢</span> Business Info
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder="e.g. Jay's Barbershop"
                    value={form.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="logo">Logo (optional)</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setForm((prev) => ({ ...prev, logo: reader.result as string }));
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                  />
                  {form.logo && (
                    <Avatar className="mt-2 w-20 h-20">
                      <AvatarImage src={form.logo} alt="Preview Logo" />
                      <AvatarFallback>{form.businessName ? form.businessName[0] : "B"}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div>
                  <Label htmlFor="tagline">Tagline (optional)</Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    placeholder="e.g. Your trusted partner for excellence"
                    value={form.tagline}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="about">About (optional)</Label>
                  <Textarea
                    id="about"
                    name="about"
                    placeholder="Tell us about your business..."
                    value={form.about}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center gap-2 text-xl">
                  <span>💈</span> Services
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Label>Services</Label>
                <div className="flex flex-col gap-3">
                  {form.services.map((s, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-2 items-center w-full">
                      <Input
                        name={`service-${i}-name`}
                        placeholder="Service name"
                        value={s.name}
                        onChange={handleChange}
                        required
                        className="md:w-1/3"
                      />
                      <Input
                        name={`service-${i}-price`}
                        placeholder="Price"
                        value={s.price}
                        onChange={handleChange}
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        className="md:w-1/4"
                      />
                      <Input
                        name={`service-${i}-description`}
                        placeholder="Service description (optional)"
                        value={s.description}
                        onChange={handleChange}
                        className="md:w-2/5"
                      />
                      {form.services.length > 1 && (
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeService(i)} title="Remove service">&times;</Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addService} className="w-fit mt-2">+ Add another service</Button>
                </div>
              </CardContent>
            </Card>
            {/* Gallery */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center gap-2 text-xl">
                  <span>🖼️</span> Gallery
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Label>Gallery</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const newGallery = Array.from(e.target.files).map(file => URL.createObjectURL(file));
                      setForm(prev => ({ ...prev, gallery: [...prev.gallery, ...newGallery] }));
                    }
                  }}
                />
                {form.gallery.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {form.gallery.map((url, i) => (
                      <img key={i} src={url} alt={`Gallery ${i}`} className="rounded-lg object-cover w-full h-28" />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center gap-2 text-xl">
                  <span>⭐</span> Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Label>Testimonials</Label>
                <div className="flex flex-col gap-3">
                  {(form.testimonials as Testimonial[]).map((t, i) => (
                    <div key={i} className="flex gap-2 items-center w-full">
                      <Input
                        name={`testimonial-${i}-name`}
                        placeholder="Name"
                        value={t.name}
                        onChange={(e) => {
                          const newTestimonials: Testimonial[] = [...(form.testimonials as Testimonial[])];
                          newTestimonials[i] = { ...newTestimonials[i], name: e.target.value };
                          setForm(prev => ({ ...prev, testimonials: newTestimonials }));
                        }}
                        required
                        className="w-1/3"
                      />
                      <Input
                        name={`testimonial-${i}-text`}
                        placeholder="Testimonial text"
                        value={t.text}
                        onChange={(e) => {
                          const newTestimonials: Testimonial[] = [...(form.testimonials as Testimonial[])];
                          newTestimonials[i] = { ...newTestimonials[i], text: e.target.value };
                          setForm(prev => ({ ...prev, testimonials: newTestimonials }));
                        }}
                        required
                        className="w-2/3"
                      />
                      {(form.testimonials as Testimonial[]).length > 1 && (
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeTestimonial(i)} title="Remove testimonial">&times;</Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => setForm(prev => ({ ...prev, testimonials: [...(prev.testimonials as Testimonial[]), { name: "", text: "" }] }))} className="w-fit mt-2">+ Add another testimonial</Button>
                </div>
              </CardContent>
            </Card>
            {/* Socials & Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center gap-2 text-xl">
                  <span>🔗</span> Socials & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="contactMethod">Contact Method</Label>
                    <select
                      id="contactMethod"
                      className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900 bg-white"
                      name="contactMethod"
                      value={form.contactMethod}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="contactValue">{form.contactMethod === "whatsapp" ? "WhatsApp Number" : form.contactMethod === "email" ? "Contact Email" : "Contact Info"}</Label>
                    <Input
                      id="contactValue"
                      name="contactValue"
                      placeholder={form.contactMethod === "whatsapp" ? "+1 555 123 4567" : "your@email.com"}
                      value={form.contactValue}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="calendly">Calendly Link <span className="text-gray-500 font-normal">(optional)</span></Label>
                    <Input
                      id="calendly"
                      name="calendly"
                      placeholder="https://calendly.com/your-link"
                      value={form.calendly}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="stripe">Stripe Payment Link <span className="text-gray-500 font-normal">(optional)</span></Label>
                    <Input
                      id="stripe"
                      name="stripe"
                      placeholder="https://buy.stripe.com/your-link"
                      value={form.stripe}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Your Email <span className="text-gray-500 font-normal">(to receive your page link)</span></Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    type="email"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location (optional)</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. 123 Main St, City, Country"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>
                <Label>Socials</Label>
                <div className="flex flex-col gap-2">
                  {(form.socials as Social[]).map((s, i) => (
                    <div key={i} className="flex gap-2 items-center w-full">
                      <Input
                        name={`social-${i}-type`}
                        placeholder="e.g. Facebook"
                        value={s.type}
                        onChange={(e) => {
                          const newSocials: Social[] = [...(form.socials as Social[])];
                          newSocials[i] = { ...newSocials[i], type: e.target.value };
                          setForm(prev => ({ ...prev, socials: newSocials }));
                        }}
                        required
                        className="w-1/3"
                      />
                      <Input
                        type="url"
                        name={`social-${i}-url`}
                        placeholder="e.g. https://facebook.com/yourpage"
                        value={s.url}
                        onChange={(e) => {
                          const newSocials: Social[] = [...(form.socials as Social[])];
                          newSocials[i] = { ...newSocials[i], url: e.target.value };
                          setForm(prev => ({ ...prev, socials: newSocials }));
                        }}
                        required
                        className="w-2/3"
                      />
                      {(form.socials as Social[]).length > 1 && (
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeSocial(i)} title="Remove social">&times;</Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => setForm(prev => ({ ...prev, socials: [...(prev.socials as Social[]), { type: "", url: "" }] }))} className="w-fit mt-2">+ Add another social</Button>
                </div>
              </CardContent>
            </Card>
            <Button
              className="bg-blue-700 text-white rounded-lg px-6 py-3 font-bold hover:bg-blue-800 transition disabled:opacity-50 mt-2 shadow-lg text-lg w-full"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Create Booking Page"}
            </Button>
            {success && createdSlug && (
              <div className="text-green-700 text-center font-semibold mt-2">
                Success! Your page is live: <Link href={`/${createdSlug}`} className="underline text-blue-700" target="_blank">/{createdSlug}</Link>
              </div>
            )}
            {error && <div className="text-red-700 text-center font-semibold mt-2">{error}</div>}
          </form>
        </div>
        {/* Live Preview */}
        <div className="flex-1 w-full max-w-lg sticky top-8 hidden md:block" ref={previewRef}>
          <BookingPreview {...form} />
        </div>
        {/* On mobile, show preview below form */}
        <div className="block md:hidden mt-8 w-full" ref={previewRef}>
          <BookingPreview {...form} />
        </div>
      </div>
    </div>
  );
} 