import { graphql, useStaticQuery } from "gatsby";
import { IGetProjectsResponse } from "../../contracts/projects/iget-projects-response";

export const GetAllProjects = () => {
  const projects: IGetProjectsResponse = useStaticQuery(
    graphql`
      query {
        allSanityProject {
          nodes {
            _id
            title
            description
            slug {
              current
            }
            tags {
              _id
              title
            }
            mainImage {
              asset {
                fixed(width: 280, height: 250) {
                  ...GatsbySanityImageFixed
                }
              }
            }
          }
        }
      }
    `
  );
  return projects;
};
