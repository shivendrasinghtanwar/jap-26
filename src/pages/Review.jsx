import './review.css'
import { useState } from 'react'

const QUESTIONS = [
  'Does the flight land in Tokyo on Fri Dec 18 or Sat Dec 19? Departure is Dec 18 from India — if the flight is overnight, every date shifts a day, re-breaking Osaka Castle (keep closed from Dec 28) and putting the Day 13 train on Dec 31. Nothing else matters until this is confirmed.',
  'Day 3 (Sun Dec 20): the DisneySea transfer and ticket are both marked excluded — what exactly is included that day, what is the transfer alternative, and who buys the dated tickets? A Sunday inside the Christmas event sells out about two months ahead at the top ¥12,400 tier.',
  'Day 11 (Mon Dec 28): the USJ ticket is package-included — who makes the dated reservation, and when? New-Year-week dates sit at the top of USJ’s dynamic pricing and Express Passes sell out weeks ahead.',
  'Four hotels are unnamed (Tokyo, Kawaguchiko, Toyama, Kyoto). Which properties, and what category? Only Hotel Granvia Osaka is named.',
  'Day 6: what Kawaguchiko-to-Toyama routing did you actually price? There is no direct route — realistic is bus to Shinjuku, then Hokuriku Shinkansen from Tokyo, arriving ~14:30-15:00. And what is the luggage plan — is takkyubin forwarding included?',
  'Day 2 sumo (Sat Dec 19): is this a stable morning-practice visit or the staged Asakusa sumo show, and at which venue?',
  'Day 7: the kimono must be back by 17:45 but Kiyomizu-dera and Sannenzaka only start at 16:15 — does that timing work, and where is the rental shop?',
  'Day 13: will you reserve the Dec 30 Shin-Osaka to Tokyo Shinkansen seats on Nov 30, the day the 1-month window opens? The Tokaido Nozomi runs all-reserved from Dec 26 and the U-turn rush builds (SmartEX takes foreign cards).',
  'What is the total package price, and can you send a line-item inclusions list (transfers, rail legs, entry fees, meals)?',
  'What are the cancellation and amendment terms if the landing date turns out to be Dec 19 and the whole plan has to shift a day?',
]

const BREAKS = [
  {
    sev: 'Risky',
    day: 'Day 1 — Fri Dec 18',
    what: 'The itinerary starts Dec 18 from India. If the flight is overnight, landing becomes Dec 19 and every date below shifts a day — re-breaking Osaka Castle (keep closed from Dec 28) and putting the Day 13 train on Dec 31.',
    fix: 'Confirm the actual landing date with Jay before anything else. The whole grade rests on it.',
  },
  {
    sev: 'Risky',
    day: 'Day 3 — Sun Dec 20',
    what: 'DisneySea on a Sunday inside the Christmas event — among the heaviest crowd weeks of the year, at the top ¥12,400 ticket tier. Dated, park-specific tickets go on sale exactly two months ahead and popular dates sell out.',
    fix: 'Buy the dated tickets immediately, arrive 07:50 for the 08:30–09:00 open, and budget Premier Access for the headliners.',
  },
  {
    sev: 'Risky',
    day: 'Day 5 — Tue Dec 22',
    what: 'Music Forest Museum has irregular Tue–Thu winter closures, and a Tuesday visit sits squarely in the documented risk pattern. The 2026–27 calendar is unpublished (unverified).',
    fix: 'Verify on the official calendar or call 0555-20-4111 before locking Day 5; fallback is the Itchiku Kubota Museum.',
  },
  {
    sev: 'Risky',
    day: 'Day 6 — Wed Dec 23',
    what: 'The Glass Art Museum is clear — Dec 23 is the fourth Wednesday, outside its 1st/3rd-Wednesday closures. The routing is not: no direct Kawaguchiko–Toyama route exists. Bus to Shinjuku, cross to Tokyo Station, Hokuriku Shinkansen: best-case arrival ~14:30–15:00, not the 12:00 train the plan shows. Holiday traffic on the Chuo Expressway can add an hour.',
    fix: 'Ask Jay for the exact priced routing, start at 08:30, and forward the big bags by takkyubin.',
  },
  {
    sev: 'Risky',
    day: 'Day 10 — Sun Dec 27',
    what: 'Osaka Castle’s main keep closes Dec 28–Jan 1 every year — and Day 10 lands on Dec 27, the last open day. The plan threads the closure by exactly one day; any slip breaks it. Entry is now ¥1,200.',
    fix: 'Protect this date. If the trip slips, see the park and Nishinomaru exterior only, or swap in Harukas 300.',
  },
  {
    sev: 'Watch',
    day: 'Day 8 — Fri Dec 25',
    what: 'Kennin-ji’s possible year-end closure starts Dec 28 (unverified) — Day 8 on Dec 25 is clear unless the dates shift.',
    fix: 'A quick confirmation call settles it; Kodai-ji is the ready swap, five minutes away.',
  },
  {
    sev: 'Watch',
    day: 'Day 11 — Mon Dec 28',
    what: 'USJ on Dec 28 dodges the Dec 31 countdown eviction entirely. What remains: New-Year-week crowds and top-tier dynamic pricing — and the ticket, though package-included, needs its dated reservation made early.',
    fix: 'Have Jay lock the dated reservation now; consider Express Passes before peak dates sell out.',
  },
  {
    sev: 'Watch',
    day: 'Day 13 — Wed Dec 30',
    what: 'The Tokaido Nozomi runs all-reserved from Dec 26 and the U-turn rush builds toward New Year; Dec 30 seats sell out.',
    fix: 'Reserve Shin-Osaka to Tokyo seats on Nov 30, the day the 1-month window opens (SmartEX takes foreign cards).',
  },
  {
    sev: 'Watch',
    day: 'Day 14 — Thu Dec 31',
    what: 'A New Year’s Eve departure, and tax-free rules changed Nov 2026: refunds now happen at airport customs, with queues. The plan allows about two hours at Haneda.',
    fix: 'If any tax-free shopping happens, plan three hours plus.',
  },
]

export default function Review() {
  const [copied, setCopied] = useState(false)

  const copyQuestions = async () => {
    const text = QUESTIONS.map((q, i) => `${i + 1}. ${q}`).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="page review-page">
      <section className="rv-verdict">
        <p className="rv-kicker">The verdict</p>
        <blockquote className="rv-quote">
          The Dec 18&ndash;31 window &mdash; by luck or design &mdash; threads
          every New-Year closure with a single day to spare. One flight detail
          decides whether that luck holds.
        </blockquote>
        <div className="rv-grade-row">
          <span className="rv-grade">B+</span>
          <p className="rv-grade-note">
            B plus, pending one flight detail. The confirmed dates clear the
            USJ countdown, the Jan 1&ndash;3 shutdowns, and &mdash; by exactly
            one day &mdash; the Osaka Castle closure. What remains is
            slip-sensitivity, one unpublished museum calendar, and three
            time-critical bookings: DisneySea tickets now, the USJ dated
            reservation, and the Nov 30 train window.
          </p>
        </div>
      </section>

      <section className="rv-section">
        <h2 className="rv-h">What the plan gets right</h2>
        <ul className="rv-strengths">
          <li>One clean loop &mdash; Tokyo, Fuji, Toyama, Kyoto, Osaka, Tokyo &mdash; with no backtracking until the planned return.</li>
          <li>Two-night bases nearly everywhere: unpack once, not nightly.</li>
          <li>Flying home Dec 31 means the trip exits before the Jan 1&ndash;3 shutdowns and hatsumode crush ever start.</li>
          <li>Kuromon Ichiba on Dec 29 (Day 12) catches the market at its spectacular year-end peak &mdash; the best day of the year to see it.</li>
          <li>Day 13&rsquo;s shrine stop on Dec 30 becomes a quiet pre-New-Year visit, with none of the queues that begin after midnight on Dec 31.</li>
          <li>Breakfast every day, and private transfers exactly where the luggage is heaviest.</li>
          <li>Hotel Granvia Osaka sits inside Osaka Station &mdash; ideal for USJ and the Day 13 Shinkansen.</li>
          <li>The Fuji days are winter-correct: late December has the year&rsquo;s best visibility, and Chureito at 09:00&ndash;11:00 is the right slot.</li>
          <li>Kimono, tea ceremony, and Kiyomizu-dera bundled into one Higashiyama afternoon &mdash; sensible sequencing.</li>
          <li>Honest pacing for a first trip: most days end with a built-in rest block.</li>
        </ul>
      </section>

      <section className="rv-section">
        <h2 className="rv-h">What breaks, and when</h2>
        <ol className="rv-breaks">
          {BREAKS.map((b) => (
            <li key={b.day} className="rv-break">
              <div className="rv-break-head">
                <span className={`rv-sev rv-sev-${b.sev.toLowerCase()}`}>{b.sev}</span>
                <span className="rv-break-day">{b.day}</span>
              </div>
              <p className="rv-break-what">{b.what}</p>
              <p className="rv-break-fix"><b>Fix:</b> {b.fix}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rv-section">
        <div className="rv-q-head">
          <h2 className="rv-h">Questions to send Jay</h2>
          <button className="rv-copy" onClick={copyQuestions} type="button">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <ol className="rv-questions">
          {QUESTIONS.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      </section>

      <section className="rv-section">
        <h2 className="rv-h">If it were ours to tweak</h2>
        <ul className="rv-tweaks">
          <li>Buy the DisneySea dated tickets today &mdash; Sunday Dec 20 is already inside the two-month sales window and exactly the kind of date that sells out.</li>
          <li>Put Nov 30 in the calendar now: SmartEX opens the Dec 30 Shin-Osaka&ndash;Tokyo booking that morning.</li>
          <li>Treat Dec 27 (Osaka Castle) as immovable when sequencing anything else &mdash; it is the last open day before the keep&rsquo;s year-end closure.</li>
          <li>Takkyubin the big bags past Day 6&rsquo;s three-leg transfer (~&yen;2,000&ndash;2,500 per bag) and travel it with daypacks.</li>
          <li>The honest question of taste: one Toyama night buys two sights for roughly 500&nbsp;km of detour. An extra Kyoto night might serve this trip better. Not an error &mdash; a choice worth making deliberately.</li>
        </ul>
      </section>
    </main>
  )
}
