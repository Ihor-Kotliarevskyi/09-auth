"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import css from "./LayoutRegister.module.css";

type Props = {
  readonly children: React.ReactNode;
};

function LayoutRegister({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [router]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <section className={css.container}>
          <div className={css.registerWrapper}>{children}</div>
        </section>
      )}
    </>
  );
}

export default LayoutRegister;
