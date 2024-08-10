import { useClerk } from '@clerk/nextjs';
import { Button } from "@mui/material";

export default function SignInSignUpButtons() {
  const { openSignIn, openSignUp } = useClerk();

  return (
    <>
      <Button onClick={openSignIn} style={{ marginRight: "10px" }}>Sign In</Button>
      <Button onClick={openSignUp}>Sign Up</Button>
    </>
  );
}
