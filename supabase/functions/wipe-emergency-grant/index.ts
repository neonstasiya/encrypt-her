Deno.serve(async () => {
  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  // Empty then delete the bucket via Storage Admin API
  const empty = await fetch(`${url}/storage/v1/bucket/emergency-grant/empty`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, apikey: key },
  });
  const emptyBody = await empty.text();
  const del = await fetch(`${url}/storage/v1/bucket/emergency-grant`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${key}`, apikey: key },
  });
  const delBody = await del.text();
  return new Response(JSON.stringify({
    empty: { status: empty.status, body: emptyBody },
    delete: { status: del.status, body: delBody },
  }), { headers: { "content-type": "application/json" } });
});
