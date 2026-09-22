import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Building2, CalendarClock, Search, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { AppHeader } from "@/components/hospital/app-header";
import { Input } from "@/components/ui/input";
import { hospitals } from "@/lib/hospital-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Locais — HospStock" },
      { name: "description", content: "Painel regional de logística e estoque de materiais hospitalares." },
      { property: "og:title", content: "Locais — HospStock" },
      { property: "og:description", content: "Acompanhe estoques e movimentações dos hospitais da região." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const visibleHospitals = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return hospitals;
    return hospitals.filter((hospital) => `${hospital.name} ${hospital.city}`.toLocaleLowerCase("pt-BR").includes(normalized));
  }, [query]);

  const totalBoxes = hospitals.reduce((sum, hospital) => sum + hospital.activeBoxes, 0);
  const totalTransit = hospitals.reduce((sum, hospital) => sum + hospital.inTransit, 0);
  const totalAlerts = hospitals.reduce((sum, hospital) => sum + hospital.nearDeadline, 0);

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="page-enter mx-auto max-w-6xl space-y-7 px-4 py-7 sm:px-6 sm:py-10">
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Painel regional</p>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">Locais</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Acompanhe os materiais hospitalares em trânsito e consignados em cada unidade.</p>
          </div>
          <label className="relative block w-full md:max-w-sm">
            <span className="sr-only">Buscar hospital</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar hospital ou cidade..." className="h-11 rounded-xl bg-card/70 pl-10 backdrop-blur-md" />
          </label>
        </section>

        <section aria-label="Resumo operacional" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Hospitais ativos", value: hospitals.length, icon: Building2, tone: "text-primary bg-primary/10" },
            { label: "Caixas ativas", value: totalBoxes, icon: Boxes, tone: "text-foreground bg-secondary" },
            { label: "Em trânsito", value: totalTransit, icon: Truck, tone: "text-primary bg-primary/10" },
            { label: "Perto do prazo", value: totalAlerts, icon: CalendarClock, tone: "text-warning bg-warning/10" },
          ].map((metric) => (
            <div key={metric.label} className="glass-subtle rounded-2xl p-4 sm:p-5">
              <div className={`mb-3 grid size-9 place-items-center rounded-xl ${metric.tone}`}><metric.icon className="size-4" /></div>
              <p className="font-display text-2xl font-bold">{metric.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="glass-panel overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-display font-semibold">Hospitais da região</h2>
              <p className="text-xs text-muted-foreground">{visibleHospitals.length} locais encontrados</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent"><span className="size-1.5 rounded-full bg-accent" />Operação normal</span>
          </div>
          <div className="divide-y divide-border">
            {visibleHospitals.map((hospital) => (
              <Link key={hospital.id} to="/locais/$hospitalId" params={{ hospitalId: hospital.id }} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-card/60 sm:px-6 sm:py-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 font-display font-bold text-primary">{hospital.initials}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{hospital.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{hospital.city} · {hospital.contact.split(" · ")[0]}</span>
                  <span className="mt-2 flex gap-4 text-[11px] text-muted-foreground sm:hidden"><span>{hospital.inTransit} em trânsito</span><span>{hospital.nearDeadline} alertas</span></span>
                </span>
                <span className="hidden grid-cols-3 gap-7 text-right text-xs md:grid">
                  <span><span className="block text-muted-foreground">Caixas ativas</span><strong className="font-display text-base text-foreground">{hospital.activeBoxes}</strong></span>
                  <span><span className="block text-muted-foreground">Em trânsito</span><strong className="font-display text-base text-primary">{hospital.inTransit}</strong></span>
                  <span><span className="block text-muted-foreground">Alertas</span><strong className="font-display text-base text-warning">{hospital.nearDeadline}</strong></span>
                </span>
                <span className="grid size-9 shrink-0 place-items-center rounded-xl text-muted-foreground transition-all group-hover:translate-x-1 group-hover:bg-primary/10 group-hover:text-primary"><ArrowRight className="size-4" /></span>
              </Link>
            ))}
            {visibleHospitals.length === 0 && <div className="px-6 py-14 text-center text-sm text-muted-foreground">Nenhum hospital encontrado.</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
