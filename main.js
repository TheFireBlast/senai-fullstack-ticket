const form = document.querySelector("form");
/** @type {HTMLInputElement} */
const avatarInput = document.getElementById("avatar");

/**@type {string | ArrayBuffer | null} */
let avatar = null;

function removeAvatar() {
	avatarInput.value = null;
	avatarInput.dispatchEvent(new Event("change"));
}

form.addEventListener("submit", (ev) => {
	ev.preventDefault();

	document.querySelectorAll(".data-avatar").forEach((e) => (e.src = avatar));

	const name = document.getElementById("fullname").value;
	const email = document.getElementById("email").value;
	const username = document.getElementById("username").value;
	document
		.querySelectorAll(".data-name")
		.forEach((e) => (e.textContent = name));
	document
		.querySelectorAll(".data-email")
		.forEach((e) => (e.textContent = email));
	document
		.querySelectorAll(".data-username")
		.forEach((e) => (e.textContent = username));
	document.querySelectorAll(".data-date").forEach(
		(e) =>
			(e.textContent = new Date(
				Date.now() + 10 * 24 * 60 * 60 * 1000
			).toLocaleDateString("en-US", {
				month: "short",
				day: "2-digit",
				year: "numeric",
			}))
	);
	document
		.querySelectorAll(".data-ticketcode")
		.forEach(
			(e) =>
				(e.textContent = (Math.random() * 100000)
					.toFixed(0)
					.padStart(5, "0"))
		);

	form.style.display = "none";
	form.reset();
	document.getElementById("result").style.display = "initial";
});

avatarInput.addEventListener("change", () => {
	if (avatarInput.files && avatarInput.files.length > 0) {
		document.querySelector("#avatar-wrapper .empty").style.display = "none";
		document.querySelector("#avatar-wrapper .filled").style.display =
			"contents";
		const reader = new FileReader();
		reader.onload = (ev) => {
			avatar = ev.target.result;
			document.querySelector("#avatar-wrapper .filled img").src = avatar;
		};
		reader.readAsDataURL(avatarInput.files[0]);
	} else {
		document.querySelector("#avatar-wrapper .empty").style.display =
			"contents";
		document.querySelector("#avatar-wrapper .filled").style.display =
			"none";
	}
});

document.getElementById("devfill").onclick = async () => {
	const blob = await (await fetch("assets/images/image-avatar.jpg")).blob();
	let file = new File([blob], "avatar.png");
	let container = new DataTransfer();
	container.items.add(file);
	avatarInput.files = container.files;
	avatarInput.dispatchEvent(new Event("change"));
	document.getElementById("fullname").value = "João Ferreira";
	document.getElementById("email").value = "joaoferreira@gmail.com";
	document.getElementById("username").value = "@jaoferr";
	// document.querySelector("form button").click();
};
// document.getElementById("devfill").click();
