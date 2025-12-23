import { SvgPuzzleSpinner } from "@/components/matching/SvgPuzzleSpinner";

export default function LoadingPage() {
  return (
    <main className="center-page">
      <div className="flex justify-center">
        <SvgPuzzleSpinner />
      </div>
    </main>
  );
}
