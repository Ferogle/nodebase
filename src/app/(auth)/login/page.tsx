import { LoginForm } from "@/features/auth/components/login-form";
import { requireNoAuth } from "@/lib/auth-utils";

export default async function Page() {
    await requireNoAuth();
    return <LoginForm/>
};