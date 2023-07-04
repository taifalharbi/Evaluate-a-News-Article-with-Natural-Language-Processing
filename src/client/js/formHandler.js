const validateUrl = (url) => {
    const urlPattern = new RegExp("(www.|http://|https://|ftp://)\w*");
    return urlPattern.test(url);
  };
  
  function handleSubmit(event) {
    event.preventDefault();
  
    const articleUrlInput = document.getElementById('url');
    const errorElement = document.getElementById('invalid');
    const formResultElement = document.getElementById('form_result');
    const resultElement = document.getElementById('results');
    
    const formText = articleUrlInput.value;
    
    if (!validateUrl(formText)) {
      console.log("Invalid URL");
      errorElement.style.display = "block";
      errorElement.style.color = "#8a4646";
      errorElement.style.fontSize = "10px";
      errorElement.style.textShadow = "0.5px 0.5px 1px black";
      errorElement.textContent = "* URL not valid";
      formResultElement.style.display = "none";
    } else {
      console.log("Valid URL");
      errorElement.style.display = "none";
      formResultElement.style.display = "block";
  
      const requestOptions = {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ formText })
      };
  
      fetch('/text', requestOptions)
        .then(() => {
          console.log(typeof formText, typeof requestOptions.body, requestOptions.body);
          console.log("::: Form Submitted :::");
          return fetch('http://localhost:8888/url');
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          resultElement.innerHTML = `<div id="ss"><span id="s">Article Agreement : </span> ${data.agreement}<br>
          <span id="s">Article Confidence : </span> ${data.confidence}</div>`;
          data = [];
        })
        .catch(error => {
          console.log(error);
          // Handle any error that occurred during the fetch requests
        });
    }
  }
  
  export { handleSubmit };
  