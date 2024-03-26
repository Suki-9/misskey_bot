type Mi_Emoji = {
  aliases: string[];
  category: string;
  name: string;
  url: string;
};

type Mi_Note = {
  id: string;
  createdAt: string;
  text: string | null;
  cw: string | null;
  visibility: string,
  localOnly: boolean,
  user: UserData,
  files: Mi_File[];
  myReaction?: string;
  reactionEmojis: Record<string, number>;
  reactions: Record<string, number>;
  renote?: Omit<Mi_Note, "renote"> & Rename<Pick<UserData, "id">, "id", "userId">;
  renoteCount: number;
  reply?: Pick<Mi_Note, "id" | "createdAt" | "text" | "cw" | "user" | "files">;
  repliesCount: number;
};

type Mi_File = {
  blurhash: string;
  comment: string | null;
  createdAt: string;
  folder: string | null;
  folderId: string | null;
  id: string;
  isSensitive: boolean;
  md5: string;
  name: string | null;
  properties: {
    height: number;
    width: number;
  };
  size: number;
  thumbnailUrl: string;
  type: string;
  url: string;
  user: string | null;
  userId: string | null;
};

type UserData = {
  id: string;
  name: string | null;
  username: string;
  host: string | null;
  avatarUrl: string | null;
  avatarBlurhash: string | null;
  avatarDecorations: {
    id: string,
    angle: number,
    url: string,
  }[]
  isBot: boolean;
  isCat: boolean;
  emojis: Record<Any, Any>;
  onlineStatus: "online" | "offline";
  badgeRoles: {
    name: string;
    iconUrl: string;
    displayOrder: number;
  }[];
  url: string | null;
  uri: string | null;
  movedTo: string | null;
  alsoKnownAs: string | null;
  createdAt: string;
  updatedAt: string | null;
  lastFetchedAt: string | null;
  bannerUrl: string | null;
  bannerBlurhash: string | null;
  isLocked: boolean;
  isSilenced: boolean;
  isLimited: boolean;
  isSuspended: boolean;
  description: string | null;
  location: string | null;
  birthday: string;
  fields: {
    name: string | null;
    value: string | null;
  }[];
  followersCount: number;
  followingCount: number;
  notesCoun: number;
  pinnedNoteIds: string[] | null;
  pinnedNotes: Note[] | null;
  pinnedPageId: string[] | null;
  pinnedPage: Any | null;
  publicReactions: boolean;
  ffVisibility: string;
  twoFactorEnabled: boolean;
  usePasswordLessLogin: boolean;
  securityKeys: boolean;
  roles: [
    {
      id: string;
      name: string | null;
      color: string;
      iconUrl: string | null;
      description: string;
      isModerator: boolean;
      isAdministrator: boolean;
      displayOrder: number;
    },
  ];
  memo: string | null;
  avatarId: string | null;
  bannerId: string | null;
  isModerator: boolean;
  isAdmin: boolean;
  injectFeaturedNote: boolean;
  receiveAnnouncementEmail: boolean;
  alwaysMarkNsfw: boolean;
  autoSensitive: boolean;
  carefulBot: boolean;
  autoAcceptFollowed: boolean;
  noCrawle: boolean;
  preventAiLearning: boolean;
  isExplorable: boolean;
  isDeleted: boolean;
  twoFactorBackupCodes: boolean;
  hideOnlineStatus: boolean;
  hasUnreadSpecifiedNotes: boolean;
  hasUnreadMentions: boolean;
  hasUnreadAnnouncement: boolean;
  unreadAnnouncements: Array<Any>;
  hasUnreadAntenna: boolean;
  hasUnreadChannel: boolean;
  hasUnreadNotification: boolean;
  hasPendingReceivedFollowRequest: boolean;
  mutedWords: string[];
  mutedInstances: string[];
  mutingNotificationTypes: string[];
  achievements: {
    name: string;
    unlockedAt: number;
  }[];
  loggedInDays: number;
  policies: {
    gtlAvailable: boolean;
    ltlAvailable: boolean;
    canPublicNote: boolean;
    canCreateContent: boolean;
    canUpdateContent: boolean;
    canDeleteContent: boolean;
    canInvite: boolean;
    inviteLimit: number;
    inviteLimitCycle: number;
    inviteExpirationTime: number;
    canManageCustomEmojis: boolean;
    canSearchNotes: boolean;
    canHideAds: boolean;
    driveCapacityMb: number;
    alwaysMarkNsfw: number;
    pinLimit: number;
    antennaLimit: number;
    wordMuteLimit: number;
    webhookLimit: number;
    clipLimit: number;
    noteEachClipsLimit: number;
    userListLimit: number;
    userEachUserListsLimit: number;
    rateLimitFactor: number;
    email: string | null;
    emailVerified: boolean;
    securityKeysList: Array<Any>;
  };
};
