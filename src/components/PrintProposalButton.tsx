"use client";

export default function PrintProposalButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#FF4D2D] text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors cursor-pointer"
    >
      <span>🖨️</span> PDF Olarak Kaydet / Yazdır
    </button>
  );
}
