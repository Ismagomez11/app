import dns from "dns";

dns.lookup("google.com", (err, res) => {
  console.log("GOOGLE:", err, res);
});

dns.lookup("db.rivnmqryckchsusbgelm.supabase.co", (err, res) => {
  console.log("SUPABASE:", err, res);
});