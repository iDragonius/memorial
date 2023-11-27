const AuthErrorMessages: Record<string, string> = {
  otp_not_correct: "OTP kod düzgün daxil edilməmişdi",
};
const BranchErrorMessages: Record<string, string> = {
  branch_item_already_added_family_member: "Xidmət artıq səbətə əlavə edilib!",
  basket_contains_items_from_different_branch:
    "Səbətinizdə başqa filialdan xidmət var!",
};

const BasketErrorMessages: Record<string, string> = {
  current_discount_is_low_from_promo_code:
    "Hal-hazırdakı endirim promo kod endirimdən çoxdu!",
  promo_code_not_found: "Promo kod tapılmadı!",
};

const UserErrorMessages: Record<string, string> = {
  member_already_exist: "Ailə üzvü artıq mövcuddur!",
};

const ErrorMessages = {
  ...AuthErrorMessages,
  ...BranchErrorMessages,
  ...BasketErrorMessages,
  ...UserErrorMessages,
};

export default ErrorMessages;
