# Legal source update: November 12, 2026

For the Scripture Canvas app (app main 9c51f925). Goes live only with the Scripture Canvas App Store build, together
with the new home page; the store build before it still has Milestone. Plain-language drafting, not legal advice.
Prior page source archived unmodified at `legal-archive/policies-before-2026-11-12.txt`. Older archives are unchanged,
except that `policies-2026-10-28.html` now climbs one folder for its stylesheet, script, images and links.

- Removed features: Milestone, Scripture Seals, Prestige, the Scripture Book, Gather and Reflections left the app on
  November 10, 2026. The About list, Terms 3 (Description of the Service), the deletion list, the analytics labels, the
  CPRA notice at collection and the cookie table no longer describe them. Journey takes Milestone's place in the About
  list, in the app's own words.
- EULA 9: "Earned rewards. Anything earned with Scripture Seals stays yours" is removed because Seal rewards no longer
  exist and their grants were deleted. **Denzel to decide** what earlier earners keep once payments are switched on.
- Lifetime "unlocks every tool, look and room" (no games). Journey plans and Fellowship are still listed as free.
- Analytics labels are the ones the app sends today (canvas, plans for Journey, other); earlier labels are named as
  coming from earlier versions.
- Cookie table: key names checked in app code. `logos_reflections`, `mbl_milestone_plan_v1` and
  `mbl_welcome_tour_seen_v1` are no longer written (the app only removes them at account deletion);
  `mbl_tutorial_presented_v1:*` holds the tours you have seen. `mbl_milestone_sounds_v1` is still the real name of the
  sound setting.
- Delete Your Account: Apostle opens the Apostle card and Settings is a row on it (the profile dial is gone).
- Not legal prose, same page: nav links to the old Repository and Pricing sections become Scripture Canvas; the Support
  page's "Choose Your Sanctuary" button (to a pricing section that no longer exists) is gone; the About page no longer
  links to the private company site (founder story button, company link, press link).
- Last Updated is November 12, 2026 on Privacy, Terms, EULA, Cookies and Acceptable Use.

# Legal source update: November 2, 2026

From the legal review of November 2, 2026. Plain-language drafting, not legal advice. Prior page source archived at
`legal-archive/policies-before-2026-11-02.txt`. Older archives are unchanged.

- Reports: one promise, "We review reports within 72 hours", and "A person reviews reported content" for the staff line.
- Retention: backups up to 6 months and reports 2 years. **Denzel to confirm both periods.** The report purge job is in
  the app repo's `20261102120000_report_alerts.sql`; the 6 months must match the real backup settings.
- AI: removed the AI study claims on the home page, and the voice, AI interaction, Halo Vision, dream interpretation and
  crisis filtering lines from legal.html. Kept the AI Disclosure about artwork, the disclaimers about outputs from
  earlier versions, and the Acceptable Use restrictions on AI features "offered in earlier versions or may offer in the
  future". Voice input left the app on September 23, 2026, so the CCPA 12-month list was accurate until then.
- Store wording: the home page now says you read in your own Bible, and the app tracks your reading and holds your
  reflections.
- Providers and cookies: Resend, Formspree, Google Translate. The cookie table is rewritten from the storage keys the
  app and site really use.
- EULA: section 24 holds Apple's required clauses and the developer name and address. Church and group use is carved
  into section 1. Section 5.2 no longer describes reading text. The contracting party did not change.
- Data export: described as the manual process it is. Section references fixed. `security.txt` publishes with
  `.nojekyll`. Unverifiable absolutes softened (audit logging, subprocessor contracts, incident response plan).
- Support address: info@mybiblelens.us everywhere. Mailboxes are not tested.
- **For the lawyer to confirm:** the governing-language clause in Terms section 14 and EULA section 22 (review L11).
- Not changed, waiting on a lawyer or Denzel: H1, H2 (including "Operated by Denzel Rigaud" and the footers), H4, H5, M3,
  M4, M5, M10, M11, M14, L6 to L10, L12, L13.

# Legal source update: November 1, 2026

Name only: the company is registered in Florida as EXPECTEDEND LLC, so legal.html and index.html now say exactly that,
including schema legalName. No terms changed. Prior source archived at `legal-archive/policies-before-2026-11-01.txt`.

This is plain-language drafting, not legal advice.

# Legal source update: October 28, 2026

Prepared for the payment plan (purchases built in the app, switched off until launch) and App Store version 2.2. Source
of truth for the purchase wording: `~/Desktop/Mybiblelens/MyBibleLens-Purchase-Legal-Draft.md`, rewritten so every
sentence is true both before and after purchases launch ("where your version of the app offers them"). No prices on
the website; prices stay in the app. The prior page source is archived unmodified at
`legal-archive/policies-before-2026-10-28.txt`.

- App-version notice (Privacy, Terms, EULA, Cookies, Acceptable Use): describes version 2.2 and later, links both
  archives. It was invisible (dark text in the dark page hero) since October 11; `style.css` now gives it light text.
- Privacy: Purchases paragraph, RevenueCat and App Store / Google Play as providers, Microsoft sign-in, CCPA lines
  without AI prompts or Dream Journal, financial-incentive line.
- Terms: Description of the Service lists what is free and what Lifetime and Cloud plans add, where offered.
- EULA: license grant by plan; section 5.3 and 6 describe earlier AI features as retired; 6.3 matches the app (988 link
  in Settings, no content scanning); section 7 AI providers; section 9 Purchases and Subscriptions (Lifetime, Cloud
  plans, pools, storage limits, refunds, deletion, earlier purchases); sections 11 and 17 name both stores.
- Delete Your Account page (added October 14): purchase records listed as deleted; deleting does not cancel a
  subscription.
- Acceptable Use: no AI-assisted moderation claims. Refund page and Subscription Terms page (Apple's auto-renewal facts,
  plan table without prices). Footer link "Purchase Model" is now "Subscription Terms".
- Terms: sections 7 (Pure Existence Exchange affiliate disclosure) and 8 (Health Claims Disclaimer) removed at the
  owner's direction; those features never shipped in the app. Later sections renumbered 7 to 17; anchors unchanged.
- Not changed: operator name, trademark list (still names Pure Existence Exchange), DMCA.

Verification: Prettier check passed; smoke 56 passed; visual 7 passed, 1 skipped, 4 failed on the same obsolete Canvas
mockup baselines noted below. Checked at 375px: no horizontal scroll, notice readable, table fits.

This is plain-language drafting, not legal advice.

# Legal source update — October 11, 2026

Source edits prepared for the owner-authorized publication. Preserve Expected End LLC as operator, as instructed. No trademark/DMCA registration claim is verified.

Updated current-service disclosures, consented account-linked analytics, local fonts, AI-assisted artwork and retired purchases/AI. Existing rights and historical purchases remain subject to original terms. Copyright notice/counter-notice procedure retained; unsupported registration-pending claim removed.

DMCA/trademark verification is explicitly excluded by the owner and is being handled in another chat. Outstanding operational evidence includes applicable processing bases, retention jobs, provider agreements and historical processing. Public App Store version 1.8 was inspected: it still lists purchases and earlier features. Policy copy now distinguishes the newer build and links an unmodified archive of the prior policy source. Authenticated App Store Connect access failed at the browser connection layer; private settings and age rating were not changed. No legal clearance or safe-harbor certification is implied.

Font licenses and pinned source checksums are in fonts/. No schema, account deletion, RLS or Edge Function changes.

Owner confirmed minimum age 13+ on October 11, 2026. Privacy, Terms and EULA now match signup. Higher local age/parental permission requirements still apply; this copy change does not implement age verification or a parental-consent service. Trademark paperwork remains with the owner.

## Verification for this publication

- Prettier format check passed.
- Full desktop/mobile smoke: 56 passed on the final two-worker run. The earlier mobile scroll-halo timing failure also passed on focused rerun.
- Visual suite: seven passed, one intentional skip; four Canvas checks reference an obsolete mockup (old hero image/text and nonexistent `.feature-chapter`). `git show HEAD:mockups/canvas-spotlight.html` already contains the new structure. These are existing baseline drift, not changes introduced by local font hosting; baselines were not blindly replaced.
- Prepared changes are static files only: no app state/types, database, RLS, Edge Functions, deletion, realtime or saved user data changed.
