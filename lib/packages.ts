export async function fetchPackageById(id: string) {
  const res = await fetch(`/api/packages/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch package");
  }

  return res.json();
}
