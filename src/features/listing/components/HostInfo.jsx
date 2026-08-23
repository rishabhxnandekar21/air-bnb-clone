export function HostInfo({ host }) {
  return (
    <section className="host-info">
      <img alt={`${host.name} host profile`} className="host-info__image" src={host.image} />
      <div>
        <h3>Hosted by {host.name}</h3>
        <p>{host.yearsHosting} years hosting</p>
      </div>
    </section>
  );
}
