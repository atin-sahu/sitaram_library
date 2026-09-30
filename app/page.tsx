"use client";

import { useState } from "react";

const phoneNumber = "7080151101";
const formattedPhone = "+91 70801 51101";
const altPhoneNumber = "8181815024";
const formattedAltPhone = "+91 81818 15024";
const facebookUrl = "https://www.facebook.com/share/1Hpriu2prm/";
const mapsUrl = "https://maps.app.goo.gl/YunogMbNZxmJ6Ltu7";
const mapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.072223846067!2d80.82598697621415!3d26.691131776781214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bf9dd73b74a3b%3A0xb517a1569c69c680!2sSitaRam%20Library!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin";
const addressText =
  "Near Lucknow Hospital, Opp. HP Petrol Pump, Sitaram Market, Kanpur Road, Banthra, Lucknow - 226 401";
const whatsappBase = `https://wa.me/91${phoneNumber}`;

function getWhatsAppUrl(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

const defaultWhatsAppUrl = getWhatsAppUrl(
  "Hello SitaRam Library, I would like to inquire about seat availability and membership plans."
);

// Removed locker and cctv from facilities as requested
const facilities = [
  {
    icon: "⚡",
    title: "100% Power Backup",
    text: "Zero interruptions with dual inverter and silent generator support during crucial study hours.",
  },
  {
    icon: "📶",
    title: "High-Speed Wi-Fi",
    text: "High-bandwidth fiber internet connection for seamless online lectures, video tests, and downloads.",
  },
  {
    icon: "❄️",
    title: "Fully Air-Conditioned",
    text: "Clean, temperature-controlled hall maintained at optimal comfort to prevent study fatigue.",
  },
  {
    icon: "💺",
    title: "Ergonomic Chairs",
    text: "Cushioned, posture-supportive mesh chairs built for long 6 to 12+ hour study sessions.",
  },
  {
    icon: "🔌",
    title: "Desk Power Sockets",
    text: "Dedicated power sockets and focused warm LED lamps on every partitioned study desk.",
  },
  {
    icon: "💧",
    title: "Purified RO Water",
    text: "Hygienic multi-stage RO drinking water dispenser with fresh hydration available all day.",
  },
];

const galleryItems = [
  {
    id: 1,
    title: "Main Study Hall",
    category: "hall",
    categoryLabel: "Study Hall",
    colSpan: "col-7",
    image: "/images/hero-study-hall.jpg",
    description: "Wide rows of sound-dampened wooden study carrels with warm lighting and spacious aisles.",
  },
  {
    id: 2,
    title: "Personal Partitioned Desk",
    category: "desks",
    categoryLabel: "Dedicated Cubicle",
    colSpan: "col-5",
    image: "/images/personal-desk.jpg",
    description: "Private study desk equipped with focused warm LED lamp, personal electric socket, and comfortable seating.",
  },
  {
    id: 3,
    title: "Silent AC Study Zone",
    category: "silent",
    categoryLabel: "Silent Zone",
    colSpan: "col-6",
    image: "/images/silent-zone.jpg",
    description: "Strictly silent, temperature-controlled environment designed for intense competitive exam preparation.",
  },
  {
    id: 4,
    title: "Quiet Reading & Reference Lounge",
    category: "lounge",
    categoryLabel: "Reading Corner",
    colSpan: "col-6",
    image: "/images/reading-corner.jpg",
    description: "Cozy reading nook with reference bookshelves, ergonomic armchairs, and warm lighting.",
  },
];

interface ShiftPlan {
  id: string;
  name: string;
  hours: string;
  monthlyFee: number;
  slots: string[];
  desc: string;
}

const shifts: ShiftPlan[] = [
  {
    id: "6hrs",
    name: "6 Hours Shift",
    hours: "6 Hrs",
    monthlyFee: 600,
    slots: [
      "08:00 AM to 02:00 PM",
      "02:00 PM to 08:00 PM",
      "07:00 AM to 01:00 PM",
      "01:00 PM to 07:00 PM",
    ],
    desc: "₹600 / month · 4 flexible slots for college students & morning/evening study",
  },
  {
    id: "8hrs",
    name: "8 Hours Shift",
    hours: "8 Hrs",
    monthlyFee: 800,
    slots: [
      "08:00 AM to 04:00 PM",
      "07:00 AM to 03:00 PM",
    ],
    desc: "₹800 / month · Ideal balanced routine for UPSC, UPPSC, SSC & Banking aspirants",
  },
  {
    id: "12hrs",
    name: "12 Hours Shift",
    hours: "12 Hrs",
    monthlyFee: 1100,
    slots: [
      "08:00 AM to 08:00 PM",
      "07:00 AM to 07:00 PM",
    ],
    desc: "₹1,100 / month · Full-day intensive study regime for dedicated test preparation",
  },
  {
    id: "24hrs",
    name: "24 Hours (Full Day & Night)",
    hours: "24 Hrs",
    monthlyFee: 1500,
    slots: [
      "08:00 AM to 08:00 AM",
      "07:00 AM to 07:00 AM",
    ],
    desc: "₹1,500 / month · Round-the-clock unrestricted entry and dedicated desk access",
  },
];

interface DurationPlan {
  id: string;
  label: string;
  months: number;
  discount: number; // percentage
  badge?: string;
  note: string;
}

const durations: DurationPlan[] = [
  { id: "1m", label: "1 Month", months: 1, discount: 0, note: "Standard monthly fee" },
  { id: "3m", label: "3 Months", months: 3, discount: 10, badge: "10% OFF", note: "10% discount on 3-month package" },
  { id: "6m", label: "6 Months", months: 6, discount: 15, badge: "15% OFF", note: "15% discount on 6-month package" },
  { id: "12m", label: "1 Year", months: 12, discount: 20, badge: "20% OFF", note: "20% discount on yearly package" },
];

const seatTypes = [
  { id: "reserved", label: "Dedicated Fixed Desk", note: "Your personal desk reserved for your shift duration" },
  { id: "flexi", label: "Flexible Seat", note: "Any comfortable available desk in your chosen shift" },
];

// Official timetable directly from library board
const officialTimetable = [
  { time: "08:00 AM to 02:00 PM", fee: 600, hours: "6 Hrs.", batch: "Cycle A (Starts 8 AM)" },
  { time: "02:00 PM to 08:00 PM", fee: 600, hours: "6 Hrs.", batch: "Cycle A (Starts 8 AM)" },
  { time: "08:00 AM to 04:00 PM", fee: 800, hours: "8 Hrs.", batch: "Cycle A (Starts 8 AM)" },
  { time: "08:00 AM to 08:00 PM", fee: 1100, hours: "12 Hrs.", batch: "Cycle A (Starts 8 AM)" },
  { time: "08:00 AM to 08:00 AM", fee: 1500, hours: "24 Hrs.", batch: "Cycle A (Starts 8 AM)" },
  { time: "07:00 AM to 01:00 PM", fee: 600, hours: "6 Hrs.", batch: "Cycle B (Starts 7 AM)" },
  { time: "01:00 PM to 07:00 PM", fee: 600, hours: "6 Hrs.", batch: "Cycle B (Starts 7 AM)" },
  { time: "07:00 AM to 03:00 PM", fee: 800, hours: "8 Hrs.", batch: "Cycle B (Starts 7 AM)" },
  { time: "07:00 AM to 07:00 PM", fee: 1100, hours: "12 Hrs.", batch: "Cycle B (Starts 7 AM)" },
  { time: "07:00 AM to 07:00 AM", fee: 1500, hours: "24 Hrs.", batch: "Cycle B (Starts 7 AM)" },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [selectedShift, setSelectedShift] = useState<ShiftPlan>(shifts[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>(shifts[0].slots[0]);
  const [selectedDuration, setSelectedDuration] = useState<DurationPlan>(durations[0]);
  const [selectedSeatType, setSelectedSeatType] = useState(seatTypes[0]);

  // Handle shift change and ensure valid slot selection
  const handleShiftChange = (shift: ShiftPlan) => {
    setSelectedShift(shift);
    if (!shift.slots.includes(selectedSlot)) {
      setSelectedSlot(shift.slots[0]);
    }
  };

  // Pricing calculations
  const baseMonthly = selectedShift.monthlyFee;
  const totalOriginal = baseMonthly * selectedDuration.months;
  const discountPercent = selectedDuration.discount;
  const discountAmount = Math.round((totalOriginal * discountPercent) / 100);
  const finalPayable = totalOriginal - discountAmount;
  const effectiveMonthly = Math.round(finalPayable / selectedDuration.months);

  const filteredGallery =
    activeCategory === "all"
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

  const shiftBookingMsg = `Hello SitaRam Library, I would like to reserve a seat for the *${selectedShift.name}* (${selectedSlot}) for *${selectedDuration.label}* with *${selectedSeatType.label}*. Total Fee: ₹${finalPayable.toLocaleString("en-IN")}${
    discountPercent > 0
      ? ` (${discountPercent}% discount applied, saved ₹${discountAmount.toLocaleString("en-IN")})`
      : ""
  }. Please share slot availability and confirmation details.`;

  return (
    <main>
      {/* Header */}
      <header className="siteHeader">
        <div className="container nav">
          <a className="brand" href="#home" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="brandMark">SR</span>
            <span>
              <strong>SitaRam</strong>
              <small>LIBRARY · BANTHRA, LUCKNOW</small>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktopNav" aria-label="Primary">
            <a href="#facilities">Facilities</a>
            <a href="#calculator">Fees & Discounts</a>
            <a href="#timetable">Timetable</a>
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
              Fees & Shift Calculator <span>→</span>
            </a>
            <a href="#timetable" onClick={() => setIsMobileMenuOpen(false)}>
              Official Timetable <span>→</span>
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
            <p className="eyebrow">PREMIUM STUDY SANCTUARY IN BANTHRA, LUCKNOW</p>
            <h1>
              Study with purpose.
              <br />
              <em>Grow with discipline.</em>
            </h1>
            <p className="lead">
              SitaRam Library provides a modern, peaceful, air-conditioned study environment with
              individual partitioned carrels, high-speed fiber internet, and 100% power backup. Built
              for students and aspirants who value uninterrupted concentration.
            </p>
            <div className="heroActions">
              <a className="button primary" href="#calculator">
                Explore Shifts & Fees <Arrow />
              </a>
              <a className="button whatsapp" href={defaultWhatsAppUrl} target="_blank" rel="noreferrer">
                💬 Book via WhatsApp
              </a>
              <a className="button ghost" href={`tel:${phoneNumber}`}>
                📞 Call {formattedPhone}
              </a>
            </div>
            <div className="trustRow">
              <div className="trustItem">
                <span className="dot green" /> Seats Open for Admission
              </div>
              <div className="trustItem">
                <span className="dot" /> Banthra, Kanpur Road, Lucknow
              </div>
              <div className="trustItem">
                <span className="dot" /> From ₹600/Month
              </div>
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
                  <span>Kanpur Road, Banthra, Lucknow · Call: {formattedPhone}</span>
                </div>
                <a className="heroBadgeButton" href="#gallery">
                  View Photos
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
            <h2>
              A dedicated sanctuary for <em>serious learners.</em>
            </h2>
          </div>
          <p>
            Whether you are preparing for UPSC, UPPSC, NEET, JEE, SSC, Banking, or academic exams,
            consistency requires an atmosphere free from noise and distractions. SitaRam Library offers
            ergonomic comfort, focused lighting, and supportive amenities so you can focus 100% on your
            goals.
          </p>
        </div>
      </section>

      {/* Facilities Section (Locker and CCTV removed as per instruction) */}
      <section id="facilities" className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">FACILITIES & AMENITIES</p>
              <h2>
                Everything built around <em>your focus.</em>
              </h2>
            </div>
            <p className="sectionLead">
              Every detail has been crafted to ensure long study sessions remain comfortable, productive,
              and completely uninterrupted.
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

      {/* Interactive Shift & Fee Calculator with Discounts */}
      <section id="calculator" className="section plansSection">
        <div className="container">
          <div className="centerHead">
            <p className="eyebrow">FLEXIBLE TIMINGS & FEES STRUCTURE</p>
            <h2>
              Choose your shift. <em>Keep showing up.</em>
            </h2>
            <p>
              Select your ideal daily study hours, timing slot, and duration below. Enjoy up to 20%
              discount on long-term packages!
            </p>
          </div>

          {/* Discount Announcement Banner */}
          <div className="discountBanner">
            <div className="discountBannerBadge">🎉 SPECIAL SAVINGS OFFER</div>
            <div className="discountBannerText">
              Get <strong>10% OFF</strong> on 3 Months, <strong>15% OFF</strong> on 6 Months, and{" "}
              <strong>20% OFF</strong> on 1 Year Packages!
            </div>
          </div>

          <div className="calculatorWidget">
            <div className="calcHeader">
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>
                  CUSTOM STUDY PLAN & FEES CALCULATOR
                </p>
                <h3>Interactive Shift & Package Selector</h3>
              </div>
              <span className="calcBadge">STARTING AT ₹600/MO</span>
            </div>

            <div className="calcGrid">
              <div className="calcOptionsBlock">
                {/* 1. Shift Category Selector */}
                <div className="calcOptionGroup">
                  <label>1. SELECT DAILY STUDY DURATION (MONTHLY BASE RATE)</label>
                  <div className="calcPillGroup">
                    {shifts.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        className={`calcPill ${selectedShift.id === s.id ? "active" : ""}`}
                        onClick={() => handleShiftChange(s)}
                      >
                        <strong>
                          {s.name} ({s.hours})
                        </strong>
                        <small>₹{s.monthlyFee}/month base fee</small>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Timing Slot Selector */}
                <div className="calcOptionGroup">
                  <label>2. SELECT PREFERRED TIMING SLOT</label>
                  <div className="calcSlotPillGroup">
                    {selectedShift.slots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        className={`calcSlotPill ${selectedSlot === slot ? "active" : ""}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        <span className="slotClock">⏰</span>
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Duration Selector with 10%, 15%, 20% Discounts */}
                <div className="calcOptionGroup">
                  <label>3. SELECT MEMBERSHIP DURATION (DISCOUNT APPLIED)</label>
                  <div className="calcPillGroup">
                    {durations.map((d) => (
                      <button
                        type="button"
                        key={d.id}
                        className={`calcPill ${selectedDuration.id === d.id ? "active" : ""}`}
                        onClick={() => setSelectedDuration(d)}
                      >
                        <div className="pillHeaderRow">
                          <strong>{d.label}</strong>
                          {d.badge && <span className="discountTag">{d.badge}</span>}
                        </div>
                        <small>{d.note}</small>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Seat Preference */}
                <div className="calcOptionGroup">
                  <label>4. SEAT PREFERENCE</label>
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
                  <div className="summaryBadgeRow">
                    <span>SELECTED PACKAGE</span>
                    {discountPercent > 0 && (
                      <span className="summaryDiscountPill">{discountPercent}% DISCOUNT APPLIED</span>
                    )}
                  </div>
                  <h4>{selectedShift.name}</h4>
                  <div className="summaryShiftTime">⏰ Slot: {selectedSlot}</div>
                  <div className="summaryDurationBadge">📅 Duration: {selectedDuration.label}</div>

                  {/* Pricing Box */}
                  <div className="calcPriceBox">
                    <div className="priceLabel">Total Payable Fee</div>
                    <div className="priceValueRow">
                      <span className="finalPrice">₹{finalPayable.toLocaleString("en-IN")}</span>
                      {discountAmount > 0 && (
                        <span className="originalPrice">₹{totalOriginal.toLocaleString("en-IN")}</span>
                      )}
                    </div>
                    {discountAmount > 0 ? (
                      <div className="savingsNotice">
                        ✨ You save <strong>₹{discountAmount.toLocaleString("en-IN")}</strong> with this package
                        (~₹{effectiveMonthly.toLocaleString("en-IN")}/mo)
                      </div>
                    ) : (
                      <div className="regularNotice">Standard monthly subscription rate</div>
                    )}
                  </div>

                  <ul className="summaryFeaturesList">
                    <li>
                      <span>✓</span> {selectedDuration.label} Validity ({selectedSlot})
                    </li>
                    <li>
                      <span>✓</span> {selectedSeatType.label}
                    </li>
                    <li>
                      <span>✓</span> High-Speed Fiber Wi-Fi Included
                    </li>
                    <li>
                      <span>✓</span> Air-Conditioned Comfort & Power Backup
                    </li>
                    <li>
                      <span>✓</span> Clean RO Drinking Water
                    </li>
                    <li>
                      <span>✓</span> Peaceful & Disciplined Environment
                    </li>
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

          {/* Standard Package Highlights with Real Fees & Discounts */}
          <div className="planGrid">
            <article className="planCard">
              <div>
                <span className="planTier">MONTHLY PASS</span>
                <h3>Monthly Plan</h3>
                <div className="planPrice">From ₹600</div>
                <div className="planSub">per month · standard rate</div>
                <p>
                  Ideal for students starting out or needing monthly flexibility. Choose from 6 Hrs (₹600),
                  8 Hrs (₹800), 12 Hrs (₹1,100), or 24 Hrs (₹1,500).
                </p>
              </div>
              <a
                className="button ghost"
                href={getWhatsAppUrl(
                  "Hello, I want to inquire about the Monthly Pass for SitaRam Library."
                )}
                target="_blank"
                rel="noreferrer"
              >
                Inquire Rates <Arrow />
              </a>
            </article>

            <article className="planCard featured">
              <span className="popular">10% DISCOUNT</span>
              <div>
                <span className="planTier">3 MONTHS PACKAGE</span>
                <h3>Quarterly Pass</h3>
                <div className="planPrice">10% OFF</div>
                <div className="planSub">Save up to ₹450</div>
                <p>
                  Designed for focused aspirants preparing for exam cycles. Pay ₹1,620 for 6h (save ₹180),
                  ₹2,160 for 8h (save ₹240), or ₹2,970 for 12h (save ₹330).
                </p>
              </div>
              <a
                className="button primary"
                href={getWhatsAppUrl(
                  "Hello, I would like to book a seat under the 3-Month Package with 10% discount."
                )}
                target="_blank"
                rel="noreferrer"
              >
                Book 3 Months (10% Off) <Arrow />
              </a>
            </article>

            <article className="planCard">
              <span className="planDiscountBadge">15% - 20% DISCOUNT</span>
              <div>
                <span className="planTier">6 MONTHS & 1 YEAR</span>
                <h3>Long-Term Pass</h3>
                <div className="planPrice">Up to 20% OFF</div>
                <div className="planSub">Save up to ₹3,600</div>
                <p>
                  Maximum savings for serious full-year civil services & entrance prep. 6 Months gives 15%
                  discount, and Yearly package gives a huge 20% discount.
                </p>
              </div>
              <a
                className="button ghost"
                href={getWhatsAppUrl(
                  "Hello, I want to check rates and availability for the 6-Month & Yearly Long-Term Membership."
                )}
                target="_blank"
                rel="noreferrer"
              >
                Inquire Long-Term <Arrow />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Official Timetable Table as per the Board Image */}
      <section id="timetable" className="section timetableSection">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">OFFICIAL TIME TABLE & FEES STRUCTURE</p>
              <h2>
                All shifts & <em>package pricing.</em>
              </h2>
            </div>
            <p className="sectionLead">
              Complete fee schedule as displayed at SitaRam Library, Kanpur Road, Banthra. All packages include
              10% discount on 3 months, 15% discount on 6 months, and 20% discount on 1 year.
            </p>
          </div>

          <div className="timetableContainer">
            <div className="tableResponsiveWrapper">
              <table className="timetableTable">
                <thead>
                  <tr>
                    <th>Daily Time Slot</th>
                    <th>Duration</th>
                    <th>1 Month (Standard)</th>
                    <th>
                      3 Months <span className="thDiscountBadge">10% OFF</span>
                    </th>
                    <th>
                      6 Months <span className="thDiscountBadge">15% OFF</span>
                    </th>
                    <th>
                      1 Year <span className="thDiscountBadge">20% OFF</span>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {officialTimetable.map((row, idx) => {
                    const fee1m = row.fee;
                    const fee3m = Math.round(row.fee * 3 * 0.9);
                    const fee6m = Math.round(row.fee * 6 * 0.85);
                    const fee1y = Math.round(row.fee * 12 * 0.8);
                    const rowWhatsAppMsg = `Hello SitaRam Library, I want to inquire/reserve the slot *${row.time}* (${row.hours}) at ₹${fee1m}/mo.`;

                    return (
                      <tr key={idx} className={idx % 2 === 0 ? "evenRow" : ""}>
                        <td className="slotCell">
                          <strong>{row.time}</strong>
                        </td>
                        <td>
                          <span className="hoursBadge">{row.hours}</span>
                        </td>
                        <td className="priceCell">
                          <strong>₹{fee1m}/-</strong>
                        </td>
                        <td className="priceCell discountHighlight">
                          <strong>₹{fee3m.toLocaleString("en-IN")}/-</strong>
                          <small>Save ₹{row.fee * 3 - fee3m}</small>
                        </td>
                        <td className="priceCell discountHighlight">
                          <strong>₹{fee6m.toLocaleString("en-IN")}/-</strong>
                          <small>Save ₹{row.fee * 6 - fee6m}</small>
                        </td>
                        <td className="priceCell discountHighlightYear">
                          <strong>₹{fee1y.toLocaleString("en-IN")}/-</strong>
                          <small>Save ₹{row.fee * 12 - fee1y}</small>
                        </td>
                        <td>
                          <a
                            href={getWhatsAppUrl(rowWhatsAppMsg)}
                            target="_blank"
                            rel="noreferrer"
                            className="tableBookBtn"
                          >
                            💬 Reserve
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="timetableFootnote">
              <p>
                💡 <strong>Package Discount Note:</strong> Pay upfront for 3 months to get 10% off, 6 months
                to get 15% off, and 12 months to get 20% off on all slots. Call{" "}
                <a href={`tel:${phoneNumber}`}>{formattedPhone}</a> for slot availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Photo Gallery with Category Filters & Lightbox */}
      <section id="gallery" className="section gallerySection">
        <div className="container">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">PHOTO GALLERY</p>
              <h2>
                Take a look inside <em>the library.</em>
              </h2>
            </div>
            <p className="sectionLead">
              Experience the atmosphere, clean study desks, and quiet reading areas before visiting in
              person. Click any photo to expand into high resolution.
            </p>
          </div>

          {/* Category Filter Tabs */}
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

      {/* Lightbox Modal */}
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
              <img src={galleryItems[lightboxIndex].image} alt={galleryItems[lightboxIndex].title} />
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
              <h4>
                {galleryItems[lightboxIndex].title} ({lightboxIndex + 1}/{galleryItems.length})
              </h4>
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
            <h2>
              Trusted by serious <em>aspirants in Lucknow.</em>
            </h2>
            <p className="sectionLead">
              Here is what students say about the peaceful atmosphere, comfortable seating, and
              disciplined environment that helps them study 10+ hours every day.
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
              “SitaRam Library has been the most peaceful place for my preparation. The personal charging
              points, comfortable chairs, and high-speed Wi-Fi make it easy to stay focused without any
              fatigue.”
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

      {/* Location Section with Exact Google Maps Pin */}
      <section id="location" className="locationSection">
        <div className="container locationContent">
          <div>
            <p className="eyebrow">LOCATION & DIRECTIONS</p>
            <h2>
              Visit SitaRam Library
              <br />
              <em>in Banthra, Lucknow.</em>
            </h2>
            <p className="locationNote">
              Located right on Kanpur Road in Sitaram Market, near Lucknow Hospital and opposite HP Petrol
              Pump in Banthra. Click below to launch Google Maps turn-by-turn navigation directly to our door.
            </p>
            <a className="button primary" href={mapsUrl} target="_blank" rel="noreferrer">
              Open Navigation in Google Maps <Arrow />
            </a>

            <div className="locationFacts">
              <div>
                <span>Business Name</span>
                <strong>SitaRam Library (The Study Point)</strong>
              </div>
              <div>
                <span>Full Address</span>
                <strong>{addressText}</strong>
              </div>
              <div>
                <span>Official Call & WhatsApp</span>
                <strong>{formattedPhone}</strong>
              </div>
              <div>
                <span>Google Maps Verified Pin</span>
                <strong>SitaRam Library (maps.app.goo.gl/YunogMbNZxmJ6Ltu7)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Responsive Google Map with Exact Library Marker Pin */}
        <div className="mapVisual">
          <iframe
            title="SitaRam Library Exact Location Map Banthra Lucknow"
            src={mapsEmbedUrl}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Contact Section ("Get in Touch") */}
      <section id="contact" className="section contactSection">
        <div className="container contactGrid">
          <div>
            <p className="eyebrow">GET IN TOUCH</p>
            <h2>
              Ready to start your <em>next study session?</em>
            </h2>
            <p className="sectionLead">
              Call us directly at <strong>{formattedPhone}</strong>, chat on WhatsApp, follow our Facebook
              page, or visit the library in Banthra in person to check seat availability and take a 1-day
              demo seat.
            </p>
          </div>
          <div className="contactActions">
            {/* Primary Call */}
            <a href={`tel:${phoneNumber}`} className="contactAction phoneIcon">
              <span>📞</span>
              <div>
                <strong>Call {formattedPhone}</strong>
                <small>Primary phone inquiry for seat reservations & details</small>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="contactAction whatsappIcon"
            >
              <span>💬</span>
              <div>
                <strong>Chat on WhatsApp</strong>
                <small>Instant reply & seat confirmation: {formattedPhone}</small>
              </div>
            </a>

            {/* Google Maps */}
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="contactAction mapsIcon">
              <span>📍</span>
              <div>
                <strong>Get Directions on Google Maps</strong>
                <small>Turn-by-turn navigation to SitaRam Library, Banthra</small>
              </div>
            </a>

            {/* Facebook Page */}
            <a
              href={facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="contactAction facebookIcon"
            >
              <span>🌐</span>
              <div>
                <strong>Visit Facebook Page</strong>
                <small>facebook.com/share/1Hpriu2prm/ · Updates & Community</small>
              </div>
            </a>

            {/* Alternate Number: Added ONLY at the end of Get in Touch section as explicitly requested */}
            <a href={`tel:${altPhoneNumber}`} className="contactAction altPhoneAction">
              <span className="altPhoneIcon">📞</span>
              <div>
                <div className="altPhoneHeader">
                  <strong>Alternate: {formattedAltPhone}</strong>
                  <span className="altPhoneBadge">Calls Only · No WhatsApp</span>
                </div>
                <small>Alternate phone line for calling inquiries (No WhatsApp on this number)</small>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Quick-Action Bar for Mobile */}
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
              <small>LIBRARY · BANTHRA, LUCKNOW</small>
            </span>
          </div>
          <p>
            © {new Date().getFullYear()} SitaRam Library, Lucknow. All rights reserved. | Kanpur Road,
            Banthra | Call: {formattedPhone}
          </p>
          <div className="footerLinks">
            <a href={facebookUrl} target="_blank" rel="noreferrer" className="footerFbLink">
              🌐 Facebook Page
            </a>
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              📍 Google Maps Pin
            </a>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}