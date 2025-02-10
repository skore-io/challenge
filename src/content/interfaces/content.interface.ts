interface Content {
    id: string;
    title: string;
    cover?: string;
    created_at: Date;
    description?: string;
    total_likes: number;
    type?: string;
    url?: string;
}

interface Metadata {
    [key: string]: any;
}