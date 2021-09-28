import Axios from "./services/Axios";
import { setLoggedIn, setAccessToken } from "./actions/UserAction";

type Callback = () => any;

const redirect = (res: any) => {
  res.setHeader("location", "/");
  res.statusCode = 302;
  res.end();
  return;
};

export const authorize = async (context: any, store: any, callback: Callback) => {
  const { req, res } = context;

  // set cookie to axios headers
  Axios.defaults.headers.cookie = req.headers.cookie || null;

  if (!req.cookies.refreshToken || !req.cookies.email) {
    redirect(res);
    return;
  }

  try {
    // axios post to get access token
    const resp = await Axios.post(`${process.env.NEXT_PUBLIC_URL}/api/refresh_token`);
    const {
      data: {
        data: { accessToken },
      },
    } = resp;

    // set cookie to server side
    res.setHeader("Set-Cookie", resp.headers["set-cookie"][0]);

    // set axios header authorization
    Axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

    // update email from cookie to redux store
    await store.dispatch(setLoggedIn(req.cookies.email) as any);

    // update access token to redux store
    await store.dispatch(setAccessToken(accessToken));

    await callback();
  } catch (e) {
    redirect(res);
    return;
  }
};
