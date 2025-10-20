interface PageProps {
    params: Promise<{
        executionId: string;
    }>
}


const Page = async ({params}: PageProps) => {
    const executionId = (await params).executionId;
    return (
        <p>
            Execution: {executionId}
        </p>
    )
}

export default Page;