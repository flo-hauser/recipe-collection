type MessageType = "info" | "warning" | "error" | "success";
type Message = {
  id: number;
  message: string;
  visible: Boolean;
  messageType: MessageType;
};

export { Message, MessageType };
