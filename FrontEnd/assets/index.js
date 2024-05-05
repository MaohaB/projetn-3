// partie site visiteurs//
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
				document.querySelectorAll(".work-item").forEach(workItem => {
					workItem.style.display = "block";
				})
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
  
// document.querySelector(".editor") => {editor.style.display = "none";}


// partie site admin//
// modale//

//afficher la modale quand on clique sur modifier
// getElementById à l'interieur d'une fonction
document.addEventListener("DOMContentLoaded", function() {
	// afficher la modale
	const containerModal = document.querySelector(".containermodale")
	document.getElementById("affichermodale").addEventListener('click', function () {
	console.log("afficher la modale")
	containerModal.style.display = "flex";
	});
	// fermer la modal sur la croix
	document.getElementById("xmark").addEventListener('click', function () {
	console.log("fermer la modale")
	containerModal.style.display = "none";
	});
	// fermer la modal en dehors
	containerModal.addEventListener('click', (e) => {
		if (e.target.className == "containermodale") {
			console.log("fermer la modale")
			containerModal.style.display = "none";	
		}
	})
});