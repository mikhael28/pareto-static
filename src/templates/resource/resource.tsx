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
import "./resource.scss";

const Resource: FunctionComponent<{ data: { sanityProject: IProject } }> = ({
  data,
}) => {
  const [resources, setResources] = useState([]);
  const [path, setPath] = useState("");
  const [resource, setResource] = useState({
    description: "",
    type: "",
    title: "",
    overview: [],
  });

  useEffect(() => {
    fetchSanityResources();
  }, []);

  async function fetchSanityResources() {
    let tempPath = window.location.pathname.split("/");
    const schema = tempPath[2];
    const slugName = tempPath[3];
    setPath(tempPath[2]);
    const query = `*[_type == "${schema}Schema" && slug.current == "${slugName}"]`;
    const links = await sanity.fetch(query);
    console.log("sanity links: ", links);
    setResource(links[0]);
  }
  return (
    <Layout>
      <SEO title={resource.title} description={resource.summary} />
      <div className="project-container">
        {/* <Img
          className="project-image"
          fluid={data.sanityProject.mainImage.asset.fluid}
        /> */}
        <div className="project-content-container">
          <div className="project-heading-container">
            <h1 className="project-title">
              {resource.type}: {resource.title}
            </h1>
          </div>
          <div className="label-content-container">
            <p className="label-text">The Details</p>
            <div className="content-text">
              <BlockContent blocks={resource.overview} />
            </div>
          </div>
          <div className="flex-down">
            <p className="label-text">Comprehension Questions</p>
            <p>Coming soon!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resource;
