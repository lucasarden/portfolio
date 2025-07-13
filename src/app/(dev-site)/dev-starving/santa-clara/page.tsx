import Banner from "@/app/components/dev-starving/Banner";
import TextPageWrapper from "@/app/components/dev-starving/TextPageWrapper";
import RoundButton from "@/app/components/dev-starving/RoundButton";
import Image from "next/image";
import clsx from "clsx";

export default function Homepage() {
  return (
    <main>
      <Banner className="bg-tsm-gray text-white py-6 font-tsm">
        <h1 className="text-2xl text-white text-center text-bold tracking-wide">
          You are currently browsing inventory for our location in:
        </h1>
        <Image
          src="/images/clara-store-white.png"
          alt="Clara Store"
          width={750}
          height={125}
        />
        <RoundButton
          className={clsx(
            "text-xl text-white bg-tsm-gray border-white border tracking-wide",
            "hover:shadow-all-md hover:shadow-white hover:bg-tsm-gray-hover"
          )}
          href="./santa-cruz"
        >
          Switch to the Santa Cruz store
        </RoundButton>
      </Banner>
    </main>
  );
}
