import { PageTitle } from "@/components/admin-ui/PageTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import { CalendarCheck, Mail, MapPin } from "lucide-react";
import EnquiryChart from "./EnquiryChart";
import { Package } from "@/types";

const AdminDashboardPage = async () => {
  const { data: enquiries, error } = await supabase
    .from("contact_enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching enquiries:", error);
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        Error loading enquiries. Please try again later.
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
  });

  const todayEnquiries = enquiries.filter(
    (e) =>
      new Date(e.created_at + "Z").toLocaleDateString("en-MY", {
        timeZone: "Asia/Kuala_Lumpur",
      }) === today
  );

  const { data: packages, error: packagesError } = await supabase
    .from("packages")
    .select("*");

  if (packagesError) {
    console.error("Error fetching packages:", packagesError);
  }

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-[95vh] bg-gray-50/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageTitle
          title="Admin Dashboard"
          subtitle="Overview of your latest leads and enquiries."
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:h-[30vh]">
        <div className="rounded-xl md:w-1/2 border bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Table className="grid-cols-1 md:grid-cols-1">
              <TableHeader className="bg-slate-200/50">
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right md:table-cell hidden">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.slice(0, 7).map((enquiry) => (
                  <TableRow
                    key={enquiry.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {enquiry.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {enquiry.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 py-0.5 rounded-full text-xs font-medium text-blue-700">
                        <MapPin size={12} className=" md:table-cell hidden" />{" "}
                        {enquiry.destination}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 py-0.5 rounded-full text-xs font-medium text-primary">
                        +6{enquiry.phone}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-500 text-right  md:table-cell hidden">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="rounded-xl md:w-1/2 border bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Table className="grid-cols-1 md:grid-cols-1">
              <TableHeader className="bg-slate-200/50">
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Subtitle
                  </TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right hidden md:table-cell">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages?.slice(0, 5).map((pkg: Package) => (
                  <TableRow
                    key={pkg.uuid}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="truncate">
                      <div className="font-medium text-gray-900">
                        {pkg.title}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {pkg.subtitle}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 py-0.5 rounded-full text-xs font-medium text-blue-700 ">
                        <MapPin size={12} /> {pkg.location}
                      </span>
                    </TableCell>
                    <TableCell className="truncate">
                      <span className="inline-flex items-center gap-1 py-0.5 rounded-full text-xs font-medium text-primary truncate w-10 md:w-full">
                        {pkg.country}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-500 text-right hidden md:table-cell">
                      {pkg.session}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-2 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Enquiries
              </p>
              <h3 className="text-2xl font-bold">{enquiries.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-2 rounded-xl border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <CalendarCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Received Today
              </p>
              <h3 className="text-2xl font-bold">{todayEnquiries.length}</h3>
            </div>
          </div>
        </div>
      </div>
      <EnquiryChart enquiries={enquiries} todayEnquiries={todayEnquiries} />
    </div>
  );
};

export default AdminDashboardPage;
