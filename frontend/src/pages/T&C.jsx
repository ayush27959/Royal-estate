import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const termsSections = [
  {
    title: "Use of the Platform",
    body:
      "RoyalEstate helps users browse, create, update, and manage real estate listings. You agree to use the platform only for lawful property-related activity and to provide accurate information.",
  },
  {
    title: "Account Responsibility",
    body:
      "You are responsible for keeping your login details secure. Any activity performed from your account may be treated as your responsibility unless you report unauthorized access promptly.",
  },
  {
    title: "Listings and Content",
    body:
      "Property details, images, prices, and availability should be correct and updated by the listing owner. RoyalEstate may remove content that appears misleading, unsafe, or inappropriate.",
  },
  {
    title: "Communication",
    body:
      "Users may receive account, login, signup, listing, or inquiry-related communication by email. These messages help keep the platform secure and useful.",
  },
  {
    title: "Limitation of Liability",
    body:
      "RoyalEstate provides a technology platform for property discovery. Users should independently verify property ownership, pricing, documents, and legal details before making decisions.",
  },
];

const privacySections = [
  {
    title: "Information We Collect",
    body:
      "We may collect account details such as name, email, avatar, listings, saved properties, and activity needed to provide core platform features.",
  },
  {
    title: "How We Use Data",
    body:
      "Your data is used for authentication, listing management, favorites, profile updates, account notifications, and improving the browsing experience.",
  },
  {
    title: "Email Notifications",
    body:
      "When you sign up, sign in, or use selected platform features, RoyalEstate may send helpful service emails to your registered email address.",
  },
  {
    title: "Cookies and Authentication",
    body:
      "RoyalEstate uses secure authentication cookies to keep users signed in and protect private routes such as profile, create listing, and update listing pages.",
  },
  {
    title: "Data Control",
    body:
      "You can update your profile details, delete your account, and manage your saved listings from your account area.",
  },
];

const legalContent = {
  terms: {
    eyebrow: "Terms",
    title: "Terms & Conditions",
    description:
      "Please read these terms before using RoyalEstate to browse, save, or list properties.",
    sections: termsSections,
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    description:
      "This policy explains how RoyalEstate handles account, listing, and activity data.",
    sections: privacySections,
  },
};

const LegalPage = () => {
  const location = useLocation();
  const pageType =
    location.pathname === "/privacy"
      ? "privacy"
      : "terms";

  const content =
    legalContent[pageType];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-yellow-500/10 px-4 pb-16 pt-32 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
            {content.eyebrow}
          </p>

          <h1 className="mb-6 font-serif text-5xl font-black leading-tight md:text-7xl">
            {content.title}
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-zinc-400">
            {content.description}
          </p>

          <p className="mt-5 text-sm text-zinc-500">
            Last updated: May 12, 2026
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:px-6">
        {content.sections.map((section, index) => (
          <article
            key={section.title}
            className="rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.25)] transition hover:border-yellow-500/30 md:p-8"
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-sm font-black text-black">
                {index + 1}
              </span>

              <h2 className="text-2xl font-bold">
                {section.title}
              </h2>
            </div>

            <p className="leading-8 text-zinc-400">
              {section.body}
            </p>
          </article>
        ))}
      </section>

      <section className="border-y border-white/10 px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Need more information?
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Explore our platform details or browse available listings.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/about"
              className="rounded-xl border border-yellow-500/40 px-5 py-3 text-sm font-bold text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              About Us
            </Link>
            <Link
              to="/search"
              className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-400"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LegalPage;
