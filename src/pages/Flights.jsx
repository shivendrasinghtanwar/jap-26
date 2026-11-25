import './flights.css'

/* The flight is TICKETED — booked 24 Nov 2026 on Goibibo (ICICI ····4004),
   PNR ECPN6Z, ₹1,34,635 for two. The selector app retired the same day. */

function Pass({ dir, date, from, to, total, legs }) {
  return (
    <article className="fl2-pass" aria-label={`${dir} journey`}>
      <div className="fl2-main">
        <div className="fl2-pass-top">
          <span className="fl2-dir">{dir}</span>
          <span className="fl2-pass-date">{date}</span>
          <span className="fl2-carrier">CATHAY PACIFIC · ECONOMY LIGHT</span>
        </div>
        <div className="fl2-route">
          <span className="fl2-ap">
            <span className="fl2-ap-code">{from.code}</span>
            <span className="fl2-ap-city">{from.city}</span>
            <span className="fl2-ap-time">{from.t}<small>{from.tz}</small></span>
            <span className="fl2-ap-day">{from.d}</span>
          </span>
          <span className="fl2-arc" aria-hidden="true">
            <span className="fl2-arc-line" />
            <span className="fl2-arc-plane">✈</span>
            <span className="fl2-arc-total">{total}</span>
          </span>
          <span className="fl2-ap to">
            <span className="fl2-ap-code">{to.code}</span>
            <span className="fl2-ap-city">{to.city}</span>
            <span className="fl2-ap-time">{to.t}<small>{to.tz}</small></span>
            <span className="fl2-ap-day">{to.d}</span>
          </span>
        </div>
        <div className="fl2-legs">
          {legs.map((l, i) =>
            l.lay ? (
              <span key={i} className="fl2-lay">{l.lay}</span>
            ) : (
              <span key={i} className="fl2-leg"><b>{l.no}</b> {l.seg}</span>
            )
          )}
        </div>
      </div>

      <aside className="fl2-stub">
        <span className="fl2-stamp">Ticketed ✓</span>
        <dl>
          <div className="fl2-stub-row">
            <dt>PNR</dt>
            <dd className="fl2-pnr">ECPN6Z</dd>
          </div>
          <div className="fl2-stub-row">
            <dt>Passengers</dt>
            <dd>Divyani · Shivendra</dd>
          </div>
          <div className="fl2-stub-row">
            <dt>Checked</dt>
            <dd>1 × 23 kg each</dd>
          </div>
          <div className="fl2-stub-row">
            <dt>Cabin</dt>
            <dd>7 kg each</dd>
          </div>
          <div className="fl2-stub-row">
            <dt>Seats</dt>
            <dd>not picked yet</dd>
          </div>
        </dl>
      </aside>
    </article>
  )
}

export default function Flights() {
  return (
    <div className="fl2">
      <div className="fl2-wrap">
        <header className="fl2-head">
          <p className="fl2-kicker">JAP-26 · 2 adults · ticketed 24 Nov 2026</p>
          <h1>Flights — booked &amp; paid</h1>
          <p className="fl2-sub">
            All-Cathay via Hong Kong, <b>Narita both ways</b> · ₹1,34,635 for two on Goibibo
            (ICICI ····4004) · saved ₹7,500 with GOICICIFESTINT
          </p>
        </header>

        <dl className="fl2-strip">
          <div><dt>Paid</dt><dd>₹1,34,635 · 2 pax RT</dd></div>
          <div><dt>Out</dt><dd>Fri 18 Dec · lands NRT 20:20</dd></div>
          <div><dt>Back</dt><dd>Mon 4 Jan · NRT 14:25</dd></div>
          <div><dt>Home</dt><dd>HYD 00:50 · Tue 5 Jan</dd></div>
          <div><dt>Layovers</dt><dd>HKG T1 both ways</dd></div>
        </dl>

        <Pass
          dir="out"
          date="Fri 18 December 2026"
          from={{ code: 'HYD', city: 'Hyderabad RGIA', t: '02:05', tz: 'IST', d: 'Fri 18 Dec' }}
          to={{ code: 'NRT', city: 'Tokyo Narita · T2', t: '20:20', tz: 'JST', d: 'Fri 18 Dec' }}
          total="14h 45m door to door"
          legs={[
            { no: 'CX672', seg: 'HYD 02:05 → HKG 09:40' },
            { lay: 'HKG · 5h 45m layover · T1' },
            { no: 'CX500', seg: 'HKG 15:25 → NRT 20:20' },
          ]}
        />

        <Pass
          dir="back"
          date="Mon 4 January 2027"
          from={{ code: 'NRT', city: 'Tokyo Narita · T2', t: '14:25', tz: 'JST', d: 'Mon 4 Jan' }}
          to={{ code: 'HYD', city: 'Hyderabad RGIA', t: '00:50', tz: 'IST', d: 'Tue 5 Jan' }}
          total="13h 55m door to door"
          legs={[
            { no: 'CX527', seg: 'NRT 14:25 → HKG 18:55' },
            { lay: 'HKG · 2h 10m layover · T1' },
            { no: 'CX601', seg: 'HKG 21:05 → HYD 00:50 +1' },
          ]}
        />

        <section className="fl2-todos" aria-label="Flight to-dos">
          <h2>Before we fly</h2>
          <div className="fl2-todo-grid">
            <p className="fl2-todo"><i /> <span><b>Confirm e-tickets issued</b> — Goibibo said “to be issued”; check the ticket numbers landed.</span></p>
            <p className="fl2-todo"><i /> <span><b>Pick seats</b> on Cathay Manage Booking — left side out of HKG→NRT for the Fuji side.</span></p>
            <p className="fl2-todo"><i /> <span><b>Extra 23 kg only if needed</b> — weigh bags on 2 Jan; pre-buying online ≈ ₹8–12k, airport ≈ double.</span></p>
            <p className="fl2-todo"><i /> <span><b>DigiYatra</b> for the 02:05 HYD departure — add the boarding pass the night before.</span></p>
            <p className="fl2-todo"><i /> <span><b>Tax-free goods in cabin/hand</b> on 4 Jan — customs check at NRT T2 before bag drop; check-in closes 13:25.</span></p>
          </div>
        </section>
      </div>
    </div>
  )
}
