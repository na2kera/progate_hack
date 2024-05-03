"use client"
import { useState } from "react" 

const Contact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()  
        try{
            const response = await fetch("http://localhost:3000/api/contact-handler", {
                method: "POST",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            })
            const jsonData = await response.json()
            alert("メッセージを送信しました")
        }catch(err){
            alert("メッセージの送信が失敗しました")
        }
    }

    return (
        <div>
            <h1>コンタクト</h1>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="お名前" required/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="メールアドレス" required/>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="メッセージ" rows="10" required></textarea>
                <button type="submit">送信</button>
            </form> 
        </div>
    )
}

export default Contact