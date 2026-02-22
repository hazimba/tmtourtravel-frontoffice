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

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-[95vh] bg-gray-50/50">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageTitle
          title="Admin Dashboard"
          subtitle="Overview of your latest leads and enquiries."
        />
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table className="">
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.slice(0, 5).map((enquiry) => (
              <TableRow
                key={enquiry.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  <div className="font-medium text-gray-900">
                    {enquiry.name}
                  </div>
                  <div className="text-gray-500 text-xs">{enquiry.email}</div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 py-0.5 rounded-full text-xs font-medium text-blue-700">
                    <MapPin size={12} /> {enquiry.destination}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 py-0.5 rounded-full text-xs font-medium text-primary">
                    +6{enquiry.phone}
                  </span>
                </TableCell>
                <TableCell className="text-gray-500 text-right">
                  {new Date(enquiry.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
