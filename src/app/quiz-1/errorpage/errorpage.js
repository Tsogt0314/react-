"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase/client.js";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div>
      <p>Error Page</p>
    </div>
  );
}
