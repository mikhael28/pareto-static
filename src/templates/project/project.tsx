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
import imageUrlBuilder from "@sanity/image-url";
import "./project.scss";

const builder = imageUrlBuilder(sanity);

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
        <div className="project-content-container">
          <div className="project-heading-container">
            <div style={{ display: "flex" }}>
              <Img
                className="project-image"
                fixed={data.sanityProject.mainImage.asset.fixed}
                style={{ marginTop: 18 }}
              />
              &nbsp;&nbsp;
              <h1 style={{ fontSize: 48 }}>{data.sanityProject.title}</h1>
            </div>
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
          {/* <div className="label-content-container">
            <p className="label-text">Tags</p>
            <div className="content-text">
              {data.sanityProject.tags.map((tag: ITag) => (
                <Tag key={tag._id} tag={tag} toggleTagState={null} />
              ))}
            </div>
          </div> */}
          <div className="label-content-container">
            <p className="label-text">About</p>
            <div className="content-text">
              <BlockContent blocks={data.sanityProject._rawBody} />
            </div>
          </div>
        </div>
        <div className="cards">
          {resources.map((resource, index) => {
            function urlFor(source) {
              return builder.image(source);
            }

            return (
              <Link to={`/developer/${path}/${resource.slug.current}`}>
                <div className="card">
                  <img
                    src={urlFor(resource.logo)
                      .height(300)
                      .url()}
                  />
                  <h2>{resource.title}</h2>
                  <p>{resource.summary}</p>
                  <div style={{ marginTop: "auto" }}>
                    Click here to view resource.
                  </div>
                </div>
              </Link>
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
          fixed(width: 80, height: 80) {
            ...GatsbySanityImageFixed
          }
        }
      }
    }
  }
`;
