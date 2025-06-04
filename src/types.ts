export interface PbRecord {
    created: Date;
    updated: Date;
}

export interface PbProject extends PbRecord {
    id: string
    slug: string
}

export interface PbComment extends PbRecord {
    id: string
    author: string
    project: string
    reply_to?: string
    content: string  
    replies?: PbComment[] 
}