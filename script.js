const hourlyRateFormGroup = document.querySelector(".hourlyRate");
const form = document.querySelector("#form");
const eduImage = document.querySelector(".edu-image");
const eduTitle = document.querySelector(".edu-title");
const eduName = document.querySelector(".edu-name");
const eduDesc = document.querySelector(".edu-desc");
const years = document.querySelectorAll(".circle-div");



//Submit Handler
const handleSubmit = (event) => {
    event.preventDefault();
    const reqData = {};
    for (let i = 0; i < form?.elements.length - 1; i++) {
      if(form.elements[i].name.includes("person")) {
        reqData[form.elements[i].name] = form.elements[i].value;
      }
    }
    reqData["personInquiryType"] = document.querySelector('input[name="inquiryType"]:checked').value;
    if(reqData.personInquiryType === "Hiring") {
        reqData["personHourlyRate"] = document.querySelector('input[name="hourlyRate"]').value;
    }

    const url = 'https://httpbin.org/post';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)  
    }).then(res => {
        if(res.status === 200) {
            swal("Success!", "Your message has been sent", "success");
        }else {
            swal("Error!", "Something went wrong, please try again", "error");
        }
    });
};

//hourly rate toggle
const handleInquiryTypeChange = (inquiryType) => {
    if(inquiryType === "Hiring") {
        hourlyRateFormGroup.style.display = "block";
    } else {
        hourlyRateFormGroup.style.display = "none";
    }
}

const handleEducationChange = (event) => {
    const year = event.target.innerText;

    for(const element of years) {
        element.classList.remove("selected");
        if(element.innerText === year) {
            element.classList.add("selected");
        }
    }
    if(year === "2019") {
        eduImage.src = "./assets/images/Anand.jpg";
        eduTitle.innerText = "10th Grade";
        eduName.innerText = "Anand Niketan School, Mehsana";
        eduDesc.innerText = "I passed my secondary school in the year of 2018-19 with A+ grade.";
    }else if(year === "2022") {
        eduImage.src = "./assets/images/Seneca.jpg";
        eduTitle.innerText = "Computer Programming";
        eduName.innerText = "Seneca college, Newnham campus";
        eduDesc.innerText = "Currently I'm studying Computer programming at seneca college";
    }else {
        eduImage.src = "./assets/images/KV.jpg";
        eduTitle.innerText = "12th Grade";
        eduName.innerText = "Kendriya Vidyalaya, ONGC Mehsana";
        eduDesc.innerText = "I passed my higher secondary education in the year of 2020-21 with A+ grade.";
    }
}