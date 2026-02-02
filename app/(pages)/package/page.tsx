const PackagePage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Package Page</h1>
      <p>This is the package page content for package {params.id}.</p>
    </div>
  );
};
export default PackagePage;
