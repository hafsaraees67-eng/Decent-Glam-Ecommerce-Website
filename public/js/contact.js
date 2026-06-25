document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value
    };

    try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });


        const result = await res.json();
        const statusEl = document.getElementById("form-status");

        // Success message show
        statusEl.innerText = result.message;

        // Form reset
        form.reset();

        // After 3 seconds message remove
        setTimeout(() => {
            statusEl.innerText = "";
        }, 1000);

    } catch (err) {
        const statusEl = document.getElementById("form-status");
        statusEl.innerText = "Failed to send message!";
        setTimeout(() => {
            statusEl.innerText = "";
        }, 1000);
        console.error(err);
    }
});
