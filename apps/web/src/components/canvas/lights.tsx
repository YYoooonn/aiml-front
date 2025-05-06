import { Light } from "@/hook/useEditor";

// TODO light adding implementation
export default function Lights({}: { props?: Light[] }) {
  // FIXME : light props implementation
  return (
    <>
      <directionalLight
        intensity={5}
        position={[5, 10, 10]}
        color={"#FFFFFF"}
      />
    </>
  );
}
