import { InfinitySpin } from "react-loader-spinner";

export default function Loader() {
  return (
    <div style={{ margin: "0 auto" }}>
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}