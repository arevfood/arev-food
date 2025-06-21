export default function MainButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className="!px-4 min-h-[32px] bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      onClick={onClick}
    >
      Click Me
    </button>
  );
}
