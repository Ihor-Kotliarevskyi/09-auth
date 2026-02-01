import EditProfilePage from "@/components/EditProfilePage/EditProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "View and edit your user profile",
  openGraph: {
    title: "User Profile",
    description: "View and edit your user profile",
    type: "website",
    url: "https://yourapp.com/profile",
  },
};

function EditProfile() {
  return <EditProfilePage />;
}

export default EditProfile;
