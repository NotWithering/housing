const inputElement = document.querySelector("input");
const resultsContainer = document.createElement("div");

inputElement.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    const query = inputElement.value.toLowerCase();
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "data");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const lines = xhr.responseText.split("\n");
        let resultCount = 0;

        lines.forEach(line => {
          const [arg1, arg2] = line.split("\\\\");

          if (arg1.toLowerCase().includes(query)) {
            resultCount++;

            const houseElement = document.createElement("p");
            houseElement.textContent = "House: " + arg1;
            houseElement.classList.add("result");

            const ownerElement = document.createElement("p");
            ownerElement.textContent = "Owner: " + arg2;
            ownerElement.classList.add("result");

            const visitCommandElement = document.createElement("p");
            visitCommandElement.textContent = "Command: /visit " + arg2;
            visitCommandElement.classList.add("result");

            resultsContainer.appendChild(houseElement);
            resultsContainer.appendChild(ownerElement);
            resultsContainer.appendChild(visitCommandElement);
            resultsContainer.appendChild(document.createElement("hr"));
          }
        });

        const resultCountElement = document.createElement("p");
        resultCountElement.textContent = `${resultCount} Results Found`;
        resultCountElement.classList.add("result");
        document.body.appendChild(resultCountElement);

        document.body.appendChild(document.createElement("hr"));

        document.body.appendChild(resultsContainer);

        const searchAgainButton = document.createElement("button");
        searchAgainButton.textContent = "Search Again";
        searchAgainButton.classList.add("srcagain");
        searchAgainButton.addEventListener("click", () => {
          location.reload();
        });

        document.body.appendChild(searchAgainButton);
      }
    };

    xhr.send();
  }
});
