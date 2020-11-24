import BlockContent from "@sanity/block-content-to-react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import React, { FunctionComponent, useEffect, useState } from "react";
import IconGithub from "../../components/icons/icon-github";
import IconLink from "../../components/icons/icon-link";
import Layout from "../../components/layout/layout";
import Tag from "../../components/projects-section/tags/tag/tag";
import SEO from "../../components/seo";
import { IProject } from "../../contracts/projects/project/iproject";
import { ITag } from "../../contracts/tags/tag/itag";
import sanity from "../../sanity";
import "./project.scss";

const Project: FunctionComponent<{ data: { sanityProject: IProject } }> = ({
  data,
}) => {
  const [resources, setResources] = useState([]);
  const [path, setPath] = useState("");

  useEffect(() => {
    fetchSanityResources();
  }, []);

  async function fetchSanityResources() {
    let tempPath = window.location.pathname.split("/");
    const schema = tempPath[2];
    setPath(tempPath[2]);
    const query = `*[_type == '${schema}Schema']`;
    const links = await sanity.fetch(query);
    setResources(links);
  }
  console.log("Sanity assets: ", resources);
  return (
    <Layout>
      <SEO
        title={data.sanityProject.title}
        description={data.sanityProject.description}
      />
      <div className="project-container">
        {/* <Img
          className="project-image"
          fluid={data.sanityProject.mainImage.asset.fluid}
        /> */}
        <div className="project-content-container">
          <div className="project-heading-container">
            <h1 className="project-title">{data.sanityProject.title}</h1>
            {(data.sanityProject.githubUrl || data.sanityProject.siteUrl) && (
              <div className="icons-container">
                {data.sanityProject.githubUrl && (
                  <a href={data.sanityProject.githubUrl} target="_blank">
                    <IconGithub />
                    <span>Github Repo</span>
                  </a>
                )}
                {data.sanityProject.siteUrl && (
                  <a href={data.sanityProject.siteUrl} target="_blank">
                    <IconLink />
                    <span>Visit Site</span>
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="label-content-container">
            <p className="label-text">Description</p>
            <p className="content-text">{data.sanityProject.description}</p>
          </div>
          <div className="label-content-container">
            <p className="label-text">Tags</p>
            <div className="content-text">
              {data.sanityProject.tags.map((tag: ITag) => (
                <Tag key={tag._id} tag={tag} toggleTagState={null} />
              ))}
            </div>
          </div>
          <div className="label-content-container">
            <p className="label-text">About</p>
            <div className="content-text">
              <BlockContent blocks={data.sanityProject._rawBody} />
            </div>
          </div>
        </div>
        {resources.map((resource, index) => {
          return (
            <div>
              <h1>{resource.title}</h1>
              <BlockContent blocks={resource.overview} />
              <Link
                className="project-card"
                to={`/developer/${path}/${resource.slug.current}`}
              >
                Click here to view resource.
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Project;

export const pageQuery = graphql`
  query ProjectQuery($id: String) {
    sanityProject(id: { eq: $id }) {
      _id
      title
      description
      githubUrl
      siteUrl
      _rawBody
      slug {
        current
      }
      tags {
        _id
        title
      }
      mainImage {
        asset {
          fluid(maxWidth: 1200) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
