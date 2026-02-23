import WorkInProgress from "@/components/WorkInProgress";

const ContactPage = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:py-8 py-4">
          <h1 className="md:text-3xl text-2xl font-bold text-primary">
            Contact Us!
          </h1>
          <h2 className="text-lg text-muted-foreground md:max-w-3xl max-w-sm text-sm">
            We are here to help! Whether you have questions about our tour
            packages, need assistance with your booking, or just want to say
            hello, we do love to hear from you. Reach out to us through the form
            below or use the contact information provided. Our team is dedicated
            to providing you with the best travel experience possible.
          </h2>
        </div>
        <WorkInProgress title="Contact Us" />
      </div>
    </div>
  );
};

export default ContactPage;
