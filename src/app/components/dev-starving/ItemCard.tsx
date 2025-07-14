import Image from "next/image";
import clsx from "clsx";

interface ItemCardProps {
  className?: string;
  title?: string;
  price?: string;
  imageSrc?: string;
}

export default function ItemCard({
  className,
  title = "Sample Item",
  price = "$0.00",
  imageSrc = "/images/default-guitar.webp", // make sure this exists in /public/images
}: ItemCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center bg-white rounded-2xl shadow-md overflow-hidden w-50 p-4 transition hover:shadow-lg cursor-pointer",
        className
      )}
    >
      <div className="w-50 h-50 relative mb-3">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover rounded-xl"
          sizes="224px"
        />
      </div>
      <h3 className="text-lg font-semibold text-center text-gray-800 ">
        {title}
      </h3>
      <p className="text-md text-gray-500">{price}</p>
    </div>
  );
}
