import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

// redux
import { useDispatch } from "react-redux";
import { signIn } from "../src/actions/UserAction";

// i18n
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

// interfaces
import { ISignInRequest } from "../src/interfaces/ISignIn";

// components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const initInputs: ISignInRequest = {
  email: "admin@admin.com",
  password: "password",
};

const Index: NextPage = () => {
  const { t } = useTranslation("common");
  const [inputs, setInputs] = useState(initInputs);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res: any = await dispatch(signIn(inputs));
    if (res.status === 200) {
      router.push("/products");
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ marginTop: "30%" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container justifyContent="center" alignItems="center" direction="column">
            <TextField
              label={t("email")}
              variant="outlined"
              onChange={handleChange}
              name="email"
              value={inputs.email}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              label={t("password")}
              variant="outlined"
              onChange={handleChange}
              name="password"
              type="password"
              value={inputs.password}
              style={{ marginBottom: "15px" }}
            />
            <Button variant="contained" size="large" type="submit">
              {t("Login")}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Index;
