import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "70svh",
        display: "grid",
        placeItems: "center",
        background: "var(--ink-black)",
        color: "#fff",
        paddingTop: "var(--nav-h)",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          Error 404
        </p>
        <h1 className="display" style={{ margin: "18px 0 16px" }}>
          That page isn&rsquo;t here.
        </h1>
        <p className="lead" style={{ margin: "0 auto 30px", color: "rgba(255,255,255,.62)" }}>
          The link may be out of date. Start from the homepage, or jump straight to the work.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn">
            Back to home
            <Icon name="arrow" size={16} />
          </Link>
          <Link href="/cases" className="btn btn-ghost">
            Case studies
          </Link>
        </div>
      </div>
    </section>
  );
}
