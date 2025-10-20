interface PageProps {
    params: Promise<{
        credentialId: string;
    }>
}


const Page = async ({params}: PageProps) => {
    const credentialId = (await params).credentialId;
    return (
        <p>
            Credentials: {credentialId}
        </p>
    )
}

export default Page;