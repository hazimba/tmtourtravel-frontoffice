/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://tmtourtravel-frontoffice.vercel.app",
  generateRobotsTxt: true,
  additionalPaths: async (config) => [
    await config.transform(config, "/"), // homepage
    // await config.transform(config, "/about"), // example page
    // await config.transform(config, "/packages"), // your packages page
    // await config.transform(config, "/contact"), // contact page
    // add all your main pages here, e.g.:
    // await config.transform(config, "/umrah"),
    // await config.transform(config, "/team-building"),
  ],
};
