"use client";

import { cn } from "@/lib/utils";
import { authClient, useSession } from "@/lib/auth-client";
import {Button} from "@/components/ui/button"
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Page() {

  // const data = await caller.getUsers();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());  

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
    }
  }));

  const testAI = useMutation(trpc.testGeminiAI.mutationOptions());

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected server component
      <div>
        {JSON.stringify(data)}
      </div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
      <Button disabled={testAI.isPending} onClick={() => testAI.mutate()}>Test Gemini AI</Button>
      <div>
        {JSON.stringify(testAI.data)}
      </div>
      <LogoutButton/>
    </div>
  );
}
