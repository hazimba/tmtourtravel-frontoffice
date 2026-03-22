import TestimonyForm from "@/components/TestimonyForm";

const TestimonyPage = () => {
  return (
    <div className="flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-2xl py-8">
        <TestimonyForm />
      </div>
    </div>
  );
};

export default TestimonyPage;
