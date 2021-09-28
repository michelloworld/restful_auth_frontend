import React, { useState, useEffect } from "react";
import type { NextPage } from "next";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setLoggedIn } from "../../src/actions/UserAction";
import { getProducts } from "../../src/actions/ProductAction";
import { wrapper } from "../../src/store";

// i18n
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// hooks
import { useIsMount } from "../../src/hooks/useIsMount";

// components
import Container from "@material-ui/core/Container";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "../../src/services/Axios";
import Header from "../../src/components/Header";

// others
import { authorize } from "../../src/authorize";

const Index: NextPage = (props) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const { loading, products, productsMeta } = useSelector((state: any) => state.product);
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
  });

  useEffect(() => {
    if (!isMount) {
      dispatch(getProducts(params));
    }
  }, [params]);

  return (
    <Container>
      <Header />

      <h1>Products ({t("hello")})</h1>

      <DataGrid
        autoHeight
        rows={products}
        columns={[
          { field: "id" },
          { field: "name", flex: 1, minWidth: 300 },
          { field: "price", width: 200 },
          { field: "createdAt", width: 300 },
        ]}
        pagination
        pageSize={params.perPage}
        rowsPerPageOptions={[10]}
        rowCount={productsMeta?.total}
        paginationMode="server"
        onPageChange={(newPage) => setParams({ ...params, page: newPage + 1 })}
        loading={loading}
      />
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (context: any) => {
    const { locale } = context;

    await authorize(context, store, async () => {
      await store.dispatch(getProducts() as any);
    });

    return {
      props: { ...(await serverSideTranslations(locale, ["common"])) },
    };
  };
});

export default Index;
