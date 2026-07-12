const parts=['app.part1.txt', 'app.part2.txt', 'app.part3.txt'];
try {
  const responses=await Promise.all(parts.map(path=>fetch(path,{cache:"no-store"})));
  if(responses.some(response=>!response.ok)) throw new Error("Application module could not be loaded.");
  const source=(await Promise.all(responses.map(response=>response.text()))).join("");
  const url=URL.createObjectURL(new Blob([source],{type:"text/javascript"}));
  await import(url);
  URL.revokeObjectURL(url);
} catch (error) {
  console.error(error);
  document.querySelector("#app").innerHTML='<main class="onboarding"><section class="card setting-card"><h1>Turkish Tutor</h1><p>The application could not be loaded. Check your connection and refresh.</p></section></main>';
}
