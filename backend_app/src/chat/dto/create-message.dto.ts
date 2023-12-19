export class CreateMessageDto {
  id: string;
  text: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
}
