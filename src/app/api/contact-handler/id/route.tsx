"use client"
import { NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface Form {
    id: number;
    mail: string;
}

export default async function handler(req, res: NextApiResponse) {
    const { id } = req.query;
    if (req.method === "POST") {
        const { email, name, message }: { email: string; name: string; message: string } = req.body;
        // id に基づいてメールアドレスを取得する処理
        let toAddress;
        switch (id.toString()) { // 文字列型に変換
            case "1":
                toAddress = "example1@example.com";
                break;
            case "2":
                toAddress = "example2@example.com";
                break;
            // 他の id に対するメールアドレスを追加
            default:
                toAddress = "default@example.com"; // 適切なデフォルトのアドレスを設定する
                break;
        }

        try {
            const transporter = nodemailer.createTransport({
                host: "smtp-mail.outlook.com",
                port: 587,
                secure: false,
                auth: {
                    user: "my-email@hotmail.co.jp",
                    pass: "my-password"
                }
            });

            const mailOptions = {
                from: "里親募集",
                to: toAddress,
                subject: "里親募集サイトからお問い合わせが届きました",
                text: `名前: ${name} \n\nメールアドレス: ${email} \n\nメッセージ: ${message}`
            };

            const info = await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: "成功しました" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "失敗しました" });
        }
    } else {
        return res.status(405).end();
    }
}