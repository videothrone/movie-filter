import { FaArrowUp } from "react-icons/fa";

type ScrollToTopProps = {
  scrollToTop: () => void;
  className?: string;
};

export default function ScrollToTop({
  scrollToTop,
  className,
}: ScrollToTopProps) {
  return (
    <>
      <button
        className={`button scroll-to-top ${className}`}
        onClick={scrollToTop}
      >
        <span className="visually-hidden">Scroll to Top</span>
        <FaArrowUp className="scroll-to-top__icon" />
      </button>
    </>
  );
}
