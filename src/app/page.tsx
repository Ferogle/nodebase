
import { cn } from "@/lib/utils";
import { authClient, useSession } from "@/lib/auth-client";
import {Button} from "@/components/ui/button"
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

export default async function Page() {

  const data = await caller.getUsers();

  return (
    <div className={cn("text-red-500 font-extrabold")}>
      protected server component
      {JSON.stringify(data)}
      <LogoutButton/>
    </div>
  );
}
