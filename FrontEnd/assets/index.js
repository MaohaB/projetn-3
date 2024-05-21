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
		  Figure.setAttribute(
			"class",
			`work-item category-id-${work.categoryId}`
		  );
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
	  const buttons = document.querySelectorAll("button");
	  buttons.forEach((buttons) => {
		buttons.addEventListener("click", (e) => {
		  btnId = e.target.id;
		  document
			.querySelectorAll("div.gallery .work-item")
			.forEach((workItem) => {
			  workItem.style.display = "none";
			});
		  //pour bouton "tous"//
		  if (btnId == "0") {
			document.querySelectorAll(".work-item").forEach((workItem) => {
			  workItem.style.display = "block";
			});
		  } else {
			// pour les autres boutons//
			document
			  .querySelectorAll(`.work-item.category-id-${btnId}`)
			  .forEach((workItem) => {
				workItem.style.display = "block";
			  });
		  }
		  console.log(btnId);
		});
	  });
	});
  
  // document.querySelector(".editor") => {editor.style.display = "none";}
  
  // partie site admin//
  // modifier quand connecter //
  document.addEventListener("DOMContentLoaded", function () {
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
	  document.getElementById("logout").addEventListener("click", function () {
		console.log("deconnexion");
		document.getElementById("login").style.display = "flex";
		document.getElementById("logout").style.display = "none";
		document.querySelector(".modifier").style.display = "none";
		document.querySelector(".editor").style.display = "none";
		document.getElementById("boutons").style.display = "flex";
		//enlever le token
		sessionStorage.removeItem("token");
	  });
	}
  });
  
  // modale//
  //afficher la modale quand on clique sur modifier
  // getElementById à l'interieur d'une fonction
  document.addEventListener("DOMContentLoaded", function () {
	// afficher la modale
	const containerModal = document.querySelector(".containermodale");
	document
	  .getElementById("affichermodale")
	  .addEventListener("click", function () {
		console.log("afficher la modale");
		containerModal.style.display = "flex";
		document.querySelector(".modale1").style.display = "flex";
		document.querySelector(".modale2").style.display = "none";
	  });
	// fermer la modal sur la croix
	document.getElementById("xmark1").addEventListener("click", function () {
	  console.log("fermer la modale");
	  containerModal.style.display = "none";
	});
	document.getElementById("xmark2").addEventListener("click", function () {
	  console.log("fermer la modale");
	  containerModal.style.display = "none";
	});
	// fermer la modal en dehors
	containerModal.addEventListener("click", (e) => {
	  if (e.target.className == "containermodale") {
		console.log("fermer la modale");
		containerModal.style.display = "none";
	  }
	});
	// basculer vers la modale d'ajout photo
	document.getElementById("ajoutphoto").addEventListener("click", function () {
	  console.log("modale d'ajout photo");
	  document.querySelector(".modale1").style.display = "none";
	  document.querySelector(".modale2").style.display = "flex";
	});
	// retour
	document.getElementById("retour").addEventListener("click", function () {
	  console.log("retour");
	  document.querySelector(".modale1").style.display = "flex";
	  document.querySelector(".modale2").style.display = "none";
	});
	// fermer la modale après validation
	document.getElementById("valider").addEventListener("click", function () {
	  console.log("valider");
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
		works.forEach((work, id) => {
		  // figure //
		  const Figure = document.createElement("figure");
		  Figure.setAttribute(
			"class",
			`work-item category-id-${work.categoryId}`
		  );
		  Figure.setAttribute("id", `work-item-${work.id}`);
		  // image //
		  const Img = document.createElement("img");
		  Img.setAttribute("src", work.imageUrl);
		  Img.setAttribute("alt", work.title);
		  Figure.appendChild(Img);
  
		  const deleteButton = document.createElement("p");
		  deleteButton.setAttribute("class", "poubelle");
		  Figure.appendChild(deleteButton);
  
		  //créer+intégrer les icones poubelles
		  const icon = document.createElement("i");
		  icon.classList.add("fa-solid", "fa-trash-can");
		  icon.setAttribute("id", work.id);
		  deleteButton.appendChild(icon);
		  // intégrer le tout
		  document.querySelector("div.galleryModale").appendChild(Figure);
		});
		// function delete
		deleteWork();
	  });
  }
  displayWorksModal();
  
  // supprimer un projet
  
  function deleteWork(id) {
	const trashAll = document.querySelectorAll(".fa-trash-can");
	console.log(trashAll);
	trashAll.forEach((icon) => {
	  const id = icon.id;
	  icon.addEventListener("click", (e) =>
		//console.log(id)
		fetch("http://localhost:5678/api/works/" + id, {
		  method: "DELETE",
		  headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + sessionStorage.getItem("token"),
		  },
		}).then((response) => {
		  if (response.status === 200) {
			// <Supprimer l'element>
			const deleteElement = document.getElementById(id);
			if (deleteElement) {
			  deleteElement.parentNode.removeChild(deleteElement);
			}
		  }
		  document.querySelector("div.gallery").innerHTML = ""
		  getWorks()
		  document.querySelector("div.galleryModale").innerHTML = ""
		  displayWorksModal()
	}));
	});
  }
  
  // Ajouter un projet
  
  // Ajouter une img
  document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".imgInput").onchange = function(){
	var input = document.getElementById("Imgfile-input");
	var image = document.getElementById("preview");
	console.log(input.files[0]);
	if (input.files && input.files[0]) {
	  var reader = new FileReader();
	  reader.onload = function (e) {
		// target.result = url d'image
		image.src = e.target.result;
	  };
	  reader.readAsDataURL(input.files[0]);
	  // prévisualisation
	  image.style.display = "block";
	  input.style.display = "none";
	  document.getElementById("taillemaxphoto").style.display = "none";
	  document.querySelector(".form-group-photo i").style.display = "none";
	  document.querySelector(".imgLabel").style.display = "none";
	}
	// annuler en fermant la modale
	document.getElementById("xmark2").addEventListener("click", function () {
	  console.log("effacer la prévisualisation");
	  image.src = null;
	  image.style.display = "none";
	  input.style.display = "flex";
	  document.getElementById("taillemaxphoto").style.display = "flex";
	  document.querySelector(".form-group-photo i").style.display = "flex";
	  document.querySelector(".imgLabel").style.display = "flex";
	});
	// reset après validation
	document.getElementById("valider").addEventListener("click", function () {
	  //console.log("reset de l'image");
	  image.src = null;
	  image.style.display = "none";
	  input.style.display = "flex";
	  document.getElementById("taillemaxphoto").style.display = "flex";
	  document.querySelector(".form-group-photo i").style.display = "flex";
	  document.querySelector(".imgLabel").style.display = "flex";
	});
  }})
  
  // créer les options
  function selectOption() {
	fetch("http://localhost:5678/api/categories")
	  .then(function (response) {
		if (response.ok) {
		  return response.json();
		}
	  })
	  .then(function (data) {
		let categories = data;
		console.log(categories);
  
		const select = document.querySelector(".form-group-id select");
		categories.forEach((category) => {
		  const option = document.createElement("option");
		  option.textContent = category.name;
		  option.value = category.id;
		  select.appendChild(option);
		});
	  });
  }
  selectOption();
  
  // récuperer et ajouter les données du formulaire
  document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("valider").addEventListener("click", (e) => {
	  // données du form
	  const title = document.querySelector(".addTitle").value;
	  const category = document.querySelector(".addCategory").value;
	  const image = document.querySelector(".imgInput").files[0];
  
	  if (title === "" || category === "" || image === undefined) {
		console.log("Merci de remplir tous les champs");
		document.getElementById("emptyField").style.display = "flex";
		// ne pas fermer la modale
		document.querySelector(".containermodale").style.display = "flex";
		return;
	  } else if (title !== "" && category !== "" && image !== undefined) {
		console.log("Tous les champs OK");
		document.getElementById("emptyField").style.display = "none";
		try {
		  const formData = new FormData();
		  formData.append("title", title);
		  formData.append("category", category);
		  formData.append("image", image);
		  console.log(formData);
  
		  fetch("http://localhost:5678/api/works", {
			method: "POST",
			headers: {
			  Authorization: "Bearer " + sessionStorage.getItem("token"),
			},
			body: formData,
		  });
		  // Actualiser la gallerie
		  // figure //
		  const Figure = document.createElement("figure");
		  Figure.setAttribute("class", `work-item category-id-${category}`);
		  // image //
		  const Img = document.createElement("img");
		  Img.setAttribute("src", "http://localhost:5678/images/" + image.name);
		  Img.setAttribute("alt", title);
		  Figure.appendChild(Img);
		  // figcaption //
		  const FigCaption = document.createElement("figcaption");
		  FigCaption.textContent = title;
		  Figure.appendChild(FigCaption);
		  document.querySelector("div.gallery").appendChild(Figure);
  
		  // Actualiser la modale de supression
		  // figure //
		  const Figuremodale = document.createElement("figure");
		  Figuremodale.setAttribute("class", `work-item category-id-${category}`);
		  // image //
		  const Imgmodale = document.createElement("img");
		  Imgmodale.setAttribute("src", "http://localhost:5678/images/" + image.name);
		  Imgmodale.setAttribute("alt", title);
		  Figuremodale.appendChild(Imgmodale);
  
		  const deleteButton = document.createElement("p");
		  deleteButton.setAttribute("class", "poubelle");
		  Figuremodale.appendChild(deleteButton);
  
		  //créer+intégrer les icones poubelles
		  const icon = document.createElement("i");
		  icon.classList.add("fa-solid", "fa-trash-can");
		  deleteButton.appendChild(icon);
		  // intégrer le tout
		  document.querySelector("div.galleryModale").appendChild(Figuremodale);
  
		} catch (error) {
		  console.log(error);
		}
		// retirer le contenu du form
		document.getElementById("titre").value = '';
	  }
	});
	// changer la couleur du bouton valider
	document.querySelector(".addTitle").onkeyup = function () {
	  if (
		document.querySelector(".addTitle").value === "" ||
		document.querySelector(".addCategory").value === "" ||
		document.querySelector(".imgInput").files[0] === undefined
	  ) {
		document.getElementById("valider").style.background = "#A7A7A7";
		document.getElementById("valider").style.border = "#A7A7A7";
	  } else {
		document.getElementById("valider").style.background = "#1D6154";
		document.getElementById("valider").style.border = "#1D6154";
		document.getElementById("emptyField").style.display = "none";
	  }
	};
		  // function delete
		deleteWork();
  });
  