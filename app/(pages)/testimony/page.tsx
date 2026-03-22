import TestimonyForm from "@/components/TestimonyForm";

const TestimonyPage = () => {
  return (
    <div className="flex flex-col items-center justify-start p-2">
      <div className="w-full max-w-lg border rounded-lg shadow-2xl">
        <TestimonyForm />
      </div>
    </div>
  );
};

export default TestimonyPage;
