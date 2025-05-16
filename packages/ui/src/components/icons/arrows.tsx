import Image from "next/image";
import { SmallIcon } from "./base";

export function ArrowLeftIcon() {
    return (
        <Image
        src={`/icons/arrowLeft.svg`}
        alt={`arrow left icon`}
        width={24}
        height={24}
      />
    )
}

export function ArrowLeftSmall() {
    return (
      <Image
          src={`/icons/arrowLeft.svg`}
          alt={`arrow left icon`}
          width={16}
          height={16}
        />
    )
}