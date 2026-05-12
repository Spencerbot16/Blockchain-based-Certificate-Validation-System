import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();   // go to previous page
    } else {
      router.push("/"); // go to home page
    }
  }

  return (
    <button
      onClick={goBack}
      className="appButton appButtonSecondary"
    >
      ⬅ Back
    </button>
  );
}