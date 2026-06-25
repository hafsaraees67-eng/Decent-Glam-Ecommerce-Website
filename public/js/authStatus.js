fetch("/api/me")
  .then(res => res.json())
  .then(data => {
    if (data.loggedIn) {
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline";
    }
  });

logoutBtn?.addEventListener("click", () => {
  fetch("/api/logout").then(() => location.reload());
});
