import {Equal, Expect} from '@type-challenges/utils'

type ChatMessageStatus = 'submitted' | 'received' | 'read'
type ChatMessageStatusOnReceiver = Exclude<ChatMessageStatus, 'submitted'>

type ChatMessage = {
    author: string,
    createdAt: Date
    receivedAt: Date
    subject: string
    message: string
    status: ChatMessageStatus
}

type ChatMessagePost = Pick<ChatMessage, 'subject' | 'message'>
type AnonymizedChatMessage = Omit<ChatMessage, 'author'>

type cases1 = [
    Expect<Equal<ChatMessagePost, {
        subject: string,
        message: string
    }>>,
    Expect<Equal<AnonymizedChatMessage, {
        createdAt: Date,
        receivedAt: Date,
        subject: string,
        message: string,
        status: ChatMessageStatus
    }>>,
    Expect<Equal<ChatMessageStatusOnReceiver, 'received' | 'read'>>
]