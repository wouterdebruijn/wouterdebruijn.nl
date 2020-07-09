function makeProject(project) {

        console.log(project.name);
        console.log(project.date);
        console.log(project.author);
        console.log(project.innerHTML);

        projects.push(project);
        var export2 = window.open('', 'export', 'width=800,height=400');
        var text = export2.document.createTextNode(JSON.stringify(projects));
        export2.document.body.appendChild(text);
}

function loadProjects() {
  element = document.getElementById('projectsExport');
  var p = "";
  for (i = 0; i < projects.length; i++) {
  var text = "";
    text += '<div class="project">'
    text += '<div class="title"><h2>' + projects[i].name + '</h2></div>';
    text += "<div class=\"flexbox\"><div class=projectText><small>" + projects[i].author + "</small> ";
    text += "<small>" + projects[i].date + "</small><br>";
    text += '' + projects[i].innerHTML + '</div>';

    text += '<div class=projectImgBox>'
    for (d = 0; d < projects[i].images; d++) {
      var k = d + 1;
      text += '<a href="/photo/projects/' + i + '-' + d + '.png' + '"><img title="IMG' + k + '"" class="projectImg" src=./photo/projects/' + i + '-' + d + '-thumb.png></a>';
    }
      text += "</div>";

    text += '</div></div><br>';
	  p = text + p;
  }
  element.innerHTML = p;
}
