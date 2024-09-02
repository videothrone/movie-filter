import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function MovieLayout({ children }: Props) {
  return (
    <>
      <div>
        <Link href="/">Back to main page</Link>
      </div>
      {children}
    </>
  );
}
