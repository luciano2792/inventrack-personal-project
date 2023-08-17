import { NextApiRequest, NextApiResponse } from "next";
import { validateJWT } from "../../../lib/auth";
import { db } from "../../../lib/dbConnection";

export default async function getInventory(req: NextApiRequest, res: NextApiResponse) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    const inventory =  await db.inventory.findFirst({
        where: {
            id: req.body.id,
            AND: {
                ownerId: user.id
            }
        }
    })

    res.json(inventory)
}