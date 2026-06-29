import { memo } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Browse Listings", path: "/search" },
    { label: "About Us", path: "/about" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
  ];

  const resources = [
    { label: "Buying Guide", href: "#" },
    { label: "Selling Tips", href: "#" },
    { label: "Investment Guide", href: "#" },
    { label: "Market Trends", href: "#" },
    { label: "Blog", href: "#" },
  ];

  const socialLinks = [
    { icon: FaTwitter, href: "https://x.com/Shivam6473", label: "Twitter" },
   
  ];

  const contactInfo = [
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91 7079919291",
      href: "tel:+919399898248",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "ayushkumar27959@gmail.com",
      href: "mailto:contact@royalestate.com",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "India",
      href: "#",
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-18">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 font-black text-black shadow-[0_14px_35px_rgba(234,179,8,0.18)]">
                RE
              </div>
              <div>
                <h2 className="font-serif text-3xl font-black tracking-tight">
                  <span className="text-yellow-500">Royal</span>
                  <span className="text-white">Estate</span>
                </h2>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  Premium Living
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-7 text-zinc-400">
              Your trusted partner for finding, comparing, and managing premium
              properties across India's real estate market.
            </p>

            <form className="mt-6 flex max-w-sm items-center gap-2 rounded-xl border border-white/10 bg-zinc-950 p-2 transition focus-within:border-yellow-500/50">
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white placeholder:text-zinc-600"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-500 text-black transition hover:bg-yellow-400"
              >
                <FaArrowRight size={14} />
              </button>
            </form>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-yellow-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-yellow-500"
                  >
                    <span className="h-px w-4 bg-zinc-700 transition group-hover:bg-yellow-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-yellow-500">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.label}>
                  <a
                    href={resource.href}
                    className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-yellow-500"
                  >
                    <span className="h-px w-4 bg-zinc-700 transition group-hover:bg-yellow-500" />
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-yellow-500">
              Get In Touch
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex gap-3 rounded-xl border border-white/5 bg-zinc-950 p-3 transition hover:border-yellow-500/30"
                >
                  <info.icon className="mt-1 shrink-0 text-yellow-500" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      {info.label}
                    </p>
                    <p className="mt-1 break-all text-sm text-zinc-300">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-white/10" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-zinc-500">
              &copy; {currentYear} RoyalEstate. All rights reserved.
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              Made in India for better property discovery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-950 text-zinc-400 transition hover:border-yellow-500/40 hover:bg-yellow-500 hover:text-black"
              >
                <social.icon size={15} />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm">
            <Link to="/terms" className="text-zinc-500 transition hover:text-yellow-500">
              Terms
            </Link>
            <Link to="/privacy" className="text-zinc-500 transition hover:text-yellow-500">
              Privacy
            </Link>
            <a href="#" className="text-zinc-500 transition hover:text-yellow-500">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
