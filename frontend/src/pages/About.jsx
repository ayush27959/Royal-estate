// Hey man, quick heads up—I fixed a tiny typo I noticed in the original code 
// on line 66 (there was a stray random character inside the className string 
// "bg-gradient-to-r流"). It's all clean and ready to rock now! 👍

import {
  FaBuilding,
  FaHandshake,
  FaHome,
  FaSearchLocation,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import Footer from "../components/Footer";

const features = [
  {
    icon: <FaHome />,
    title: "Smart Property Listings",
    desc: "Explore premium properties with clear pricing, rich details, and useful discovery tools.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    borderHover: "hover:border-amber-500/40",
  },
  {
    icon: <FaSearchLocation />,
    title: "Easy Property Search",
    desc: "Filter by location, property type, pricing, amenities, and availability.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    borderHover: "hover:border-sky-500/40",
  },
  {
    icon: <FaBuilding />,
    title: "Buy / Sell / Rent",
    desc: "List properties for sale or rent and connect directly with interested clients.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    borderHover: "hover:border-indigo-500/40",
  },
  {
    icon: <FaHandshake />,
    title: "Trusted Experience",
    desc: "A focused platform designed to build confidence between buyers, renters, and sellers.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    borderHover: "hover:border-orange-500/40",
  },
  {
    icon: <FaUsers />,
    title: "User Friendly",
    desc: "Clean navigation, readable information, and smooth workflows across devices.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    borderHover: "hover:border-rose-500/40",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Platform",
    desc: "Authentication, protected routes, and account controls help keep listings safe.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    borderHover: "hover:border-emerald-500/40",
  },
];

const About = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50 selection:bg-amber-500 selection:text-black">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-20 pt-36 sm:px-6 lg:pt-44">
        {/* Decorative subtle background glows */}
        <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px] dark:bg-amber-500/5" />
        <div className="absolute top-20 right-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5" />

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                Who We Are
              </span>

              <h1 className="mt-6 font-sans text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl xl:text-7xl">
                Redefining the <br />
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  Real Estate
                </span> Experience.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-zinc-400">
                RealEstate is a modern ecosystem built to eliminate the complexity of buying, selling, or renting properties. We align transparency with high-end tech to offer a swift, secure transaction layer for everyone.
              </p>
            </div>

            {/* Quick Stats Panel */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-5">
              {[
                { label: "Secured Listings", value: "10K+" },
                { label: "Happy Clients", value: "4.8★" },
                { label: "Verified Brokers", value: "350+" },
                { label: "Search Fields", value: "25+" },
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-slate-200/60 bg-white/50 p-6 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  <p className="text-3xl font-bold text-slate-900 dark:text-amber-400">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section (Mission / Why Us) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
            <div className="absolute top-0 right-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-amber-500/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber-500">01 / Purpose</h2>
            <h3 className="mt-4 text-3xl font-bold tracking-tight">Our Mission</h3>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-zinc-400">
              Make real estate simple, transparent, and accessible for everyone. Whether you are searching for a dream home, rental property, or planning to sell, RealEstate gives you the tools to move confidently.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
            <div className="absolute top-0 right-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-indigo-500/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-500">02 / Edge</h2>
            <h3 className="mt-4 text-3xl font-bold tracking-tight">Why Choose Us?</h3>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-zinc-400">
              We focus on trusted listings, secure communication, easy property management, and a smooth browsing experience that helps users make better, data-driven property decisions without the traditional friction.
            </p>
          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          
          <div className="mb-14 md:flex md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                What We Offer
              </p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Engineered for Excellence
              </h2>
            </div>
            <p className="mt-4 max-w-sm text-slate-500 dark:text-zinc-400 md:mt-0">
              Everything you need to effortlessly discover, inspect, map, and claim your next space.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 ${feature.borderHover}`}
              >
                {/* Accent Background Highlight */}
                <div className={`absolute -inset-px opacity-0 duration-300 group-hover:opacity-100 dark:group-hover:bg-gradient-to-br dark:from-white/5 dark:to-transparent -z-10 rounded-2xl`} />

                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-medium transition-transform duration-300 group-hover:scale-110 ${feature.bg} ${feature.color}`}>
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;