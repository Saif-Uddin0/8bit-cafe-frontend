import ChooseCard from "./choose-us/chooseCard";

const features = [
  {
    id: 1,
    title: "Professional Pool Tables",
    description:
      "High-quality billiard tables for casual and competitive play.",
    imageSrc: "/pool_table.png",
    imageAlt: "Pool table",
  },
  {
    id: 2,
    title: "Premium Gaming Experience",
    description:
      "Latest PS5 and PS4 consoles with popular games.",
    imageSrc: "/ps5_lounge.png",
    imageAlt: "PS5 gaming console",
  },
  {
    id: 3,
    title: "Delicious Fast Food",
    description:
      "Fresh burgers, pizzas, fries, beverages and more.",
    imageSrc: "/all-cat.png",
    imageAlt: "Fast food",
  },
  {
    id: 4,
    title: "Play With Friends",
    description:
      "Reserve your gaming slot and enjoy together.",
    imageSrc: "/fifa_play.png",
    imageAlt: "Friends playing",
  },
];

export default function ChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden py-20 lg:py-32"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C04D7]/10 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-[1450px] px-5 lg:px-12">

        {/* Heading */}
        <div className="mb-24 lg:mb-32 text-center">
          <h2
            className="
              inline-block
              text-4xl
              sm:text-5xl
              lg:text-6xl
              bg-gradient-to-b
              from-[#6C04D7]
              to-[#CD4ECD]
              bg-clip-text
              text-transparent
            "
            style={{
              fontFamily: "var(--font-jersey-20)",
              fontWeight: 400,
            }}
          >
            Why Choose Us
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex flex-col gap-24 xl:gap-32">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex ${
                index % 2 === 0
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              <ChooseCard
                {...feature}
                imageOnRight={index % 2 === 0}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Mobile / Tablet */}
        <div className="flex flex-col gap-14 lg:hidden">
          {features.map((feature, index) => (
            <ChooseCard
              key={feature.id}
              {...feature}
              imageOnRight={index % 2 === 0}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}