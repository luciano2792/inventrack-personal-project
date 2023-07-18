import { NextApiRequest, NextApiResponse } from "next";
import { validateJWT } from "../../lib/auth";
import { db } from "../../lib/dbConnection";

export async function createProduct (req: NextApiRequest, res: NextApiResponse) {

    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    await db.product.create({
        data: {
            title: req.body.productTitle,
            description: req.body.productDescription,
            productPictureURL: req.body.productPictureURL,
            inventoryId: req.body.inventoryId,
            quantity: req.body.quantity || 0,
            ownerId: user.id
        }
    })

    res.json({ message: "Inventory created succefully" });
}

export async function updateProduct (req: NextApiRequest, res: NextApiResponse) {

    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    if(!user.id){
        res.status(403)
        res.json({message: "unauthorized"})
    } else {
        await db.product.update({
            where: {
                id: req.body.id
            },
            data: {
                title: req.body.productTitle,
                description: req.body.productDescription,
                quantity: req.body.quantity
            }
        })
    }

    
    
    res.json({ message: "Inventory updated succefully" });
}

export async function getManyProducts(req: NextApiRequest, res: NextApiResponse) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    const products =  await db.product.findMany({
        where: {
            inventoryId: req.body.inventoryId,
            AND: {
                ownerId: user.id
            }
        }
    })

    res.json(products)
}

export async function getProduct(req: NextApiRequest, res: NextApiResponse) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    const product =  await db.product.findFirst({
        where: {
            id: req.body.id,
            AND: {
                ownerId: user.id
            }
        }
    })

    res.json(product)
}

export async function getOwnedProducts (req: NextApiRequest, res: NextApiResponse) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    const products = await db.product.findMany({
        where: {
            ownerId: user.id
        }
    })

    res.json(products);
}

export async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    if(!user.id){
        res.status(403)
        res.json({message: "unauthorized"})
    } else{
        await db.product.delete({
            where: {
                id: req.body.id
            }
        })
    }

    res.json({ message: "Inventory deleted succefully"})
}