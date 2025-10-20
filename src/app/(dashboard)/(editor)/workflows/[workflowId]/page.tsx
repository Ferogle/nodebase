import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{
        workflowId: string;
    }>
}


const Page = async ({params}: PageProps) => {
    await requireAuth();
    const workflowId = (await params).workflowId;
    return (
        <p>
            Workflow: {workflowId}
        </p>
    )
}

export default Page;