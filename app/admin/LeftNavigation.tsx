"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import EmployeesTab from "./(employees)/EmployeesTab";
import { useState } from "react";
// import ProductTab from "./(product)/ProductTab";
// import { ADMIN_NAVIGATION_LINKS, PAGES_LINKS } from "@/lib/const";
// import { TAB } from "@/lib/const";
// import FeatureTab from "./(feature)/FeatureTab";

export const ADMIN_NAVIGATION_LINKS = [
  { name: "Employees", value: "employees" },
  { name: "Products", value: "product" },
  { name: "Permission", value: "permission" },
  { name: "Others", value: "other" },
];

export const PAGES_LINKS = [
  { name: "Feature", value: "feature" },
  { name: "Service", value: "service" },
  { name: "Contact Us", value: "contact" },
  { name: "About", value: "about" },
];

export default function LeftNavigation() {
  // in future need to use lazy loading for each tab content

  const [activeTab, setActiveTab] = useState<string>();
  const onTabChange = (value: string) => {
    setActiveTab(value);
  };

  console.log("activeTab", activeTab);

  return (
    <Tabs
      defaultValue={activeTab}
      orientation="vertical"
      className="lg:flex w-full lg:flex-row"
    >
      <TabsList className=" dark:rounded-lg bg-custom-default flex-wrap lg:gap-2 rounded-none lg:border-r-1 lg:flex lg:flex-col h-full w-screen lg:w-[15%] w-[100%] sticky top-2 ">
        <div className="hidden lg:block align-left w-full p-2 text-sm font-bold">
          Manage ----
        </div>
        {ADMIN_NAVIGATION_LINKS.map((link) => (
          <TabsTrigger
            key={link.value}
            onClick={() => onTabChange(link.value)}
            value={link.value}
            className="lg:w-full"
          >
            {link.name}
          </TabsTrigger>
        ))}

        <div className="hidden lg:block align-left w-full p-2 text-sm font-bold mt-4">
          Pages ----
        </div>
        {PAGES_LINKS.map((link) => (
          <TabsTrigger
            key={link.value}
            onClick={() => onTabChange(link.value)}
            value={link.value}
            className="lg:w-full"
          >
            {link.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="lg:w-[85%] rounded-lg overflow-auto">
        <TabsContent value="employees" forceMount>
          {activeTab === "employees" && <>employee</>}
        </TabsContent>
        <TabsContent value="product" forceMount>
          {activeTab === "product" && <>product</>}
        </TabsContent>
        <TabsContent value="permission" forceMount>
          {activeTab === "permission" && (
            <p>Permission tab content goes here.</p>
          )}
        </TabsContent>
        <TabsContent value="other" forceMount>
          {activeTab === "other" && <p>Other tab content goes here.</p>}
        </TabsContent>
        <TabsContent value="feature" forceMount>
          {activeTab === "feature" && <>feature</>}
        </TabsContent>
        <TabsContent value="about" forceMount>
          {activeTab === "about" && <>About tab content goes here.</>}
        </TabsContent>
      </div>
    </Tabs>
  );
}
