/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/**
 * Create all the project pages.
 */
const createProjectPages = async (graphql, actions, reporter) => {
  const { createPage } = actions;
  const getProjectsResult = await graphql(`
    {
      allSanityProject {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `);

  if (getProjectsResult.errors) {
    throw getProjectsResult.errors;
  }
  const projects = getProjectsResult.data.allSanityProject.nodes || [];
  projects.forEach((node) => {
    // console.log("Node: ", node);
    // let capitalizedCurrent =
    //   node.slug.current.charAt(0).toUpperCase() + node.slug.current.slice(1);
    // console.log("capitalized: ", capitalizedCurrent);
    const path = `/developer/${node.slug.current}`;
    createPage({
      path,
      component: require.resolve("./src/templates/project/project.tsx"),
      context: {
        id: node.id,
      },
    });
  });
};

const createKnowledgePages = async (graphql, actions, reporter) => {
  const { createPage } = actions;
  const getKnowledgeResults = await graphql(`
    query MyQuery {
      allSanityPaymentsSchema {
        edges {
          node {
            id
            title
            type
            url
            _rawOverview
            slug {
              _key
              _type
              current
            }
          }
        }
      }
    }
  `);
  if (getKnowledgeResults.errors) {
    throw getKnowledgeResults.errors;
  }
  console.log(
    "Knowledge Results:",
    getKnowledgeResults.data.allSanityPaymentsSchema
  );
  console.log(
    "Knowledge Results:",
    getKnowledgeResults.data.allSanityPaymentsSchema.edges
  );
  const learnings =
    getKnowledgeResults.data.allSanityPaymentsSchema.edges || [];

  console.log("Learnings: ", learnings);

  learnings.forEach((node) => {
    console.log("Node?:", node);
    const path = `/developer/web/${node.node.slug.current}`;
    createPage({
      path,
      component: require.resolve("./src/templates/project/project.tsx"),
      context: {
        id: node.node.slug.current,
      },
    });
  });
};

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions, reporter }) => {
  await createProjectPages(graphql, actions, reporter);
  await createKnowledgePages(graphql, actions, reporter);
};
