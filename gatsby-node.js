/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/**
 * Create all the project pages.
 */

let blueprintPages = `
    query MyQuery {
      allSanityBlueprintSchema {
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
  `;

let blueprintPath = "blueprint";

let reactPages = `
    query MyQuery {
      allSanityWebSchema {
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
  `;

let reactPath = "web";

let backendPages = `
    query MyQuery {
      allSanityBackEndSchema {
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
  `;

let backEndPath = "backEnd";

let algorithmsPages = `
    query MyQuery {
      allSanityAlgorithmsSchema {
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
  `;

let algorithmsPath = "algorithms";

let serverlessPages = `
    query MyQuery {
      allSanityServerlessSchema {
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
  `;

let serverlessPath = "serverless";

let paymentsPages = `
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
  `;

let paymentsPath = "payments";

let testingPages = `
    query MyQuery {
      allSanityTestingSchema {
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
  `;

let testingPath = "testing";

let uxPages = `
    query MyQuery {
      allSanityUxSchema {
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
  `;

let uxPath = "ux";

let learningPages = `
    query MyQuery {
      allSanityLearningSchema {
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
  `;

let learningPath = "learning";

let jsPages = `
    query MyQuery {
      allSanityJavascriptSchema {
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
  `;

let jsPath = "javascript";

let gitPages = `
    query MyQuery {
      allSanityGitSchema {
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
  `;

let gitPath = "git";

let awsPages = `
    query MyQuery {
      allSanityAwsSchema {
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
  `;

let awsPath = "aws";

let securityPages = `
    query MyQuery {
      allSanitySecuritySchema {
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
  `;

let securityPath = "security";

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

const createKnowledgePages = async (
  graphql,
  actions,
  reporter,
  query,
  pathName
) => {
  console.log("query: ", query);
  const { createPage } = actions;
  const getKnowledgeResults = await graphql(query);
  if (getKnowledgeResults.errors) {
    throw getKnowledgeResults.errors;
  }

  const learnings = getKnowledgeResults.data.allSanityWebSchema.edges || [];

  console.log("Learnings: ", learnings);

  learnings.forEach((node) => {
    console.log("Node?:", node);
    const path = `/developer/${pathName}/${node.node.slug.current}`;
    createPage({
      path,
      component: require.resolve("./src/templates/resource/resource.tsx"),
      context: {
        id: node.node.slug.current,
      },
    });
  });
};

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions, reporter }) => {
  await createProjectPages(graphql, actions, reporter);
  await createKnowledgePages(graphql, actions, reporter, reactPages, reactPath);
};
