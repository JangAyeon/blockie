import { useProfileForm } from "@hook/business/mypage/useUserProfileForm";
import { User } from "@type/user";

// 프로필 폼 컴포넌트
const ProfileForm = ({ user }: { user: User }) => {
  const form = useProfileForm({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 shadow-xl border border-white/60 backdrop-blur-sm mb-8 relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800">프로필 정보</h3>
              <p className="text-sm text-gray-500 font-medium">
                나의 소중한 정보들
              </p>
            </div>
          </div>

          {!form.editMode && (
            <button
              onClick={form.startEditing}
              className="group relative bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-yellow-400 hover:to-orange-400 text-gray-800 px-6 py-3 rounded-2xl font-bold text-sm shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">✏️</span>
                수정하기
              </span>
            </button>
          )}
        </div>

        {form.editMode ? (
          <div className="space-y-6">
            {/* 편집 폼 */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </span>
                이름
              </label>
              <input
                type="text"
                value={form.formData.name || ""}
                onChange={(e) => form.updateField("name", e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-200 text-lg font-medium"
                placeholder="이름을 입력해주세요"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs">📧</span>
                </span>
                이메일
              </label>
              <input
                type="email"
                value={form.formData.email || ""}
                onChange={(e) => form.updateField("email", e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-200 text-lg font-medium"
                placeholder="이메일을 입력해주세요"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs">📱</span>
                </span>
                전화번호
              </label>
              <input
                type="tel"
                value={form.formData.phone || ""}
                onChange={(e) => form.updateField("phone", e.target.value)}
                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-100 focus:border-yellow-300 transition-all duration-200 text-lg font-medium"
                placeholder="전화번호를 입력해주세요"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={form.handleSubmit}
                disabled={form.isSubmitting || !form.hasChanges}
                className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="flex items-center justify-center gap-2">
                  {form.isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      저장 중...
                    </>
                  ) : (
                    <>
                      <span className="text-xl">💾</span>
                      저장하기
                    </>
                  )}
                </span>
              </button>

              <button
                onClick={form.handleCancel}
                disabled={form.isSubmitting}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-4 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl">❌</span>
                  취소
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {/* 읽기 전용 프로필 정보 */}
            {[
              {
                label: "이름",
                value: user?.name,
                icon: "👤",
                bgColor: "bg-blue-100",
              },
              {
                label: "이메일",
                value: user?.email,
                icon: "📧",
                bgColor: "bg-green-100",
              },
              {
                label: "전화번호",
                value: user?.phone,
                icon: "📱",
                bgColor: "bg-purple-100",
              },
              {
                label: "가입일",
                value: user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("ko-KR")
                  : "",
                icon: "📅",
                bgColor: "bg-yellow-100",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white/70 hover:bg-white rounded-2xl p-5 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        {item.label}
                      </span>
                      <div className="font-bold text-lg text-gray-800">
                        {item.value || "-"}
                      </div>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
