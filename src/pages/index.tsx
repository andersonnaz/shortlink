import { Inter } from "next/font/google";
import { Button } from "@/components/Button";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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
      <div>
        <input
          className="text-gray-300 bg-transparent"
          value={url}
          placeholder="Enter your link here"
          onChange={handleChange}
        />
        <Button title="Shorten Now!" onClick={handleShortUrlLink}/>
      </div>
      <div>
        {
          shortUrl ?
            <div>
              <a>{shortUrl}</a>
            </div> : undefined
        }
      </div>
    </main>
  )
}
