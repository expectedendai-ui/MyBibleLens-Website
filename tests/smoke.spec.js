// @ts-check
const { test, expect } = require("@playwright/test");
const { waitForPageReady, settleLazyFlows, attachConsoleErrorWatch } = require("./utils");

async function prepareAboutCanvas(page, viewport) {
  await page.setViewportSize(viewport);
  await page.goto("/legal.html#about");
  await page.addStyleTag({
    content:
      ".hero-photo-card, .hero-cursor { animation: none !important; opacity: 1 !important; }",
  });
}

test.describe("MyBibleLens marketing site — smoke", () => {
  test("loads with no console errors", async ({ page }) => {
    const getErrors = attachConsoleErrorWatch(page);
    await page.goto("/");
    await waitForPageReady(page);
    const errors = getErrors();
    expect(errors, `Console errors detected:\n${errors.join("\n")}`).toHaveLength(0);
  });

  test("publishes one canonical application identity", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://mybiblelens.us/"
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://mybiblelens.us/assets/denzel-rigaud.jpg"
    );
    const schema = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .evaluate((element) => JSON.parse(element.textContent || "{}"));

    expect(schema["@id"]).toBe("https://mybiblelens.us/#application");
    expect(schema.sameAs).toEqual(
      expect.arrayContaining([
        "https://www.wikidata.org/wiki/Q141251174",
        "https://apps.apple.com/us/app/mybiblelens/id6764069602",
        "https://www.instagram.com/mybiblelens/",
      ])
    );
    expect(schema.author["@id"]).toBe("https://expectedend.co/denzel-rigaud#person");
    expect(schema.author.url).toBe("https://expectedend.co/denzel-rigaud");
    expect(schema.operatingSystem).toBe("iOS, iPadOS");
    expect(schema.author.jobTitle).toBe("Founder and Full-Stack Developer");
    expect(schema.author.description).toBe(
      "Denzel Rigaud is the founder and solo full-stack developer behind Expected End, MyBibleLens — the World's First Sanctuary App for Christianity — and The Water Check."
    );
    expect(schema.publisher["@id"]).toBe("https://expectedend.co/#organization");
    expect(schema.publisher.legalName).toBe("Expected End LLC");
    expect(schema.copyrightHolder["@id"]).toBe("https://expectedend.co/denzel-rigaud#person");
    expect(schema.copyrightYear).toBe(2026);
    expect(schema.author.sameAs).toContain("https://www.wikidata.org/wiki/Q140198525");
    expect(schema.author.sameAs).not.toContain("https://www.instagram.com/thewatercheck/");
    expect(schema.author.sameAs).not.toContain("https://www.instagram.com/mybiblelens/");

    await page.goto("/legal.html#about");
    const legalGraph = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .evaluate((element) => JSON.parse(element.textContent || "{}")["@graph"]);
    const legalPerson = legalGraph.find(
      (entity) => entity["@id"] === "https://expectedend.co/denzel-rigaud#person"
    );
    const expectedEnd = legalGraph.find(
      (entity) => entity["@id"] === "https://expectedend.co/#organization"
    );
    const legalApplication = legalGraph.find(
      (entity) => entity["@id"] === "https://mybiblelens.us/#application"
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://mybiblelens.us/legal.html"
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      "https://mybiblelens.us/legal.html"
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://mybiblelens.us/assets/denzel-rigaud.jpg"
    );
    expect(legalPerson.jobTitle).toBe("Founder and Full-Stack Developer");
    expect(legalPerson.worksFor["@id"]).toBe("https://expectedend.co/#organization");
    expect(expectedEnd.legalName).toBe("Expected End LLC");
    expect(expectedEnd.founder["@id"]).toBe("https://expectedend.co/denzel-rigaud#person");
    expect(expectedEnd.owns).toBeUndefined();
    expect(legalApplication.publisher["@id"]).toBe("https://expectedend.co/#organization");
    expect(legalApplication.copyrightHolder["@id"]).toBe(
      "https://expectedend.co/denzel-rigaud#person"
    );
    expect(legalApplication.copyrightYear).toBe(2026);
    await expect(page.locator("body")).not.toContainText("MyBibleLens LLC");
    await expect(page.locator("#terms")).toContainText(
      "Expected End LLC, the operator of MyBibleLens™"
    );
    await expect(page.locator("#privacy")).toContainText(
      "Expected End LLC, as the operator of MyBibleLens™, is the data controller"
    );
    await expect(page.locator("#dmca")).toContainText(
      "Copyright Contact (Agent Registration Pending)"
    );
    await expect(page.locator(".company-attribution")).toContainText(
      "Denzel owns the MyBibleLens copyright and licenses it to Expected End LLC"
    );
    await page.setViewportSize({ width: 375, height: 812 });
    const ownershipBounds = await page.locator(".company-attribution").evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, viewportWidth: window.innerWidth };
    });
    expect(ownershipBounds.left).toBeGreaterThanOrEqual(0);
    expect(ownershipBounds.right).toBeLessThanOrEqual(ownershipBounds.viewportWidth);
    await expect(page.locator("#terms")).toContainText(
      "Denzel Rigaud owns those copyrights and licenses them to Expected End LLC"
    );
    await expect(page.locator("#eula")).toContainText(
      "Copyright in the MBL IP is owned by Denzel Rigaud and licensed to Expected End LLC"
    );
    await expect(page.locator(".footer-bottom")).toContainText(
      "© 2026 Denzel Rigaud. MyBibleLens is published by Expected End LLC under license."
    );
  });

  test("hero renders the brand title and tagline appears on the page", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);
    await expect(page.locator(".hero-title")).toHaveText(/MyBibleLens/);
    // Tagline lives above the store CTAs (moved out of hero) — still classed .hero-tagline.
    await expect(page.locator(".hero-tagline")).toContainText(
      "Bringing you closer to God in an exciting and easy way!"
    );
  });

  test("hero eyebrow announces the World's First Sanctuary App for Christianity", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForPageReady(page);
    const eyebrow = page.locator(".hero-eyebrow");
    await expect(eyebrow).toContainText(/world.s first/i);
    await expect(eyebrow).toContainText("Sanctuary App for Christianity");
  });

  test("spotlight flow renders all 8 feature iframes in order without nested scrolling", async ({
    page,
  }) => {
    await page.goto("/");
    // The old iPad carousel was retired on 2026-06-02 in favor of in-context
    // spotlight sections embedded as auto-sized iframes.
    // 2026-06-04: the flow was reordered (Reflections + Games above Themes,
    // Focus Timer to the bottom) and the Orb, Parental Lock, and Deep Study
    // sections were added.
    // 2026-06-21: reordered to lead with the most visual tools — Canvas, Glow,
    // Mosaic up top; Parental Lock moved to the very bottom.
    // 2026-07-09: added the "Before we get started" homepage-customization band
    // (customize-flow) after Canvas, and swapped Mosaic ahead of Scripture Glow.
    // 2026-09-10: Scripture Glow, Sermon Builder, and The Orb left the app, so
    // their spotlight sections were removed from the site.
    // 2026-09-20: rebuilt for the remodel. Milestone (the Bible study plan) now sits
    // directly under Scripture Canvas; the Before-we-get-started band and Parental
    // Lock are gone; Games became Gather.
    const order = [
      "canvas-flow",
      "milestone-flow",
      "mosaic-flow",
      "reflections-flow",
      "fellowship-flow",
      "games-flow",
      "themes-flow",
      "timer-flow",
    ];
    const wraps = page.locator(".flow-iframe-wrap");
    await expect(wraps).toHaveCount(order.length);
    for (let i = 0; i < order.length; i++) {
      await expect(wraps.nth(i)).toHaveAttribute("id", order[i]);
      const frame = page.locator(`#${order[i]} iframe`);
      await expect(frame).toBeAttached();
      const transition = await frame.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          property: style.transitionProperty,
          duration: style.transitionDuration,
          hasAnimatedHeight: style.transitionProperty
            .split(",")
            .some(
              (property, index) =>
                ["all", "height"].includes(property.trim()) &&
                parseFloat(style.transitionDuration.split(",")[index] ?? style.transitionDuration) >
                  0
            ),
        };
      });
      expect(
        transition,
        `${order[i]} must resize immediately so it never becomes a second scroll surface`
      ).toMatchObject({ hasAnimatedHeight: false });
      await expect(
        frame,
        `${order[i]} is presentation-only and must not expose an iframe scrollbar`
      ).toHaveAttribute("scrolling", "no");
    }
    await waitForPageReady(page);
    await settleLazyFlows(page);
    for (const id of order) {
      const dimensions = await page.locator(`#${id} iframe`).evaluate((element) => ({
        frameHeight: element.getBoundingClientRect().height,
        contentHeight: element.contentDocument?.body.scrollHeight ?? null,
      }));
      expect(dimensions.contentHeight, `${id} content must be measurable`).not.toBeNull();
      expect(
        Math.abs(dimensions.frameHeight - dimensions.contentHeight),
        `${id} frame must fit its content without clipping or nested scrolling`
      ).toBeLessThanOrEqual(2);
    }
  });

  test("Supabase security badge appears with the right link", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);
    const badge = page.locator(".supabase-badge");
    await expect(badge).toBeAttached();
    await expect(badge).toHaveAttribute("href", "https://supabase.com/security");
    await expect(badge).toContainText("Security provided by Supabase");
    await expect(badge).toContainText("Supabase SOC 2 Type 2");
    await expect(page.locator(".supabase-badge-tag")).toHaveText(
      "Row-level access controls · Data encrypted at rest and in transit"
    );
  });

  test("only presents shipped platforms as available", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);

    await expect(page.locator(".repo-beta-pill")).toContainText(
      "Beta Testing Live on the App Store"
    );
    await expect(page.locator(".repo-coming-soon")).toHaveText(
      "Beta testing now on iPhone & iPad · Android coming soon"
    );
    await expect(page.locator("#platforms")).toContainText("Available now on iPhone & iPad");
    await expect(page.locator("#platforms")).toContainText("One sanctuary. iPhone and iPad.");
    await expect(page.locator("#platforms")).toContainText("Android is coming soon");
    await expect(page.locator("#platforms")).not.toContainText(/Now on Mac|Apple TV/);
    // The red rebuild notice sits directly under the beta pill (2026-09-20).
    await expect(page.locator(".repo-rebuild-pill")).toContainText("Rebuilding");
    await expect(page.locator(".repo-beta-pill + .repo-rebuild-pill")).toHaveCount(1);
  });

  test("Expected End LLC is the consistent operating entity", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);

    await expect(page.locator("footer")).toContainText("© 2026 Expected End LLC · MyBibleLens™");
    await expect(page.locator("body")).not.toContainText("MyBibleLens LLC");
  });

  test("the landing page shows no prices, pricing section, seats or cloud-storage plans", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForPageReady(page);
    const body = (await page.locator("body").textContent()) ?? "";

    await expect(page.locator("#pricing")).toHaveCount(0);
    await expect(page.locator(".pricing-section")).toHaveCount(0);
    await expect(page.locator(".cloud-storage-section")).toHaveCount(0);
    await expect(page.locator(".floating-nav__links")).not.toContainText("Pricing");
    expect(body, "no dollar amounts on the landing page").not.toMatch(/\$\s?\d/);
    expect(body, "no seat language on the landing page").not.toMatch(/\bseats?\b/i);
    expect(body, "no Pay Once pitch").not.toMatch(/Pay Once/i);
    expect(body, "Infinite Canvas is now Scripture Canvas").not.toMatch(/Infinite Canvas/i);
  });

  test("structured data and share text carry no prices", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);
    const meta = await page.evaluate(() => ({
      description: document.querySelector('meta[name="description"]')?.content ?? "",
      og: document.querySelector('meta[property="og:description"]')?.content ?? "",
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(
        (n) => n.textContent
      ),
    }));
    expect(meta.description).not.toMatch(/\$|one-time|lifetime/i);
    expect(meta.og).not.toMatch(/\$|one-time|lifetime/i);
    for (const block of meta.ld) {
      expect(() => JSON.parse(block), "JSON-LD must stay valid").not.toThrow();
      expect(block).not.toMatch(/"price"|priceCurrency|"@type":\s*"Offer"/);
    }
  });

  test("billing disclosure explains storage renewal, cancellation, and safe over-cap behavior", async ({
    page,
  }) => {
    await page.goto("/legal.html#refund");
    await waitForPageReady(page);
    const body = (await page.locator("body").textContent()) ?? "";

    expect(body).toContain("Cloud 20");
    expect(body).toContain("Cloud 50");
    expect(body).toContain("auto-renewing subscription");
    expect(body).toContain("current paid billing period");
    expect(body).toContain("new uploads are paused");
    expect(body).toContain("never automatically deleted");
    expect(body).not.toMatch(/Storage Pack \+10 GB|Storage Pack \+50 GB|\$12\.99|\$49\.99/i);
  });

  test("footer legal links are readable (contrast guard)", async ({ page }) => {
    await page.goto("/#download");
    await waitForPageReady(page);
    const link = page.locator(".footer-links a").first();
    await expect(link).toBeVisible();
    // Ensure the resolved text color isn't transparent or matching the bg
    const { color, bg } = await link.evaluate((el) => {
      const cs = getComputedStyle(el);
      const bgEl = el.closest("footer") || document.body;
      const bgCs = getComputedStyle(bgEl);
      return { color: cs.color, bg: bgCs.backgroundColor };
    });
    expect(color, "footer link color must be a defined value").not.toBe("rgba(0, 0, 0, 0)");
    expect(color, "footer link color must not equal footer background").not.toBe(bg);
  });

  test("about link points to the legal#about page", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);
    const aboutLink = page.locator(".about-link-section a");
    await expect(aboutLink).toHaveAttribute("href", "legal.html#about");
  });

  test("about canvas frames the behind-the-scenes build video without the horse tile", async ({
    page,
  }) => {
    await prepareAboutCanvas(page, { width: 1280, height: 900 });

    const canvas = page.locator(".hero--canvas");
    const buildVideo = canvas.locator(".hero-photo-card--build");

    await expect(canvas.locator(".hero-photo-card")).toHaveCount(5);
    await expect(canvas.locator(".hero-photo-card--tl")).toHaveCount(0);
    await expect(canvas.getByText("The early days.", { exact: true })).toHaveCount(0);
    await expect(canvas.getByText("Eyes forward.", { exact: true })).toHaveCount(0);
    await expect(buildVideo.locator("video")).toHaveAttribute("src", "assets/about-build-desk.mp4");
    await expect(buildVideo).toHaveAttribute("data-caption", /building/i);
    await expect(canvas.locator(".hero-cursor__label")).toContainText("Denzel Rigaud");
    await expect(canvas.locator(".hero-cursor__role")).toContainText("Founder");

    const videoBox = await buildVideo.boundingBox();
    expect(videoBox).not.toBeNull();
    expect(videoBox.x).toBeGreaterThanOrEqual(0);
    const canvasWidth = await canvas.evaluate((element) => ({
      client: element.clientWidth,
      scroll: element.scrollWidth,
    }));
    expect(canvasWidth.scroll).toBeLessThanOrEqual(canvasWidth.client);

    await buildVideo.click();
    const videoOverlay = page.locator("#about-video-overlay");
    await expect(videoOverlay).toHaveClass(/is-open/);
    await expect(videoOverlay.locator(".about-reward-video")).toHaveAttribute(
      "src",
      /about-build-desk\.mp4$/
    );
    await expect(videoOverlay.locator(".about-reward-caption")).toContainText(
      "Building MyBibleLens"
    );
  });

  test("about canvas keeps every memory tile inside a phone viewport", async ({ page }) => {
    await prepareAboutCanvas(page, { width: 390, height: 844 });

    const cards = page.locator(".hero--canvas .hero-photo-card");
    await expect(cards).toHaveCount(5);
    for (const card of await cards.all()) {
      await expect(card).toBeVisible();
      const box = await card.boundingBox();
      expect(box).not.toBeNull();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(390);
    }
    const canvasWidth = await page.locator(".hero--canvas").evaluate((element) => ({
      client: element.clientWidth,
      scroll: element.scrollWidth,
    }));
    expect(canvasWidth.scroll).toBeLessThanOrEqual(canvasWidth.client);

    const cursorBox = await page.locator(".hero-cursor").boundingBox();
    const cursorLabelBox = await page.locator(".hero-cursor__label").boundingBox();
    expect(cursorBox).not.toBeNull();
    expect(cursorLabelBox).not.toBeNull();
    expect(cursorLabelBox.x).toBeGreaterThanOrEqual(cursorBox.x);
    expect(cursorLabelBox.x).toBeLessThan(cursorBox.x + cursorBox.width + 40);
  });

  test("App Store + Google Play badges are present", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);
    await expect(page.getByRole("link", { name: /App Store/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Google Play/i })).toBeVisible();
  });

  test("retired scanner showcase stays off the page (SEO guard)", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);
    // Pulled 2026-07-11 so search engines index Infinite Canvas + shipped
    // features instead of the unshipped scanner/journaling method.
    await expect(page.locator("#mosaic-showcase")).toHaveCount(0);
    const body = (await page.locator("body").textContent()) ?? "";
    expect(body).not.toMatch(/S\.O\.A\.P\./);
    expect(body).not.toMatch(/scripture lens/i);
  });

  test("FAQ section renders all questions and each item expands", async ({ page }) => {
    await page.goto("/#faq");
    await waitForPageReady(page);
    const items = page.locator(".faq-item");
    await expect(items).toHaveCount(7);
    // Click the first one open and confirm the answer becomes visible
    const first = items.first();
    await first.locator("summary").click();
    await expect(first).toHaveAttribute("open", "");
    await expect(first.locator(".faq-item__a")).toBeVisible();
  });

  test("Floating nav exists in DOM and reveals after scrolling past hero", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);
    const nav = page.locator("#floating-nav");
    await expect(nav).toHaveAttribute("data-hidden", "true");
    // Scroll past the hero
    await page.evaluate(() => {
      const hero = document.getElementById("hero");
      window.scrollTo(0, hero?.offsetHeight ?? window.innerHeight);
    });
    await page.waitForTimeout(200);
    await expect(nav).toHaveAttribute("data-hidden", "false");
  });

  test("Floating nav close button collapses (does not dismiss) for the session", async ({
    page,
  }) => {
    await page.goto("/");
    await waitForPageReady(page);
    // Scroll past hero so the nav is showing
    await page.evaluate(() => {
      const hero = document.getElementById("hero");
      window.scrollTo(0, hero?.offsetHeight ?? window.innerHeight);
    });
    await page.waitForTimeout(200);
    const nav = page.locator("#floating-nav");
    await expect(nav).toHaveAttribute("data-hidden", "false");
    // Click the × close button — visibility:hidden from waitForPageReady would
    // block click, so reset that.
    await page.addStyleTag({
      content: ".floating-nav { visibility: visible !important; opacity: 1 !important; }",
    });
    await page.locator("#floating-nav-close").click();
    // Should collapse, not disappear
    await expect(nav).toHaveAttribute("data-collapsed", "true");
    await expect(nav).toHaveAttribute("data-hidden", "false");
    // sessionStorage flag is set
    const stored = await page.evaluate(() =>
      sessionStorage.getItem("mbl_floating_nav_collapsed_v1")
    );
    expect(stored).toBe("1");
    // Clicking the collapsed pill re-expands it
    await nav.click();
    await expect(nav).toHaveAttribute("data-collapsed", "false");
    const clearedAfterReopen = await page.evaluate(() =>
      sessionStorage.getItem("mbl_floating_nav_collapsed_v1")
    );
    expect(clearedAfterReopen).toBeNull();
  });

  test("Scroll halo grows as the page is scrolled", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);
    const fill = page.locator("#scroll-halo-fill");
    await page.evaluate(() => window.scrollTo(0, 0));
    // Trigger a synchronous dispatch so the handler runs immediately —
    // rAF-gated scroll handlers are otherwise flaky to assert on.
    await page.evaluate(() => window.dispatchEvent(new Event("scroll")));
    await expect
      .poll(async () =>
        parseFloat((await fill.getAttribute("style"))?.match(/width:\s*([\d.]+)/)?.[1] ?? "0")
      )
      .toBeLessThan(5);
    // Scroll halfway down the page and dispatch
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight / 2);
      window.dispatchEvent(new Event("scroll"));
    });
    await expect
      .poll(async () =>
        parseFloat((await fill.getAttribute("style"))?.match(/width:\s*([\d.]+)/)?.[1] ?? "0")
      )
      .toBeGreaterThan(25);
  });
});

test.describe("Scripture Canvas — live showcase", () => {
  // 2026-09-20: the twelve screen recordings were replaced with live demos built
  // from the app's own note engine, sticker art, layout data and landscapes.
  test("has six chapters, no video, and the real counts", async ({ page }) => {
    await page.goto("/mockups/canvas-spotlight.html");
    await waitForPageReady(page);

    await expect(page.locator("section.chapter")).toHaveCount(6);
    await expect(page.locator("video")).toHaveCount(0);
    await expect(page.locator(".stats")).toContainText("1,119");
    await expect(page.locator(".stats")).toContainText("46");
    await expect(page.locator(".stats")).toContainText("68");
    await expect(page.locator("body")).toContainText("gold threads");
    await expect(page.locator("body")).toContainText("Lasso, duplicate and");
    await expect(page.locator("body")).not.toContainText(/Infinite Canvas|30\+|50\+/);
  });

  test("the note answers typed words using the app's own engine", async ({ page }) => {
    await page.goto("/mockups/canvas-spotlight.html");
    await waitForPageReady(page);
    const note = page.locator("#noteText");
    const tag = page.locator("#noteTag");

    await note.fill("Love");
    await expect(tag).toContainText("Drawing: Love");
    await expect(tag).toContainText("Colour family: Grace");
    await note.fill("Sea");
    await expect(tag).toContainText("Drawing: Sea");
    await note.fill("Devil");
    await expect(tag).toContainText("Colour family: Warfare");
    await note.fill("hello there");
    await expect(tag).toContainText("A plain note");
  });

  test("the sticker wall collects, switches collections and clears", async ({ page }) => {
    await page.goto("/mockups/canvas-spotlight.html");
    await waitForPageReady(page);

    await expect(page.locator("#stkTabs .tab")).toHaveCount(6);
    await expect(page.locator("#tray button")).toHaveCount(26);
    const before = await page.locator("#wall .stk").count();
    await page.locator("#tray button").first().click();
    await expect(page.locator("#wall .stk")).toHaveCount(before + 1);

    await page.locator("#stkTabs .tab", { hasText: "Pixel" }).click();
    await expect(page.locator("#tray button img").first()).toHaveAttribute(
      "src",
      /stickers\/pixel\//
    );
    await page.locator("#stkClear").click();
    await expect(page.locator("#wall .stk")).toHaveCount(0);
    await expect(page.locator("#tones .tone")).toHaveCount(4);
  });

  test("the layout gallery lists all 46 layouts in two styles", async ({ page }) => {
    await page.goto("/mockups/canvas-spotlight.html");
    await waitForPageReady(page);

    await expect(page.locator(".lay-card")).toHaveCount(46);
    await page.locator("#layTabs .tab", { hasText: "Prayer" }).click();
    await expect(page.locator(".lay-card")).toHaveCount(5);
    await page.locator("#segCards").click();
    await expect(page.locator("#segCards")).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#layStage svg rect[rx='14']").first()).toBeAttached();
  });

  test("the landscape compare slider answers the keyboard", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/mockups/canvas-spotlight.html");
    await waitForPageReady(page);

    const stage = page.locator("#landStage");
    await stage.focus();
    const cut = () =>
      stage.evaluate((el) => parseFloat(getComputedStyle(el).getPropertyValue("--cut")));
    const start = await cut();
    await page.keyboard.press("ArrowRight");
    expect(await cut()).toBeGreaterThan(start);
    await page.locator("[data-cmp='3d']").click();
    await expect(page.locator("#tagR")).toHaveText("3D");
  });

  test("reduced motion shows the finished lasso state and drawn threads", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/mockups/canvas-spotlight.html");
    await waitForPageReady(page);

    await expect(page.locator("#move")).toHaveAttribute("data-stage", "4");
    await expect(page.locator("#threads")).toHaveClass(/is-live/);
  });

  test("loads inside the parent page without console errors", async ({ page }) => {
    const errors = [];
    page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
    await page.goto("/");
    await waitForPageReady(page);

    const frame = page.locator("#canvas-flow iframe");
    await expect(frame).toHaveAttribute("src", /canvas-spotlight\.html\?v=6/);
    await expect(page.frameLocator("#canvas-flow iframe").locator("#threads")).toBeAttached();
    expect(errors, `Console errors detected:\n${errors.join("\n")}`).toHaveLength(0);
  });
});
