import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SignUpForm from "./SignupForm";

const SignUp = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user?.id)
    .single();

  console.log("userProfile:", userProfile);

  if (!userProfile) {
    redirect("/home?error=no-user");
  }

  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
