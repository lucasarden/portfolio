import Banner from "@/app/components/dev-starving/Banner";
import RoundButton from "@/app/components/dev-starving/RoundButton";
import Image from "next/image";
import clsx from "clsx";
import ItemCarousel from "@/app/components/dev-starving/ItemCarousel";

const LOCATION_CONFIG = {
  "santa-cruz": {
    image: "/images/cruz-store-white.png",
    alt: "Santa Cruz Store",
    switchHref: "./santa-clara",
    switchLabel: "Switch to the Santa Clara store",
  },
  "santa-clara": {
    image: "/images/clara-store-white.png",
    alt: "Santa Clara Store",
    switchHref: "./santa-cruz",
    switchLabel: "Switch to the Santa Cruz store",
  },
};

export default async function StorePage({
  params,
}: {
  params: { location: string };
}) {
  const param = await params;
  const config =
    LOCATION_CONFIG[param.location as keyof typeof LOCATION_CONFIG];

  if (!config) {
    return (
      <main className="text-center text-lg font-bold text-red-600">
        Invalid store location.
      </main>
    );
  }

  return (
    <main>
      <Banner className="bg-tsm-gray text-white py-6 font-tsm flex-col">
        <h1 className="text-2xl text-white text-center tracking-wide">
          You are currently browsing inventory for our location in:
        </h1>
        <Image src={config.image} alt={config.alt} width={750} height={125} />
        <RoundButton
          className={clsx(
            "text-2xl text-white bg-tsm-gray border-white border tracking-wider",
            "hover:shadow-all-md hover:shadow-white hover:bg-tsm-gray-hover"
          )}
          href={config.switchHref}
        >
          {config.switchLabel}
        </RoundButton>
      </Banner>
      <Banner className="bg-white py-6 flex-col px-10">
        <h1 className="text-2xl text-center tracking-wide">
          Check out our newest arrivals!
        </h1>
        <ItemCarousel />
      </Banner>
    </main>
  );
}
