"use client";

const features = [
  {
    icon: "🌍",
    title: "Proudly South African",
    description: "Stories rooted in our diverse cultures, languages, and landscapes.",
  },
  {
    icon: "📖",
    title: "Faith & Values",
    description: "Books that nurture spiritual growth through engaging storytelling.",
  },
  {
    icon: "🔬",
    title: "STEM & Discovery",
    description: "Spark curiosity about planets, dinosaurs, and the natural world.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "For Every Family",
    description: "Age-appropriate books for children 3–12, for parents, teachers, and schools.",
  },
];

export default function WhySection() {
  return (
    <section className="w-full bg-muted py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Why Temh Books?
          </h2>
          <p className="mt-2 text-text-secondary text-sm sm:text-base">
            Every South African child deserves stories that reflect who they are.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-5 border border-border hover:shadow-md transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
