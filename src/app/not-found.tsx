import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
      <p className="font-serif text-6xl font-bold text-wood-300">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-charcoal">
        Page not found
      </h1>
      <p className="mt-2 text-charcoal/60">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
