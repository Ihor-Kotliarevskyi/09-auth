import ProfilePage from "@/components/ProfilePage/ProfilePage";
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

function Profile() {
  return <ProfilePage />;
}

export default Profile;
