import { Wave } from "better-react-spinkit";

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png"
          style={{ marginBottom: 10 }}
          height={200}
        />
        <Wave color="#00A859" size={60} />
      </div>
    </center>
  );
}

export default Loading;
