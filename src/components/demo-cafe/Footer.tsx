import { BeanMark } from "./BeanMark";
import { site } from "@/content/demo-cafe/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="container-page flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 text-ink">
          <BeanMark className="size-5 text-terracotta" />
          <span className="font-display text-[1.05rem]">{site.name}</span>
        </div>
        <p className="text-sm text-ink-muted">
          © {new Date().getFullYear()} {site.name}. A fictional demo project by Ktenor.
        </p>
      </div>
    </footer>
  );
}
