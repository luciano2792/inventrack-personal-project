import { NextApiRequest, NextApiResponse } from "next";
import { S3 } from "aws-sdk";

const s3 = new S3({
    region: "us-east-1",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    signatureVersion: "v4"
});

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "8mb",
        }
    }
}