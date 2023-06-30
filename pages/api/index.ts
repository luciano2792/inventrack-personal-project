import { NextApiRequest, NextApiResponse } from "next";

export default async function apiTest(req, res) {
    const request = await fetch("https://api.adviceslip.com/advice", { method: req.method })

    const response = await request.json()

    res.status(200)
    console.log(res)
    return response.slip.advice;
}