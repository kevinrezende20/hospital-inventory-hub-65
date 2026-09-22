import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppHeader } from "@/components/hospital/app-header";
import { HospitalStock } from "@/components/hospital/hospital-stock";
import { getHospital } from "@/lib/hospital-data";

export const Route = createFileRoute("/locais/$hospitalId")({
  loader: ({ params }) => {
    const hospital = getHospital(params.hospitalId);
    if (!hospital) throw notFound();
    return hospital;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — HospStock` : "Hospital não encontrado — HospStock" },
      { name: "description", content: loaderData ? `Gestão de estoque transitório e consignado do ${loaderData.name}.` : "Local hospitalar não encontrado." },
      { property: "og:title", content: loaderData ? `${loaderData.name} — HospStock` : "Hospital não encontrado — HospStock" },
      { property: "og:description", content: loaderData ? `Acompanhe materiais e prazos do ${loaderData.name}.` : "Local hospitalar não encontrado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HospitalPage,
});

function HospitalPage() {
  const hospital = Route.useLoaderData();
  return <div className="min-h-screen"><AppHeader /><HospitalStock hospital={hospital} /></div>;
}
