export default async function UserProfile({params}: any) {
    const {id} = await params
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>profile</h1>
            <hr />
            <p className="text-4xl">profile page
                <span className="p-2 rounded bg-red-500 text-black">{id}</span>
            </p>


        </div>
    )
}