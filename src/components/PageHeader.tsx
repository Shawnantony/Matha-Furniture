export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-wood-100 bg-wood-50">
      <div className="container-wide py-14 text-center sm:py-16">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="section-title mt-2">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/65">{description}</p>
        )}
      </div>
    </section>
  );
}
