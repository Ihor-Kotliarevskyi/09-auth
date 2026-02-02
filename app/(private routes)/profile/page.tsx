"use client";

import css from "./ProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import Link from "next/link";

function Profile() {
  const { email, username, avatar } = useAuthStore((state) => state.user) || {};

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatar || "/file.svg"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: <strong>{username}</strong>
          </p>
          <p>
            Email: <strong>{email}</strong>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Profile;
