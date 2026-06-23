import Link from "next/link";
import { Brain } from "lucide-react";
import {
  LinkedInIcon,
  YouTubeIcon,
  InstagramIcon,
} from "@/components/BrandIcons";

export default function Footer() {
  return (
    <footer className="px-4 pb-6 pt-16">
      <div className="glass mx-auto max-w-[var(--app-max)] rounded-3xl px-6 py-10 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-rb-green-500">
                <Brain className="h-5 w-5 text-black" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-semibold">
                Rising<span className="text-rb-green-400">Brain</span>
              </span>
            </div>
            <p className="max-w-xs text-sm text-white/55">
              Master data structures with curated problem sheets, SQL, aptitude
              and live contests.
            </p>
          </div>

          <FooterCol
            title="Learn"
            links={[
              ["Courses", "/courses"],
              ["DSA Sheets", "/sheet"],
              ["SQL Queries", "/sql"],
              ["Aptitude", "/aptitude"],
              ["Practice", "/practice"],
            ]}
          />
          <FooterCol
            title="Community"
            links={[
              ["Reviews", "/#reviews"],
              ["Universities", "/#universities"],
              ["Alumni", "/#alumni"],
              ["FAQ", "/#faq"],
            ]}
          />
          <FooterCol
            title="RisingBrain"
            links={[
              ["About the founder", "/#founder"],
              ["YouTube", "https://www.youtube.com/@rbanjalikumari"],
              ["LinkedIn", "https://www.linkedin.com/in/anjalikumari22/"],
              ["Instagram", "https://www.instagram.com/rbanjali.codes/"],
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} RisingBrain. Built for learners. UI demo.
          </p>
          <div className="flex items-center gap-3">
            {[
              {
                Icon: LinkedInIcon,
                href: "https://www.linkedin.com/in/anjalikumari22/",
                label: "LinkedIn",
              },
              {
                Icon: YouTubeIcon,
                href: "https://www.youtube.com/@rbanjalikumari",
                label: "YouTube",
              },
              {
                Icon: InstagramIcon,
                href: "https://www.instagram.com/rbanjali.codes/",
                label: "Instagram",
              },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass-pill grid h-9 w-9 place-items-center rounded-xl text-white/60 transition-colors hover:text-rb-green-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-white">{title}</h4>
      <ul className="space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-white/55 transition-colors hover:text-rb-green-300"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
