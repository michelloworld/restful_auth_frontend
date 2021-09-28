import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh_token`, {
        refreshToken: req.cookies.refreshToken,
      });

      const {
        data: {
          data: { accessToken, refreshToken },
        },
      } = resp;

      res.setHeader("Set-Cookie", [
        serialize("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: parseInt(process.env.REFRESH_TOKEN_LIFE as string),
          sameSite: "strict",
          path: "/",
        }),
      ]);

      res.status(200).json({ data: { accessToken } });
    } catch (e) {
      res.status(500).json({ error: { message: (e as Error).message } });
    }
  } else {
    res.status(404).send(404);
  }
};
