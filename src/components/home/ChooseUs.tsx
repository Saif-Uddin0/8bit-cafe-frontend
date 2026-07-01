import ChooseCard from "./choose-us/chooseCard";

const features = [
  {
    id: 1,
    title: "Professional Pool Tables",
    description: "High-quality billiard tables for casual and competitive play.",
    imageSrc: "/pool_table.png",
    imageAlt: "Pool table",
  },
  {
    id: 2,
    title: "Premium Gaming Experience",
    description: "Latest PS5 and PS4 consoles with popular games.",
    imageSrc: "/ps5_lounge.png",
    imageAlt: "PS5 gaming console",
  },
  {
    id: 3,
    title: "Delicious Fast Food",
    description: "Fresh burgers, pizzas, fries, and beverages.",
    imageSrc: "/all-cat.png",
    imageAlt: "Delicious fast food",
  },
  {
    id: 4,
    title: "Play with Friend's",
    description: "Reserve your gaming slot anytime.",
    imageSrc: "/fifa_play.png",
    imageAlt: "Playing with friends",
  },
];

export default function ChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(108,4,215,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-lg mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl font-black"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="gradient-text">Why Choose Us</span>
          </h2>
        </div>

        {/* Feature rows — alternating left/right */}
        <div className="flex flex-col gap-10">
          {features.map((feature, index) => (
            <ChooseCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              imageAlt={feature.imageAlt}
              imageOnRight={index % 2 === 0}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
