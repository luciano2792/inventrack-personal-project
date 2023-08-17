import { NextApiRequest, NextApiResponse } from "next";
import { createJWT, comparePasswords } from "../../lib/auth";
import { db } from "../../lib/dbConnection";
import { serialize } from "cookie";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "POST") {
      const user = await db.user.findUnique({
        where: {
          username: req.body.username,
        },
      });
  
      if (!user) {
        res.status(401);
        res.json({ error: "This username doesn't exist! " });
        return;
      }
  
      const isUser = await comparePasswords(req.body.password, user.password);
  
      if (isUser) {
        const jwt = await createJWT(user);
        res.setHeader(
          "Set-Cookie",
          serialize(process.env.COOKIE_NAME, jwt, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          })
        );
        res.status(201);
        res.json({});
      } else {
        res.status(401);
        res.json({ error: "Invalid login" });
      }
    } else {
      res.status(402);
      res.json({message: "method not valid"});
    }
  }