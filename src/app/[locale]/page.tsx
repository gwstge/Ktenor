import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { Hero } from "@/components/sections/Hero";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = await getDictionary(locale);

  return (
    <>
      <Hero t={t} />
    </>
  );
}
