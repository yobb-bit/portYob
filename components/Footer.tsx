export default function Footer() {
  return (
    <footer
      className="border-t border-gray-200 py-10 px-4 sm:px-6"
      role="contentinfo"
    >
      <div className="container-narrow">
        <p className="text-small-ui text-gray-400 text-center">
          Designed & built by{" "}
          <strong className="text-ink font-medium">John Kent Blancaflor</strong>{" "}
          · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}