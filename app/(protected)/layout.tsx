import ProtectedLayout from "@/components/shared/ProtectedLayout";

export default function ProtectedLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
