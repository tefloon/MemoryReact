import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function KBD({ children }: Props) {
  return (
    <kbd className="m-0.5 px-2 py-1.5 text-xs font-semibold uppercase text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
      {children}
    </kbd>
  );
}

export default KBD;
