export interface Message {
    _id: string;
    sender: string;
    receiver: string;
    message: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}
