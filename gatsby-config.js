require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Pareto Library`,
    description: `Your home for curated resources to help you rapdily accelerate your learning process to become a full-stack developer and top-ranked neuro-athlete.`,
    author: `@mikhael28`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/jn.png`,
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "musclhjv",
        dataset: "production",
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        watchMode: true,
        overlayDrafts: true,
        token:
          "skYofh0GH4Dn5KqvXQ6nRNOyd5HnwYgaPqUGEEnk3fVLcOk0mScv8bRarhvxzZDBKj9dZfyhfpGrk8XRW1SS9oYd1ox2O5OWsSuoW5H8l6EwQJOeHXQ3hsHx73wEg7lmgM1LQ2L4vIIyCxXFT8SyaKdlBvLDrFoPdAoKkYvLAzCl2MHCqzIy",
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
        ],
      },
    },
  ],
};
