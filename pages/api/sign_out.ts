import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { serialize } from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_out`, {
        refreshToken: req.cookies.refreshToken,
      });

      res.setHeader("Set-Cookie", [
        serialize("email", "", {
          maxAge: -1,
          path: "/",
        }),
        serialize("refreshToken", "", {
          maxAge: -1,
          path: "/",
        }),
      ]);

      res.status(204).json(null);
    } catch (e) {
      res.status(500).json({ error: { message: (e as Error).message } });
    }
  } else {
    res.status(404).send(404);
  }
};
