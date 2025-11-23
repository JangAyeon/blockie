import { useProfileForm } from "@hook/business/mypage/useUserProfileForm";
import { User } from "@type/user";
import { useTranslations } from "next-intl";

// 프로필 폼 컴포넌트
const ProfileForm = ({ user }: { user: User }) => {
  const t = useTranslations();
  const form = useProfileForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 mb-8">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {t("user.profileInfo")}
          </h3>
          <p className="text-sm text-gray-500">
            {t("user.profileDescription")}
          </p>
        </div>

        {!form.editMode && (
          <button
            onClick={form.startEditing}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            {t("common.edit")}
          </button>
        )}
      </div>

      {form.editMode ? (
        <div className="space-y-6">
          {/* 편집 폼 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("user.name")}
            </label>
            <input
              type="text"
              value={form.formData.name || ""}
              onChange={(e) => form.updateField("name", e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base"
              placeholder={t("user.name")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("user.email")}
            </label>
            <input
              type="email"
              value={form.formData.email || ""}
              onChange={(e) => form.updateField("email", e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base"
              placeholder={t("user.email")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("user.phone")}
            </label>
            <input
              type="tel"
              value={form.formData.phone || ""}
              onChange={(e) => form.updateField("phone", e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-base"
              placeholder={t("user.phone")}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={form.handleSubmit}
              disabled={form.isSubmitting || !form.hasChanges}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {form.isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t("common.saving")}
                </span>
              ) : (
                t("common.save")
              )}
            </button>

            <button
              onClick={form.handleCancel}
              disabled={form.isSubmitting}
              className="px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {t("common.cancel")}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 읽기 전용 프로필 정보 */}
          {[
            {
              label: t("user.name"),
              value: user?.name,
            },
            {
              label: t("user.email"),
              value: user?.email,
            },
            {
              label: t("user.phone"),
              value: user?.phone,
            },
            {
              label: t("user.joinDate"),
              value: user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("ko-KR")
                : "",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
            >
              <span className="text-sm font-medium text-gray-500">
                {item.label}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {item.value || "-"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
