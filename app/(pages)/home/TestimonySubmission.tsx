const TestimonySubmission = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Submit Your Testimony</h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="testimony"
            className="block text-sm font-medium text-gray-700"
          >
            Testimony
          </label>
          <textarea
            id="testimony"
            name="testimony"
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your testimony"
          />
        </div>
      </form>
    </div>
  );
};

export default TestimonySubmission;
