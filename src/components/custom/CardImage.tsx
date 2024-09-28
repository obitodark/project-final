import Image from "next/image";

interface Prop {
  src: string;
  alt?: string;
  aspectRatio?: string;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CardImage = ({ src, alt = "image", aspectRatio = "1/1.2", className, onMouseEnter, onMouseLeave }: Prop) => {
  return (
    <div className={`relative overflow-hidden  ${className}`} style={{ aspectRatio }}>
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }} // Ajuste con fill y objectFit
        className="rounded-xl"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};
