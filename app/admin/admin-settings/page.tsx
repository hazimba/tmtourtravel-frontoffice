"use client";
import React, { useEffect, useState } from "react";
import { PageTitle } from "@/components/admin-ui/PageTitle";
import { Switch } from "@/components/ui/switch";
import {
  Layout,
  Package,
  Users,
  MessageSquare,
  Phone,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { SiteSetting } from "@/types";
import CurrentlyLoading from "@/components/CurrentlyLoading";
import { toast } from "sonner"; // Optional: recommended for feedback

const SettingsPage = () => {
  const [settings, setSettings] = useState<SiteSetting | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const refetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching settings:", error);
    } else if (data) {
      setSettings(data);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      await refetchSettings();
    };
    fetchSettings();
  }, []);

  const toggleSetting = async (key: keyof SiteSetting) => {
    if (!settings) return;

    const newValue = !settings[key];

    // 1. Optimistic Update (Update UI immediately)
    setSettings((prev) => (prev ? { ...prev, [key]: newValue } : null));
    setIsUpdating(key);

    // 2. Persist to Database
    const { error } = await supabase
      .from("site_settings")
      .update({ [key]: newValue })
      .eq("id", settings.id);

    if (error) {
      console.error("Update failed:", error);
      // Rollback on error
      setSettings((prev) => (prev ? { ...prev, [key]: !newValue } : null));
      toast.error("Failed to update setting");
    } else {
      toast.success("Settings updated");
    }

    setIsUpdating(null);
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <CurrentlyLoading />
      </div>
    );
  }

  // Configuration for mapping keys to UI elements
  const config = [
    {
      key: "show_slider",
      label: "Hero Slider",
      icon: Layout,
      desc: "Main top banner images",
    },
    {
      key: "show_packages",
      label: "Travel Packages",
      icon: Package,
      desc: "Featured tour listings",
    },
    {
      key: "show_partners",
      label: "Partners",
      icon: Users,
      desc: "Accredited logos section",
    },
    {
      key: "show_testimonials",
      label: "Testimonials",
      icon: MessageSquare,
      desc: "Customer reviews slider",
    },
    {
      key: "show_contact",
      label: "Contact Info",
      icon: Phone,
      desc: "Footer contact details",
    },
  ] as const;

  return (
    <div className="px-6 pt-6 space-y-8 h-[95vh] overflow-y-auto pb-20 scrollbar-hide">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-6">
        <PageTitle
          title="Homepage Settings"
          subtitle="Toggle which sections are visible to your visitors."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {config.map((item) => {
          const isActive = settings[item.key as keyof SiteSetting] as boolean;
          const Icon = item.icon;
          const loading = isUpdating === item.key;

          return (
            <div
              key={item.key}
              className={`group relative p-6 rounded-3xl border transition-all duration-500 ${
                isActive
                  ? "bg-white border-blue-200 shadow-sm ring-1 ring-blue-50"
                  : "bg-gray-50/50 border-gray-200 opacity-75"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <Icon size={24} />
                </div>

                <Switch
                  checked={isActive}
                  disabled={loading}
                  onCheckedChange={() =>
                    toggleSetting(item.key as keyof SiteSetting)
                  }
                />
              </div>

              <div className="space-y-1">
                <h3
                  className={`font-bold text-lg transition-colors ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </h3>
                <p className="text-sm text-gray-400 leading-tight">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6">
                <div
                  className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full transition-all ${
                    isActive
                      ? "text-green-600 bg-green-50"
                      : "text-gray-400 bg-gray-100"
                  }`}
                >
                  {isActive ? (
                    <>
                      <CheckCircle2 size={12} /> Live on Site
                    </>
                  ) : (
                    <>
                      <XCircle size={12} /> Hidden
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsPage;
