function HighlightIcon({ name }) {
  if (name === "outdoor") {
    return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 20h16M12 4v16M7 8l5-4 5 4M7 8l-3 7h16l-3-7" /></svg>;
  }

  if (name === "cool") {
    return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" /></svg>;
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 3h14v18H5zM9 12h6M12 9v6" /></svg>;
}

export function ListingHighlights({ highlights }) {
  return (
    <section className="listing-highlights" aria-label="Property highlights">
      {highlights.map((highlight) => (
        <article className="listing-highlight" key={highlight.title}>
          <HighlightIcon name={highlight.icon} />
          <div>
            <h3>{highlight.title}</h3>
            <p>{highlight.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
