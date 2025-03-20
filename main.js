const form = document.querySelector("form");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    /** @type {HTMLInputElement} */
    const avatarEl = document.getElementById("avatar");
    const name = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const username = (document.getElementById("username").value = "@jaoferr");
    document
        .querySelectorAll(".data-name")
        .forEach((e) => (e.textContent = name));
    document
        .querySelectorAll(".data-email")
        .forEach((e) => (e.textContent = email));
    document
        .querySelectorAll(".data-username")
        .forEach((e) => (e.textContent = username));
    var reader = new FileReader();
    reader.onload = (ev) => {
        document
            .querySelectorAll(".data-avatar")
            .forEach((e) => (e.src = ev.target.result));
    };
    reader.readAsDataURL(avatarEl.files[0]);

    document.querySelector("form").style.display = "none";
    document.getElementById("result").style.display = "initial";
});

//
//
//
//
/// DEV

function loadURLToInputFiled(url) {
    getImgURL(url, (imgBlob) => {
        // Load img blob to input
        // WIP: UTF8 character error
        let fileName = "hasFilename.jpg";
        let file = new File(
            [imgBlob],
            fileName,
            { type: "image/jpeg", lastModified: new Date().getTime() },
            "utf-8"
        );
        let container = new DataTransfer();
        container.items.add(file);
        document.querySelector("#avatar").files = container.files;
    });
}
// xmlHTTP return blob respond
function getImgURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        callback(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
}
document.getElementById("devfill").onclick = () => {
    loadURLToInputFiled("assets/images/image-avatar.jpg");
    document.getElementById("fullname").value = "João Ferreira";
    document.getElementById("email").value = "joaoferreira@gmail.com";
    document.getElementById("username").value = "@jaoferr";
    // document.querySelector("form button").click();
};
// document.getElementById("devfill").click();
