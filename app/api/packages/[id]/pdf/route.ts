import puppeteer from "puppeteer";

export async function GET(req: Request, { params }: { params: any }) {
  const { id } = await params;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/package/${id}`;
  // const url = `http://localhost:3000/package/${id}`;
  const urlObj = new URL(req.url);
  const titleParam = urlObj.searchParams.get("title") || `package-${id}`;
  const safeTitle = titleParam.replace(/[^a-zA-Z0-9-_ ]/g, "_");
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
    /* Shrink hero for PDF */
    section.relative.h-\\[400px\\] {
      height: 160px !important;       /* smaller hero */
      page-break-inside: avoid;       /* don’t split hero */
      margin-bottom: 8px !important;
    }

    /* Reduce overall spacing in main */
    main {
      margin: 0 !important;
      padding: 4px 6px !important;
      font-size: 0.78rem !important;
      line-height: 1.1 !important;
    }

    /* Reduce vertical spacing between sections */
    .space-y-8 > * + * { margin-top: 4px !important; }
    .space-y-6 > * + * { margin-top: 3px !important; }

    /* Force grid layout for sidebar */
    .grid { display: grid !important; }
    .lg\\:grid-cols-3 { grid-template-columns: 2fr 1fr !important; }

    /* Hide non-print elements */
    header, nav, footer, aside, .print\\:hidden { display: none !important; }
    .print\\:inline { display: inline !important; }

    /* Keep Route box visible and shrink it */
    .bg-slate-100 {
      padding: 2px 4px !important;
      font-size: 0.75rem !important;
    }

    /* Move itinerary below freebies */
    .space-y-8 > section:nth-last-child(1) {
      page-break-before: auto !important;
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

  // @ts-expect-error: Next.js doesn't recognize the Response type here, but it works in practice
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="package-${safeTitle}.pdf"`,
    },
  });
}
