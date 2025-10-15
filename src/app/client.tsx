'use client'

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Client ({users}:{users: Record<string, any>[]}) {

    const trpc = useTRPC();
    const {data: usersServer} = useSuspenseQuery(trpc.getUsers.queryOptions());

    return (<div>
        Client Component!
        {JSON.stringify(usersServer)}
    </div>)
}