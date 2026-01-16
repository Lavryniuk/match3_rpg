import "./MapRoad.scss";

export default function MapRoad({ onStartLevel }) {
  return (
    <div className="map-road">
      <h1 className="map-road__title">Map Road</h1>
      <p className="map-road__subtitle">Select level:</p>

      <div className="map-road__levels">
        <button onClick={() => onStartLevel(1)}>Level 1</button>
        <button onClick={() => onStartLevel(2)}>Level 2</button>
        <button onClick={() => onStartLevel(3)}>Level 3</button>
        <button onClick={() => onStartLevel(31)}>Level 31</button>
      </div>
    </div>
  );
}
