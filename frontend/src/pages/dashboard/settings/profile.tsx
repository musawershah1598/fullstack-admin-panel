import BreadcrumbComponent from "~/components/breadcrumb";
import ChangePasswordComponent from "~/pages/dashboard/settings/components/change-password";
import ProfileInformationComponent from "~/pages/dashboard/settings/components/profile-information";

const ProfilePage = () => {
  return (
    <div>
      <BreadcrumbComponent />
      <h2 className="font-bold text-xl mt-4 tracking-wide">Profile Page</h2>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <ProfileInformationComponent />
        <ChangePasswordComponent />
      </div>
    </div>
  );
};

export default ProfilePage;
