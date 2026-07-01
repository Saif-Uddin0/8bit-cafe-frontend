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
    imageAlt: "PS5 gaming",
  },
  {
    id: 3,
    title: "Delicious Fast Food",
    description:
      "Fresh burgers, pizzas, fries and beverages.",
    imageSrc: "/all-cat.png",
    imageAlt: "Fast Food",
  },
  {
    id: 4,
    title: "Play with Friends",
    description:
      "Reserve your gaming slot anytime.",
    imageSrc: "/fifa_play.png",
    imageAlt: "Gaming",
  },
];

export default function ChooseUs() {
  return (
    <section
      className="
      relative
      overflow-hidden
      py-16
      lg:py-24
    "
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,4,215,.08),transparent_70%)]" />

      <div className="relative max-w-[820px] mx-auto px-5">

        <h2
          className="gradient-text text-center text-[42px] mb-16"
          style={{
            fontFamily: "var(--font-orbitron)",
          }}
        >
          Why Choose Us
        </h2>

        <div className="space-y-[-42px]">

          {features.map((item, index) => (
            <ChooseCard
              key={item.id}
              {...item}
              imageOnRight={index % 2 === 0}
            />
          ))}

        </div>

      </div>
    </section>
  );
}