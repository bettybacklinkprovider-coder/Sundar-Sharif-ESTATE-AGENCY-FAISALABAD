/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  PROPERTIES,
  BUSINESS_INFO,
  GOOGLE_REVIEWS,
  PEOPLE_ALSO_SEARCH_FOR,
  HERO_IMAGE,
  ABOUT_IMAGE,
  CTA_VILLA_IMAGE,
  Property,
  GoogleReview,
} from './data/properties';

type NavTab =
  | 'home'
  | 'properties'
  | 'about-us'
  | 'services'
  | 'testimonials'
  | 'contact';

const EXTRA_REVIEWS: GoogleReview[] = [
  {
    id: 'bilal-warraich',
    author: 'Chaudhry Bilal Warraich',
    badge: 'Local Guide · 62 reviews · 14 photos',
    timeAgo: '3 years ago',
    rating: 4,
    text: 'Good options for residential plots and houses in Amin Town and Canal Road Faisalabad.',
    likes: 2,
    avatar: '/src/assets/images/avatar_hasnain_shah_1793275900960.jpg',
  },
  {
    id: 'usman-ghani',
    author: 'Usman Ghani',
    badge: 'Local Guide · 19 reviews · 5 photos',
    timeAgo: '5 years ago',
    rating: 1,
    text: 'Visited their office in Amin Town for rental inquiry.',
    likes: 0,
    avatar: '/src/assets/images/avatar_saqib_saleem_1793275902736.jpg',
  },
];

export default function App() {
  const [activeNav, setActiveNav] = useState<NavTab>('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [businessSaved, setBusinessSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search filter state
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [appliedFilters, setAppliedFilters] = useState({
    location: 'all',
    type: 'all',
    price: 'all',
  });

  // Reviews state
  const [userReviews, setUserReviews] = useState<GoogleReview[]>([
    ...GOOGLE_REVIEWS,
  ]);
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [reviewSort, setReviewSort] = useState<
    'relevant' | 'newest' | 'highest' | 'lowest'
  >('relevant');
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');

  // Business Edit / Info Modal state
  const [businessInfoModal, setBusinessInfoModal] = useState<string | null>(
    null
  );
  const [businessInfoInput, setBusinessInfoInput] = useState('');
  const [businessLabel, setBusinessLabel] = useState<string>('');

  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPropertyTitle, setBookingPropertyTitle] = useState<string>('');
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);

  // Booking form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleReviewLike = (id: string) => {
    setLikedReviews((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      location: locationFilter,
      type: typeFilter,
      price: priceFilter,
    });
    if (
      locationFilter !== 'all' ||
      typeFilter !== 'all' ||
      priceFilter !== 'all'
    ) {
      setShowAllProperties(true);
    }
    const el = document.getElementById('properties-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setLocationFilter('all');
    setTypeFilter('all');
    setPriceFilter('all');
    setAppliedFilters({ location: 'all', type: 'all', price: 'all' });
    setShowAllProperties(false);
  };

  const hasActiveFilters =
    appliedFilters.location !== 'all' ||
    appliedFilters.type !== 'all' ||
    appliedFilters.price !== 'all';

  const displayedProperties = useMemo(() => {
    const baseList =
      showAllProperties || hasActiveFilters
        ? PROPERTIES
        : PROPERTIES.filter((p) => p.featured);

    return baseList.filter((prop) => {
      if (
        appliedFilters.location !== 'all' &&
        prop.locationKey !== appliedFilters.location
      ) {
        return false;
      }
      if (appliedFilters.type !== 'all' && prop.type !== appliedFilters.type) {
        return false;
      }
      if (
        appliedFilters.price !== 'all' &&
        prop.priceBracket !== appliedFilters.price
      ) {
        return false;
      }
      return true;
    });
  }, [showAllProperties, hasActiveFilters, appliedFilters]);

  const allDisplayedReviews = useMemo(() => {
    const combined = showMoreReviews
      ? [...userReviews, ...EXTRA_REVIEWS]
      : [...userReviews];
    if (reviewSort === 'highest') {
      return [...combined].sort((a, b) => b.rating - a.rating);
    }
    if (reviewSort === 'lowest') {
      return [...combined].sort((a, b) => a.rating - b.rating);
    }
    if (reviewSort === 'newest') {
      return [...combined].reverse();
    }
    return combined;
  }, [userReviews, showMoreReviews, reviewSort]);

  const totalReviewCount = userReviews.length + EXTRA_REVIEWS.length;
  const computedRating = useMemo(() => {
    const all = [...userReviews, ...EXTRA_REVIEWS];
    const sum = all.reduce((acc, r) => acc + r.rating, 0);
    return (sum / all.length).toFixed(1);
  }, [userReviews]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    const created: GoogleReview = {
      id: `user-${Date.now()}`,
      author: newReviewAuthor.trim(),
      badge: 'Local Guide · Faisalabad',
      timeAgo: 'Just now',
      rating: newReviewRating,
      text: newReviewText.trim(),
      likes: 0,
      avatar: '/src/assets/images/avatar_tayyab_tariq_1793275902700.jpg',
    };
    setUserReviews((prev) => [created, ...prev]);
    setNewReviewAuthor('');
    setNewReviewText('');
    setNewReviewRating(5);
    setWriteReviewOpen(false);
    showToast('Thank you! Your review for Sundar Sharif Estate Agency has been posted.');
  };

  const scrollToSection = (nav: NavTab, sectionId?: string) => {
    setActiveNav(nav);
    if (nav === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetId = sectionId || `${nav}-section`;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openBookingModal = (propertyTitle?: string) => {
    setBookingPropertyTitle(
      propertyTitle || 'Sundar Sharif Estate Agency Consultation'
    );
    setBookingSubmitted(false);
    setBookingError('');
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientEmail.includes('@')) {
      setBookingError('Please provide your full name and a valid email address.');
      return;
    }
    setBookingError('');
    setBookingSubmitted(true);
  };

  const favoritedProperties = useMemo(
    () => PROPERTIES.filter((p) => favorites.includes(p.id)),
    [favorites]
  );

  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-secondary-fixed selection:text-on-secondary-fixed min-h-screen">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md border border-secondary-fixed/20">
          <span className="material-symbols-outlined text-secondary-container text-[20px]">
            check_circle
          </span>
          <span className="font-body-sm text-body-sm">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_12px_32px_rgba(15,61,46,0.06)]">
        <div className="h-20 max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-4">
          <a
            className="flex items-center gap-3 group shrink-0 whitespace-nowrap"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-secondary-container shadow-[0_4px_12px_-2px_rgba(15,61,46,0.1)] transition-transform duration-300 group-hover:scale-105 shrink-0">
              <span className="material-symbols-outlined text-[22px]">
                villa
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none whitespace-nowrap">
                {BUSINESS_INFO.shortName}
              </span>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest mt-1 whitespace-nowrap">
                {BUSINESS_INFO.tagline}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {(
              [
                { id: 'home', label: 'Home' },
                { id: 'properties', label: 'Properties' },
                { id: 'about-us', label: 'Overview' },
                { id: 'services', label: 'Services' },
                { id: 'testimonials', label: 'Reviews' },
                { id: 'contact', label: 'Contact' },
              ] as { id: NavTab; label: string }[]
            ).map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(
                      item.id,
                      item.id === 'services'
                        ? 'nearby-agencies-section'
                        : `${item.id}-section`
                    );
                  }}
                  className={
                    isActive
                      ? 'transition-colors duration-200 bg-primary-container text-on-primary font-label-md text-label-md rounded-full px-4 py-2 whitespace-nowrap shrink-0'
                      : 'font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-4 py-2 transition-colors duration-200 whitespace-nowrap shrink-0'
                  }
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="hidden 2xl:inline-flex items-center gap-2 text-primary hover:text-secondary font-label-md text-label-md px-3 py-2 transition-colors whitespace-nowrap shrink-0"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">
                call
              </span>
              <span className="whitespace-nowrap">{BUSINESS_INFO.phone}</span>
            </a>

            <a
              href="#book-a-tour"
              onClick={(e) => {
                e.preventDefault();
                openBookingModal('Book a Visit — Amin Town Office');
              }}
              className="hidden sm:inline-flex items-center gap-2 bg-primary-container text-on-primary hover:bg-primary font-label-uppercase text-label-uppercase px-6 py-3 rounded-full shadow-[0_10px_30px_-5px_rgba(15,61,46,0.2)] transition-all duration-300 group whitespace-nowrap shrink-0"
            >
              <span className="tracking-wider whitespace-nowrap">Book a Tour</span>
              <span className="material-symbols-outlined text-[18px] text-secondary-container transition-transform duration-300 group-hover:translate-x-0.5 shrink-0">
                arrow_forward
              </span>
            </a>

            <button
              type="button"
              aria-label="Saved Estates & Client Profile"
              onClick={() => setFavoritesDrawerOpen(true)}
              className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm hover:bg-primary-container transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary-container text-on-secondary-fixed font-label-uppercase text-[10px] flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full pt-20 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          {/* 1. HERO SECTION */}
          <section
            id="home-section"
            className="relative w-full -mt-20 overflow-hidden min-h-[920px] flex items-center"
          >
            {/* Hero Background Image & Atmospheric Scrim */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              data-alt="Modern ultra-luxury architectural concrete and glass villa at dusk with illuminated infinity pool reflecting a twilight sky, subtle amber interior glow, manicured palm trees and stone terraces in Mediterranean modernist style, soft cinematic diffused lighting"
              style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
            />
            {/* Deep Cinematic Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pt-32 pb-36">
              <div className="max-w-3xl flex flex-col items-start gap-6">
                {/* Gold Tracking Eyebrow Badge */}
                <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface/10 backdrop-blur-md">
                  <span className="text-secondary-fixed-dim text-xs">✦</span>
                  <span className="font-label-uppercase text-label-uppercase text-secondary-fixed tracking-widest">
                    AMIN TOWN, FAISALABAD · {BUSINESS_INFO.plusCode}
                  </span>
                </div>

                {/* Editorial Serif Headline */}
                <h1 className="font-display text-display-mobile md:text-display text-on-primary font-semibold leading-[1.1] tracking-tight">
                  Sundar Sharif{' '}
                  <span className="text-secondary-container italic font-normal">
                    Estate Agency
                  </span>
                </h1>

                {/* Supporting Paragraph */}
                <p className="font-body-lg text-body-lg text-inverse-on-surface/90 max-w-2xl leading-relaxed">
                  Your trusted partner in real estate across Amin Town, Canal
                  Road, Kohinoor City, and Wapda City, Faisalabad. Providing
                  residential sales, commercial plots, and verified property
                  advisory.
                </p>

                {/* Micro Highlight Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full py-2">
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-surface/10 backdrop-blur-md">
                    <span
                      className="material-symbols-outlined text-secondary-fixed text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-label-md text-label-md text-inverse-on-surface whitespace-nowrap">
                      {computedRating} ★ ({totalReviewCount} Reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-surface/10 backdrop-blur-md">
                    <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                      pin_drop
                    </span>
                    <span className="font-label-md text-label-md text-inverse-on-surface whitespace-nowrap">
                      Amin Town, FSD
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-surface/10 backdrop-blur-md">
                    <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                      call
                    </span>
                    <span className="font-label-md text-label-md text-inverse-on-surface whitespace-nowrap">
                      +92 41 8755511
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-surface/10 backdrop-blur-md">
                    <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                      verified
                    </span>
                    <span className="font-label-md text-label-md text-inverse-on-surface whitespace-nowrap">
                      Real Estate Agency
                    </span>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#properties"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('properties', 'properties-section');
                    }}
                    className="inline-flex items-center gap-3 bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-fixed font-label-uppercase text-label-uppercase px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <span className="tracking-widest">Explore Properties</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </a>
                  <a
                    href="#overview"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('about-us', 'about-us-section');
                    }}
                    className="inline-flex items-center gap-3 bg-surface/10 hover:bg-surface/20 text-on-primary font-label-uppercase text-label-uppercase px-8 py-4 rounded-full backdrop-blur-md transition-all duration-300"
                  >
                    <span className="tracking-widest">
                      Business Overview &amp; Directions
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
                      north_east
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 2. FLOATING SEARCH BAR */}
          <div className="relative z-20 w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop -mt-16">
            <div className="bg-surface-container-lowest rounded-[24px] shadow-[0_24px_48px_-12px_rgba(15,61,46,0.12)] p-4 md:p-6">
              <form
                id="estateSearchForm"
                onSubmit={handleSearchSubmit}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                {/* Field 1: Location */}
                <div className="md:col-span-3 flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-2xl group transition-all duration-200 focus-within:ring-2 focus-within:ring-secondary/30">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[22px]">
                      location_on
                    </span>
                  </div>
                  <div className="flex flex-col w-full min-w-0">
                    <label
                      htmlFor="locationInput"
                      className="font-label-uppercase text-[11px] text-secondary tracking-widest leading-tight"
                    >
                      LOCATION
                    </label>
                    <select
                      id="locationInput"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer py-1 truncate"
                    >
                      <option value="all">All Faisalabad Locations</option>
                      <option value="amin-town">Amin Town, Faisalabad</option>
                      <option value="canal-road">Canal Road, Faisalabad</option>
                      <option value="wapda-city">Wapda City, Faisalabad</option>
                      <option value="kohinoor-city">
                        Kohinoor City, Faisalabad
                      </option>
                      <option value="eden-valley">
                        Eden Valley, Faisalabad
                      </option>
                    </select>
                  </div>
                </div>

                {/* Field 2: Property Type */}
                <div className="md:col-span-3 flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-2xl group transition-all duration-200 focus-within:ring-2 focus-within:ring-secondary/30">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[22px]">
                      domain
                    </span>
                  </div>
                  <div className="flex flex-col w-full min-w-0">
                    <label
                      htmlFor="typeInput"
                      className="font-label-uppercase text-[11px] text-secondary tracking-widest leading-tight"
                    >
                      PROPERTY TYPE
                    </label>
                    <select
                      id="typeInput"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer py-1 truncate"
                    >
                      <option value="all">Any Property Class</option>
                      <option value="villa">1 Kanal / Luxury Villa</option>
                      <option value="penthouse">Canal Road Penthouse</option>
                      <option value="waterfront">
                        Commercial &amp; Boulevard
                      </option>
                      <option value="mansion">10–20 Marla House</option>
                    </select>
                  </div>
                </div>

                {/* Field 3: Price Range */}
                <div className="md:col-span-3 flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-2xl group transition-all duration-200 focus-within:ring-2 focus-within:ring-secondary/30">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[22px]">
                      payments
                    </span>
                  </div>
                  <div className="flex flex-col w-full min-w-0">
                    <label
                      htmlFor="priceInput"
                      className="font-label-uppercase text-[11px] text-secondary tracking-widest leading-tight"
                    >
                      PRICE RANGE
                    </label>
                    <select
                      id="priceInput"
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer py-1 truncate"
                    >
                      <option value="all">Any Price Range</option>
                      <option value="2.5m-5m">Rental / Under PKR 3 Crore</option>
                      <option value="5m-12m">PKR 3 Crore – 5 Crore</option>
                      <option value="12m+">PKR 5 Crore+</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 bg-primary-container hover:bg-primary text-on-primary font-label-uppercase text-label-uppercase py-4 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 group cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px] text-secondary-container">
                      search
                    </span>
                    <span className="tracking-widest">Search Properties</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 3. FEATURED LISTINGS */}
          <section
            id="properties-section"
            className="w-full py-space-2xl bg-surface"
          >
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-secondary text-sm">✦</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest">
                      SUNDAR SHARIF ESTATE AGENCY · FEATURED LISTINGS
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
                    Explore Our Latest Listings
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="font-label-md text-label-md text-secondary hover:text-primary underline cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                  <a
                    href="#all-properties"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAllProperties((prev) => !prev);
                    }}
                    className="inline-flex items-center gap-2 font-label-uppercase text-label-uppercase text-primary hover:text-secondary group transition-colors"
                  >
                    <span className="tracking-wider">
                      {showAllProperties
                        ? 'Show Featured Only'
                        : 'View All Properties'}
                    </span>
                    <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>

              {/* Properties Grid */}
              {displayedProperties.length === 0 ? (
                <div className="bg-surface-container-lowest rounded-[24px] p-12 text-center shadow-[0_10px_30px_-5px_rgba(15,61,46,0.04)]">
                  <p className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    No matching properties found in this category
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    Adjust your Faisalabad location, property type, or budget
                    filter to see available listings.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 bg-primary-container text-on-primary font-label-uppercase text-label-uppercase px-6 py-3 rounded-full hover:bg-primary transition-colors cursor-pointer"
                  >
                    View All Listings
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
                  {displayedProperties.map((property) => {
                    const isFavorited = favorites.includes(property.id);
                    return (
                      <article
                        key={property.id}
                        onClick={() => setSelectedProperty(property)}
                        className="flex flex-col bg-surface-container-lowest rounded-[24px] overflow-hidden shadow-[0_10px_30px_-5px_rgba(15,61,46,0.04)] hover:shadow-[0_24px_48px_-12px_rgba(15,61,46,0.1)] transition-all duration-300 group cursor-pointer"
                      >
                        <div className="relative w-full aspect-[16/11] overflow-hidden p-3 pb-0">
                          <div
                            className="w-full h-full bg-cover bg-center rounded-[18px] transition-transform duration-700 group-hover:scale-105"
                            data-alt={property.alt}
                            style={{
                              backgroundImage: `url('${property.image}')`,
                            }}
                          />
                          <div
                            className={`absolute top-6 left-6 inline-flex items-center px-3.5 py-1 rounded-full font-label-uppercase text-[11px] tracking-wider shadow-sm ${
                              property.statusVariant === 'secondary'
                                ? 'bg-secondary text-on-secondary'
                                : 'bg-primary text-on-primary'
                            }`}
                          >
                            {property.status}
                          </div>
                          <button
                            type="button"
                            aria-label="Favorite listing"
                            onClick={(e) => toggleFavorite(property.id, e)}
                            className={`absolute top-6 right-6 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${
                              isFavorited
                                ? 'text-error'
                                : 'text-on-surface hover:text-error'
                            }`}
                          >
                            <span
                              className="material-symbols-outlined text-[18px]"
                              style={{
                                fontVariationSettings: isFavorited
                                  ? "'FILL' 1"
                                  : "'FILL' 0",
                              }}
                            >
                              favorite
                            </span>
                          </button>
                        </div>

                        <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md">
                              <span className="material-symbols-outlined text-secondary text-[16px]">
                                location_on
                              </span>
                              <span>{property.location}</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-medium group-hover:text-primary transition-colors">
                              {property.title}
                            </h3>
                          </div>

                          {/* Amenities Row */}
                          <div className="flex items-center gap-3 py-2 text-on-surface-variant font-body-sm text-body-sm">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">
                                bed
                              </span>{' '}
                              {property.beds} Beds
                            </span>
                            <span className="text-secondary/40">•</span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">
                                bathtub
                              </span>{' '}
                              {property.baths} Baths
                            </span>
                            <span className="text-secondary/40">•</span>
                            <span className="flex items-center gap-1 truncate">
                              <span className="material-symbols-outlined text-[16px]">
                                square_foot
                              </span>{' '}
                              {property.sqft}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-3 bg-surface-container-low/40 -mx-5 -mb-5 px-5 py-4">
                            <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                              {property.priceDisplay}
                              {property.priceSuffix && (
                                <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">
                                  {' '}
                                  {property.priceSuffix}
                                </span>
                              )}
                            </span>
                            <a
                              href={`#property-${property.id}`}
                              aria-label={`View ${property.title} details`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedProperty(property);
                              }}
                              className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:bg-secondary transition-colors group/btn"
                            >
                              <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-0.5">
                                arrow_forward
                              </span>
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* 4. BUSINESS OVERVIEW & GOOGLE MAPS PROFILE SECTION */}
          <section
            id="about-us-section"
            className="w-full py-space-2xl bg-surface-container"
          >
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Column: Architectural Photo with Floating Badges */}
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[4/3] md:aspect-[5/4]">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      data-alt="Sunlit high-ceiling living room inside an award-winning modern luxury mansion with floor-to-ceiling glass, custom oak wall paneling, bouclé curved seating, and a sculpted marble fireplace"
                      style={{ backgroundImage: `url('${ABOUT_IMAGE}')` }}
                    />
                  </div>
                  {/* Floating Badge 1: Location & Plus Code */}
                  <div className="absolute -bottom-8 -left-4 md:-left-8 bg-primary text-on-primary p-6 rounded-[24px] shadow-2xl flex items-center gap-4 max-w-xs">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary-fixed text-[26px]">
                        my_location
                      </span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-[22px] leading-tight text-secondary-fixed font-semibold">
                        C4WH+4G
                      </div>
                      <p className="font-label-uppercase text-[11px] text-on-primary-container tracking-wider mt-0.5 leading-snug">
                        Amin Town, Faisalabad, Pakistan
                      </p>
                    </div>
                  </div>
                  {/* Floating Badge 2: Google Rating */}
                  <div className="absolute -top-6 -right-4 md:-right-6 bg-surface-container-lowest text-on-surface p-5 rounded-[20px] shadow-xl flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined text-secondary text-[22px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-headline-sm font-semibold text-primary">
                        {computedRating} ★ ({totalReviewCount})
                      </div>
                      <div className="font-label-uppercase text-[10px] text-on-surface-variant tracking-widest">
                        REAL ESTATE AGENCY
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Sundar Sharif Estate Agency Google Profile Overview */}
                <div className="lg:col-span-6 flex flex-col items-start gap-6 mt-6 lg:mt-0">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-secondary text-sm">✦</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest">
                      OVERVIEW · SUNDAR SHARIF ESTATE AGENCY
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
                    Sundar Sharif Estate Agency
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Established in Amin Town, Faisalabad, Sundar Sharif Estate
                    Agency provides residential and commercial property sales,
                    plot acquisitions, and rental management with direct local
                    market expertise.
                  </p>

                  {/* Google Maps Action Bar: Directions, Save, Nearby, Send to phone, Share */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full">
                    <a
                      href={BUSINESS_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-secondary-container">
                        directions
                      </span>
                      <span>Directions</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setBusinessSaved((prev) => !prev);
                        showToast(
                          !businessSaved
                            ? 'Sundar Sharif Estate Agency saved to your list.'
                            : 'Removed from saved places.'
                        );
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-label-md text-label-md transition-colors cursor-pointer ${
                        businessSaved
                          ? 'bg-secondary text-on-secondary'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-variant'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{
                          fontVariationSettings: businessSaved
                            ? "'FILL' 1"
                            : "'FILL' 0",
                        }}
                      >
                        bookmark
                      </span>
                      <span>{businessSaved ? 'Saved' : 'Save'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection('services', 'nearby-agencies-section')
                      }
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-variant font-label-md text-label-md transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        explore
                      </span>
                      <span>Nearby</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          'Address & phone (+92 41 8755511) queued to send to your phone.'
                        )
                      }
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-variant font-label-md text-label-md transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        send_to_mobile
                      </span>
                      <span>Send to phone</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(
                            `${BUSINESS_INFO.name} - ${BUSINESS_INFO.address} (${BUSINESS_INFO.phone})`
                          );
                        }
                        showToast(
                          'Business details copied to clipboard for sharing!'
                        );
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-variant font-label-md text-label-md transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        share
                      </span>
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Verified Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-2">
                    {/* Address */}
                    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface-container-lowest/90">
                      <div className="w-10 h-10 rounded-full bg-secondary-fixed/30 flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                        <span className="material-symbols-outlined text-[20px]">
                          location_on
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-label-md text-label-md text-on-surface font-semibold">
                          Address
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug">
                          {BUSINESS_INFO.address}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface-container-lowest/90 hover:bg-surface-container-lowest transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary-fixed/30 flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                        <span className="material-symbols-outlined text-[20px]">
                          call
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-label-md text-label-md text-on-surface font-semibold">
                          Phone Number
                        </h4>
                        <p className="font-body-sm text-body-sm text-primary font-medium mt-1 leading-snug">
                          {BUSINESS_INFO.phone}
                        </p>
                      </div>
                    </a>

                    {/* Plus Code */}
                    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface-container-lowest/90">
                      <div className="w-10 h-10 rounded-full bg-secondary-fixed/30 flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                        <span className="material-symbols-outlined text-[20px]">
                          pin_drop
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-label-md text-label-md text-on-surface font-semibold">
                          Plus Code
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug">
                          {BUSINESS_INFO.plusCode}
                        </p>
                      </div>
                    </div>

                    {/* Claim / Manage Business */}
                    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface-container-lowest/90">
                      <div className="w-10 h-10 rounded-full bg-secondary-fixed/30 flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                        <span className="material-symbols-outlined text-[20px]">
                          verified_user
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-label-md text-label-md text-on-surface font-semibold">
                          Business Profile
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() =>
                              setBusinessInfoModal('Claim this business')
                            }
                            className="font-body-sm text-body-sm text-secondary hover:text-primary underline cursor-pointer"
                          >
                            Claim this business
                          </button>
                          <span className="text-on-surface-variant">·</span>
                          <button
                            type="button"
                            onClick={() =>
                              setBusinessInfoModal('Suggest an edit')
                            }
                            className="font-body-sm text-body-sm text-secondary hover:text-primary underline cursor-pointer"
                          >
                            Suggest an edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Missing Information Strip */}
                  <div className="w-full p-4 rounded-2xl bg-surface-container-lowest/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                      <span className="material-symbols-outlined text-secondary text-[18px]">
                        edit_note
                      </span>
                      <span className="font-medium text-on-surface">
                        Add missing information:
                      </span>
                      {businessLabel && (
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-medium">
                          Label: {businessLabel}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {['Add hours', 'Add website', 'Add a photo', 'Add a label'].map(
                        (action) => (
                          <button
                            key={action}
                            type="button"
                            onClick={() => setBusinessInfoModal(action)}
                            className="px-3 py-1.5 rounded-full bg-surface-container-lowest hover:bg-secondary-fixed/40 text-on-surface font-body-sm text-xs font-medium transition-colors cursor-pointer shadow-xs"
                          >
                            + {action}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. GOOGLE REVIEWS & REVIEW SUMMARY SECTION */}
          <section
            id="testimonials-section"
            className="w-full py-space-2xl bg-surface"
          >
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-secondary text-sm">✦</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest">
                      REVIEW SUMMARY · GOOGLE MAPS REVIEWS
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
                    Client Reviews for Sundar Sharif Estate
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-surface-container px-4 py-2.5 rounded-full">
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      sort
                    </span>
                    <label
                      htmlFor="reviewSortSelect"
                      className="font-label-uppercase text-[11px] text-on-surface-variant"
                    >
                      SORT:
                    </label>
                    <select
                      id="reviewSortSelect"
                      value={reviewSort}
                      onChange={(e) =>
                        setReviewSort(
                          e.target.value as
                            | 'relevant'
                            | 'newest'
                            | 'highest'
                            | 'lowest'
                        )
                      }
                      className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer"
                    >
                      <option value="relevant">Most relevant</option>
                      <option value="newest">Newest</option>
                      <option value="highest">Highest rating</option>
                      <option value="lowest">Lowest rating</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setWriteReviewOpen(true)}
                    className="inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-uppercase text-label-uppercase px-6 py-3 rounded-full shadow-md transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary-container">
                      rate_review
                    </span>
                    <span className="tracking-wider">Write a review</span>
                  </button>
                </div>
              </div>

              {/* Rating Summary Box */}
              <div className="bg-surface-container-lowest rounded-[24px] p-6 md:p-8 mb-10 shadow-[0_10px_30px_-5px_rgba(15,61,46,0.04)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 flex flex-col items-center md:items-start gap-2 border-b md:border-b-0 md:border-r border-surface-variant pb-6 md:pb-0 md:pr-8">
                  <div className="font-display text-[56px] leading-none text-primary font-semibold">
                    {computedRating}
                  </div>
                  <div className="flex items-center gap-1 text-secondary">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="material-symbols-outlined text-[22px]"
                        style={{
                          fontVariationSettings:
                            star <= Math.round(Number(computedRating))
                              ? "'FILL' 1"
                              : "'FILL' 0",
                        }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {totalReviewCount} reviews · Amin Town, Faisalabad
                  </span>
                </div>

                <div className="md:col-span-8 flex flex-col gap-2.5">
                  {[
                    { stars: 5, pct: '40%' },
                    { stars: 4, pct: '20%' },
                    { stars: 3, pct: '20%' },
                    { stars: 2, pct: '0%' },
                    { stars: 1, pct: '20%' },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <span className="font-label-md text-label-md text-on-surface w-4 text-right">
                        {row.stars}
                      </span>
                      <div className="flex-1 h-2.5 rounded-full bg-surface-container overflow-hidden">
                        <div
                          className="h-full rounded-full bg-secondary-container"
                          style={{ width: row.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
                {allDisplayedReviews.map((r) => {
                  const isLiked = likedReviews.includes(r.id);
                  const displayLikes = r.likes + (isLiked ? 1 : 0);
                  return (
                    <article
                      key={r.id}
                      className="flex flex-col justify-between bg-surface-container-lowest p-8 rounded-[24px] shadow-[0_10px_30px_-5px_rgba(15,61,46,0.04)] hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-secondary">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className="material-symbols-outlined text-[18px]"
                                style={{
                                  fontVariationSettings:
                                    star <= r.rating ? "'FILL' 1" : "'FILL' 0",
                                }}
                              >
                                star
                              </span>
                            ))}
                          </div>
                          <span className="font-body-sm text-xs text-on-surface-variant">
                            {r.timeAgo}
                          </span>
                        </div>

                        <blockquote className="font-body-md text-body-md text-on-surface leading-relaxed italic">
                          “{r.text}”
                        </blockquote>

                        <div className="flex items-center gap-4 pt-2">
                          <button
                            type="button"
                            onClick={() => toggleReviewLike(r.id)}
                            className={`inline-flex items-center gap-1.5 font-body-sm text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                              isLiked
                                ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold'
                                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              thumb_up
                            </span>
                            <span>
                              {displayLikes > 0
                                ? `Like (${displayLikes})`
                                : 'Like'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              showToast(`Shared review by ${r.author}`)
                            }
                            className="inline-flex items-center gap-1.5 font-body-sm text-xs px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              share
                            </span>
                            <span>Share</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-6 mt-6 bg-surface-container-low/30 -mx-8 -mb-8 px-8 py-5 rounded-b-[24px]">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                          <img
                            className="w-full h-full object-cover"
                            alt={r.author}
                            src={r.avatar}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                            {r.author}
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                            {r.badge}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* More Reviews Button */}
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setShowMoreReviews((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container hover:bg-surface-variant text-primary font-label-uppercase text-label-uppercase transition-colors cursor-pointer"
                >
                  <span>
                    {showMoreReviews
                      ? 'Show fewer reviews'
                      : `More reviews (${EXTRA_REVIEWS.length})`}
                  </span>
                  <span className="material-symbols-outlined text-[18px]">
                    {showMoreReviews ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* 5B. PEOPLE ALSO SEARCH FOR (FAISALABAD REAL ESTATE DIRECTORY) */}
          <section
            id="nearby-agencies-section"
            className="w-full py-space-xl bg-surface-container-low"
          >
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2">
                    <span className="text-secondary text-sm">✦</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest">
                      FAISALABAD REAL ESTATE NETWORK
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mt-1">
                    People Also Search For
                  </h3>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Nearby agencies around Amin Town &amp; Faisalabad
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {PEOPLE_ALSO_SEARCH_FOR.map((agency) => (
                  <div
                    key={agency.name}
                    onClick={() =>
                      openBookingModal(
                        `Partner Referral Inquiry: ${agency.name}`
                      )
                    }
                    className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">
                        domain
                      </span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                        {agency.name}
                      </h4>
                      <div className="flex items-center gap-1 mt-1 text-secondary font-body-sm text-xs">
                        {agency.rating !== 'No reviews' ? (
                          <>
                            <span className="font-semibold">
                              {agency.rating}
                            </span>
                            <span
                              className="material-symbols-outlined text-[14px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                            <span className="text-on-surface-variant">
                              {agency.reviews}
                            </span>
                          </>
                        ) : (
                          <span className="text-on-surface-variant">
                            No reviews
                          </span>
                        )}
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                        {agency.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. LUXURIOUS FOREST GREEN CTA BANNER */}
          <section
            id="contact-section"
            className="w-full py-space-xl bg-surface"
          >
            <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="relative w-full rounded-[32px] bg-primary text-on-primary overflow-hidden shadow-2xl p-8 md:p-14 lg:p-16">
                {/* Architectural Geometric Overlay Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-10">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    viewBox="0 0 1000 600"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="text-secondary-fixed"
                      cx="800"
                      cy="300"
                      r="300"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      className="text-secondary-fixed"
                      cx="800"
                      cy="300"
                      r="450"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <line
                      className="text-secondary-fixed"
                      stroke="currentColor"
                      strokeWidth="1"
                      x1="0"
                      x2="1000"
                      y1="150"
                      y2="150"
                    />
                    <line
                      className="text-secondary-fixed"
                      stroke="currentColor"
                      strokeWidth="1"
                      x1="0"
                      x2="1000"
                      y1="450"
                      y2="450"
                    />
                  </svg>
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Left Content */}
                  <div className="lg:col-span-7 flex flex-col items-start gap-6">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface/10 backdrop-blur-md">
                      <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                        villa
                      </span>
                      <span className="font-label-uppercase text-label-uppercase text-secondary-fixed tracking-widest">
                        SUNDAR SHARIF ESTATE AGENCY · AMIN TOWN
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary leading-tight font-semibold">
                      Let’s Find Your Dream Property in Faisalabad
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-primary-container max-w-xl leading-relaxed">
                      Visit our office at {BUSINESS_INFO.address} (
                      {BUSINESS_INFO.plusCode}) or call our advisors directly
                      for plot valuations, house sales, and commercial deals.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <a
                        className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-primary-container text-secondary-fixed hover:bg-tertiary-container font-label-md text-label-md transition-colors"
                        href={BUSINESS_INFO.phoneHref}
                      >
                        <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                          call
                        </span>
                        <span className="font-semibold tracking-wide">
                          {BUSINESS_INFO.phone}
                        </span>
                      </a>
                      <a
                        href="#book-consultation"
                        onClick={(e) => {
                          e.preventDefault();
                          openBookingModal(
                            'Sundar Sharif Estate Agency — Office Consultation'
                          );
                        }}
                        className="inline-flex items-center gap-3 bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-fixed font-label-uppercase text-label-uppercase px-8 py-4 rounded-full shadow-lg transition-all duration-300 group"
                      >
                        <span className="tracking-widest">
                          Book Consultation
                        </span>
                        <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-0.5">
                          north_east
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Right Framing: Luxury Inset Villa Photo */}
                  <div className="lg:col-span-5 relative hidden sm:block">
                    <div
                      onClick={() => {
                        const capFerrat = PROPERTIES.find(
                          (p) => p.id === 'cap-ferrat-peninsula'
                        );
                        if (capFerrat) setSelectedProperty(capFerrat);
                      }}
                      className="relative rounded-[24px] overflow-hidden shadow-2xl aspect-[4/3] cursor-pointer group"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        data-alt="Sun-drenched architectural villa facade with cascading travertine steps, tall glass pivot doors, lush tropical landscaping and clear azure sky"
                        style={{
                          backgroundImage: `url('${CTA_VILLA_IMAGE}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-surface/20 backdrop-blur-md flex items-center justify-between text-on-primary">
                        <div>
                          <div className="font-label-uppercase text-[10px] text-secondary-fixed tracking-wider">
                            EXCLUSIVE MANDATE · FAISALABAD
                          </div>
                          <div className="font-headline-sm text-[16px] font-medium">
                            Kohinoor City Boulevard Estate
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                          lock
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-primary-container text-on-primary pt-space-2xl pb-space-lg">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-lg mb-space-2xl">
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-secondary-container">
                  <span className="material-symbols-outlined text-[22px]">
                    villa
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-primary tracking-tight leading-none">
                    {BUSINESS_INFO.name}
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-secondary-container tracking-widest mt-1">
                    {BUSINESS_INFO.tagline}
                  </span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-primary-container max-w-md">
                Connecting discerning clients in Faisalabad with verified
                residential houses, commercial plots, and prime estates in Amin
                Town &amp; Canal Road.
              </p>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-3 text-on-primary-container">
                  <span className="material-symbols-outlined text-[18px] text-secondary-container">
                    location_on
                  </span>
                  <span className="font-body-sm text-body-sm">
                    {BUSINESS_INFO.address} ({BUSINESS_INFO.plusCode})
                  </span>
                </div>
                <div className="flex items-center gap-3 text-on-primary-container">
                  <span className="material-symbols-outlined text-[18px] text-secondary-container">
                    call
                  </span>
                  <span className="font-body-sm text-body-sm">
                    {BUSINESS_INFO.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-on-primary-container">
                  <span className="material-symbols-outlined text-[18px] text-secondary-container">
                    mail
                  </span>
                  <span className="font-body-sm text-body-sm">
                    {BUSINESS_INFO.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-secondary-container tracking-widest">
                Quick Links
              </span>
              <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-primary-container">
                <li>
                  <a
                    className="hover:text-on-primary transition-colors"
                    href="#properties"
                    onClick={(e) => {
                      e.preventDefault();
                      handleResetFilters();
                      scrollToSection('properties', 'properties-section');
                    }}
                  >
                    Featured Properties
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-on-primary transition-colors"
                    href="#amin-town"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocationFilter('amin-town');
                      setAppliedFilters({
                        location: 'amin-town',
                        type: 'all',
                        price: 'all',
                      });
                      setShowAllProperties(true);
                      scrollToSection('properties', 'properties-section');
                    }}
                  >
                    Amin Town Listings
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-on-primary transition-colors"
                    href="#canal-road"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocationFilter('canal-road');
                      setAppliedFilters({
                        location: 'canal-road',
                        type: 'all',
                        price: 'all',
                      });
                      setShowAllProperties(true);
                      scrollToSection('properties', 'properties-section');
                    }}
                  >
                    Canal Road Estates
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-on-primary transition-colors"
                    href="#wapda-city"
                    onClick={(e) => {
                      e.preventDefault();
                      setLocationFilter('wapda-city');
                      setAppliedFilters({
                        location: 'wapda-city',
                        type: 'all',
                        price: 'all',
                      });
                      setShowAllProperties(true);
                      scrollToSection('properties', 'properties-section');
                    }}
                  >
                    Wapda City Houses
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-on-primary transition-colors"
                    href="#valuation"
                    onClick={(e) => {
                      e.preventDefault();
                      openBookingModal('Property Valuation — Faisalabad');
                    }}
                  >
                    Property Valuation
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-secondary-container tracking-widest">
                Business Info
              </span>
              <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-primary-container">
                <li>
                  <a
                    className="hover:text-on-primary transition-colors"
                    href="#overview"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('about-us', 'about-us-section');
                    }}
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-on-primary transition-colors"
                    href="#reviews"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('testimonials', 'testimonials-section');
                    }}
                  >
                    Google Reviews ({totalReviewCount})
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-on-primary transition-colors"
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Maps Directions
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-on-primary transition-colors"
                    href="#nearby"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('services', 'nearby-agencies-section');
                    }}
                  >
                    People Also Search For
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-on-primary transition-colors"
                    href="#claim"
                    onClick={(e) => {
                      e.preventDefault();
                      setBusinessInfoModal('Claim this business');
                    }}
                  >
                    Claim This Business
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-secondary-container tracking-widest">
                Connect
              </span>
              <p className="font-body-sm text-body-sm text-on-primary-container">
                Visit our Amin Town office or reach out by phone for immediate
                assistance.
              </p>
              <div className="flex items-center gap-3 mt-1">
                <a
                  aria-label="Directions on Google Maps"
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary hover:text-secondary-container hover:bg-tertiary-container transition-all"
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    directions
                  </span>
                </a>
                <a
                  aria-label="Call Sundar Sharif Estate Agency"
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary hover:text-secondary-container hover:bg-tertiary-container transition-all"
                  href={BUSINESS_INFO.phoneHref}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    call
                  </span>
                </a>
                <a
                  aria-label="Write a Review"
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary hover:text-secondary-container hover:bg-tertiary-container transition-all"
                  href="#write-review"
                  onClick={(e) => {
                    e.preventDefault();
                    setWriteReviewOpen(true);
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    rate_review
                  </span>
                </a>
                <a
                  aria-label="Saved Listings"
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary hover:text-secondary-container hover:bg-tertiary-container transition-all"
                  href="#saved"
                  onClick={(e) => {
                    e.preventDefault();
                    setFavoritesDrawerOpen(true);
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    push_pin
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-space-md border-t border-primary/40 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-primary-container">
            <p>
              © 2025 {BUSINESS_INFO.name} · {BUSINESS_INFO.address}. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                className="hover:text-on-primary transition-colors"
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  openBookingModal('Privacy Policy & Client Discretion');
                }}
              >
                Privacy Policy
              </a>
              <a
                className="hover:text-on-primary transition-colors"
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  openBookingModal('Terms of Agency Representation');
                }}
              >
                Terms of Service
              </a>
              <a
                className="hover:text-on-primary transition-colors"
                href="#edit"
                onClick={(e) => {
                  e.preventDefault();
                  setBusinessInfoModal('Suggest an edit');
                }}
              >
                Suggest an Edit
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WRITE A REVIEW MODAL */}
      {writeReviewOpen && (
        <div
          className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setWriteReviewOpen(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-[28px] max-w-lg w-full p-6 md:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close review modal"
              onClick={() => setWriteReviewOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-variant cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>

            <span className="font-label-uppercase text-[11px] text-secondary tracking-widest">
              GOOGLE BUSINESS REVIEW
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-1">
              {BUSINESS_INFO.name}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
              {BUSINESS_INFO.address} · Share your experience with this real
              estate agency.
            </p>

            <form onSubmit={handleAddReview} className="flex flex-col gap-4">
              <div>
                <label className="font-label-uppercase text-[11px] text-secondary block mb-2">
                  YOUR RATING *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary hover:scale-110 transition-transform cursor-pointer"
                    >
                      <span
                        className="material-symbols-outlined text-[24px]"
                        style={{
                          fontVariationSettings:
                            star <= newReviewRating ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-label-uppercase text-[11px] text-secondary block mb-1">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Ali Raza"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>

              <div>
                <label className="font-label-uppercase text-[11px] text-secondary block mb-1">
                  YOUR REVIEW *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Share details of your experience with Sundar Sharif Estate Agency in Amin Town..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-uppercase text-label-uppercase py-4 px-6 rounded-full shadow-lg transition-all cursor-pointer mt-2"
              >
                <span className="tracking-widest">Post Review</span>
                <span className="material-symbols-outlined text-[18px] text-secondary-container">
                  send
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BUSINESS INFO / SUGGEST AN EDIT MODAL */}
      {businessInfoModal && (
        <div
          className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => {
            setBusinessInfoModal(null);
            setBusinessInfoInput('');
          }}
        >
          <div
            className="bg-surface-container-lowest rounded-[28px] max-w-md w-full p-6 md:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setBusinessInfoModal(null);
                setBusinessInfoInput('');
              }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-variant cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>

            <span className="font-label-uppercase text-[11px] text-secondary tracking-widest">
              {BUSINESS_INFO.name}
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">
              {businessInfoModal}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Update information for {BUSINESS_INFO.name} ({BUSINESS_INFO.address}
              ).
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (businessInfoModal === 'Add a label' && businessInfoInput) {
                  setBusinessLabel(businessInfoInput);
                }
                showToast(
                  `${businessInfoModal} submitted for ${BUSINESS_INFO.name}.`
                );
                setBusinessInfoModal(null);
                setBusinessInfoInput('');
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                required
                value={businessInfoInput}
                onChange={(e) => setBusinessInfoInput(e.target.value)}
                placeholder={`Enter details for "${businessInfoModal}"...`}
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
              <button
                type="submit"
                className="w-full bg-primary-container hover:bg-primary text-on-primary font-label-uppercase text-label-uppercase py-3.5 px-6 rounded-full transition-colors cursor-pointer"
              >
                Submit Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PROPERTY DOSSIER MODAL */}
      {selectedProperty && (
        <div
          className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-[28px] max-w-4xl w-full overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${selectedProperty.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20" />
              <button
                type="button"
                aria-label="Close property dossier"
                onClick={() => setSelectedProperty(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-surface/90 text-on-surface flex items-center justify-center hover:bg-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-on-primary">
                <div>
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed font-label-uppercase text-[11px] tracking-wider mb-2">
                    {selectedProperty.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-secondary-fixed font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[16px]">
                      location_on
                    </span>
                    <span>{selectedProperty.location}</span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-md text-on-primary">
                    {selectedProperty.title}
                  </h3>
                </div>
                <div className="font-headline-md text-headline-md text-secondary-container font-semibold">
                  {selectedProperty.priceDisplay}
                  {selectedProperty.priceSuffix && (
                    <span className="font-body-sm text-body-sm text-on-primary/80">
                      {' '}
                      {selectedProperty.priceSuffix}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-6">
              {/* Architectural Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-4 rounded-2xl bg-surface-container-low">
                <div>
                  <div className="font-label-uppercase text-[10px] text-secondary">
                    BEDROOMS
                  </div>
                  <div className="font-headline-sm text-[20px] text-primary font-semibold">
                    {selectedProperty.beds} Beds
                  </div>
                </div>
                <div>
                  <div className="font-label-uppercase text-[10px] text-secondary">
                    BATHROOMS
                  </div>
                  <div className="font-headline-sm text-[20px] text-primary font-semibold">
                    {selectedProperty.baths} Baths
                  </div>
                </div>
                <div>
                  <div className="font-label-uppercase text-[10px] text-secondary">
                    AREA
                  </div>
                  <div className="font-headline-sm text-[18px] text-primary font-semibold truncate">
                    {selectedProperty.sqft}
                  </div>
                </div>
                <div>
                  <div className="font-label-uppercase text-[10px] text-secondary">
                    PLOT SIZE
                  </div>
                  <div className="font-headline-sm text-[18px] text-primary font-semibold truncate">
                    {selectedProperty.lotSize}
                  </div>
                </div>
                <div>
                  <div className="font-label-uppercase text-[10px] text-secondary">
                    LISTED BY
                  </div>
                  <div className="font-label-md text-label-md text-primary font-semibold truncate">
                    {BUSINESS_INFO.shortName}
                  </div>
                </div>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {selectedProperty.description}
              </p>

              <div>
                <h4 className="font-label-uppercase text-label-uppercase text-secondary mb-3">
                  PROPERTY HIGHLIGHTS &amp; FEATURES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProperty.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2.5 font-body-sm text-body-sm text-on-surface"
                    >
                      <span className="material-symbols-outlined text-secondary text-[18px]">
                        verified
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-variant">
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(selectedProperty.id, e)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-surface-container text-on-surface hover:bg-surface-variant font-label-md text-label-md transition-colors cursor-pointer"
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      favorites.includes(selectedProperty.id)
                        ? 'text-error'
                        : 'text-on-surface'
                    }`}
                    style={{
                      fontVariationSettings: favorites.includes(
                        selectedProperty.id
                      )
                        ? "'FILL' 1"
                        : "'FILL' 0",
                    }}
                  >
                    favorite
                  </span>
                  <span>
                    {favorites.includes(selectedProperty.id)
                      ? 'Saved to Shortlist'
                      : 'Save to Shortlist'}
                  </span>
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-variant transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      call
                    </span>
                    <span>{BUSINESS_INFO.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedProperty.title;
                      setSelectedProperty(null);
                      openBookingModal(`Site Visit: ${title}`);
                    }}
                    className="inline-flex items-center gap-3 bg-primary-container hover:bg-primary text-on-primary font-label-uppercase text-label-uppercase px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer"
                  >
                    <span className="tracking-widest">Schedule Site Visit</span>
                    <span className="material-symbols-outlined text-[18px] text-secondary-container">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRIVATE VIEWING / CONSULTATION MODAL */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setBookingModalOpen(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-[28px] max-w-lg w-full p-6 md:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close consultation modal"
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>

            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-secondary text-sm">✦</span>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest">
                {BUSINESS_INFO.name.toUpperCase()}
              </span>
            </div>
            <h3 className="font-headline-md text-headline-sm md:text-headline-md text-primary mb-2">
              {bookingPropertyTitle}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
              Office: {BUSINESS_INFO.address} ({BUSINESS_INFO.plusCode}) · Tel:{' '}
              {BUSINESS_INFO.phone}
            </p>

            {bookingSubmitted ? (
              <div className="p-6 rounded-2xl bg-surface-container-low text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-container text-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    verified
                  </span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary">
                  Appointment Request Confirmed
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Thank you, <span className="font-semibold">{clientName}</span>
                  . Our team at {BUSINESS_INFO.name} will contact you at{' '}
                  <span className="font-semibold">{clientEmail}</span> or via
                  phone to confirm your visit in Amin Town, Faisalabad.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="mt-2 bg-primary-container text-on-primary font-label-uppercase text-label-uppercase px-6 py-3 rounded-full hover:bg-primary transition-colors cursor-pointer"
                >
                  Return to Listings
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleBookingSubmit}
                className="flex flex-col gap-4"
              >
                {bookingError && (
                  <div className="p-3 rounded-xl bg-error-container text-on-error-container font-body-sm text-body-sm">
                    {bookingError}
                  </div>
                )}
                <div>
                  <label className="font-label-uppercase text-[11px] text-secondary block mb-1">
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Muhammad Usman"
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-uppercase text-[11px] text-secondary block mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40"
                    />
                  </div>
                  <div>
                    <label className="font-label-uppercase text-[11px] text-secondary block mb-1">
                      PHONE / WHATSAPP
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-label-uppercase text-[11px] text-secondary block mb-1">
                    PREFERRED VISIT DATE
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                </div>
                <div>
                  <label className="font-label-uppercase text-[11px] text-secondary block mb-1">
                    PROPERTY REQUIREMENTS (BUY / SELL / RENT)
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    placeholder="Specify plot size (5 Marla, 10 Marla, 1 Kanal), preferred block in Amin Town, or budget..."
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-uppercase text-label-uppercase py-4 px-6 rounded-full shadow-lg transition-all cursor-pointer mt-2"
                >
                  <span className="tracking-widest">Confirm Appointment</span>
                  <span className="material-symbols-outlined text-[18px] text-secondary-container">
                    arrow_forward
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SAVED COLLECTION DRAWER */}
      {favoritesDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex justify-end"
          onClick={() => setFavoritesDrawerOpen(false)}
        >
          <div
            className="bg-surface-container-lowest w-full max-w-md h-full p-6 md:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-surface-variant">
                <div>
                  <span className="font-label-uppercase text-[11px] text-secondary tracking-widest">
                    {BUSINESS_INFO.shortName.toUpperCase()} SHORTLIST
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary">
                    Saved Properties ({favoritedProperties.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setFavoritesDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-variant cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              </div>

              {favoritedProperties.length === 0 ? (
                <div className="py-16 text-center">
                  <span className="material-symbols-outlined text-[40px] text-secondary/50 mb-3">
                    favorite
                  </span>
                  <p className="font-headline-sm text-[20px] text-on-surface mb-2">
                    No Saved Properties Yet
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Click the heart icon on any Faisalabad listing to save it
                    for an in-person tour with {BUSINESS_INFO.name}.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 py-6">
                  {favoritedProperties.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setFavoritesDrawerOpen(false);
                        setSelectedProperty(item);
                      }}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-20 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-label-md text-label-md text-primary font-semibold truncate">
                          {item.title}
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
                          {item.location}
                        </div>
                        <div className="font-label-md text-label-md text-secondary font-semibold mt-0.5">
                          {item.priceDisplay}
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove from saved"
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="w-8 h-8 rounded-full hover:bg-surface flex items-center justify-center text-error cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-surface-variant">
              <button
                type="button"
                onClick={() => {
                  setFavoritesDrawerOpen(false);
                  openBookingModal(
                    favoritedProperties.length > 0
                      ? `Site Visit (${favoritedProperties.length} Saved Properties)`
                      : 'Amin Town Office Consultation'
                  );
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-uppercase text-label-uppercase py-4 px-6 rounded-full shadow-lg transition-all cursor-pointer"
              >
                <span className="tracking-widest">Book Site Visit</span>
                <span className="material-symbols-outlined text-[18px] text-secondary-container">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
