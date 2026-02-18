import puppeteer from "puppeteer";

export async function GET(req: Request, { params }: { params: any }) {
  const { id } = await params;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/package/${id}`;
  console.log("Generating PDF for:", url);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Desktop viewport to keep sidebar beside itinerary
  await page.setViewport({ width: 1440, height: 1200 });

  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForSelector("main", { timeout: 10000 });

  await page.addStyleTag({
    content: `
      /* Remove layout chrome */
      header, nav, footer, aside { display: none !important; }

      /* Reduce global spacing */
      main {
        margin: 0 !important;
        padding: 4px 8px !important;
        font-size: 0.82rem !important;
        line-height: 1.15 !important;
      }

      /* Compress headings */
      main h1 { font-size: 1.4rem !important; margin-bottom: 4px !important; }
      main h2 { font-size: 1.15rem !important; margin-bottom: 4px !important; }
      main h3 { font-size: 1rem !important; margin-bottom: 2px !important; }

      /* Tighten all text spacing */
      p, li, span, strong, em {
        font-size: 0.82rem !important;
        line-height: 1.15 !important;
        margin: 0 !important;
      }

      /* Reduce Tailwind spacing utilities */
      .p-6 { padding: 10px !important; }
      .p-4 { padding: 6px !important; }
      .mb-8 { margin-bottom: 8px !important; }
      .mb-4 { margin-bottom: 6px !important; }
      .mt-12 { margin-top: 8px !important; }
      .space-y-8 > * + * { margin-top: 8px !important; }
      .space-y-6 > * + * { margin-top: 6px !important; }
      .space-y-4 > * + * { margin-top: 4px !important; }

      /* Reduce grid gaps but keep side-by-side layout */
      .gap-8 { gap: 10px !important; }
      .gap-6 { gap: 8px !important; }
      .gap-4 { gap: 6px !important; }

      /* Compress cards */
      .rounded-xl, .rounded-2xl { border-radius: 8px !important; }

      /* Remove interactive UI from HighlightText */
      

      /* Make hero section shorter */
      section.relative.h-\\[400px\\] { height: 220px !important; }
    `,
  });

  // @ts-expect-error: TypeScript doesn't recognize the 'pdf' method on the page object
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "5mm", bottom: "5mm", left: "5mm", right: "5mm" },
    scale: 0.82, // stronger compression
  });

  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="package-${id}.pdf"`,
    },
  });
}
