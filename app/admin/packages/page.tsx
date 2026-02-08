"use client";

import { useEffect, useState } from "react";

import { PageTitle } from "@/components/admin-ui/PageTitle";
import SearchFilter from "@/components/admin-ui/SearchFilter";
import CurrentlyLoading from "@/components/CurrentlyLoading";
import { PackageFormValues } from "@/schemas/packages.schema";
import { Package } from "@/types";
import PackageCard from "./PackageCard";
import PackageDetails from "./PackageDetails";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

const PackagesTab = () => {
  const [packagesData, setPackagesData] = useState<Package[] | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  const refetchPackages = async (params?: PackageFormValues) => {
    setLoading(true);
    try {
      let url = "/api/packages";
      if (params) {
        const query = new URLSearchParams();
        if (params.title) query.append("title", params.title);
        if (params.country) query.append("country", params.country);
        if (params.type) query.append("type", params.type);
        if (Array.from(query).length > 0) url += `?${query.toString()}`;
      }
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPackagesData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Packages data:", packagesData?.length);

  useEffect(() => {
    refetchPackages();
  }, []);

  return (
    <div className="p-8 space-y-6 overflow-scroll h-[95vh]">
      <div className="flex items-end justify-between">
        <PageTitle
          title="Packages"
          subtitle="Manage and preview your travel listings."
        />
        <div className="flex gap-2">
          <Button
            onClick={() => refetchPackages()}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Link href="/admin/packages/create">
            <Button variant="default" size="sm" disabled={loading}>
              <Plus
                className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Add New
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-between">
        <SearchFilter
          setPackagesData={setPackagesData}
          setLoading={setLoading}
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <CurrentlyLoading />
          </div>
        ) : packagesData && packagesData.length === 0 ? (
          <p className="text-muted-foreground">No packages found.</p>
        ) : (
          packagesData?.map((pkg) => (
            <div
              key={pkg.uuid}
              onClick={() => setSelectedPackage(pkg)}
              className="group cursor-pointer overflow-hidden rounded-xl border bg-background transition-all hover:border-primary/50 hover:shadow-md flex flex-col"
            >
              <PackageCard pkg={pkg || ""} />
            </div>
          ))
        )}
      </div>

      <PackageDetails
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        refetchPackages={refetchPackages}
      />
    </div>
  );
};

export default PackagesTab;
