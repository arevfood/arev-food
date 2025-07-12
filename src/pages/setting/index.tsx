import MainButton from "@/components/common/button";
import MainLayouts from "@/layouts/main";
import { firebaseAuth } from "@/utils/connections/firebase";
import { signOut } from "firebase/auth";
import { useHistory } from "react-router";

const PagesSetting: React.FC = () => {
  const router = useHistory();
  return (
    <MainLayouts>
      <MainButton
        onClick={async () => {
          router.replace("/login");
          signOut(firebaseAuth);
        }}
      >
        Logout
      </MainButton>
    </MainLayouts>
  );
};

export default PagesSetting;
