import { Button } from "@/components/ui";
import { Variant as BtnVariantType } from "@/components/ui/Button";

import { signIn, signOut } from "@/auth";

interface Props {
  title: string;
  variant?: BtnVariantType;
  provider?: string;
}

export const SignIn = ({ provider, title, variant }: Props) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button variant={variant} type="submit">
        {title}
      </Button>
    </form>
  );
};

export const SignOut = ({ title, variant }: Props) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant={variant} type="submit">
        {title}
      </Button>
    </form>
  );
};
