"use client";

import { useEffect, useState } from "react";

import AddNewItemManage from "@/components/AddNewItemManage";
import { PageTitle } from "@/components/admin-ui/PageTitle";
import SearchFilter from "@/components/admin-ui/SearchFilter";
import CurrentlyLoading from "@/components/CurrentlyLoading";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { PackageFormValues } from "@/schemas/packages.schema";
import { Package } from "@/types";
import PackageCard from "./PackageCard";
import PackageDetails from "./PackageDetails";
import BulkUploadPackages from "./(bulk-function)/BulkUploadPackages";

const PackagesTab = () => {
  const [packagesData, setPackagesData] = useState<Package[] | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(8);
  const [filters, setFilters] = useState<Partial<PackageFormValues>>({});

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const refetchPackages = async (params?: PackageFormValues) => {
    setLoading(true);

    const activeFilters = params ?? filters;

    if (params) {
      setFilters(params);
      setPage(1);
    }

    try {
      let query = supabase
        .from(process.env.NEXT_PUBLIC_SUPABASE_DB_PACKAGES_TABLE || "packages")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: true });

      if (activeFilters.title) {
        query = query.ilike("title", `%${activeFilters.title}%`);
      }

      if (activeFilters.country) {
        query = query.eq("country", activeFilters.country);
      }

      if (activeFilters.type) {
        query = query.eq("type", activeFilters.type);
      }

      const { data: packages, count } = await query.range(
        (page - 1) * limit,
        page * limit - 1
      );

      setPackagesData(packages);
      setCount(count ?? 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchPackages();
  }, [page, limit, filters]);

  const totalPages = Math.ceil((count || 0) / limit);

  return (
    <div className="px-6 pt-6 space-y-6 h-[calc(99vh-3.5rem)] overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <PageTitle
          title="Packages"
          subtitle="Manage and preview your travel listings."
        />
        <div className="flex items-center gap-2">
          <AddNewItemManage loading={loading} refetch={refetchPackages} />
          <BulkUploadPackages
            refetch={refetchPackages}
            packagesData={packagesData || []}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 justify-between">
        {/* @ts-expect-error: Unclear why ts is complaining here */}
        <SearchFilter loading={loading} onSearch={refetchPackages} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
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
              <PackageCard pkg={pkg} admin />
            </div>
          ))
        )}
      </div>

      <div className="col-span-full pt-4">
        <div className="flex flex-col gap-6 md:gap-4">
          <div className="relative flex flex-col md:flex-row md:items-center w-full gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              Showing {from + 1} to {Math.min(to + 1, count || 0)} of {count}{" "}
              results
            </p>
            <div className="flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </Button>

                <div className="text-sm font-medium px-4 whitespace-nowrap">
                  Page {page} of {totalPages}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>

            {/* Limit Selector */}
            <div className="flex justify-center md:justify-end items-center gap-2 md:ml-auto">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Show
              </span>

              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="border rounded px-2 py-1 text-sm bg-background"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={24}>24</option>
              </select>

              <span className="text-sm text-muted-foreground hidden sm:inline">
                per page
              </span>
            </div>
          </div>

          {/* Results Info */}
        </div>
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
