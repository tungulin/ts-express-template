// ======= User controllers =======

export type SignUp = {
  isBot?: boolean;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: string;
  addedToAttachmentMenu?: boolean;
  allowsWriteToPm?: boolean;
  photoUrl?: string;
};
