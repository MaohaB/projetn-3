////  id1=Objets id2=Appartements id3=Hotels & restaurants ////

fetch("http://localhost:5678/api/works")
.then(function(response) {
	if(response.ok) {
		return response.json();
	}
})
.then(function(data) {
	let works = data;
	console.log(works);
	works.forEach((work, index) => {
		// figure //
		let myFigure = document.createElement('figure');
		myFigure.setAttribute('class', `work-item category-id-0 category-id-${work.categoryId}`);
		myFigure.setAttribute('id', `work-item-${work.id}`);
		// image //
		let myImg = document.createElement('img');
		myImg.setAttribute('src', work.imageUrl);
		myImg.setAttribute('alt', work.title);
		myFigure.appendChild(myImg);
		// figcaption //
		let myFigCaption = document.createElement('figcaption');
		myFigCaption.textContent = work.title;
		myFigure.appendChild(myFigCaption);

		document.querySelector("div.gallery").appendChild(myFigure);
	});
})
.catch(function(err) {
	console.log(err);
});




// boutons //

var button1 = document.createElement("button1");
button1.innerHTML = "Objets"