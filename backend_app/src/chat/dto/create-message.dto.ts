export class CreateMessageDto {
  chatId: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
}
