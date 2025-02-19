export interface CommentType {
    id: number;
    text: string;
    avatar: string | null;
    email: string | null;
    userName: string | null;
    parentId: number | null;
    isSynced: number | boolean;
    createdAt: string | number;
    replies: CommentType[];
}
