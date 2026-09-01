#!/usr/bin/env node
const SITE_URL = "https://shivanshutiwari.in";
console.log(`shivanshutiwari.in CLI — ${SITE_URL}`);
const cmd = process.argv[2];
if (cmd === "projects") {
  const res = await fetch(`${SITE_URL}/api/v1/projects?limit=3`).then(r=>r.json()).catch(()=>({hint:"run locally: curl "+SITE_URL+"/api/v1/projects"}));
  console.log(JSON.stringify(res, null, 2));
} else if (cmd === "contact") {
  console.log("POST /api/v1/contact with {name,email,message} + Idempotency-Key — see /developers");
} else {
  console.log("Usage: shivanshu [projects|contact] — see https://shivanshutiwari.in/developers");
}
