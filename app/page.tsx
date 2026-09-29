"use client";

import { useState } from "react";

const phoneNumber = "7080151101";
const formattedPhone = "+91 70801 51101";
const mapsUrl = "https://maps.app.goo.gl/AmYkZHwvBsB9Rpum9";
const whatsappBase = `https://wa.me/91${phoneNumber}`;

function getWhatsAppUrl(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

const defaultWhatsAppUrl = getWhatsAppUrl(
  "Hello SitaRam Library, I would like to inquire about seat availability and membership plans."
);

const facilities = [
  { icon: "⚡", title: "100% Power Backup", text: "Zero interruptions with dual inverter & silent generator support during crucial study hours." },
  { icon: "📶", title: "High-Speed Wi-Fi", text: "High-bandwidth fiber internet connection for seamless online lectures, video tests, and downloads." },
  { icon: "❄️", title: "Fully Air-Conditioned", text: "Clean, temperature-controlled hall maintained at optimal comfort to prevent study fatigue." },
  { icon: "💺", title: "Ergonomic Chairs", text: "Cushioned, posture-supportive mesh chairs built for long 8 to 12 hour study sessions." },
  { icon: "🔌", title: "Desk Power Sockets", text: "Dedicated power sockets and focused warm LED lamps on every partitioned study desk." },
  { icon: "💧", title: "Purified RO Water", text: "Hygienic multi-stage RO drinking water with hot, normal, and cold dispenser options." },
  { icon: "🔒", title: "Personal Lockers", text: "Safe locker facility to store heavy reference books, bags, and notes securely overnight." },
  { icon: "🎥", title: "24/7 CCTV & Discipline", text: "Monitored premises providing a safe, disciplined, zero-distraction environment for all students." }
];

const galleryItems = [
  {
    id: 1,
    title: "Main Study Hall",
    category: "hall",
    categoryLabel: "Study Hall",
    colSpan: "col-7",
    image: "/images/hero-study-hall.jpg",
    description: "Wide rows of sound-dampened wooden study carrels with warm lighting and spacious aisles."
  },
  {
    id: 2,
    title: "Personal Partitioned Desk",
    category: "desks",
    categoryLabel: "Dedicated Cubicle",
    colSpan: "col-5",
    image: "/images/personal-desk.jpg",
    description: "Private study desk equipped with focused warm LED lamp, personal electric socket, and comfortable seating."
  },
  {
    id: 3,
    title: "Silent AC Study Zone",
    category: "silent",
    categoryLabel: "Silent Zone",
    colSpan: "col-6",
    image: "/images/silent-zone.jpg",
    description: "Strictly silent, temperature-controlled environment designed for intense competitive exam preparation."
  },
  {
    id: 4,
    title: "Quiet Reading & Reference Lounge",
    category: "lounge",
    categoryLabel: "Reading Corner",
    colSpan: "col-6",
    image: "/images/reading-corner.jpg",
    description: "Cozy reading nook with reference bookshelves, ergonomic armchairs, and warm lighting."
  }
];

const shifts = [
  { id: "morning", name: "Morning Shift", time: "6:00 AM – 2:00 PM (8 Hours)", desc: "Ideal for early risers & college students" },
  { id: "evening", name: "Evening Shift", time: "2:00 PM – 10:00 PM (8 Hours)", desc: "Perfect for post-coaching self-study" },
  { id: "fullday", name: "Full Day Pass", time: "6:00 AM – 10:00 PM (16 Hours)", desc: "Most popular for UPSC / UPPSC / NEET aspirants" },
  { id: "24hrs", name: "24/7 Unlimited Access", time: "24 Hours Round-the-Clock", desc: "Unrestricted round-the-clock entry & desk access" }
];

const durations = [
  { id: "1m", label: "1 Month", note: "Standard monthly fee" },
  { id: "3m", label: "3 Months", note: "Recommended routine (Save 5%)" },
  { id: "6m", label: "6 Months", note: "Long-term dedication (Save 10%)" }
];

const seatTypes = [
  { id: "reserved", label: "Dedicated Fixed Desk", note: "Your personal desk reserved 24/7 with locker" },
  { id: "flexi", label: "Flexible Seat", note: "Any available seat in your chosen shift" }
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [selectedShift, setSelectedShift] = useState(shifts[2]); // Full day default
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);
  const [selectedSeatType, setSelectedSeatType] = useState(seatTypes[0]);

  const filteredGallery = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handlePrevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
  };

  const shiftBookingMsg = `Hello SitaRam Library, I would like to reserve a seat for the *${selectedShift.name}* (${selectedShift.time}) for *${selectedDuration.label}* with *${selectedSeatType.label}*. Please share available slots and confirmation details.`;

  return (
    <main>
      {/* Header */}
      <header className="siteHeader">
        <div className="container nav">
          <a className="brand" href="#home" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="brandMark">SR</span>
            <span>
              <strong>SitaRam</strong>
              <small>LIBRARY · LUCKNOW</small>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktopNav" aria-label="Primary">
            <a href="#facilities">Facilities</a>
            <a href="#calculator">Shift & Plans</a>
            <a href="#gallery">Gallery</a>
            <a href="#reviews">Reviews</a>
            <a href="#location">Location</a>
            <a href="#contact">Contact</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="headerContactButtons">
            <a className="navCallButton" href={`tel:${phoneNumber}`}>
              📞 {formattedPhone}
            </a>
            <a className="navButton" href={defaultWhatsAppUrl} target="_blank" rel="noreferrer">
              💬 WhatsApp
            </a>
            <button
              type="button"
              className="mobileMenuToggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`mobileNavDrawer ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <nav className="mobileNavLinks" onClick={(e) => e.stopPropagation()}>
            <a href="#facilities" onClick={() => setIsMobileMenuOpen(false)}>
              Facilities <span>→</span>
            </a>
            <a href="#calculator" onClick={() => setIsMobileMenuOpen(false)}>
              Shift & Plans <span>→</span>
            </a>
            <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>
              Photo Gallery <span>→</span>
            </a>
            <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>
              Student Reviews <span>→</span>
            </a>
            <a href="#location" onClick={() => setIsMobileMenuOpen(false)}>
              Location & Map <span>→</span>
            </a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Details <span>→</span>
            </a>

            <div className="mobileNavCta">
              <a className="button whatsapp" href={defaultWhatsAppUrl} target="_blank" rel="noreferrer">
                💬 WhatsApp ({formattedPhone})
              </a>
              <a className="button ghost" href={`tel:${phoneNumber}`}>
                📞 Call Now: {formattedPhone}
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="heroTexture" />
        <div className="container heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">PREMIUM STUDY DESTINATION IN LUCKNOW</p>
            <h1>Study with purpose.<br /><em>Grow with discipline.</em></h1>
            <p className="lead">
              SitaRam Library provides a modern, peaceful, air-conditioned study environment
              with individual partitioned carrels, high-speed fiber internet, and 24/7 power backup.
              Built for students and aspirants who value uninterrupted concentration.
            </p>
            <div className="heroActions">
              <a className="button primary" href="#calculator">Explore Shifts & Plans <Arrow /></a>
              <a className="button whatsapp" href={defaultWhatsAppUrl} target="_blank" rel="noreferrer">
                💬 Book via WhatsApp
              </a>
              <a className="button ghost" href={`tel:${phoneNumber}`}>
                📞 Call {formattedPhone}
              </a>
            </div>
            <div className="trustRow">
              <div className="trustItem"><span className="dot green" /> Seats Open for Admission</div>
              <div className="trustItem"><span className="dot" /> Lucknow Verified Study Space</div>
              <div className="trustItem"><span className="dot" /> High-Speed Wi-Fi & AC</div>
            </div>
          </div>

          <div className="heroVisual">
            <div className="heroPhotoContainer">
              <img
                src="/images/hero-study-hall.jpg"
                alt="SitaRam Library Interior Study Hall Lucknow"
                className="heroImage"
              />
              <div className="heroImageOverlay" />
              <div className="heroPillTop">
                <span className="dot green" /> 100% Quiet Study Environment
              </div>
              <div className="heroPhotoBadge">
                <div>
                  <strong>SitaRam Library</strong>
                  <span>Lucknow, Uttar Pradesh · Call: {formattedPhone}</span>
                </div>
                <a className="heroBadgeButton" href="#gallery">
                  View 4+ Photos
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Band */}
      <section className="introBand">
        <div className="container introGrid">
          <div>
            <p className="eyebrow">DESIGNED FOR ASPIRANTS</p>
            <h2>A dedicated sanctuary for <em>serious learners.</em></h2>
          </div>
          <p>
            Whether you are preparing for UPSC, UPPSC, NEET, JEE, SSC, Banking, or academic exams,
            consistency requires an atmosphere free from noise and distractions. SitaRam Library offers
            ergonomic comfort, focused lighting, and supportive amenities so you can focus 100% on your goals.
          </p>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">FACILITIES & AMENITIES</p>
              <h2>Everything built around <em>your focus.</em></h2>
            </div>
            <p className="sectionLead">
              Every detail has been crafted to ensure long study sessions remain comfortable,
              productive, and completely uninterrupted.
            </p>
          </div>
          <div className="facilityGrid">
            {facilities.map((item) => (
              <article className="facilityCard" key={item.title}>
                <div className="facilityIcon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Shift & Fee Calculator */}
      <section id="calculator" className="section plansSection">
        <div className="container">
          <div className="centerHead">
            <p className="eyebrow">FLEXIBLE TIMINGS & MEMBERSHIP</p>
            <h2>Choose your shift. <em>Keep showing up.</em></h2>
            <p>
              Select your ideal daily study hours and duration below.
              You can instantly reserve your seat or confirm current slot availability on WhatsApp.
            </p>
          </div>

          <div className="calculatorWidget">
            <div className="calcHeader">
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>CUSTOM STUDY PLAN</p>
                <h3>Interactive Shift & Seat Selector</h3>
              </div>
              <span className="calcBadge">INSTANT BOOKING</span>
            </div>

            <div className="calcGrid">
              <div className="calcOptionsBlock">
                {/* Shift Selector */}
                <div className="calcOptionGroup">
                  <label>1. SELECT YOUR DAILY STUDY SHIFT</label>
                  <div className="calcPillGroup">
                    {shifts.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        className={`calcPill ${selectedShift.id === s.id ? "active" : ""}`}
                        onClick={() => setSelectedShift(s)}
                      >
                        <strong>{s.name}</strong>
                        <small>{s.time}</small>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Selector */}
                <div className="calcOptionGroup">
                  <label>2. SELECT MEMBERSHIP DURATION</label>
                  <div className="calcPillGroup">
                    {durations.map((d) => (
                      <button
                        type="button"
                        key={d.id}
                        className={`calcPill ${selectedDuration.id === d.id ? "active" : ""}`}
                        onClick={() => setSelectedDuration(d)}
                      >
                        <strong>{d.label}</strong>
                        <small>{d.note}</small>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seat Type */}
                <div className="calcOptionGroup">
                  <label>3. SEAT PREFERENCE</label>
                  <div className="calcPillGroup">
                    {seatTypes.map((st) => (
                      <button
                        type="button"
                        key={st.id}
                        className={`calcPill ${selectedSeatType.id === st.id ? "active" : ""}`}
                        onClick={() => setSelectedSeatType(st)}
                      >
                        <strong>{st.label}</strong>
                        <small>{st.note}</small>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Summary Card */}
              <div className="calcSummaryCard">
                <div className="summaryTop">
                  <span>SELECTED PACKAGE</span>
                  <h4>{selectedShift.name}</h4>
                  <div className="summaryShiftTime">⏰ {selectedShift.time}</div>
                  <ul className="summaryFeaturesList">
                    <li><span>✓</span> {selectedDuration.label} Membership Validity</li>
                    <li><span>✓</span> {selectedSeatType.label}</li>
                    <li><span>✓</span> High-Speed Fiber Wi-Fi Included</li>
                    <li><span>✓</span> Air-Conditioned Comfort & Power Backup</li>
                    <li><span>✓</span> RO Purified Drinking Water</li>
                    <li><span>✓</span> CCTV Disciplined Study Hall</li>
                  </ul>
                </div>

                <div className="calcBookingActions">
                  <a
                    className="button whatsapp"
                    href={getWhatsAppUrl(shiftBookingMsg)}
                    target="_blank"
                    rel="noreferrer"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    💬 Reserve on WhatsApp (70801 51101) <Arrow />
                  </a>
                  <a
                    className="button ghost"
                    href={`tel:${phoneNumber}`}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    📞 Call to Confirm: {formattedPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Standard Plans Grid */}
          <div className="planGrid">
            <article className="planCard">
              <div>
                <h3>Monthly Pass</h3>
                <div className="planPrice">Ask for Price</div>
                <p>Ideal for regular students wanting monthly flexibility with choice of morning, evening, or full-day shifts.</p>
              </div>
              <a
                className="button ghost"
                href={getWhatsAppUrl("Hello, I want to inquire about the Monthly Pass pricing and shift timings.")}
                target="_blank"
                rel="noreferrer"
              >
                Inquire Rates <Arrow />
              </a>
            </article>

            <article className="planCard featured">
              <span className="popular">RECOMMENDED</span>
              <div>
                <h3>Quarterly Pass</h3>
                <div className="planPrice">Best Value</div>
                <p>Designed for focused aspirants preparing for upcoming examination cycles. Includes personal locker privileges.</p>
              </div>
              <a
                className="button primary"
                href={getWhatsAppUrl("Hello, I would like to book a seat under the Quarterly Pass package.")}
                target="_blank"
                rel="noreferrer"
              >
                Book Quarterly Seat <Arrow />
              </a>
            </article>

            <article className="planCard">
              <div>
                <h3>Yearly / Long-term</h3>
                <div className="planPrice">Dedicated</div>
                <p>Guaranteed fixed desk reservation for complete exam preparation cycles with maximum savings.</p>
              </div>
              <a
                className="button ghost"
                href={getWhatsAppUrl("Hello, I want to check rates for the Yearly Long-Term Membership.")}
                target="_blank"
                rel="noreferrer"
              >
                Inquire Rates <Arrow />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Interactive Photo Gallery with Category Filters & Lightbox */}
      <section id="gallery" className="section gallerySection">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">PHOTO GALLERY</p>
              <h2>Take a look inside <em>the library.</em></h2>
            </div>
            <p className="sectionLead">
              Experience the atmosphere, clean study desks, and quiet reading areas before visiting in person.
              Click any photo to expand into high resolution.
            </p>
          </div>

          {/* Category Filter Tabs with Horizontal Mobile Scrolling */}
          <div className="galleryFilterBar">
            <button
              type="button"
              className={`filterTab ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All Spaces ({galleryItems.length})
            </button>
            <button
              type="button"
              className={`filterTab ${activeCategory === "hall" ? "active" : ""}`}
              onClick={() => setActiveCategory("hall")}
            >
              Main Study Hall
            </button>
            <button
              type="button"
              className={`filterTab ${activeCategory === "desks" ? "active" : ""}`}
              onClick={() => setActiveCategory("desks")}
            >
              Personal Desks
            </button>
            <button
              type="button"
              className={`filterTab ${activeCategory === "silent" ? "active" : ""}`}
              onClick={() => setActiveCategory("silent")}
            >
              Silent Zone
            </button>
            <button
              type="button"
              className={`filterTab ${activeCategory === "lounge" ? "active" : ""}`}
              onClick={() => setActiveCategory("lounge")}
            >
              Reading Lounge
            </button>
          </div>

          {/* Interactive Photo Grid */}
          <div className="interactiveGalleryGrid">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                className={`galleryItemCard ${item.colSpan}`}
                onClick={() => setLightboxIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(index)}
              >
                <img src={item.image} alt={item.title} className="galleryItemImage" />
                <div className="galleryItemOverlay">
                  <span className="galleryItemCategory">{item.categoryLabel}</span>
                  <div className="galleryItemTitleRow">
                    <h3>{item.title}</h3>
                    <span className="zoomPill">🔍 Expand</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal with Mobile Optimization */}
      {lightboxIndex !== null && (
        <div className="lightboxModal" onClick={() => setLightboxIndex(null)}>
          <div className="lightboxContent" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightboxCloseBtn"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>

            <button
              type="button"
              className="lightboxNavBtn prev"
              onClick={handlePrevImage}
              aria-label="Previous photo"
            >
              ‹
            </button>

            <div className="lightboxImageWrapper">
              <img
                src={galleryItems[lightboxIndex].image}
                alt={galleryItems[lightboxIndex].title}
              />
            </div>

            <button
              type="button"
              className="lightboxNavBtn next"
              onClick={handleNextImage}
              aria-label="Next photo"
            >
              ›
            </button>

            <div className="lightboxCaption">
              <h4>{galleryItems[lightboxIndex].title} ({lightboxIndex + 1}/{galleryItems.length})</h4>
              <p>{galleryItems[lightboxIndex].description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <section id="reviews" className="section reviewsSection">
        <div className="container reviewsGrid">
          <div>
            <p className="eyebrow">STUDENT REVIEWS & EXPERIENCES</p>
            <h2>Trusted by serious <em>aspirants in Lucknow.</em></h2>
            <p className="sectionLead">
              Here is what students say about the peaceful atmosphere, comfortable seating,
              and disciplined environment that helps them study 10+ hours every day.
            </p>
            <div style={{ marginTop: "24px" }}>
              <a className="button primary" href={mapsUrl} target="_blank" rel="noreferrer">
                Read Reviews on Google Maps <Arrow />
              </a>
            </div>
          </div>
          <div className="reviewCard">
            <div className="stars">★★★★★</div>
            <blockquote>
              “SitaRam Library has been the most peaceful place for my preparation.
              The personal charging points, comfortable chairs, and high-speed Wi-Fi make it easy to stay focused without any fatigue.”
            </blockquote>
            <div className="reviewMeta">
              <span className="avatar">A</span>
              <div>
                <strong>Aman Verma</strong>
                <small>Competitive Exam Aspirant · Lucknow Member</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="locationSection">
        <div className="container locationContent">
          <div>
            <p className="eyebrow">LOCATION & DIRECTIONS</p>
            <h2>Visit SitaRam Library<br /><em>in Lucknow.</em></h2>
            <p className="locationNote">
              Conveniently located with easy access from major roads and public transport in Lucknow.
              Click below to launch Google Maps turn-by-turn navigation directly to our entrance.
            </p>
            <a className="button primary" href={mapsUrl} target="_blank" rel="noreferrer">
              Open Navigation in Google Maps <Arrow />
            </a>

            <div className="locationFacts">
              <div>
                <span>Business Name</span>
                <strong>SitaRam Library</strong>
              </div>
              <div>
                <span>City & Region</span>
                <strong>Lucknow, Uttar Pradesh</strong>
              </div>
              <div>
                <span>Official Phone</span>
                <strong>{formattedPhone}</strong>
              </div>
              <div>
                <span>Google Maps Pin</span>
                <strong>Verified Pin (maps.app.goo.gl/AmYkZHwvBsB9Rpum9)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Responsive Google Map */}
        <div className="mapVisual">
          <iframe
            title="SitaRam Library Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113919.26084050731!2d80.8658897!3d26.848623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93c3c1e2289139f4!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contactSection">
        <div className="container contactGrid">
          <div>
            <p className="eyebrow">GET IN TOUCH</p>
            <h2>Ready to start your <em>next study session?</em></h2>
            <p className="sectionLead">
              Call us directly at <strong>{formattedPhone}</strong>, message us on WhatsApp,
              or visit the library in person to check seat availability and take a 1-day demo seat.
            </p>
          </div>
          <div className="contactActions">
            <a href={`tel:${phoneNumber}`} className="contactAction phoneIcon">
              <span>📞</span>
              <div>
                <strong>Call {formattedPhone}</strong>
                <small>Direct phone inquiry for seat availability</small>
              </div>
            </a>
            <a href={defaultWhatsAppUrl} target="_blank" rel="noreferrer" className="contactAction whatsappIcon">
              <span>💬</span>
              <div>
                <strong>Chat on WhatsApp</strong>
                <small>Instant response & seat reservation details</small>
              </div>
            </a>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="contactAction">
              <span>📍</span>
              <div>
                <strong>Get Directions on Google Maps</strong>
                <small>Turn-by-turn directions to SitaRam Library</small>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Quick-Action Bar */}
      <aside className="stickyActionBar" aria-label="Quick contact actions">
        <a className="stickyCallBtn" href={`tel:${phoneNumber}`}>
          📞 Call {formattedPhone}
        </a>
        <a className="stickyWhatsAppBtn" href={defaultWhatsAppUrl} target="_blank" rel="noreferrer">
          💬 WhatsApp
        </a>
      </aside>

      {/* Footer */}
      <footer>
        <div className="container footer">
          <div className="brand">
            <span className="brandMark">SR</span>
            <span>
              <strong>SitaRam</strong>
              <small>LIBRARY · LUCKNOW</small>
            </span>
          </div>
          <p>© {new Date().getFullYear()} SitaRam Library, Lucknow. All rights reserved. | Contact: {formattedPhone}</p>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}