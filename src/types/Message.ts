type MessageType = "info" | "warning" | "error" | "success";
type Message = {
  id: number;
  message: string;
  visible: boolean;
  messageType: MessageType;
};

export { Message, MessageType };
