// 'use client';

import { cn } from "@/lib/utils";
import {prisma} from "@/lib/db";
import {caller} from '@/trpc/server';
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Client from "./client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

export default async function Page() {

  const users = await caller.getUsers();
  const queryClient = getQueryClient();

  // const trpcClient = useTRPC();
  // const {data: users} = useQuery(trpcClient.getUsers.queryOptions());

  queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className={cn("text-red-500 font-extrabold")}>
      Hello World!
      {/* <pre>{JSON.stringify(users, null, 2)}</pre>
       */}
       <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<p>loading...</p>}>
            <Client users={users}/>
          </Suspense>
       </HydrationBoundary>
    </div>
  );
}
