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
  return (
    <Layout>
      <SEO
        title={data.sanityProject.title}
        description={data.sanityProject.description}
      />
      <div className="project-container">
        <Img
          className="project-image"
          fixed={data.sanityProject.mainImage.asset.fixed}
        />
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
        <div className="cards">
          {resources.map((resource, index) => {
            function toPlainText(blocks = []) {
              return (
                blocks
                  // loop through each block
                  .map((block) => {
                    // if it's not a text block with children,
                    // return nothing
                    if (block._type !== "block" || !block.children) {
                      return "";
                    }
                    // loop through the children spans, and join the
                    // text strings
                    return block.children.map((child) => child.text).join("");
                  })
                  // join the paragraphs leaving split by two linebreaks
                  .join("\n\n")
              );
            }

            let blockText = toPlainText(resource.overview);
            console.log(blockText);
            return (
              <div className="card">
                <h1>{resource.title}</h1>
                {/* <BlockContent blocks={resource.overview} /> */}
                <p>{blockText.slice(0, 140)}...</p>
                <div style={{ marginTop: "auto" }}>
                  <Link
                    className="project-card"
                    to={`/developer/${path}/${resource.slug.current}`}
                  >
                    Click here to view resource.
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
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
          fixed(width: 30, height: 30) {
            ...GatsbySanityImageFixed
          }
        }
      }
    }
  }
`;
