import error from '@/public/404.svg'
import { Button } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

export default function SignIn() {
  return (
    <main className="bg-slate-200 h-full flex flex-col justify-center items-center gap-6">
      <Image src={error} alt="Error 404" className="max-h-72" />
      <h1 className="font-bold text-4xl">Opps!!!</h1>
      <p className="font-bold">Nie znaleziono strony</p>
      <Link href="/">
        <Button radius="xl" size="md">
          Wróć do strony głównej
        </Button>
      </Link>
    </main>
  )
}
