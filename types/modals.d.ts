export interface ModalsState {
  linkedInConnected: boolean;
  noLinkedIn: boolean;

  remindCV: boolean;
  cvUploaded: boolean;

  paidOverpayment: boolean;
  freeChecksLeft: number;

  autoSendCV: boolean;

  paidSubscription: boolean;
  freeSendCVLeft: number;
}
export interface ModalsActions {
  setLinkedInConnected: (connected: boolean) => void;
  setNoLinkedIn: (noLinkedIn: boolean) => void;

  setRemindCV: (remind: boolean) => void;
  setCvUploaded: (uploaded: boolean) => void;

  setPaidOverpayment: (paid: boolean) => void;
  setFreeChecksLeft: (count: number) => void;

  setAutoSendCV: (autoSend: boolean) => void;

  setPaidSubscription: (paid: boolean) => void;
  setFreeSendCVLeft: (count: number) => void;
}
