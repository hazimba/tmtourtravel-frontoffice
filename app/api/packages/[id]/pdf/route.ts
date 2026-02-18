import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function GET(req: Request, { params }: { params: any }) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const titleParam = searchParams.get("title") || `package-${id}`;
  const safeTitle = titleParam.replace(/[^a-zA-Z0-9]/g, "_");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const targetUrl = `${baseUrl}/package/${id}`;

  let browser;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto(targetUrl, { waitUntil: "networkidle0", timeout: 30000 });
    await page.waitForSelector("main");

    await page.emulateMediaType("print");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "5mm", bottom: "5mm", left: "5mm", right: "5mm" },
      scale: 0.9,
    });

    await browser.close();

    // @ts-expect-error: TypeScript doesn't recognize the 'pdf' method on the page object
    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeTitle}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Puppeteer Error:", error);
    if (browser) await browser.close();
    return NextResponse.json(
      { error: "PDF Generation Failed" },
      { status: 500 }
    );
  }
}
