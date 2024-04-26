// travaux//

function getWorks() {
	fetch("http://localhost:5678/api/works")
	  .then(function (response) {
		if (response.ok) {
		  return response.json();
		}
	  })
	  .then(function (data) {
		let works = data;
		console.log(works);
		works.forEach((work, index) => {
		  // figure //
		  const Figure = document.createElement("figure");
		  Figure.setAttribute("class",`work-item category-id-${work.categoryId}`);
		  Figure.setAttribute("id", `work-item-${work.id}`);
		  // image //
		  const Img = document.createElement("img");
		  Img.setAttribute("src", work.imageUrl);
		  Img.setAttribute("alt", work.title);
		  Figure.appendChild(Img);
		  // figcaption //
		  const FigCaption = document.createElement("figcaption");
		  FigCaption.textContent = work.title;
		  Figure.appendChild(FigCaption);
  
		  document.querySelector("div.gallery").appendChild(Figure);
		});
	  });
  }
  getWorks();


// boutons //
fetch("http://localhost:5678/api/categories")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    let categories = data;
    categories.unshift({ id: 0, name: "Tous" });

    console.log(categories);

    const bouton = document.getElementById("boutons");
	console.log(bouton);
    categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.textContent = category.name;
	  btn.id = category.id;
      bouton.appendChild(btn);
    });
// filtres //
const buttons = document.querySelectorAll("button")
buttons.forEach(buttons => {
	buttons.addEventListener("click",(e) => {
		btnId = e.target.id
		document.querySelectorAll(".work-item").forEach(workItem => {
			workItem.style.display = "none";
		});
		//pour bouton "tous"//
		if (btnId == "0") {
		getWorks();
		}else {
			// pour les autres boutons// 
			document.querySelectorAll(`.work-item.category-id-${btnId}`).forEach(workItem => {
				workItem.style.display = "block";
			});
		}
		console.log(btnId)
	});
});
})
