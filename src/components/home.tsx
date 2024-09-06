import { Layout } from "./layout";
import { ListPage } from "./";
import ArticleService from "../services/articles";
import { useEffect } from "react";

export const Home = () => {
  return (
    <>
      <Layout>
        <ListPage />
      </Layout>
    </>
  );
};
