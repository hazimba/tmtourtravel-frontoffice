import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: Request, { params }: { params: any }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const titleParam = searchParams.get("title") || `package-${id}`;

  // Clean filename for headers
  const safeTitle = titleParam.replace(/[^a-zA-Z0-9]/g, "_");

  // Use the public URL or fallback to localhost
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  //  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const targetUrl = `${baseUrl}/package/${id}`;

  console.log(`Generating PDF for: ${targetUrl} with title: ${safeTitle}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true, // Use "new" if on latest puppeteer
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();

    // Crucial for iPhone: Set a realistic viewport
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto(targetUrl, { waitUntil: "networkidle0", timeout: 30000 });

    // Ensure the main content is loaded
    await page.waitForSelector("main");

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
      margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
      scale: 0.9,
    });

    await browser.close();
    // @ts-ignore: TypeScript may not recognize the Buffer type here
    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // Use inline so iPhone opens it in a new tab smoothly, or attachment to force download
        "Content-Disposition": `attachment; filename="${safeTitle}.pdf"`,
        "Content-Length": pdf.length.toString(),
      },
    });
  } catch (error: any) {
    console.error("Puppeteer Error:", error);
    if (browser) await browser.close();
    return NextResponse.json(
      { error: "PDF Generation Failed" },
      { status: 500 }
    );
  }
}
