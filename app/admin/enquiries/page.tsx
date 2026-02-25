import { PageTitle } from "@/components/admin-ui/PageTitle";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Enquiries } from "@/types";
import { Trash } from "lucide-react";

const EnquiriesPage = async () => {
  const supabase = await createClient();
  const { data: enquiries, error } = (await supabase
    .from("contact_enquiries")
    .select("*")
    .order("created_at", { ascending: false })) as {
    data: Enquiries[] | null;
    error: any;
  };

  if (error) {
    console.error("Error fetching enquiries:", error);
    return <div className="p-6">Error loading enquiries.</div>;
  }

  return (
    <div className="px-6 py-6 space-y-6 h-[95vh] overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <PageTitle
          title="Enquiries"
          subtitle="Manage and preview your enquiries."
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">
                Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">
                Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">
                Contact
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">
                Destination
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">
                Message
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {enquiries?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No enquiries found.
                </td>
              </tr>
            ) : (
              enquiries?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {new Date(item.created_at + "Z").toLocaleDateString(
                      "en-MY",
                      {
                        timeZone: "Asia/Kuala_Lumpur",
                      }
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-gray-900">{item.email}</div>
                    <div className="text-xs text-gray-500">{item.phone}</div>
                  </td>
                  <td className="px-4 py-4 text-gray-700">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {item.destination}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600 max-w-xs truncate">
                    {item.message}
                  </td>
                  <td className="px-4 py-4 text-gray-600 max-w-xs truncate">
                    <Button variant="link">Assg.</Button>
                    <Button variant="ghost" className="ml-2">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiriesPage;
