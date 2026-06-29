import { useState } from "react";

import {
  FaEnvelope,
  FaPaperPlane,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = ({ listing }) => {

  const [message, setMessage] =
    useState("");

  return (

    <div className="mt-8">

      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.32)] md:p-8">

        <div className="mb-6">

          <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-semibold mb-3">

            Get In Touch

          </p>

          <h2 className="text-3xl font-bold text-white">

            Contact{" "}

            <span className="text-yellow-500">
              Owner
            </span>

          </h2>

          <p className="text-zinc-400 mt-2">

            Connect directly with the property owner

          </p>

        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/25 p-5">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400">

              <FaEnvelope />

            </div>

            <p className="text-zinc-200 break-all">

              {listing.contactEmail}

            </p>

          </div>

          <div className="border-t border-white/10"></div>

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-green-500/20 p-3 text-green-400">

              <FaPhoneAlt />

            </div>

            <p className="text-zinc-200">

              {listing.contactNumber}

            </p>

          </div>

        </div>

        <div className="mb-6">

          <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-semibold mb-3">

            Your Message

          </p>

          <textarea

            rows="5"

            value={message}

            onChange={(e) =>

              setMessage(
                e.target.value
              )

            }

            placeholder="Hi, I'm interested in this property..."

            className="w-full resize-none rounded-xl border border-white/10 bg-black/25 p-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500"

          />

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <a

            href={`mailto:${listing.contactEmail}?subject=Regarding ${listing.name}&body=${message}`}

            className="flex items-center justify-center gap-3 rounded-xl bg-yellow-500 p-4 font-bold text-black transition duration-300 hover:bg-yellow-400"

          >

            <FaPaperPlane />

            Send Email

          </a>

          <a

            href={`https://wa.me/${listing.contactNumber}?text=${encodeURIComponent(

              message ||

              `Hi, I'm interested in ${listing.name}`

            )}`}

            target="_blank"

            rel="noopener noreferrer"

            className="flex items-center justify-center gap-3 rounded-xl bg-green-600 p-4 font-bold text-white transition duration-300 hover:bg-green-500"

          >

            <FaWhatsapp />

            WhatsApp

          </a>

        </div>

      </div>

    </div>

  );

};

export default Contact;
