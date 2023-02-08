const inputElement = document.querySelector("input");

inputElement.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    const query = inputElement.value.toLowerCase();
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "data");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const lines = xhr.responseText.split("\n");

        lines.forEach(line => {
          const [arg1, arg2] = line.split("\\\\");

          if (arg1.toLowerCase().includes(query)) {
            console.log(arg1, arg2);
          }
        });
      }
    };

    xhr.send();
  }
});
