import { Link } from "@tanstack/react-router";
import { Menu, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="HospStock — início">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
            <PackageOpen className="size-4" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-semibold">HospStock</span>
            <span className="block text-[11px] text-muted-foreground">Gestão de Materiais Hospitalares</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <nav aria-label="Navegação principal" className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground">
            <Link to="/" activeOptions={{ exact: false }} className="rounded-lg bg-card px-3 py-1.5 text-primary shadow-sm">Locais</Link>
            <span className="px-3 py-1.5">Movimentações</span>
            <span className="px-3 py-1.5">Relatórios</span>
          </nav>
          <div className="flex items-center gap-2.5 border-l border-border pl-4">
            <div className="text-right leading-tight">
              <p className="text-[13px] font-semibold">Ana Reis</p>
              <p className="text-[11px] text-muted-foreground">Logística · Região Sudeste</p>
            </div>
            <span className="grid size-9 place-items-center rounded-full bg-accent/15 font-display text-[13px] font-bold text-accent">AR</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Abrir menu"><Menu /></Button>
      </div>
    </header>
  );
}
