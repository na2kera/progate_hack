"use client"
import { NextResponse } from "next/server";
import nodeMailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "POST") {
        const { email, fromemail, name, message } = request.body;

        try {
            const transporter = nodeMailer.createTransport({
                host: "smtp.gmail.com", // メールサーバー。ここではHotmail/Outlookを使った例
                port: 587,
                secure: false,
                auth: {
                    user: "aa", // 送信元メールアドレス
                    pass: "aa" // パスワード
                }
            });

            const mailOptions = {
                from: "My website <my-email@hotmail.co.jp>",
                to: email, // 宛先メールアドレスを指定
                subject: "里親募集　お問い合わせ",
                text: `名前: ${name} \n\nメールアドレス: ${fromemail} \n\nメッセージ: ${message}`
            };

            const info = await transporter.sendMail(mailOptions);
            response.status(200).json({ message: "成功しました" });
        } catch (err) {
            response.status(500).json({ message: "失敗しました" });
        }
    } else {
        response.status(405).json({ message: "失敗しました" });
    }
}
