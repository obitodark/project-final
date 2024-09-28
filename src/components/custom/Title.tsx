import { titleFont } from "@/config/fonts"


interface Props {
  title: string
  subtitle?: string
  className?: string
}
export const Title = ({ title, subtitle, className }: Props) => {

  return (
    <div className={` ${className}`}>
      <h1 className={`${titleFont.className} text-2xl antialiased font-semibold  mb-4`}>
        {title}
      </h1>
      {
        subtitle && (
          <h3 className=" text-gray-500 text-sm mb-4">{subtitle}</h3>
        )
      }
    </div>
  )
}
