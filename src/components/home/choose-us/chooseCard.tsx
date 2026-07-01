import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageOnRight: boolean;
}

export default function ChooseCard({
  title,
  description,
  imageSrc,
  imageAlt,
  imageOnRight,
}: Props) {
  return (
    <div
      className={`
      relative
      flex
      items-center
      ${
        imageOnRight
          ? "justify-start"
          : "justify-end"
      }
    `}
    >
      <div
        className={`
        flex
        items-center
        ${
          imageOnRight
            ? ""
            : "flex-row-reverse"
        }
      `}
      >
        {/* IMAGE */}

        <div
          className="
          relative
          z-20
          h-[170px]
          w-[170px]
          rounded-full
          shrink-0
        "
        >
          {/* Glow */}

          <div
            className="
            absolute
            inset-0
            rounded-full
          "
            style={{
              boxShadow:
                "0 0 40px rgba(205,78,205,.45)",
            }}
          />

          {/* Ring */}

          <div
            className="
            absolute
            inset-0
            rounded-full
            border-[4px]
            border-[#CD4ECD]
          "
          />

          <div
            className="
            absolute
            inset-[6px]
            rounded-full
            overflow-hidden
          "
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* TEXT */}

        <div
          className={`
          relative
          z-10
          w-[285px]
          rounded-full
          border
          border-[#5D199E]
          bg-[#140C28]
          px-8
          py-6
          ${
            imageOnRight
              ? "-ml-7"
              : "-mr-7"
          }
        `}
        >
          <span
            className="
            absolute
            left-0
            top-1/2
            h-10
            w-[5px]
            -translate-y-1/2
            rounded-r-full
            bg-gradient-to-b
            from-[#F862C9]
            to-[#873CE2]
          "
          />

          <h3 className="text-white font-bold text-[21px]">
            {title}
          </h3>

          <p className="mt-2 text-sm text-white/60 leading-6">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}