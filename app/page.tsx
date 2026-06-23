import Link from "next/link";
import {
  ListChecks,
  Database,
  Calculator,
  Code2,
  Trophy,
  MessageSquareQuote,
  ArrowRight,
  Sparkles,
  Star,
  Quote,
  GraduationCap,
  Building2,
  Users,
  Award,
  BadgeCheck,
  Rocket,
  Play,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { GlassCard } from "@/components/ui";
import Faq from "@/components/Faq";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/lib/data";
import { LinkedInIcon, YouTubeIcon, InstagramIcon } from "@/components/BrandIcons";

const features = [
  {
    href: "/sheet",
    icon: ListChecks,
    title: "DSA Sheets",
    desc: "The curated SWE Sheet and a focused Last-Minute 100 for revision day.",
    tag: "Pattern-first",
  },
  {
    href: "/sql",
    icon: Database,
    title: "SQL Queries",
    desc: "Problem, best approach and the clean query — side by side.",
    tag: "Window funcs",
  },
  {
    href: "/aptitude",
    icon: Calculator,
    title: "Aptitude",
    desc: "Crisp topic theory plus MCQ practice to sharpen your speed.",
    tag: "MCQ drills",
  },
  {
    href: "/practice",
    icon: Code2,
    title: "DSA Practice",
    desc: "A LeetCode-style arena with editor, timer, results and discussion.",
    tag: "Monaco editor",
  },
  {
    href: "/contest",
    icon: Trophy,
    title: "Contests",
    desc: "Timed rounds, a live leaderboard and zero distractions.",
    tag: "Live ranks",
  },
  {
    href: "/interview",
    icon: MessageSquareQuote,
    title: "Interview Stories",
    desc: "Real experiences from real candidates — wins and lessons.",
    tag: "Community",
  },
];

const stats = [
  ["50k+", "Learners mentored"],
  ["1,200+", "Curated problems"],
  ["500+", "Placed at top firms"],
  ["180+", "Contests hosted"],
];

const reviews = [
  {
    name: "Priya Sharma",
    role: "SDE-1 @ Amazon",
    college: "NIT Bhopal",
    photo: "/students/priya-sharma.jpg",
    text: "The pattern-first sheet completely changed how I see problems. I stopped memorising and started recognising shapes — cleared Amazon's loop in my first attempt.",
  },
  {
    name: "Rahul Verma",
    role: "Software Engineer @ Walmart",
    college: "PSIT Kanpur",
    photo: "/students/rahul-verma.jpg",
    text: "Coming from a tier-3 college with zero coding culture, RisingBrain was my roadmap. The Last-Minute 100 saved me the night before my final round.",
  },
  {
    name: "Sneha Iyer",
    role: "SDE @ Microsoft",
    college: "VIT Vellore",
    photo: "/students/sneha-iyer.jpg",
    text: "Anjali's explanations are gold. The contests built my speed and the interview stories told me exactly what to expect. Worth every hour.",
  },
  {
    name: "Aditya Kulkarni",
    role: "SDE @ Atlassian",
    college: "COEP Pune",
    photo: "/students/aditya-kulkarni.jpg",
    text: "I'd grinded random LeetCode for months with no structure. Two months on RisingBrain's 28 patterns and everything finally clicked.",
  },
  {
    name: "Megha Nair",
    role: "Backend Engineer @ Flipkart",
    college: "CUSAT Kochi",
    photo: "/students/megha-nair.jpg",
    text: "The SQL section is criminally underrated — problem, approach and clean query side by side. I aced the data round because of it.",
  },
  {
    name: "Karan Mehta",
    role: "Analyst @ Goldman Sachs",
    college: "DTU Delhi",
    photo: "/students/karan-mehta.jpg",
    text: "Aptitude drills + DSA arena in one place meant I never tab-hopped across 5 sites. Consistency got me the offer.",
  },
];

const universities = [
  {
    name: "Dr. Ramesh Pillai",
    role: "Training & Placement Officer",
    org: "RGPV-affiliated Engineering College, Bhopal",
    text: "RisingBrain ran a 6-week placement bootcamp for our 2025 batch. Aptitude, DSA and mock interviews — all mapped per batch. Our product-company conversions doubled year over year.",
    metric: "2× offers",
  },
  {
    name: "Prof. Anita Deshmukh",
    role: "Head, Career Development Cell",
    org: "Autonomous Institute, Pune",
    text: "The TPO dashboard with batch analytics was a game-changer for us. We could see exactly where students lagged and intervene. Highly structured and accountable.",
    metric: "400+ trained",
  },
  {
    name: "Sandeep Rao",
    role: "Corporate Relations Lead",
    org: "Deemed University, Bengaluru",
    text: "Anjali and her team understand what product-based companies actually test. The live contest series before placement season kept students sharp and motivated.",
    metric: "92% participation",
  },
];

const companies = [
  "Amazon",
  "Microsoft",
  "Walmart",
  "Morgan Stanley",
  "Goldman Sachs",
  "Atlassian",
  "Flipkart",
  "Adobe",
  "Uber",
  "Salesforce",
  "PayPal",
  "Swiggy",
  "Razorpay",
  "Nagarro",
  "Cisco",
  "Google",
];

const alumni = [
  { name: "Priya Sharma", company: "Amazon", ctc: "₹44 LPA", photo: "/students/priya-sharma.jpg" },
  { name: "Rahul Verma", company: "Walmart", ctc: "₹38 LPA", photo: "/students/rahul-verma.jpg" },
  { name: "Sneha Iyer", company: "Microsoft", ctc: "₹51 LPA", photo: "/students/sneha-iyer.jpg" },
  { name: "Aditya Kulkarni", company: "Atlassian", ctc: "₹48 LPA", photo: "/students/aditya-kulkarni.jpg" },
  { name: "Megha Nair", company: "Flipkart", ctc: "₹32 LPA", photo: "/students/megha-nair.jpg" },
  { name: "Karan Mehta", company: "Goldman Sachs", ctc: "₹40 LPA", photo: "/students/karan-mehta.jpg" },
];

const socials = [
  {
    label: "LinkedIn",
    handle: "150k+ followers",
    href: "https://www.linkedin.com/in/anjalikumari22/",
    Icon: LinkedInIcon,
    accent: "from-[#0a66c2]/30 to-[#0a66c2]/5 text-[#7cb8f0]",
  },
  {
    label: "YouTube",
    handle: "RisingBrain · 20k+ subs",
    href: "https://www.youtube.com/@rbanjalikumari",
    Icon: YouTubeIcon,
    accent: "from-[#ff0000]/30 to-[#ff0000]/5 text-[#ff8a8a]",
  },
  {
    label: "Instagram",
    handle: "@rbanjali.codes",
    href: "https://www.instagram.com/rbanjali.codes/",
    Icon: InstagramIcon,
    accent: "from-[#e1306c]/30 to-[#e1306c]/5 text-[#f29ab8]",
  },
];

const featuredCourses = courses.slice(0, 3);

const avatarPalettes = [
  "from-rb-green-500 to-rb-green-700",
  "from-teal-400 to-emerald-700",
  "from-emerald-400 to-green-700",
  "from-green-500 to-teal-800",
  "from-lime-500 to-emerald-700",
  "from-emerald-500 to-teal-600",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function avatarPalette(name: string) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return avatarPalettes[sum % avatarPalettes.length];
}

/**
 * Branded initials avatar. To use a real (consented) student photo instead,
 * drop the image in /public and pass `photo="/students/name.jpg"`.
 */
function Avatar({
  name,
  photo,
  className = "h-12 w-12 text-sm",
}: {
  name: string;
  photo?: string;
  className?: string;
}) {
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        className={`${className} shrink-0 rounded-full object-cover ring-2 ring-rb-green-500/30`}
      />
    );
  }
  return (
    <div
      className={`${className} grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${avatarPalette(
        name
      )} font-bold text-black ring-2 ring-rb-green-500/30`}
      aria-label={name}
    >
      {initials(name)}
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-rb-green-300">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[var(--app-max)] px-4 sm:px-6 lg:px-10">
      {/* Hero */}
      <section className="relative py-16 text-center sm:py-24">
        <span className="glass-pill animate-in mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-rb-green-300">
          <Sparkles className="h-4 w-4" />
          Founded by Anjali Kumari · ex-Walmart &amp; Morgan Stanley
        </span>
        <h1 className="animate-in mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Crack your dream{" "}
          <span className="text-gradient">product company</span>
          <br />
          from any college.
        </h1>
        <p className="animate-in mx-auto mt-6 max-w-2xl text-lg text-white/60">
          RisingBrain is the founder-led, pattern-first placement platform that
          took students from tier-2 &amp; tier-3 colleges to Amazon, Microsoft,
          Walmart and beyond — with curated sheets, a real coding arena, live
          contests and mentorship, all in one place.
        </p>
        <div className="animate-in mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sheet"
            className="btn-glow inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-black"
          >
            Start learning free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/courses"
            className="glass glass-hover inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
          >
            <BookOpen className="h-4 w-4" /> Browse courses
          </Link>
          <a
            href="https://www.youtube.com/@rbanjalikumari"
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
          >
            <YouTubeIcon className="h-4 w-4 text-[#ff6b6b]" /> Watch on YouTube
          </a>
        </div>

        {/* Social proof */}
        <div className="animate-in mt-12 flex flex-col items-center gap-3">
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {reviews.slice(0, 5).map((r) => (
                <Avatar
                  key={r.name}
                  name={r.name}
                  photo={r.photo}
                  className="h-10 w-10 border-2 border-[#0d1110] text-xs"
                />
              ))}
            </div>
            <span className="glass-pill ml-3 rounded-full px-3 py-1.5 text-xs font-semibold text-rb-green-300">
              +50k learners
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Stars />
            <span>
              Rated <strong className="text-white/85">4.9/5</strong> · placed at
              Amazon, Microsoft, Walmart &amp; more
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(([num, label]) => (
          <GlassCard key={label} className="px-5 py-6 text-center">
            <div className="text-2xl font-bold text-rb-green-300 sm:text-3xl">
              {num}
            </div>
            <div className="mt-1 text-xs text-white/55 sm:text-sm">{label}</div>
          </GlassCard>
        ))}
      </section>

      {/* Feature grid */}
      <section className="py-16">
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
          Everything in <span className="text-gradient">one place</span>
        </h2>
        <p className="mb-8 text-white/55">
          Six tightly-built sections, one consistent glass theme.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.href} href={f.href}>
              <GlassCard hover className="h-full p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rb-green-500/15 text-rb-green-300">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <span className="glass-pill rounded-full px-2.5 py-1 text-xs text-white/60">
                    {f.tag}
                  </span>
                </div>
                <h3 className="mb-1.5 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-white/55">{f.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rb-green-300">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section id="courses" className="py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rb-green-300">
              <BookOpen className="h-4 w-4" />
              Courses
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Founder-led <span className="text-gradient">courses</span>
            </h2>
            <p className="mt-2 max-w-xl text-white/55">
              Structured, placement-focused tracks — from DSA patterns to system
              design — taught by Anjali and the RisingBrain team.
            </p>
          </div>
          <Link
            href="/courses"
            className="glass glass-hover inline-flex shrink-0 items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold"
          >
            View all courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      {/* Student reviews */}
      <section id="reviews" className="py-16">
        <div className="mb-8 text-center">
          <span className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rb-green-300">
            <span className="h-1.5 w-1.5 rounded-full bg-rb-green-400 pulse-ring" />
            Loved by learners
          </span>
          <h2 className="text-2xl font-bold sm:text-3xl">
            What our <span className="text-gradient">students say</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/55">
            Real stories from learners who turned consistent practice into
            product-company offers.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <GlassCard key={r.name} hover className="flex h-full flex-col p-6">
              <Quote className="h-7 w-7 text-rb-green-500/40" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                “{r.text}”
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <Avatar name={r.name} photo={r.photo} />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{r.name}</div>
                  <div className="truncate text-xs text-rb-green-300">
                    {r.role}
                  </div>
                  <div className="truncate text-xs text-white/45">
                    {r.college}
                  </div>
                </div>
                <div className="ml-auto self-start">
                  <Stars />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* University / placement training testimonials */}
      <section id="universities" className="py-16">
        <div className="mb-8 text-center">
          <span className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rb-green-300">
            <GraduationCap className="h-4 w-4" />
            Campus training programs
          </span>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Trusted by <span className="text-gradient">universities</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/55">
            We run structured placement bootcamps with TPO dashboards. Here&apos;s
            what training &amp; placement teams tell us.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {universities.map((u) => (
            <GlassCard key={u.name} className="flex h-full flex-col p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rb-green-500/15 text-rb-green-300">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <span className="glass-pill rounded-full px-3 py-1 text-xs font-semibold text-rb-green-300">
                  {u.metric}
                </span>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-white/70">
                “{u.text}”
              </p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="text-sm font-semibold">{u.name}</div>
                <div className="text-xs text-rb-green-300">{u.role}</div>
                <div className="text-xs text-white/45">{u.org}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Alumni / placements */}
      <section id="alumni" className="py-16">
        <div className="mb-8 text-center">
          <span className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rb-green-300">
            <Award className="h-4 w-4" />
            Alumni network
          </span>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Our alumni are <span className="text-gradient">hired here</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/55">
            From tier-2 and tier-3 colleges to the world&apos;s top product
            companies.
          </p>
        </div>

        {/* Company wall */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {companies.map((c) => (
            <span
              key={c}
              className="glass-pill inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/75"
            >
              <Building2 className="h-4 w-4 text-rb-green-300" />
              {c}
            </span>
          ))}
        </div>

        {/* Featured alumni */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {alumni.map((a) => (
            <GlassCard
              key={a.name}
              hover
              className="flex items-center gap-4 p-5"
            >
              <Avatar name={a.name} photo={a.photo} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 truncate text-sm font-semibold">
                  {a.name}
                  <BadgeCheck className="h-4 w-4 shrink-0 text-rb-green-400" />
                </div>
                <div className="truncate text-xs text-white/55">
                  Placed at{" "}
                  <span className="text-rb-green-300">{a.company}</span>
                </div>
              </div>
              <span className="glass-pill shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold text-rb-green-300">
                {a.ctc}
              </span>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Founder — Anjali Kumari */}
      <section id="founder" className="py-16">
        <GlassCard className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Portrait / brand panel */}
            <div className="relative flex flex-col items-center justify-center gap-5 bg-rb-green-900/25 p-10 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/team/anjali-kumari.jpg"
                alt="Anjali Kumari, Founder & CEO of RisingBrain"
                className="h-32 w-32 rounded-full object-cover object-top shadow-[0_10px_40px_rgba(0,0,0,0.45)] ring-4 ring-rb-green-500/30"
              />
              <div>
                <div className="text-xl font-bold">Anjali Kumari</div>
                <div className="text-sm text-rb-green-300">
                  Founder &amp; CEO, RisingBrain
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-white/60">
                <span className="glass-pill rounded-full px-3 py-1">
                  ex-Walmart
                </span>
                <span className="glass-pill rounded-full px-3 py-1">
                  ex-Morgan Stanley
                </span>
                <span className="glass-pill rounded-full px-3 py-1">
                  ex-Nagarro
                </span>
              </div>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="glass-pill grid h-10 w-10 place-items-center rounded-xl text-white/70 transition-colors hover:text-rb-green-300"
                  >
                    <s.Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="p-8 sm:p-10">
              <span className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rb-green-300">
                <Sparkles className="h-3.5 w-3.5" />
                Meet the founder
              </span>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Built by someone who{" "}
                <span className="text-gradient">walked the path</span>
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
                <p>
                  Anjali Kumari is a software engineer turned educator who has
                  worked at <strong className="text-white/85">Walmart
                  Global Tech</strong>, <strong className="text-white/85">Morgan
                  Stanley</strong> and Nagarro. An ECE graduate from PSIT
                  Kanpur, she broke into product companies from a non-CS,
                  non-metro background — and built RisingBrain so the next
                  generation wouldn&apos;t have to figure it out alone.
                </p>
                <p>
                  Through her <strong className="text-white/85">30-Day DSA
                  Challenge</strong> and daily breakdowns, she has mentored{" "}
                  <strong className="text-white/85">100+ engineers 1:1</strong>{" "}
                  and reached a community of{" "}
                  <strong className="text-white/85">150k+</strong> learners
                  across LinkedIn, YouTube and Instagram. Her mission is simple:
                  give students with no coding environment in college a
                  structured, honest path to top tech jobs.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  [Users, "100+", "Mentored 1:1"],
                  [Rocket, "150k+", "Community"],
                  [Award, "Top tech", "Placements"],
                ].map(([Icon, num, label]) => {
                  const I = Icon as typeof Users;
                  return (
                    <div
                      key={label as string}
                      className="glass-pill rounded-2xl px-3 py-3 text-center"
                    >
                      <I className="mx-auto h-4 w-4 text-rb-green-300" />
                      <div className="mt-1 text-base font-bold">
                        {num as string}
                      </div>
                      <div className="text-[11px] text-white/50">
                        {label as string}
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                href="https://www.linkedin.com/in/anjalikumari22/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow mt-6 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-black"
              >
                Connect with Anjali <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Platform intro / join the community */}
      <section id="community" className="py-16">
        <div className="mb-8 text-center">
          <span className="glass-pill mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-rb-green-300">
            <Play className="h-4 w-4" />
            Join the family
          </span>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Learn with the{" "}
            <span className="text-gradient">RisingBrain community</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/55">
            Free daily DSA breakdowns, placement strategy and a community that
            keeps you accountable. Pick your platform and follow along.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard hover className="h-full p-6">
                <div
                  className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${s.accent}`}
                >
                  <s.Icon className="h-6 w-6" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{s.label}</h3>
                  <ExternalLink className="h-4 w-4 text-white/40" />
                </div>
                <p className="mt-1 text-sm text-white/55">{s.handle}</p>
              </GlassCard>
            </a>
          ))}
        </div>

        {/* CTA banner */}
        <GlassCard className="mt-8 flex flex-col items-center justify-between gap-4 p-8 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-bold">
              Ready to start your placement journey?
            </h3>
            <p className="mt-1 text-sm text-white/55">
              Begin with the curated sheet — free, forever. No card, no catch.
            </p>
          </div>
          <Link
            href="/sheet"
            className="btn-glow inline-flex shrink-0 items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-black"
          >
            Start learning free <ArrowRight className="h-4 w-4" />
          </Link>
        </GlassCard>
      </section>

      {/* FAQ */}
      <Faq />
    </div>
  );
}
