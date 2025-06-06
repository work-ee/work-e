"use client";

import { useState } from "react";

import LinkedInPopup from "@/components/feedback/LinkedInPopup/LinkedInPopup";

export default function LinkedInSection() {
  const [show, setShow] = useState(true);

  return show ? <LinkedInPopup onClose={() => setShow(false)} /> : null;
}
