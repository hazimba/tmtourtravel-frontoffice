export const PageTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold pb-8">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};
