import { Inter } from "next/font/google";
import { Button } from "@/components/Button";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Copy, Link, LogIn } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [url, setUrl] = useState('')
  const [ shortUrl, setShortUrl] = useState('')

  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('re')
  
  const handleShortUrlLink = async () => {
    try {
      const responseShortLink = await axios.post('http://localhost:3001/api/shorten', {
        longUrl: url
      })
      setShortUrl(`http://localhost:3000/?re=${responseShortLink.data.shortUrl}`)
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
    } catch (error) {
      console.log('Erro ao copiar para área de transferência!')
    }
  }

  useEffect(() => {
    if(redirectUrl){
      fetchUrl(redirectUrl)
    }
  }, [redirectUrl])

  const fetchUrl = async (url: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/${url}`)
      if(response.data.longUrl){
        window.location.href = response.data.longUrl
      }
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  return (
    <main className="flex flex-col p-4 gap-4 min-w-screen min-h-screen bg-[#0B101B] items-center">
      <div className="flex self-end gap-2 lg:h-[60px]">
        <button className="flex items-center justify-center flex-row gap-2 p-2 w-[123px] rounded-full lg:bg-[#181E29]">
          <p>Login</p>
          <LogIn/>
        </button>
        <Button title="Register Now!" />
      </div>
      <div className="flex lg:w-[659px] lg:h-[76px] border-4 border-[#353C4A] rounded-full justify-between items-center p-1">
        <div className="flex gap-2 ml-4">
          <Link className="text-gray-300"/>
          <input
            className="text-gray-300 bg-transparent"
            value={url}
            placeholder="Enter your link here"
            onChange={handleChange}
          />
        </div>
        <Button title="Shorten Now!" onClick={handleShortUrlLink}/>
      </div>
      <div>
        {
          shortUrl ?
            <div className="flex gap-2 items-center justify-center">
              <a target="_blank"  className="text-[#C9CED6]">{shortUrl}</a>
              <button className="flex w-[35px] h-[35px] rounded-full bg-[#1C283F] items-center justify-center" onClick={handleCopy} title="copy">
                <Copy size={20}/>
              </button>
            </div> : undefined
        }
      </div>
    </main>
  )
}
