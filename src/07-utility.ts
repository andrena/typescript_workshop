import { Equal, Expect } from '@type-challenges/utils'

type ChatMessageStatus = 'submitted' | 'received' | 'read'

// Wir haben ein Chat-Programm geschrieben.
// Teil 1:
// Jede Nachricht hat einen Status (ChatMessageStatus). Der Status 'submitted' macht allerdings nur auf dem
// Sendergerät Sinn, auf Empfängerseite wird dieser Status nie vorkommen.
// Verwende einen Utility Type, um den Typ ChatMessageStatusOnReceiver zu definieren, welcher alle Status
// von ChatMessageStatus außer 'submitted' beinhaltet.

type ChatMessageStatusOnReceiver = any

type ChatMessage = {
    author: string,
    createdAt: Date
    receivedAt: Date
    subject: string
    message: string
    status: ChatMessageStatus
}

type testCase1 = Expect<Equal<ChatMessageStatusOnReceiver, 'received' | 'read'>>

// Teil 2:
// Oben sehen wir den Typen einer Nachricht. Wenn man eine Nachricht absendet, müssen allerdings natürlich nicht alle
// Felder gefüllt sein. In dem Fall sind nur 'subject' und 'message' wichtig - den Rest füllt der Server automatisch auf.
// Definiere den Typen ChatMessagePost mithilfe von Utility Types so, dass er auf ChatMessage aufbaut aber lediglich
// die Properties 'subject' und 'message' übernimmt

type ChatMessagePost = any

type testCase2 = Expect<Equal<ChatMessagePost, {
    subject: string,
    message: string
}>>

// Teil 3:
// Wir wollen einen Export der Nachrichten für unser Analyse-Tool schreiben. Dazu müssen die Nachrichten allerdings
// anonymisiert werden (= wir entfernen den 'author').
// Definiere mit Utility Types den Typen AnonymizedChatMessage, der alle Properties von ChatMessage außer 'author' kopiert.
type AnonymizedChatMessage = any

type testCase3 = Expect<Equal<AnonymizedChatMessage, {
    createdAt: Date,
    receivedAt: Date,
    subject: string,
    message: string,
    status: ChatMessageStatus
}>>
