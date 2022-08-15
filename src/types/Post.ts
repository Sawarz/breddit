export type Post = {
    id: string | undefined,
    title: string| undefined,
    text: string| undefined,
    image?: File| undefined,
    link?: string| undefined,
    pollTitle?: string| undefined,
    pollOptions?: string[]| undefined,
    likes?: number | undefined,
    likedBy?: string[] | undefined,
    dislikedBy?: string[] | undefined,
    community: string| undefined,
    user: string| undefined,
    comments?: Comment[] | undefined
}