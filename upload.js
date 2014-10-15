var action = 'upload.php',
	noop = function(){};
var progress = function(e){
		var done = e.position || e.loaded, total = e.totalSize || e.total;
		console.log(done + ' ' + total);
		progress.innerHTML += (Math.floor((done/total)*100)) + '%<br/>';
	}
var el = document.querySelector('#file'),
	progressBar = document.querySelector('#progress'),
	drop = document.querySelector('#drop');
el.addEventListener('change', function(){
	for(var i = 0, len = this.files.length; i < len; i++){
		var file = this.files[i];
		xhrUp(file);
	}
})
function xhrUp(file){
	var	xhr = new XMLHttpRequest();
	xhr.upload.addEventListener('progress', progress)
	xhr.addEventListener('load', function(){
		progressBar.innerHTML += 'done, 100%';
	})
	xhr.open('Put', action, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('X-File-name', encodeURIComponent(file.filename || file.name));
	xhr.setRequestHeader('Content-Type', 'application/octet-stream');
	xhr.send(file);
}
drop.addEventListener("dragover", function(e) { 
	e.stopPropagation();
	e.preventDefault();
}, false);
drop.addEventListener('drop', function(e) {
	e.stopPropagation();
	e.preventDefault();
	var files = e.target.files || e.dataTransfer.files;
 	for(var i = 0, len = files.length; i < len; i++){
 		var file = files[i];
		var reader = new FileReader()
		reader.onload = function(e) {
			document.body.innerHTML += ('<img src="'+e.target.result+'">');
		}
		reader.readAsDataURL(file);
		xhrUp(file);
 	}
}, false);