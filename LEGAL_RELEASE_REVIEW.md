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
