import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const sb = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const all: string[] = [];
  const walk = async (prefix = "") => {
    const { data, error } = await sb.storage.from("emergency-grant").list(prefix, { limit: 1000 });
    if (error) throw error;
    for (const it of data ?? []) {
      const path = prefix ? `${prefix}/${it.name}` : it.name;
      // folders have null id
      // @ts-ignore
      if (it.id === null) await walk(path);
      else all.push(path);
    }
  };
  try {
    await walk();
    if (all.length) {
      const { error } = await sb.storage.from("emergency-grant").remove(all);
      if (error) throw error;
    }
    return new Response(JSON.stringify({ removed: all.length }), { headers: { "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});
