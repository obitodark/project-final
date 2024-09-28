"use client"
import { useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";

interface Props {
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  initialImage?: string | null
}

export const InputImage = ({ label = "picture", onChange, initialImage = null }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        onChange(event);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid w-auto max-w-sm items-center gap-1.5">
      <div
        className="border border-gray-300 relative w-[80px] h-[80px] flex justify-center items-center rounded-lg overflow-hidden"
      >
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Selected"
            objectFit="cover"
            width={80}
            height={80}
            className="w-[80px] h-[80px] object-cover"
          />
        ) : (
          <Image alt="image-default" width={70} height={70} src={"/imgs/image.png"} />
        )}
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
