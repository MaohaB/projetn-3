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
			document.querySelectorAll("div.gallery .work-item").forEach(workItem => {
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
// modifier quand connecter //
document.addEventListener("DOMContentLoaded", function() {
// on vérifie que le token est présent
if (sessionStorage.getItem("token")) {
	console.log("admin");
	// afficher logout
	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "flex";
	// bouton modifier pour la modale
	document.querySelector(".modifier").style.display = "flex";
	// banniere noire
	document.querySelector(".editor").style.display = "flex";
	// desactiver les boutons filtres
	document.getElementById("boutons").style.display = "none";
	// deconnexion
	document.getElementById("logout").addEventListener('click', function () {
		console.log("deconnexion");
		document.getElementById("login").style.display = "flex";
		document.getElementById("logout").style.display = "none";
		document.querySelector(".modifier").style.display = "none";
		document.querySelector(".editor").style.display = "none";
		document.getElementById("boutons").style.display = "flex";
	})
}
});



// modale//
//afficher la modale quand on clique sur modifier
// getElementById à l'interieur d'une fonction
document.addEventListener("DOMContentLoaded", function() {
	// afficher la modale
	const containerModal = document.querySelector(".containermodale")
	document.getElementById("affichermodale").addEventListener('click', function () {
	console.log("afficher la modale")
	containerModal.style.display = "flex";
	document.querySelector(".modale1").style.display = "flex";
	document.querySelector(".modale2").style.display = "none";
	});
	// fermer la modal sur la croix
	document.getElementById("xmark1").addEventListener('click', function () {
	console.log("fermer la modale")
	containerModal.style.display = "none";
	});
	document.getElementById("xmark2").addEventListener('click', function () {
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
	// basculer vers la modale d'ajout photo
	document.getElementById("ajoutphoto").addEventListener('click', function () {
	console.log("ajout photo")
	document.querySelector(".modale1").style.display = "none";
	document.querySelector(".modale2").style.display = "flex";
	});
	// retour
	document.getElementById("retour").addEventListener('click', function () {
	console.log("retour")
	document.querySelector(".modale1").style.display = "flex";
	document.querySelector(".modale2").style.display = "none";
	});
	// fermer la modale après validation
	document.getElementById("valider").addEventListener('click', function () {
	console.log("valider")
	containerModal.style.display = "none";
});
});
// afficher les travaux dans la modale
function displayWorksModal() {
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
  
		  const p = document.createElement("p");
		  p.setAttribute("class", "poubelle");
		  Figure.appendChild(p);
  
  
		  const icon = document.createElement("i");
		  icon.classList.add("fa-solid", "fa-trash-can"); 
		  p.appendChild(icon);

		  document.querySelector("div.galleryModale").appendChild(Figure);
		});
	  });
  }
  displayWorksModal();