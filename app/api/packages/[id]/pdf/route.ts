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

  // ⭐ Force print mode BEFORE render
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForSelector("main", { timeout: 10000 });

  // activate print CSS AFTER render
  await page.emulateMediaType("print");

  await page.addStyleTag({
    content: `
    header, nav, footer, aside { display: none !important; }

    /* Force print visibility swap */
    .print\\:hidden { display: none !important; }
    .print\\:inline { display: inline !important; }

    /* Force desktop layout for PDF */
    .grid { display: grid !important; }
    .lg\\:grid-cols-3 { grid-template-columns: 2fr 1fr !important; }

    /* Reduce spacing & font sizes */
    main {
      margin: 0 !important;
      padding: 4px 8px !important;
      font-size: 0.82rem !important;
      line-height: 1.15 !important;
    }

    .gap-8 { gap: 10px !important; }
    .space-y-8 > * + * { margin-top: 8px !important; }
    .space-y-6 > * + * { margin-top: 6px !important; }

    .p-6 { padding: 10px !important; }
    .mb-8 { margin-bottom: 8px !important; }

    /* Shorter hero section */
    section.relative.h-\\[400px\\] {
      height: 220px !important;
    }
  `,
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "5mm", bottom: "5mm", left: "5mm", right: "5mm" },
    scale: 0.82,
  });

  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="package-${id}.pdf"`,
    },
  });
}
