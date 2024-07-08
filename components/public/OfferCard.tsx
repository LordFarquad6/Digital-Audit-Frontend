'use client'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { BsShare } from 'react-icons/bs'

export type TOfferCardProps = {
  title: string
  description: string
  link: string
  image: string | StaticImport
  tags: string[]
}

export const OfferCard = ({
  title,
  description,
  link,
  image,
  tags,
}: TOfferCardProps) => {
  return (
    <div className="bg-white shadow rounded-xl p-2">
      <div className="bg-[#00b7ce]/5 rounded flex justify-center items-center min-h-64">
        <Image src={image} alt="mobitouch" />
      </div>
      <div className="p-2 flex flex-col gap-3">
        <div className="flex gap-2">
          {tags.map(tag => (
            <div
              key={tag}
              className="bg-blue-100 rounded-full px-2 text-sm font-bold text-blue-400 flex justify-center items-center"
            >
              {tag}
            </div>
          ))}
        </div>
        <h2 className="font-bold text-xl text-gray-600">{title}</h2>
        <p className="text-gray-400">{description}</p>
        <div className="flex gap-2 justify-between mt-2 items-center">
          <Link
            href={link}
            target="_blank"
            className="bg-primary rounded-full px-4 py-2 text-white text-sm hover:bg-primary-hover transition-colors"
          >
            Zobacz ofertę
          </Link>
          <button
            className="hover:bg-gray-100 h-8 w-8 rounded flex justify-center items-center"
            onClick={() =>
              navigator.share({
                title,
                text: description,
                url: link,
              })
            }
          >
            <BsShare className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
